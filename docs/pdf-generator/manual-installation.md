#  Installation

Use the following steps to manually install the UnoPim PDF Template extension in your project.

## 1. Download and Place the Extension

1. Download the extension package and extract the ZIP file.
2. Rename the extracted folder to `PdfTemplate`.
3. Move the folder to the `packages/Webkul` directory in your UnoPim project.

After this step, the package path should look like this:

```text
packages/Webkul/PdfTemplate
```

## 2. Register the Package Provider

Open `bootstrap/providers.php` in your UnoPim project and register the service provider.

Add this import:

```php
use Webkul\PdfTemplate\Providers\PdfTemplateServiceProvider;
```

Then add the provider class inside the providers array:

```php
PdfTemplateServiceProvider::class,
```

> [!NOTE]
> This registers `PdfTemplateServiceProvider` in Laravel so the extension can bootstrap its services, routes, and package configuration during application startup.

## 3. Update Composer Autoload

Open `composer.json` and register the `PdfTemplate` namespace under `autoload.psr-4`:

```json
"Webkul\\PdfTemplate\\": "packages/Webkul/PdfTemplate/src"
```

## 4. Run the Installation Commands

Run the following commands from the project root to complete the package setup:

```bash
composer dump-autoload
php artisan optimize:clear
php artisan migrate
php artisan vendor:publish --provider=Webkul\\PdfTemplate\\Providers\\PdfTemplateServiceProvider
```

| Command | Purpose |
|---|---|
| `composer dump-autoload` | Regenerates Composer's autoloader mapping to include the newly added namespace. |
| `php artisan optimize:clear` | Clears all cached files (bootstrap, configuration, routes, and views) to load the new changes. |
| `php artisan migrate` | Runs pending database migrations required by the package. |
| `php artisan vendor:publish --provider=Webkul\\PdfTemplate\\Providers\\PdfTemplateServiceProvider` | Publishes package assets and configuration files to the application. |

## 5. Start Queue Processing

Start the queue worker so the package can handle directory-related background operations:

```bash
php artisan queue:work
```

| Command | Purpose |
|---|---|
| `php artisan queue:work` | Starts a queue worker to process PDF Template background jobs. |

## Notes

- Run all commands from the root directory of your UnoPim project.
- Confirm that the package folder name is exactly `PdfTemplate`, because the namespace and autoload mapping depend on it.
- If the package does not appear after installation, run `php artisan optimize:clear` again and verify that the provider and Composer namespace were added correctly.
