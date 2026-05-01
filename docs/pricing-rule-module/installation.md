# Installation

## Requirements

- Unopim v2.0.0 or higher
- PHP 8.3+, Laravel 12.x

## Steps

### 1. Merge the package files

Unzip the extension package, rename the folder to `PricingRuleModule`, and place it at `packages/Webkul/PricingRuleModule` inside your Unopim project.

### 2. Register the service provider

Add to `bootstrap/providers.php`:

```php
use Webkul\PricingRuleModule\Providers\PricingRuleModuleServiceProvider;

return [
    // ...existing providers...
    PricingRuleModuleServiceProvider::class,
];
```

### 3. Update Composer autoload

In `composer.json`, add under `autoload.psr-4`:

```json
"Webkul\\PricingRuleModule\\": "packages/Webkul/PricingRuleModule/src"
```

### 4. Run installation commands

Run these in order:

```bash
composer dump-autoload
php artisan optimize:clear
php artisan migrate
```

### 5. Build front-end assets

```bash
cd packages/Webkul/PricingRuleModule
npm install
npm run build
```

### 6. Start the queue worker

Rule execution is dispatched as queued jobs (`ApplyPriceRule`, `ApplyPriceRuleToProducts`). Keep a worker running:

```bash
php artisan queue:work
```

### 7. Verify

Open the Unopim admin panel — a **Pricing Rule** entry should appear in the sidebar (icon `icon-custom-price`) and clicking it should open the rule listing page.
