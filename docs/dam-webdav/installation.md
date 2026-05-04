# Installation

The DAM NextCloud extension is shipped as a `.zip` after purchase. Install it manually as below.

## 1. Extract the package

Unzip the downloaded archive into your UnoPim project's `packages/` directory:

```bash
cd /path/to/your/unopim
unzip ~/Downloads/dam-webdav.zip -d packages/Webkul/DamWebdav
```

You should end up with `packages/Webkul/DamWebdav/{src,composer.json,...}`.

## 2. Register the autoloader

Open the project's root `composer.json` and add the package's `psr-4` namespace under `autoload.psr-4`:

```jsonc
{
    "autoload": {
        "psr-4": {
            "Webkul\\DamWebdav\\": "packages/Webkul/DamWebdav/src/"
        }
    }
}
```

Then refresh the autoload map:

```bash
composer dump-autoload
```

## 3. Register the service provider

Open `bootstrap/providers.php` (Laravel 12) or `config/app.php` (older) and add:

```php
Webkul\DamWebdav\Providers\DamWebdavServiceProvider::class,
```

## 4. Run migrations

```bash
php artisan migrate
```

This creates the `dam_webdav_*` tables (credentials, sync profiles, sync events, remote sources, trash).

## 5. Publish & adjust config

```bash
php artisan vendor:publish --tag=dam-webdav-config
```

Edit `config/dam_webdav.php`:

| Key | Default | Purpose |
|---|---|---|
| `base_path` | `/webdav/dam` | Internal WebDAV mount path. |
| `lock_ttl` | `300` (sec) | How long a `LOCK` is held by a client. |
| `trash_retention_days` | `30` | Soft-delete retention before automatic purge. |
| `nc_flow.enabled` | `true` | Enable Nextcloud login-flow-v2 endpoints. |
| `nc_flow.session_ttl` | `1200` (sec) | Login-flow token lifetime. |

## 6. nginx — pass WebDAV verbs through

Vanilla nginx blocks `PROPFIND` and friends. Add to your server block:

```nginx
location ~ \.php$ {
    fastcgi_pass   php-fpm;
    fastcgi_index  index.php;
    fastcgi_param  REQUEST_METHOD $request_method;
    include        fastcgi_params;
}

# Forward Nextcloud-style paths to Laravel's front controller
location ~ ^/(remote\.php|index\.php|status\.php|ocs)/ {
    try_files $uri /index.php?$query_string;
}

# Disable nginx's WebDAV module — Laravel handles WebDAV itself
dav_methods off;
```

The package registers the verbs `PROPFIND PROPPATCH MKCOL COPY MOVE LOCK UNLOCK REPORT SEARCH` with the router, so they hit your controllers normally.

## 7. Clear caches & rebuild assets

```bash
php artisan route:clear
php artisan config:clear
php artisan cache:clear
npm run build
```

## 8. Verify

Hit the status endpoint:

```bash
curl -i http://your-unopim-host/status.php
```

Expected: `HTTP/1.1 200 OK` with a JSON body containing `productname` and `version`.

Now sign in to the admin panel — a new **Nextcloud** menu item appears in the sidebar.
