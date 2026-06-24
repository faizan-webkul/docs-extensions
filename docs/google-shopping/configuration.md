# Configuration

The Google Shopping Connector does not have a dedicated `.env`-driven settings page. Configuration is split between:

1. **Google side** — the Merchant Center account and the Google Cloud OAuth client your UnoPim connection authenticates as.
2. **Package config** — OAuth URLs, API timeouts/retries and per-admin throttle limits in `config/google-shopping.php`.
3. **Required Settings** — the in-admin defaults (country, language, channel, condition, availability, default Google category) edited on the Mapping page.
4. **Permissions** — ACL keys assigned to admin roles.
5. **Standard Data Transfer settings** — queue, file size and storage settings already configured for UnoPim's export pipeline.

Day-to-day connection editing and the Required Settings tab are documented in the [Author Guide](./author-guide). Running jobs is documented in the [Operator Guide](./operator-guide).

## Google prerequisites

Before you can create and authorize a connection in UnoPim, prepare the following:

1. A **Google Merchant Center** account with API access enabled. Note its **Merchant ID**.
2. A project in the [Google Cloud Console](https://console.cloud.google.com) with the **Content API for Shopping** enabled.
3. An **OAuth 2.0 Client** (type *Web application*) under **APIs & Services → Credentials**. Note the **Client ID** and **Client Secret**.
4. An authorized **redirect URI** on that OAuth client that matches the connector's callback route:

   ```
   https://<your-unopim-host>/<admin-url>/google-shopping/oauth/callback
   ```

   Replace `<admin-url>` with your `app.admin_url` value (for example `admin`).
5. The OAuth client must be allowed the **content** scope (`https://www.googleapis.com/auth/content`). The connector requests this automatically during authorization.

## Package configuration

The connector reads its settings from `packages/Webkul/GoogleShopping/src/Config/google-shopping.php`. These values are sensible defaults for human use; tune them in that file if needed.

### OAuth

| Key | Default | Purpose |
|---|---|---|
| `oauth.authorize_url` | `https://accounts.google.com/o/oauth2/v2/auth` | Google's consent screen URL. |
| `oauth.token_url` | `https://oauth2.googleapis.com/token` | Token exchange / refresh endpoint. |
| `oauth.revoke_url` | `https://oauth2.googleapis.com/revoke` | Token revoke endpoint. |
| `oauth.scope` | `https://www.googleapis.com/auth/content` | The Content API scope requested at authorization. |
| `oauth.token_refresh_buffer_seconds` | `300` | Seconds before token expiry at which a pre-emptive refresh is triggered. |

The authorization-code flow is run with `access_type=offline` and `prompt=consent`, so Google returns a **refresh token** on every authorization. Access tokens then auto-refresh ahead of expiry, and a one-shot 401 retry catches edge cases where Google rotates a token mid-request.

### API

| Key | Default | Purpose |
|---|---|---|
| `api.base_url` | `https://shoppingcontent.googleapis.com/content/v2.1/` | Content API base URL. |
| `api.timeout` | `60` | Per-request timeout in seconds. |
| `api.retry_attempts` | `3` | How many times a failed request is retried. |
| `api.retry_delay_ms` | `1000` | Delay between retries, in milliseconds. |

### Throttle

Per-admin rate limits (Laravel `throttle:<max>,<minutes>` syntax) on routes that hit Google or trigger heavy work:

| Key | Default | Applies to |
|---|---|---|
| `throttle.quick_export` | `30,1` | Quick Export button (max 30/minute per admin). |
| `throttle.oauth_start` | `20,1` | Starting / redirecting an OAuth authorization (max 20/minute per admin). |

### Taxonomy and defaults

- `taxonomy_file` — path to the bundled Google taxonomy text file (~5,500 entries). Tests override this to a small fixture.
- `attribute_fields` — the ~45 Google product fields exposed on the Attribute Mapping tab, each with label, code, multi-select flag and type hint.
- `default_attribute_mappings` — the mapping rules seeded into the singleton on first install (title→name, description→description, price→price, plus static `availability=in stock`, `condition=new`, `identifierExists=yes`).
- `default_required_settings` — the Required Settings singleton defaults (target country `US`, content language `en`, default channel `online`, condition `new`, availability `in stock`).

> `googleProductCategory` is **not** an attribute-mapping field. It is sourced exclusively from the **Category Mapping** table plus the **Required Settings** default — any stale `googleProductCategory` rule left in the attribute-mapping JSON is ignored at export time.

## Permissions

The connector registers these ACL keys (defined in `packages/Webkul/GoogleShopping/src/Config/acl.php`):

| Permission key | Granted action |
|---|---|
| `google-shopping` | Top-level menu access. |
| `google-shopping.connections` | View the Connections grid. |
| `google-shopping.connections.create` | Create a connection. |
| `google-shopping.connections.edit` | Edit an existing connection. |
| `google-shopping.connections.delete` | Delete a connection. |
| `google-shopping.connections.quick-export` | Trigger Quick Export on a connection. |
| `google-shopping.connections.oauth` | Start / redirect / complete the OAuth authorization flow. |
| `google-shopping.mapping` | Open the Mapping page. |
| `google-shopping.mapping.edit` | Edit the Mapping page. |
| `google-shopping.mapping.attribute-update` | Save the Attribute Mapping tab. |
| `google-shopping.mapping.category-update` | Save the Category Mapping tab (and run its taxonomy / category searches). |
| `google-shopping.mapping.settings-update` | Save the Required Settings tab. |

A typical split:

- A **Connection Author** role needs all of the above.
- A **Job Operator** role needs none of them directly — they run jobs through Data Transfer, which has its own permissions — but they may be granted `google-shopping.connections` (read-only) so they can see which connections are available, and `google-shopping.connections.quick-export` if they should be able to use the Quick Export button.

To grant permissions:

1. Go to **Settings → Roles** and open or create the relevant role.
2. Enable the required permissions under **Google Shopping**.
3. Assign the role to the admin user.

## Queue worker

Export jobs are dispatched on UnoPim's default queue connection; real-time single-product pushes run on the dedicated `google-shopping-realtime` queue. Keep workers running with `php artisan queue:work` (and `--queue=google-shopping-realtime` for real-time pushes). In production, run dedicated supervised workers so Google Shopping batches do not contend with other Data Transfer jobs.
