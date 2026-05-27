# Installation

### 1. Merge the package files

Unzip the extension package and merge the `packages/` folder into your Unopim project root.

### 2. Register the service provider

Add to `bootstrap/providers.php`:

```php
use Webkul\MakerChecker\Providers\MakerCheckerServiceProvider;

return [
    // ...existing providers...
    MakerCheckerServiceProvider::class,
];
```

> [!NOTE]
> This registers `MakerCheckerServiceProvider` in Laravel so the module can bootstrap its services, workflow bindings, and package configuration during application startup.

### 3. Update Composer autoload

In `composer.json`, add under `autoload.psr-4`:

```json
"Webkul\\MakerChecker\\": "packages/Webkul/MakerChecker/src"
```

### 4. Run installation commands

Run these in order:

```bash
composer dump-autoload
php artisan optimize:clear
php artisan migrate
php artisan vendor:publish --provider="Webkul\MakerChecker\Providers\MakerCheckerServiceProvider"
php artisan db:seed --class="Webkul\MakerChecker\Database\Seeders\MakerCheckerStagesSeeder"
```

Command purpose:

- `composer dump-autoload`: Regenerates Composer's autoloader mapping to include the newly added namespace.
- `php artisan optimize:clear`: Clears all cached files (bootstrap, configuration, routes, and views) to load the new changes.
- `php artisan migrate`: Runs pending database migrations required by the package.
- `php artisan vendor:publish --provider="Webkul\MakerChecker\Providers\MakerCheckerServiceProvider"`: Publishes Maker Checker package resources and configuration.
- `php artisan db:seed --class="Webkul\MakerChecker\Database\Seeders\MakerCheckerStagesSeeder"`: Seeds default Maker Checker workflow stages into the database.

### 5. Build front-end assets

```bash
npm install
npm run build
```

| Command | Purpose |
|---|---|
| `npm install` | Installs frontend dependencies required by the Maker Checker package UI. |
| `npm run build` | Builds Maker Checker frontend assets for production/admin usage. |

### 6. Start the queue worker

Email notifications are dispatched as queued jobs. Keep a worker running:

```bash
php artisan queue:work
```

| Command | Purpose |
|---|---|
| `php artisan queue:work` | Starts a queue worker to process Maker Checker background jobs (including notifications). |

### 7. Configure email notifications

Add your mail settings to `.env`:

```bash
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
```

### 8. Verify

Open the Unopim admin panel — a **Maker Checker** section should appear in the sidebar with **Approval Requests** and **Configuration** links.
