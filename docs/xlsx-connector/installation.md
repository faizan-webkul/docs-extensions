# Installation

## Requirements

- Unopim v2.0.0 or higher
- PHP 8.3+, Laravel 12.x
- Standard Unopim Data Transfer module (already in core)

## Steps

### 1. Merge the package files

Unzip the extension package and place the folder at `packages/Webkul/XLSXConnector` inside your Unopim project.

### 2. Register the service provider

The package's `composer.json` already declares the provider under `extra.laravel.providers`, so on most installs it auto-registers when Composer dumps the autoloader. If your project disables package discovery, add it manually to `bootstrap/providers.php`:

```php
use Webkul\XLSXConnector\Providers\XLSXConnectorServiceProvider;

return [
    // ...existing providers...
    XLSXConnectorServiceProvider::class,
];
```

### 3. Update Composer autoload

In your project's `composer.json`, add under `autoload.psr-4`:

```json
"Webkul\\XLSXConnector\\": "packages/Webkul/XLSXConnector/src"
```

### 4. Run installation commands

Run these in order:

```bash
composer dump-autoload
php artisan optimize:clear
php artisan migrate
```

The migration creates the `xlsx_templates` table (`id`, `name`, `code` unique, `status` boolean, `export_mapping` JSON, `import_mapping` JSON, timestamps).

### 5. Build front-end assets

```bash
cd packages/Webkul/XLSXConnector
npm install
npm run build
```

### 6. Start the queue worker

Import and export jobs are dispatched via the standard Unopim Data Transfer pipeline, which uses queued jobs. Keep a worker running:

```bash
php artisan queue:work
```

### 7. Verify

Open the Unopim admin panel — an **XLSX Connector** entry should appear in the sidebar (icon `icon-custom-xlsx`) with a **Templates** sub-link. Opening **Data Transfer → Imports** and **Data Transfer → Exports** should now show **XLSX Product Import** and **XLSX Product Export** as available job types.
