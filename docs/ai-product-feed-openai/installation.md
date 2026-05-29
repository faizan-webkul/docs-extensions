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

> [!NOTE]
> This registers the `OpenAIFeedServiceProvider` in the Laravel service container, allowing it to load routes, views, and other services required by the extension.

### 3. Update Composer autoload

In `composer.json`, add under `autoload.psr-4`:

```json
"Webkul\\OpenAIFeed\\": "packages/Webkul/OpenAIFeed/src"
```

> [!TIP]
> This configures PSR-4 autoloading so PHP can automatically resolve classes under the `Webkul\OpenAIFeed` namespace from the package directory.

### 4. Run the installer

Run these commands in order:

```bash
composer dump-autoload
php artisan migrate
php artisan openai-feed:install
php artisan optimize:clear
```

| Command | Purpose |
|---|---|
| `composer dump-autoload` | Regenerates Composer's autoloader mapping to include the newly added namespace. |
| `php artisan migrate` | Runs the database migrations to create the tables required by the extension. |
| `php artisan openai-feed:install` | Publishes package assets, configuration files, and completes the extension setup. |
| `php artisan optimize:clear` | Clears all cached files (bootstrap, configuration, routes, and views) to load the new changes. |

### 5. Build front-end assets

If icons or UI elements are missing, build the front-end assets from inside the package:

```bash
cd packages/Webkul/OpenAIFeed
npm install && npm run build
```

| Command | Purpose |
|---|---|
| `cd packages/Webkul/OpenAIFeed` | Changes into the OpenAI Feed package directory before running npm commands. |
| `npm install && npm run build` | Installs frontend dependencies and builds OpenAI Feed assets for the admin UI. |

### 6. Start the queue worker

Feed generation runs as a queued job. Make sure a queue worker is running:

```bash
php artisan queue:work --queue=system,completeness,default
```

| Command | Purpose |
|---|---|
| `php artisan queue:work --queue=system,completeness,default` | Starts a queue worker for feed-generation jobs across the listed queues. |

### 7. Verify

Open the Unopim admin panel — an **OpenAI Product Feed** section should appear in the sidebar.
