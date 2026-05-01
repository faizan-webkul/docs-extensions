# XLSX Connector

The **XLSX Connector** extension lets you import products into Unopim from `.xlsx` spreadsheets and export Unopim products back out as `.xlsx` files. The mapping between Unopim product attributes and XLSX columns is captured in reusable **Templates**, so the same import/export configuration can be saved, shared, and reused across jobs.

## How it works

```
Author creates a Template (name + code)
        ↓
Map XLSX columns → Unopim attributes (Import Mapping)
Map Unopim attributes → XLSX columns (Export Mapping)
        ↓
Operator opens Data Transfer → Imports / Exports
        ↓
Pick "XLSX Product Import" or "XLSX Product Export"
        ↓
Select the saved Template inside the job
        ↓
Run the job → file is parsed (import) or generated (export)
```

Templates are stored in the `xlsx_templates` table with two JSON columns — `import_mapping` and `export_mapping` — so a single template can serve both directions or just one.

## Key features

- **Reusable mapping templates** — name + unique code, with separate import and export mapping payloads stored as JSON.
- **Status toggle** — enable or disable a template without deleting it. Disabled templates are excluded from job dropdowns.
- **XLSX import** — registered importer key `xlsx_products`, sample file at `data-transfer/samples/products.csv`, file-options enabled.
- **XLSX export** — registered exporter key `xlsx_products`, with a `file_format` filter (currently `XLSX`).
- **Mass actions on templates** — mass status update and mass delete from the listing grid.
- **Admin grid** — searchable list of templates with code, name, status, edit, delete, and toggle actions.
- **Multi-language UI** — translations shipped for 30+ locales (en_US, de_DE, fr_FR, es_ES, hi_IN, ja_JP, zh_CN, etc.).
- **Permission-based access** — view, create, edit, delete, and mass-update permissions are individually controlled.

## Roles

| Role | Responsibilities |
|---|---|
| **Template Author** | Creates and maintains XLSX mapping templates (column ↔ attribute mapping) |
| **Job Operator** | Selects a template inside an Import/Export job and runs the data transfer |

A user can hold both roles depending on their permissions.

## Requirements

- Unopim v2.0.0 or higher
- PHP 8.3+, Laravel 12.x
- The standard Unopim Data Transfer module (already part of the core install)
- Queue worker running (import/export jobs are dispatched as queued jobs)

## In this guide

- [Installation](./installation)
- [Configuration](./configuration)
- [Author Guide](./author-guide)
- [Operator Guide](./operator-guide)
