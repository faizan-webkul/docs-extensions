# UnoPim DAM Installation Guide

Digital Asset Management - Installation Documentation

---

## Installation Overview

UnoPim DAM offers two installation methods to suit your project needs:

1. **Composer Installation** - Quick and straightforward setup
2. **Manual Installation** - For custom configurations and direct control

Choose the method that best fits your project setup.

---

## Composer Installation

Composer Installation is the recommended approach for quick setup.

### Step 1: Install the Package

Execute the following command:

```bash
composer require unopim/dam
```

| Command | Purpose |
|---|---|
| `composer require unopim/dam` | Downloads and installs the DAM package and updates Composer dependencies. |

### Step 2: Run the installation command and Clear Cache

Run the following commands:

```bash
php artisan dam-package:install
php artisan optimize:clear
```

| Command | Purpose |
|---|---|
| `php artisan dam-package:install` | Runs the DAM package installer and applies required setup steps. |
| `php artisan optimize:clear` | Clears all cached files (bootstrap, configuration, routes, and views) to load the new changes. |

**Installation complete!** Your UnoPim DAM is now ready to use.

---

## Manual Installation

Installation without Composer

For the source code and latest version, visit the [UnoPim DAM GitHub repository](https://github.com/unopim/unopim-digital-asset-management).

### Step 1: Download and Setup the Extension

1. Download and unzip the extension
2. Rename the folder to `DAM`
3. Place it in the `packages/Webkul` directory within the project's root

### Step 2: Register the Package Provider

Add the following to `bootstrap/providers.php`:

At the top, add the use statement:

```php
use Webkul\DAM\Providers\DAMServiceProvider;
```

In the return array, in the Webkul package service providers section, add:

```php
DAMServiceProvider::class,
```

> [!NOTE]
> This registers `DAMServiceProvider` in Laravel so the module can bootstrap its services, routes, and package configuration during application startup.

### Step 3: Update Autoload Configuration

Register the DAM directory in `composer.json` under `autoload` > `psr-4`:

```json
"Webkul\\DAM\\": "packages/Webkul/DAM/src"
```

### Step 4: Run Installation Commands

Execute these commands to complete the installation:

```bash
composer dump-autoload
php artisan optimize:clear
php artisan migrate
php artisan vendor:publish --provider=Webkul\\DAM\\Providers\\DAMServiceProvider
php artisan db:seed --class=Webkul\\DAM\\Database\\Seeders\\DirectoryTableSeeder
```

| Command | Purpose |
|---|---|
| `composer dump-autoload` | Regenerates Composer's autoloader mapping to include the newly added namespace. |
| `php artisan optimize:clear` | Clears all cached files (bootstrap, configuration, routes, and views) to load the new changes. |
| `php artisan migrate` | Runs pending database migrations required by the DAM package. |
| `php artisan vendor:publish --provider=Webkul\\DAM\\Providers\\DAMServiceProvider` | Publishes DAM package resources and configuration files. |
| `php artisan db:seed --class=Webkul\\DAM\\Database\\Seeders\\DirectoryTableSeeder` | Seeds initial DAM directory data required by the module. |

### Step 5: Enable Queue Operations

Start the queue to execute actions, such as job operations, by running the following command:

```bash
php artisan queue:work
```

| Command | Purpose |
|---|---|
| `php artisan queue:work` | Starts a queue worker to process DAM background jobs. |

If the `queue:work` command is managed by a process manager like Supervisor, restart the relevant service after installing the module to apply the changes:

```bash
sudo supervisorctl restart unopim-worker
```

| Command | Purpose |
|---|---|
| `sudo supervisorctl restart unopim-worker` | Restarts the Supervisor-managed worker so it loads newly installed DAM code. |

**Installation complete!** Your UnoPim DAM is now ready to use.

---

## Post-Installation Setup

### Start the Queue Worker

To start the queue and execute actions such as job operations, run the following command:

```bash
php artisan queue:work
```

| Command | Purpose |
|---|---|
| `php artisan queue:work` | Starts a queue worker to process DAM background jobs. |

### Configure Queue with Process Manager

If the `queue:work` command is configured to run through a process manager like Supervisor, restart the Supervisor service after installing the module to apply the changes:

```bash
sudo service supervisor restart
```

| Command | Purpose |
|---|---|
| `sudo service supervisor restart` | Restarts Supervisor and its managed queue workers. |

---

**Your UnoPim DAM installation is complete and ready to use.**