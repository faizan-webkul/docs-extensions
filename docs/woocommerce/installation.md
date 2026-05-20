# Installation

Follow the steps below to install the UnoPim WooCommerce Connector. You'll need terminal access to your server before getting started.

> **Note:** UnoPim 2.0.0 uses the **Laravel 12 bootstrap architecture** (`bootstrap/app.php` fluent API). 

## Step 1 — Add the Package Files

Unzip the extension ZIP file. Inside, you'll find a `packages` folder — merge it into the **root directory** of your UnoPim project.


## Step 2 — Register the Service Provider

Open `bootstrap/providers.php` and add the following:

```php
use Webkul\WooCommerce\Providers\WooCommerceServiceProvider;

return [
    // ...existing providers...
    WooCommerceServiceProvider::class,
];
```


## Step 3 — Update Composer Autoload

Open `composer.json` and add the following line under the `autoload > psr-4` section:

```json
"Webkul\\WooCommerce\\": "packages/Webkul/WooCommerce/src"
```


## Step 4 — Run the Setup Commands

Run the following commands one by one. Wait for each to complete before moving to the next.

**Refresh the Composer autoloader**
```bash
composer dump-autoload
```

**Install the package**
```bash
php artisan woocommerce-package:install
```
This runs the database migrations and publishes the package assets automatically.

**Build the frontend assets**
```bash
cd packages/Webkul/WooCommerce
npm install
npm run build
cd ../../..
```

**Clear the application cache**
```bash
php artisan optimize:clear
```

**Restart the queue worker**
```bash
php artisan queue:restart
```
> The queue worker must be restarted whenever application code changes. This command sends a safe restart signal — it waits for the current job to finish before restarting, so no jobs are lost.


## Verify the Installation

Once all commands have completed, log in to your UnoPim dashboard. You should see the **WooCommerce** option appear in the left sidebar — this confirms the connector is installed and ready to configure.

If it doesn't appear, run `php artisan optimize:clear` again and refresh the page.

