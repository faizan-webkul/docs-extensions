# Author Guide

A **Template Author** is any admin user with the `xlsx_connector.templates.create` and `xlsx_connector.templates.edit` permissions. Authors create and maintain the mapping templates that import/export jobs use — the operators of those jobs do not need to understand the column structure of the XLSX file as long as the template is correct.

## Opening the module

In the admin panel, click **XLSX Connector → Templates** in the sidebar to open the Templates listing page. From here you can:

- create a new template
- search and filter saved templates
- edit, delete, or toggle status on a template
- mass-update or mass-delete several templates

## The three-step workflow

The connector follows the same pattern Unopim documents inside the module itself:

1. **Step 1: Create a Mapping Template** — define the mapping between Unopim attributes and your custom XLSX columns.
2. **Step 2: Configure an Import / Export Job** — create a Data Transfer job that uses the template.
3. **Step 3: Run the Job** — execute the import or export.

This guide covers Step 1. See the [Operator Guide](./operator-guide) for Steps 2 and 3.

## Creating a template

### Step 1 — Open the create form

Click **Create** on the Templates listing page.

### Step 2 — Enter the basic fields

| Field | Required | Notes |
|---|---|---|
| **Name** | Yes | Human-readable label shown in dropdowns |
| **Code** | Yes | Unique identifier; used internally — keep it stable, it is not auto-generated |
| **Status** | Yes | Enable to make the template available in job dropdowns |

Use a clear, namespaced code such as:

```text
products-vendor-acme
products-erp-monthly
products-export-marketplace
```

### Step 3 — Define the Import Mapping

Inside the editor, the **Import Mapping** section maps each XLSX column header to the Unopim product attribute it should populate.

For each row:

- **XLSX Field** — the exact column header from the spreadsheet.
- **Unopim Attribute** — the target product attribute.

Add as many rows as needed. Required Unopim fields (e.g., `sku`) must have a column mapped to them or the import will fail validation.

### Step 4 — Define the Export Mapping

The **Export Mapping** section reverses the direction — for each Unopim attribute you want in the output file, pick the XLSX column header it should land in.

A template can carry **either or both** mappings. If you only intend to use the template for imports, leave the export mapping empty (and vice-versa).

### Step 5 — Save

Click **Save**. The template appears in the listing and becomes selectable inside import/export jobs immediately if its status is **Enabled**.

## Editing a template

1. Open the Templates listing.
2. Click **Edit** on the row you want to change.
3. Modify name, mapping rows, or status.
4. Save.

::: warning
Changing the mapping of a template that is already referenced by saved jobs affects the **next** run of those jobs. Existing job runs that have already started keep using the snapshot they were dispatched with, but queued runs that have not picked up yet will use the updated mapping.
:::

## Toggling status

Use the status toggle on the grid row to enable or disable a template without editing it. Disabled templates:

- stay visible in the listing
- do **not** appear in the import/export job dropdown
- are safe to keep around as historical records

For bulk status changes, select multiple rows and use **Mass Status Update**.

## Deleting a template

- **Single delete** — use the **Delete** action on the row.
- **Mass delete** — select rows and choose **Delete** from the mass-action dropdown.

Deleted templates are removed permanently. Any saved jobs that referenced the template will fail at run time because their selected template no longer exists — disable instead of delete if you are not sure.

## What authors should not do

- Reuse the same `code` across templates — codes are unique at the database level (`xlsx_templates.code` is `UNIQUE`) and the save will fail.
- Map a column to an attribute that doesn't exist yet — create the attribute in Unopim first.
- Leave both Import Mapping and Export Mapping empty — the template would be saved but useless.

## Best practices

1. Keep one template per vendor/source/destination instead of one giant catch-all.
2. Author the template against the **sample file** (`data-transfer/samples/products.csv`) and a small test job before letting operators use it on the real catalog.
3. Use descriptive codes — operators pick templates by name in the job UI, but support tickets reference codes.
4. Disable instead of delete when retiring a template; this preserves historical job traceability.
5. After editing a template that is in heavy use, notify operators so they re-validate their next run.
