# Installation

## Requirements

- UnoPim v2.0.0 or higher
- PHP 8.3+, Laravel 12.x
- Standard UnoPim **Data Transfer** module (already in core)
- A queue worker available (export jobs are dispatched on the queue)
- A Google Merchant Center account and a Google Cloud OAuth client (see [Configuration](./configuration))

## Steps

### 1. Merge the package files

Unzip the extension package and place the folder at `packages/Webkul/GoogleShopping` inside your UnoPim project.

### 2. Register the service provider

The package's `composer.json` declares the provider under `extra.laravel.providers`, so on most installs it auto-registers when Composer rebuilds the autoloader. If your project disables package discovery, add it manually to `bootstrap/providers.php`:

```php
use Webkul\GoogleShopping\Providers\GoogleShoppingServiceProvider;

return [
    // ...existing providers...
    GoogleShoppingServiceProvider::class,
];
```

### 3. Update Composer autoload

In your project's `composer.json`, add under `autoload.psr-4`:

```json
"Webkul\\GoogleShopping\\": "packages/Webkul/GoogleShopping/src"
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
| `google_shopping_connections` | One row per configured Google Merchant Center connection (credentials, OAuth tokens, flags). |
| `google_shopping_attribute_mapping` | Single-row (id `1`) global Attribute Mapping — the JSON map of Google fields to UnoPim attributes. Seeded with sensible defaults on install. |
| `google_shopping_required_settings` | Single-row (id `1`) global Required Settings — target country, content language, default channel, condition / availability, default Google category. Seeded with defaults on install. |
| `google_shopping_category_mapping` | One row per UnoPim-category → Google-taxonomy mapping. |

> The Attribute Mapping and Required Settings tables are **singletons**: row `1` is created and seeded by the migration, and the admin pages edit that one row.

### 5. Build front-end assets

The connector's Vue components are published as part of the standard admin asset pipeline. From the project root:

```bash
npm install
npm run build
```

In development you can use `npm run dev` or `composer run dev` instead.

### 6. Start the queue worker

Export jobs (wizard, Quick Export and real-time push) are dispatched on UnoPim's queue. Keep a worker running:

```bash
php artisan queue:work
```

Real-time single-product pushes run on their own queue. To process them, also run:

```bash
php artisan queue:work --queue=google-shopping-realtime
```

In production, run workers under a process supervisor (Supervisor, systemd) so they restart after crashes or deploys.

### 7. Verify

Open the UnoPim admin panel:

- A **Google Shopping** entry should appear in the sidebar with sub-links **Connections** and **Mapping**.
- **Google Shopping → Connections** should render an empty grid (or whatever connections already exist) with no console or server errors.
- **Google Shopping → Mapping** should open a page with three tabs — **Attribute Mapping**, **Category Mapping** and **Required Settings**.
- **Data Transfer → Exports → Create** should list **Google Shopping Product Export** as an available job type.

If any of those entries are missing, re-run `php artisan optimize:clear` and rebuild assets. Continue to [Configuration](./configuration) once the menu items render.
