# Configuration

The Commercetools Connector does not have a dedicated settings page. Configuration is split between:

1. **commercetools side** — the API client your UnoPim connection authenticates as.
2. **`.env` variables** — API timeouts, retry counts and the OAuth token refresh buffer.
3. **Permissions** — ACL keys assigned to admin roles.
4. **Standard Data Transfer settings** — queue, file size and storage settings already configured for Unopim's import/export pipeline.

Day-to-day connection editing is documented in the [Author Guide](./author-guide). Running jobs is documented in the [Operator Guide](./operator-guide).

## commercetools project prerequisites

Before you can create a connection in UnoPim, prepare the following in the [commercetools Merchant Center](https://mc.commercetools.com):

1. A **project**. You'll need the **project key** as shown in the Merchant Center URL or project settings.
2. An **API client** under **Settings → Developer settings → API Clients → Create new API client**. Note the **Client ID** and **Client Secret** — the secret is only shown once at creation time.
3. **OAuth scopes** for the API client. The connector defaults to `manage_project` if you leave the Scopes field blank. For tighter access, grant the project-scoped scopes the connector needs — `view_products`, `manage_products`, `view_categories`, `manage_categories`, `view_product_types`, `manage_product_types` — adjusted to which directions (export only, import only, or both) you intend to use.
4. The **region** of the project (e.g. `europe-west1.gcp`, `us-central1.gcp`). The connector builds the API and auth hosts from this value using the templates configured in `config/commercetools.php`.

## Environment variables

The connector reads these values from `packages/Webkul/Commercetools/src/Config/commercetools.php`, which falls back to `.env` overrides. Defaults are shown in parentheses.

| Variable | Default | Purpose |
|---|---|---|
| `COMMERCETOOLS_ENABLED` | `true` | Master switch. Set to `false` to disable the connector without uninstalling it. |
| `COMMERCETOOLS_API_TIMEOUT` | `30` | Per-request timeout in seconds. |
| `COMMERCETOOLS_API_RETRIES` | `3` | How many times a failed connection-level request is retried. |
| `COMMERCETOOLS_API_RETRY_DELAY_MS` | `1000` | Delay between retries, in milliseconds. |
| `COMMERCETOOLS_API_URL_TEMPLATE` | `https://api.{region}.commercetools.com` | API host template. The `{region}` placeholder is filled from the connection. |
| `COMMERCETOOLS_TOKEN_REFRESH_BUFFER` | `600` | Seconds before token expiry at which a refresh is triggered. |
| `COMMERCETOOLS_AUTH_URL_TEMPLATE` | `https://auth.{region}.commercetools.com` | OAuth host template, same `{region}` substitution as above. |

The config file also defines:

- `image_disks` — filesystem disks searched for product images, in priority order (default `['public', 's3']`).
- `signed_url_disks` and `signed_url_ttl` — disks whose URLs are issued as temporary signed URLs (TTL in seconds, default 3600). Leave `signed_url_disks` empty if your buckets are publicly readable.

## Permissions

The connector registers these ACL keys (defined in `packages/Webkul/Commercetools/src/Config/acl.php`):

| Permission key | Granted action |
|---|---|
| `commercetools.connections` | View the Connections grid. |
| `commercetools.connections.create` | Create a connection. |
| `commercetools.connections.edit` | Edit an existing connection. |
| `commercetools.connections.delete` | Delete a single connection. |
| `commercetools.connections.massdelete` | Bulk-delete connections. |
| `commercetools.connections.massupdate` | Bulk activate / deactivate connections. |
| `commercetools.connections.test` | Run the **Test Connection** check. |
| `commercetools.connections.product-types.import` | Import product types from commercetools into UnoPim attribute families. |
| `commercetools.connections.categories.import` | Import the commercetools category tree into UnoPim. |
| `commercetools.connections.system-fields-mapping.update` | Save the system-fields mapping on a connection. |
| `commercetools.connections.options` | Load the connections list used to fill select fields elsewhere in the admin. |

A typical split:

- A **Connection Author** role needs all eleven keys.
- A **Job Operator** role needs none of the above — they run jobs through Data Transfer, which has its own permissions — but they may also be granted `commercetools.connections` (read-only) so they can see which connections are available.

To grant permissions:

1. Go to **Settings → Roles** and open or create the relevant role.
2. Enable the required permissions under **Commercetools → Connections**.
3. Assign the role to the admin user.

## Queue worker

Export and import jobs are dispatched on Unopim's default queue connection. Keep a worker running with `php artisan queue:work`. In production, run a dedicated supervised worker (or a dedicated queue connection) so commercetools batches do not contend with other Data Transfer jobs.
