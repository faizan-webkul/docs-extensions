# Installation

## Requirements

- Unopim v2.0.0 or higher
- PHP 8.3+, Laravel 12.x

## Steps

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

### 5. Build front-end assets

```bash
npm install
npm run build
```

### 6. Start the queue worker

Email notifications are dispatched as queued jobs. Keep a worker running:

```bash
php artisan queue:work
```

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
