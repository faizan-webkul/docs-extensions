# Installation

## Requirements

- Unopim v2.0.0 or higher
- PHP 8.3+, Laravel 12.x
- Standard Unopim **Data Transfer** module (already in core)
- A queue worker available (jobs are dispatched on the queue)
- A commercetools project with an API client (see [Configuration](./configuration))

## Steps

### 1. Merge the package files

Unzip the extension package and place the folder at `packages/Webkul/Commercetools` inside your Unopim project.

### 2. Register the service provider

The package's `composer.json` declares the provider under `extra.laravel.providers`, so on most installs it auto-registers when Composer rebuilds the autoloader. If your project disables package discovery, add it manually to `bootstrap/providers.php`:

```php
use Webkul\Commercetools\Providers\CommercetoolsServiceProvider;

return [
    // ...existing providers...
    CommercetoolsServiceProvider::class,
];
```

### 3. Update Composer autoload

In your project's `composer.json`, add under `autoload.psr-4`:

```json
"Webkul\\Commercetools\\": "packages/Webkul/Commercetools/src"
```

### 4. Run installation commands

Run these in order from the project root:

```bash
composer dump-autoload
php artisan optimize:clear
php artisan migrate
```

The migration creates the following tables:

| Table | Purpose |
|---|---|
| `commercetools_connections` | One row per configured commercetools project (credentials, region, system-fields mapping). |
| `commercetools_product_types` | Snapshot of product types imported from commercetools. |
| `commercetools_categories` | Snapshot of categories imported from commercetools. |
| `commercetools_product_mappings` | Maps UnoPim products to their commercetools `id` + `version`. |
| `commercetools_sync_log` | One row per export / import operation, used for audit and the prune command. |

### 5. Build front-end assets

The connector's Vue components are published as part of the standard admin asset pipeline. From the project root:

```bash
npm install
npm run build
```

In development you can use `npm run dev` or `composer run dev` instead.

### 6. Start the queue worker

Export and import jobs are dispatched via Unopim's Data Transfer pipeline, which uses queued jobs. Keep a worker running:

```bash
php artisan queue:work
```

In production, run the worker under a process supervisor (Supervisor, systemd) so it restarts after crashes or deploys.

### 7. Verify

Open the Unopim admin panel:

- A **Commercetools** entry should appear in the sidebar with sub-links **Connections** and **Sync Logs**.
- **Commercetools → Connections** should render an empty grid (or whatever connections already exist) with no console or server errors.
- **Data Transfer → Exports → Create** should list **Commercetools — Product Export**, **Commercetools — Category Export** and **Commercetools — Family Export** as available job types.
- **Data Transfer → Imports → Create** should list **Commercetools — Product Import**, **Commercetools — Category Import** and **Commercetools — Product Type Import**.

If any of those entries are missing, re-run `php artisan optimize:clear` and rebuild assets. Continue to [Configuration](./configuration) once the menu items render.
