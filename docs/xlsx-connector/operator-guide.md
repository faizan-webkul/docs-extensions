# Operator Guide

A **Job Operator** is an admin user who runs import and export jobs that use the XLSX Connector. Operators don't author the column mapping themselves — they pick a saved template, point it at a file, and run the job.

This guide covers Steps 2 and 3 of the connector's three-step workflow. See the [Author Guide](./author-guide) for Step 1 (template creation).

## Importing products from XLSX

### Step 1 — Open the import job creation page

Navigate to **Data Transfer → Imports → Create**.

### Step 2 — Pick the importer

In the **Type** dropdown, choose **XLSX Product Import** (registered key: `xlsx_products`).

### Step 3 — Configure the job

Fill in the standard import-job fields. The connector exposes the importer with these capabilities:

- `has_file_options` — **enabled**: file-handling options (e.g., update strategy) are visible.
- `has_separator` — **disabled**: there is no CSV-style separator field for XLSX.
- `has_images_directory_path` — **disabled**: image-folder option is not used.

### Step 4 — Select the mapping template

Inside the job's configuration tab, select the **XLSX Template** that matches the file you are importing. Only templates with status **Enabled** appear here.

### Step 5 — Upload the XLSX file

Upload the `.xlsx` file you want to import. You can download the connector's sample (`data-transfer/samples/products.csv`) from the import screen as a reference for the expected structure.

### Step 6 — Save and run

Save the job, then click **Run**. The job is dispatched to the queue:

```
Operator clicks Run
        ↓
Job dispatched to the queue
        ↓
Queue worker reads the XLSX file
        ↓
Each row is validated, then mapped to Unopim attributes via the template
        ↓
Products created/updated; results recorded in the job history
```

### Step 7 — Monitor

Open the job from the import history. You will see:

- progress (rows processed / total)
- the count of created, updated, and skipped products
- validation errors per row, with the failing column and reason

## Exporting products to XLSX

### Step 1 — Open the export job creation page

Navigate to **Data Transfer → Exports → Create**.

### Step 2 — Pick the exporter

In the **Type** dropdown, choose **XLSX Product Export** (registered key: `xlsx_products`).

### Step 3 — Configure filters

The exporter exposes one connector-specific filter:

| Filter | Required | Notes |
|---|---|---|
| **File Format** | Yes | Currently only `XLSX` is offered |

Standard product filters (channel, locale, family, status, etc.) are inherited from the underlying `ProductRepository` source.

### Step 4 — Select the mapping template

Inside the job, select the XLSX Template whose **Export Mapping** describes the columns you want in the output.

### Step 5 — Save and run

Save and click **Run**. The export is dispatched to the queue. When the job completes, the generated `.xlsx` file becomes downloadable from the export's history row.

## Running and monitoring

Both flows ride on Unopim's standard Data Transfer pipeline, so the queue worker must be active:

```bash
php artisan queue:work
```

If a worker is not running, jobs stay in the **Pending** state and never produce results.

## Troubleshooting

### "XLSX Product Import" / "XLSX Product Export" not in the type dropdown

- Confirm the package is installed and the service provider loaded.
- Run `php artisan optimize:clear` and re-open the page.
- Check that your role grants Data Transfer access (the connector reuses Data Transfer's permissions for run-time access).

### Template not visible in the job UI

- The template's status is probably **Disabled** — toggle it on from **XLSX Connector → Templates**.
- The template might map only the opposite direction (e.g., export-only template won't show in import jobs).
- Confirm your role has at least `xlsx_connector.templates` view permission so the listing is reachable.

### Validation errors during import

- Open the job's row-level errors panel — each error names the failing XLSX column and Unopim attribute.
- Common causes: a required attribute (e.g., `sku`) is unmapped in the template, an attribute referenced in the template no longer exists, or a value violates the attribute's validation (numeric, options, length).
- Always validate the XLSX file structure against the **sample file** before running large imports.

### Export produces an empty file

- Check the product filters on the export job — they may exclude every product in your catalog.
- Confirm the template's **Export Mapping** is populated. A template with only an Import Mapping cannot generate any columns on export.

### Job is stuck in Pending

- Verify a queue worker is running.
- Look in `storage/logs/laravel.log` for queue exceptions.
- Restart the worker if you recently changed code or added attributes — Octane/queue workers cache class definitions until restart.

## What operators cannot do

- Edit a template's mapping — that needs `xlsx_connector.templates.edit`.
- Bypass validation on import — every row goes through the importer's validator.
- Cancel a queued job from the UI — once dispatched, it runs to completion or until the worker is stopped.

## Best practices

1. Run a small sample file (5–10 rows) through the importer before each large import — catches template mismatches cheaply.
2. Watch `storage/logs/laravel.log` and the queue worker output during the first run after any template change.
3. Download an export and open it in Excel/LibreOffice to confirm column order before sharing with external partners.
4. For recurring imports (monthly vendor feeds, ERP syncs), keep the same template selected across runs — it makes job history easier to compare.
5. Keep queue workers under a process supervisor in production so a worker crash doesn't silently halt all transfers.
