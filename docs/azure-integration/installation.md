# Installation

Follow the steps below to install the UnoPim Azure Blob Integration. Make sure you have terminal access to your server before getting started.

---

## Step 1 — Extract the Extension

Unzip the extension package you downloaded. Inside, you'll find a `packages` folder — merge it into the **root directory** of your UnoPim project. Your project structure should look like this:

```
/your-unopim-project
└── packages/
    └── Webkul/
        └── AzureBlob/
```

---

## Step 2 — Register the Service Provider

Open the `bootstrap/providers.php` file and add the following:

```php
use Webkul\AzureBlob\Providers\AzureBlobServiceProvider;

return [
    // ...existing providers...
    AzureBlobServiceProvider::class,
];
```

---

## Step 3 — Update Composer Autoload

Open `composer.json` and add the following line under the `autoload > psr-4` section:

```json
"Webkul\\AzureBlob\\": "packages/Webkul/AzureBlob/src"
```

---

## Step 4 — Run the Setup Commands

Run the following commands one by one from your project root directory. Wait for each one to complete before running the next.

**Refresh the Composer autoloader**
```bash
composer dump-autoload
```

**Install the Azure Blob package**
```bash
php artisan azure-blob-package:install
```

**Clear the application cache**
```bash
php artisan optimize:clear
```

---

## Verify the Installation

Once all commands have completed successfully, log in to your UnoPim dashboard. If the integration is installed correctly, you'll find the Azure Blob configuration options available in the admin settings.

If something doesn't look right, run `php artisan optimize:clear` again and refresh the page.

---

Next, you'll need to set up your Azure Blob Storage account and retrieve your credentials. Head over to [Azure Blob Storage Setup](./setup.md) to continue.