# Operator Guide

A **Job Operator** is an admin user who runs commercetools export and import jobs. By the time you reach this guide, a [Connection Author](./author-guide) has already created a connection, tested it, mapped the required system fields and seeded product types and categories.

Operators work in two places:

- **Data Transfer → Exports** and **Data Transfer → Imports** — to create and run jobs.
- **Commercetools → Sync Logs** — to read what each job did, row by row.

This guide covers six job types, the incremental-sync option, reading the sync log, and the maintenance command for pruning old log rows.

## Exporting from UnoPim to commercetools

Three exporters are registered:

| Job type | Pushes to commercetools |
|---|---|
| **Commercetools — Product Export** | Products (simple + configurable with variants, by SKU/key). |
| **Commercetools — Category Export** | The UnoPim category tree, parent-before-child. |
| **Commercetools — Family Export** | UnoPim attribute families → commercetools product types. |

The job creation flow is the same for all three.

### Step 1 — Open the export creation page

Navigate to **Data Transfer → Exports → Create**.

### Step 2 — Pick the exporter

In the **Type** dropdown, choose one of:

- `Commercetools — Product Export`
- `Commercetools — Category Export`
- `Commercetools — Family Export`

### Step 3 — Configure the filters

| Filter | Required | Notes |
|---|---|---|
| **Commercetools Connection** | Yes | Only active connections appear. |
| **Source Channel** | Yes | The UnoPim channel whose data you are exporting. Choosing a channel narrows the **Locales** field to the locales enabled on that channel. |
| **Locales to Export** | Yes | One or more locales. Locale-scoped UnoPim attributes are exported as commercetools localized values (`ltext`, `lenum`) for each selected locale. |
| **Only changed since last sync** | No | Product and Family exports only. When ticked, the job only processes records changed since the last successful run for this connection + entity. |

### Step 4 — Save and run

Save the job, then click **Run**. The job is dispatched to the queue:

```
Operator clicks Run
        ↓
Job dispatched to the queue
        ↓
Worker reads UnoPim records in batches of 1000
        ↓
For each record: check commercetools by SKU/key
        ↓
Found → update    /    Not found → create
        ↓
Result written to commercetools_sync_log
        ↓
Updated-count backfilled in the job summary
```

### Step 5 — Monitor

Watch the job in **Data Transfer → Exports**. On completion the row shows the standard *created / updated / skipped / failed* counts. The **updated** count is backfilled from the sync log after the job ends, so a brief gap after completion is expected.

## Importing from commercetools into UnoPim

Three importers are registered:

| Job type | Pulls from commercetools |
|---|---|
| **Commercetools — Product Import** | Products, batched 200 at a time. Configurable products are rebuilt with their variants. |
| **Commercetools — Category Import** | The category tree (parents resolved before children; orphans skipped). |
| **Commercetools — Product Type Import** | Product types → UnoPim attribute families, attribute groups, attributes and options. |

### Step 1 — Open the import creation page

Navigate to **Data Transfer → Imports → Create**.

### Step 2 — Pick the importer

In the **Type** dropdown, choose one of:

- `Commercetools — Product Import`
- `Commercetools — Category Import`
- `Commercetools — Product Type Import`

### Step 3 — Configure the filters

| Filter | Required | Notes |
|---|---|---|
| **Commercetools Connection** | Yes | |
| **Source Channel** | Yes | Channel-locale cascade narrows the Locales field. |
| **Locales to Import** | Yes | Locales whose values to pull. |
| **Only changed since last sync** | No | Product Import only. Limits the run to records changed since the last successful import on this connection. |

### Step 4 — Save and run

Save and **Run**. Records are pulled 500 per page (100 per page for product types) and processed in batches of 200. Product images are pulled in a dedicated step inside the same job.

## Incremental sync

The **Only changed since last sync** toggle on Product (export + import), Family export and Category jobs limits the run to records that have changed since the last successful run for that connection + entity combination.

Use incremental sync for:

- Scheduled or nightly catalog refreshes once the initial sync has completed.
- Quick re-syncs after a known small change set.

Skip incremental sync (leave it off) for:

- The very first export or import on a new connection.
- A full refresh after schema changes on either side.

## Sync log

Every record processed by an export or import job is recorded in `commercetools_sync_log`. Browse the log at **Commercetools → Sync Logs**.

Each row carries:

| Column | Meaning |
|---|---|
| `ID` | Row identifier. |
| `Connection` | Which connection the operation ran against. |
| `Direction` | `Export` or `Import`. |
| `SKU` | UnoPim SKU (for product rows). |
| `CT Product ID` | commercetools id of the record. |
| `Action` | `Create`, `Update`, `Skip` or `Fail`. |
| `Status` | `Success` or `Failure`. |
| `HTTP Status` | The commercetools API response status, when applicable. |
| `Error` | A snippet of the error body, if any. |
| `Attempt` | Retry attempt number for this record. |
| `Synced At` | When the row was processed. |

You can filter by Connection, Direction, Status and SKU from the grid.

## Pruning the sync log

The log can grow quickly on busy projects. Trim it with the artisan command:

```bash
php artisan commercetools:sync-log:prune
```

Defaults: removes rows whose `synced_at` is older than 30 days.

Options:

| Option | Effect |
|---|---|
| `--older-than=<N>d` | Override the age threshold. Format is `Nd` (e.g. `7d`, `30d`, `90d`). Invalid values exit with a non-zero status. |
| `--connection=<id>` | Limit to a single connection by id. |
| `--dry-run` | Print the per-connection delete count without removing rows. |

Example — see what a 7-day prune would remove for connection 3:

```bash
php artisan commercetools:sync-log:prune --older-than=7d --connection=3 --dry-run
```

In production, schedule the prune daily from `routes/console.php`:

```php
use Illuminate\Support\Facades\Schedule;

Schedule::command('commercetools:sync-log:prune --older-than=30d')
    ->dailyAt('02:30');
```

## Troubleshooting

### "The selected connection has no attribute mappings configured."

The required system-field mappings (`sku`, `key`, `name`) have not been saved. Open the connection's **Attribute Mapping** tab and confirm all three required rows have a UnoPim attribute selected. See the [Author Guide](./author-guide).

### Authentication failures (HTTP 401)

A single 401 is handled automatically: the cached OAuth token is invalidated and the request is retried once. If the retry also fails, the credentials or project key are wrong. Re-run **Test Connection** on the connection grid (see the [Author Guide](./author-guide)). The token-refresh buffer is controlled by `COMMERCETOOLS_TOKEN_REFRESH_BUFFER` — see [Configuration](./configuration).

### Jobs stuck in "Pending"

No queue worker is running. Start one with:

```bash
php artisan queue:work
```

Then re-run the job from **Data Transfer → Exports** / **Imports**.

### "The selected Commercetools connection is inactive."

The connection's **Active** flag is off. From **Commercetools → Connections**, activate it via the row toggle or the **Toggle Active** mass action.

### "One or more selected locales are not configured in UnoPim."

The locale chosen at job creation no longer exists in UnoPim's settings. Re-open the job filters and pick a current locale.
