# Migration History

Every migration you start is recorded, giving you a full audit trail of what was imported, when, and by whom. Two tabs on a connection's edit page give you this visibility.

## Migration History Tab

Open a connection and switch to the **Migration History** tab. Each row represents one migration run and shows:

| Column | Description |
|--------|-------------|
| **ID** | The run identifier. |
| **Connection** | The connection the run was started from. |
| **Base URL** | The Akeneo base URL used. |
| **Client ID** | Masked (`*****`). |
| **Secret Key** | Masked (`*****`). |
| **Password** | Masked (`*****`). |
| **Entities** | The entities included in the run. |
| **Status** | The run's status (for example, *queued*). |
| **Started At** | When the run was started. |
| **User** | The admin user who started the run. |

> [!NOTE]
> Sensitive credentials — **Client ID**, **Secret Key**, and **Password** — are masked (`*****`) everywhere in the migration history, so your catalog moves securely.

## View Run Details

Use the **View** action on a row to open a **read-only details view** for that run, showing the same information for a single migration.

You can also **delete** a single run, or select multiple runs and delete them together. Deleting a run removes it from the history only — it does not undo the imported data.

## Connection History Tab

The **History** tab on the same connection records **field-level changes** to the connection itself — so you can see what was edited, and when.

## Next Steps

- Need to migrate more entities? [Run another migration](./run-migration) — mappings from earlier runs are reused automatically.
- Control who can view, run, and delete migrations on the [Permissions](./permissions) page.
