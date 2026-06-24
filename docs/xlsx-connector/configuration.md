# Configuration

The XLSX Connector does not have its own settings page. Configuration is split between:

1. **Templates** — the per-template mapping payloads, managed under **XLSX Connector → Templates**.
2. **Permissions** — assigned via admin roles, controlling who can see and modify templates.
3. **Standard Data Transfer settings** — the queue, file size, and storage settings already configured for Unopim's import/export pipeline.

This page covers permissions and prerequisites. Day-to-day template editing is documented in the [Author Guide](./author-guide).

## Permissions

The module registers the following ACL keys (defined in `packages/Webkul/XLSXConnector/src/Config/acl.php`):

| Permission key | Purpose |
|---|---|
| `xlsx_connector` | Top-level access to the XLSX Connector menu |
| `xlsx_connector.templates` | View the Templates listing page |
| `xlsx_connector.templates.create` | Create a new template |
| `xlsx_connector.templates.edit` | Open and modify an existing template |
| `xlsx_connector.templates.delete` | Delete a single template |
| `xlsx_connector.templates.mass_update` | Mass status update / mass delete from the grid |

To grant a user access:

1. Go to **Settings → Roles** and open or create the relevant role.
2. Enable the required permissions under **XLSX Connector → Templates**.
3. Assign the role to the admin user.

::: warning
There is no separate "use template in a job" permission. Any user who can run an import or export job (granted via the Data Transfer module's permissions) can pick any **enabled** template. To hide a template from job dropdowns without deleting it, toggle its status to **Disabled**.
:::

## Prerequisites

### Product attributes already exist

Templates map XLSX columns to existing Unopim product attributes. Before authoring a template, make sure every attribute you intend to map is already created under **Configure → Attributes**. If you map a column to an attribute that doesn't exist, the import job will fail validation.

### Sample file

Both the importer and exporter ship with a sample file path:

```
data-transfer/samples/products.csv
```

Use **Download Sample** inside the import/export job UI to get a structured example before authoring your template.

### Queue worker

Both import and export are dispatched as queued jobs via Unopim's Data Transfer pipeline. A worker must be active:

```bash
php artisan queue:work
```

In production, run the worker under a process supervisor (Supervisor, systemd) so it restarts after crashes or deploys.

### File storage

Imported uploads and generated export files use Unopim's standard Data Transfer file paths. Make sure `storage/app/public` (or your configured disk) is writable and that the symbolic link from `public/storage` exists:

```bash
php artisan storage:link
```

## Template status

Each template has a `status` boolean (default `true`). Disabled templates remain in the listing but do not appear in the job-creation dropdown. Use the toggle on the grid row, or the **Mass Status Update** action, to flip status without editing the template body.

## Localization

Translations ship for 30+ locales under `src/Resources/lang/`. The active admin locale is selected via the standard Unopim language settings; no extra configuration is required for the XLSX Connector to follow that selection.
