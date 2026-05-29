# Installation

This page is for installing the extension. Once it's installed, see [Add CS-Cart credentials](./credentials) to start using it.



## Steps

### 1. Drop the package in place

Unzip the extension and move the package folder into your UnoPim project:

```
packages/Webkul/CsCartConnector/
```

### 2. Add it to composer.json

In your project's root `composer.json`:

```json
"autoload": {
    "psr-4": {
        "Webkul\\CsCartConnector\\": "packages/Webkul/CsCartConnector/src"
    }
}
```

### 3. Register the provider

In `bootstrap/providers.php` (UnoPim 2.0+):

```php
use Webkul\CsCartConnector\Providers\CsCartConnectorServiceProvider;

return [
    // ...
    CsCartConnectorServiceProvider::class,
];
```

> [!NOTE]
> This registers `CsCartConnectorServiceProvider` in Laravel so the connector can bootstrap its services, routes, and package configuration during application startup.

> [!TIP]
> **For UnoPim < 2.0**, add the provider to the `providers` array in `config/app.php` instead:
> ```php
> 'providers' => [
>     // ...
>     Webkul\CsCartConnector\Providers\CsCartConnectorServiceProvider::class,
> ],
> ```

### 4. Run the install command

```bash
composer dump-autoload
php artisan cscart-package:install
php artisan optimize:clear
php artisan queue:restart
```

| Command | Purpose |
|---|---|
| `composer dump-autoload` | Regenerates Composer's autoloader mapping to include the newly added namespace. |
| `php artisan cscart-package:install` | Runs the CS-Cart package installer, including migrations and publish steps. |
| `php artisan optimize:clear` | Clears all cached files (bootstrap, configuration, routes, and views) to load the new changes. |
| `php artisan queue:restart` | Sends a safe restart signal to queue workers so they reload the latest code. |

### 5. Keep a queue worker running

```bash
php artisan queue:work
```

| Command | Purpose |
|---|---|
| `php artisan queue:work` | Starts a queue worker to process CS-Cart import/export jobs in the background. |

In production use Supervisor, systemd, or Horizon - every export and import runs as a background job, so without a worker nothing actually moves.

### 6. Give your role permission

Open **Settings → Roles**, edit the role, and tick the CS-Cart permissions you want them to have:

- **Credentials** - Create / Edit / Delete / Update / Mass Update / Mass Delete CS-Cart credentials.
- **Attribute Mapping** - open and update the attribute mapping.
- **Data Transfer Mappings** - create and delete data transfer mappings.
- **Import from CS-Cart** - run import profiles.
- **Export to CS-Cart** - run export profiles and quick exports.
- **History View** - see the change history for credentials.

<!-- TODO: capture screenshot - cscart-acl.png - CS-Cart permissions in Settings → Roles -->

Without these the menu and buttons stay hidden.

## Check it worked

1. **Menu shows up.** Open the admin panel - a **CS-Cart** menu appears in the sidebar with **Credentials** and **Data Transfer Mappings** under it.
2. **Add a credential works.** Open **CS-Cart → Credentials → Create Credential**, fill the form, and save. If the API key is wrong, you see a clear error.
3. **Export profile shows up.** Open **Data Transfer → Export → Create Export Profile** - **CsCart Categories Export**, **CsCart Attributes Export**, and **CsCart Product Export** appear in the type dropdown.
4. **Import profile shows up.** Open **Data Transfer → Import → Create Import Profile** - **CsCart Attributes Import**, **CsCart Categories Import**, and **CsCart Product Import** appear in the type dropdown.

If any of these don't work, check your credential, queue worker, and CS-Cart configuration again.
