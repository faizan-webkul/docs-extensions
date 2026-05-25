# UnoPim Public Image URL Installation

This guide explains how to manually install the **UnoPim Public Image URL** extension in your UnoPim project.

## Before You Start

Download the extension package and unzip it on your system before beginning the installation.

## Step 1 - Merge the Package

Copy the extracted `packages` folder into the root directory of your UnoPim project.

After merging the files, the package should be available inside:

```text
packages/Webkul/PublicUrl
```

## Step 2 - Register the Service Provider

Open `bootstrap/providers.php` and import the service provider:

```php
use Webkul\PublicUrl\Providers\PublicUrlServiceProvider;
```

Then register it inside the providers array:

```php
PublicUrlServiceProvider::class,
```

## Step 3 - Update Composer Autoload

Open the `composer.json` file and add the following line under the `autoload > psr-4` section:

```json
"Webkul\\PublicUrl\\": "packages/Webkul/PublicUrl/src/"
```

## Step 4 - Initialize the Package

Run the following commands from the root of your UnoPim project to refresh the autoloader and clear the application cache:

```bash
composer dump-autoload
php artisan optimize:clear
```

## Installation Complete

Once these steps are completed, the **UnoPim Public Image URL** extension will be installed in your project and ready to use.

If the module does not appear or behaves unexpectedly after installation, clear the cache again and verify that the package path, service provider, and Composer autoload entry were added correctly.
