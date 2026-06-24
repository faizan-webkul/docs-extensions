# Installation

Follow the steps below to install the UnoPim ERPNext Connector on your UnoPim instance. Make sure you have terminal access to your server before getting started.

You can install the connector either **with Composer** or **manually**.

## Option A - Install with Composer

### Step 1 - Require the package

```bash
composer require unopim/erpnext-connector
```

### Step 2 - Run migrations and clear the cache

```bash
php artisan migrate
php artisan optimize:clear
```

That's it - skip straight to [Verify the Installation](#verify-the-installation).

## Option B - Install Manually (without Composer)

### Step 1 - Add the Package Files

Download and unzip the extension ZIP file. Rename the extracted folder to `ERPNext` and move it into the `packages/Webkul` directory at the **root** of your UnoPim project, so the path becomes:

```
packages/Webkul/ERPNext
```

### Step 2 - Register the Service Provider

Open the `bootstrap/providers.php` file. At the top, add the `use` statement:

```php
use Webkul\ERPNext\Providers\ERPNextServiceProvider;
```

Then add the provider to the return array, in the Webkul package service providers section:

```php
return [
    // ...existing providers...
    ERPNextServiceProvider::class,
];
```

> [!NOTE]
> This registers `ERPNextServiceProvider` in Laravel so the connector can bootstrap its services, routes, and package configuration during application startup.

### Step 3 - Update Composer Autoload

Open `composer.json` and add the following line under the `autoload > psr-4` section:

```json
"Webkul\\ERPNext\\": "packages/Webkul/ERPNext/src"
```

### Step 4 - Run the Setup Commands

Run the following commands one by one in your terminal. Wait for each one to finish before running the next.

```bash
composer dump-autoload
php artisan migrate
php artisan optimize:clear
```

| Command | Purpose |
|---|---|
| `composer dump-autoload` | Regenerates Composer's autoloader mapping to include the newly added namespace. |
| `php artisan migrate` | Runs the database migrations required by the connector (credentials, mappings, sync tables). |
| `php artisan optimize:clear` | Clears all cached files (bootstrap, configuration, routes, and views) so the new changes load. |

## Enable Queue Operations

Export and import jobs run in the background, so a queue worker must be running to execute them. Start the worker with:

```bash
php artisan queue:work --queue=system,default
```

If your queue is managed by a process manager like **Supervisor**, restart it after installing the connector so the latest changes are picked up:

```bash
sudo service supervisor restart
```

## Verify the Installation

Once all commands have run successfully, log in to your UnoPim dashboard. You should see an **ERPNext** entry in the left sidebar - this confirms the connector has been installed correctly.

If the menu doesn't appear, run `php artisan optimize:clear` again and refresh the page.
