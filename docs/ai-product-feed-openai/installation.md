# Installation

## Steps

### 1. Place the package

Copy the package into your Unopim project:

```
packages/Webkul/OpenAIFeed/
```

### 2. Register the service provider

Add to `bootstrap/providers.php`:

```php
use Webkul\OpenAIFeed\Providers\OpenAIFeedServiceProvider;

return [
    // ...existing providers...
    OpenAIFeedServiceProvider::class,
];
```

### 3. Update Composer autoload

In `composer.json`, add under `autoload.psr-4`:

```json
"Webkul\\OpenAIFeed\\": "packages/Webkul/OpenAIFeed/src"
```

### 4. Run the installer

Run these commands in order:

```bash
composer dump-autoload
php artisan migrate
php artisan openai-feed:install
php artisan optimize:clear
```

### 5. Build front-end assets

If icons or UI elements are missing, build the front-end assets from inside the package:

```bash
cd packages/Webkul/OpenAIFeed
npm install && npm run build
```

### 6. Start the queue worker

Feed generation runs as a queued job. Make sure a queue worker is running:

```bash
php artisan queue:work --queue=system,completeness,default
```

### 7. Verify

Open the Unopim admin panel — an **OpenAI Product Feed** section should appear in the sidebar.
