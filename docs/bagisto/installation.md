# Installation

Follow the steps below to install the UnoPim Bagisto Connector. Choose the installation method that best fits your setup — we recommend the Composer method for most users.

## Option 1: Installation with Composer (Recommended)

The simplest and most efficient way to install the UnoPim Bagisto Connector is using Composer. This method automatically handles all dependencies and configuration.

### Step 1 — Install via Composer

Run the following command in your UnoPim project root directory:

```bash
composer require unopim/bagisto-connector
```

This command downloads and installs the UnoPim Bagisto Connector package along with all required dependencies.

### Step 2 — Run Setup Commands

Execute the following commands in order to complete the installation:

```bash
php artisan migrate
php artisan vendor:publish --tag=unopim-bagisto-connector
php artisan optimize:clear
```

Here's what each command does:

| Command | What it does |
|---|---|
| `php artisan migrate` | Runs database migrations to set up necessary tables |
| `php artisan vendor:publish --tag=unopim-bagisto-connector` | Publishes configuration files and assets for the connector |
| `php artisan optimize:clear` | Clears the application cache to reflect new changes |

### Step 3 — Enable Queue Operations

The Bagisto Connector uses queued jobs for background operations like product exports. Start the queue worker by running:

```bash
php artisan queue:work --queue=default,system,completeness
```

This command starts the worker and monitors the `default`, `system`, and `completeness` queues for new jobs. Keep this process running in the background.

For production environments, it's recommended to use a process manager like Supervisor to manage the queue worker continuously.

---

## Option 2: Local Package Installation (Development & Forking)

Use this installation method only if you need to load the package from your local `packages/` directory. This is ideal for development work, debugging, or when forking the connector for customization.

### Step 1 — Place the Package Locally

1. Download and extract the Bagisto Connector package
2. Rename the extracted folder to `Bagisto`
3. Move the `Bagisto` folder into the `packages/Webkul/` directory of your UnoPim 2.0 project

Your final path should be:
```
packages/Webkul/Bagisto/
```

### Step 2 — Register the Namespace in Composer

Open your project's `composer.json` file and add the package namespace under the `autoload.psr-4` section:

```json
"autoload": {
    "psr-4": {
        "Webkul\\Bagisto\\": "packages/Webkul/Bagisto/src"
    }
}
```

### Step 3 — Register the Service Provider

UnoPim 2.0 uses the Laravel 12+ bootstrap structure for service providers.

Open `bootstrap/providers.php` and add the Bagisto service provider to the returned array:

```php
<?php

return [
    // ...other providers,
    Webkul\Bagisto\Providers\BagistoServiceProvider::class,
];
```

### Step 4 — Choose Your Setup Method

You have two options to complete the installation:

#### **Option A: Quick Setup with Installer Command (Recommended)**

This single command handles all setup steps automatically:

```bash
composer dump-autoload
php artisan bagisto-package:install
php artisan optimize:clear
```

The installer will run database migrations, publish configuration files, and clear the cache.

#### **Option B: Manual Setup (Fine-Grained Control)**

If you prefer to run each step individually, execute these commands:

```bash
composer dump-autoload
php artisan migrate
php artisan vendor:publish --tag=unopim-bagisto-connector
php artisan optimize:clear
```

Here's what each command does:

| Command | What it does |
|---|---|
| `composer dump-autoload` | Refreshes the Composer autoloader to recognize the new package |
| `php artisan migrate` | Runs database migrations to set up necessary tables |
| `php artisan vendor:publish --tag=unopim-bagisto-connector` | Publishes configuration files and assets for the connector |
| `php artisan optimize:clear` | Clears the application cache to reflect new changes |

### Step 5 — (Optional) Install as a Path Repository

If you want to keep the package in `packages/Webkul/Bagisto/` but still use Composer for automatic provider discovery, register it as a path repository:

```bash
composer config repositories.bagisto '{"type":"path","url":"packages/Webkul/Bagisto","options":{"symlink":true}}' --json
composer require unopim/bagisto-connector:"*@dev"
```

Then run the setup commands from **Step 4** above.

---

## Configure Queue for Production

The Bagisto Connector dispatches background jobs to Laravel queues for efficient processing. Ensure a queue worker is running:

```bash
php artisan queue:work --queue=default,system,completeness
```

This command starts the worker and monitors the `default`, `system`, and `completeness` queues for new jobs.

For production environments, configure the queue to run continuously using a process manager like Supervisor.

After upgrading the connector, restart your process manager to load the new code:

```bash
sudo service supervisor restart
```

This ensures all background tasks have access to the latest connector updates.

---

## Verify the Installation

Once all steps are complete, log in to your UnoPim dashboard. The Bagisto Connector should now be active and ready to use. You can begin:

- Configuring your Bagisto store connection
- Setting up product export mappings
- Exporting categories, attributes, and products

