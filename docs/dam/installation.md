# UnoPIM DAM Installation Guide

Digital Asset Management - Installation Documentation

---



## Installation Overview

UnoPIM DAM offers two installation methods to suit your project needs:

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

### Step 2: Run Migrations and Clear Cache

Run the following commands:

```bash
php artisan dam-package:install
php artisan optimize:clear
```

**Installation complete!** Your UnoPIM DAM is now ready to use.

---

## Manual Installation

Manual installation provides more control over the setup process.

### Step 1: Download and Extract

Download and unzip the UnoPIM DAM extension to your computer.

### Step 2: Place Files in Correct Directory

1. Rename the extracted folder to `DAM`
2. Place it in the `packages/Webkul` directory within your project root

Your directory structure should look like:
```
your-project/
├── packages/
│   └── Webkul/
│       └── DAM/

```

### Step 3: Register Service Provider

Open `config/app.php` and add the following provider to the `providers` array:

```php
Webkul\DAM\Providers\DAMServiceProvider::class,
```

### Step 4: Register Autoload Path

Open `composer.json` and add the following entry under the `autoload` > `psr-4` section:

```json
"Webkul\\DAM\\": "packages/Webkul/DAM/src"
```

### Step 5: Complete Installation

Run the following commands in order:

```bash
composer dump-autoload
php artisan optimize:clear
php artisan migrate
php artisan vendor:publish --provider=Webkul\\DAM\\Providers\\DAMServiceProvider
php artisan db:seed --class=Webkul\\DAM\\Database\\Seeders\\DirectoryTableSeeder
```

**Installation complete!** Your UnoPIM DAM is now ready to use.

---

## Post-Installation Setup

### Start the Queue Worker

To start the queue and execute actions such as job operations, run the following command:

```bash
php artisan queue:work
```

### Configure Queue with Process Manager

If the `queue:work` command is configured to run through a process manager like Supervisor, restart the Supervisor service after installing the module to apply the changes:

```bash
sudo service supervisor restart
```

---

**Your UnoPIM DAM installation is complete and ready to use.**