# Installation

## Requirements

- Unopim v2.0.0 or higher
- PHP 8.2+

## Steps

### 1. Place the package

Download and unzip the extension. Rename the folder to `AutoSkuGenerator` and place it at:

```
packages/Webkul/AutoSkuGenerator/
```

### 2. Register the service provider

Add to `bootstrap/providers.php`:

```php
use Webkul\AutoSkuGenerator\Providers\AutoSkuGeneratorServiceProvider;

return [
    // ...existing providers...
    AutoSkuGeneratorServiceProvider::class,
];
```

### 3. Update Composer autoload

In `composer.json`, add under `autoload.psr-4`:

```json
"Webkul\\AutoSkuGenerator\\": "packages/Webkul/AutoSkuGenerator/src"
```

### 4. Run the installer

Run these commands in order:

```bash
composer dump-autoload
php artisan migrate
php artisan optimize:clear
```

### 5. Publish assets (optional)

If you need to publish views or config files for customization:

```bash
php artisan vendor:publish --provider="Webkul\AutoSkuGenerator\Providers\AutoSkuGeneratorServiceProvider"
```

### 6. Verify

Open the Unopim admin panel — an **Auto SKU Generator** item should appear in the sidebar. Navigate to it to begin configuring your SKU rules.
