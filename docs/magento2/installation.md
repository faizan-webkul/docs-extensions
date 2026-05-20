# Installation

The UnoPim Magento 2 Connector links UnoPim with Magento 2 and helps streamline product synchronization between both platforms.

This installation process includes two parts:

- Installing the required Magento 2 plugin.
- Installing and registering the UnoPim Magento 2 Connector inside your UnoPim project.

## Required Magento 2 Plugin

Before using the connector, you need to install the required Magento 2 plugin:

- **Plugin Name**: `ProductImportQueue`

## Install the Magento 2 Plugin

### Step 1: Extract and Move the Plugin Files

Extract the `Magento2Plugin` package.

Then move the `app` folder from inside the `src` directory into the root directory of your Magento installation.

### Step 2: Enable the Magento Module

Run the following commands in your Magento root directory:

```bash
php bin/magento module:enable Webkul_ProductImportQueue
php bin/magento setup:upgrade
php bin/magento setup:di:compile
php bin/magento setup:static-content:deploy
```

### Step 3: Flush Cache and Reindex

After enabling the module, run the following commands:

```bash
php bin/magento cache:clean
php bin/magento indexer:reindex
```

## Install the UnoPim Magento 2 Connector

Unzip the connector package and merge the `packages` folder into the root directory of your UnoPim project.

## Register the Package Provider

Open the `bootstrap/providers.php` file and add the following import:

```php
use Webkul\Magento2\Providers\Magento2ServiceProvider;
```

Then, inside the returned `providers` array, add:

```php
Magento2ServiceProvider::class,
```

## Update Composer Autoload

Open the `composer.json` file and add the following line under the `psr-4` section:

```json
"Webkul\\Magento2\\": "packages/Webkul/Magento2/src"
```

## Run the Installation Commands

Run the following commands from your UnoPim project root:

### Dump Composer Autoload

```bash
composer dump-autoload
```

### Install the Magento 2 Package

```bash
php artisan magento-package:install
```

### Clear the Application Cache

```bash
php artisan optimize:clear
```
