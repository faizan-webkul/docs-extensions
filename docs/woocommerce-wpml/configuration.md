# Configuration

The WooCommerce WPML add-on does **not** introduce its own admin page, settings UI, or ACL keys. Configuration is split across three places:

1. **WPML on WordPress** — the source of truth for which languages exist.
2. **The Unopim WooCommerce connector** — credentials, channel ↔ locale mapping, attribute mapping.
3. **Job-level settings** — the locales you pick on each export/import job decide what the add-on transfers.

This page covers each layer. Day-to-day usage is documented in the [Operator Guide](./operator-guide).

## 1. WPML on WordPress

Before Unopim can push translations, WPML itself must be set up:

1. Install and activate the **WPML Multilingual CMS** plugin in WordPress.
2. Activate the WPML add-ons your store needs:
   - **WPML String Translation** — for translating attribute labels, option values, and other strings.
   - **WPML Media Translation** — if you translate image alt text or attached media.
   - **WooCommerce Multilingual & Multicurrency** — required for translating WooCommerce content.
3. Open **WPML → Languages** and:
   - Pick a **default language** (this is the language Unopim will treat as the "original" entity).
   - Add one or more **secondary languages**.
4. Note the WPML **language code** for each entry (`en`, `de`, `fr`, `es`, etc.) — you will map them to Unopim locales next.

::: warning
Add every secondary language in WPML **before** running any export from Unopim. Running an export against a locale that does not yet exist as a WPML language causes the WooCommerce API to reject the request.
:::

## 2. The Unopim WooCommerce connector

The add-on rides on top of the existing connector configuration. There is nothing new to fill in inside the WPML add-on itself — every setting lives under the WooCommerce module:

### Credentials

Open **WooCommerce → Credentials** and confirm:

- The credential pointing at your WPML-enabled WooCommerce store has the **Consumer Key**, **Consumer Secret**, and base API URL filled in.
- The credential is **active** (its connection test succeeds).

### Channel & locale mapping

Inside the credential's mapping section, map each Unopim locale you intend to translate into to the WPML language code on the WooCommerce side. Examples:

| Unopim locale | WPML language code |
|---|---|
| `en_US` | `en` |
| `de_DE` | `de` |
| `fr_FR` | `fr` |
| `es_ES` | `es` |

If a Unopim locale is missing from the mapping, exports to that locale silently skip — the add-on relies on this mapping to decide which API endpoint to hit per language.

### Attribute mapping

If your store uses WooCommerce **global attributes** with translated labels, configure the WooCommerce add-on's attribute mapping so each Unopim attribute resolves to the correct WooCommerce attribute. WPML translations are pushed against those attribute IDs.

## 3. Permissions

The add-on ships with an empty ACL config — it does **not** define its own permissions. Access is controlled entirely by the WooCommerce module's permissions and Unopim's standard Data Transfer permissions:

| Capability needed | Permission source |
|---|---|
| Manage WooCommerce credentials & mappings | WooCommerce module |
| Create / run import / export jobs | Standard Data Transfer module |
| View job history & logs | Standard Data Transfer module |

Grant the relevant role those permissions and the add-on's multi-locale features become available automatically.

## 4. Queue worker

Both export and import are queued. A worker must be active for the add-on to make any progress:

```bash
php artisan queue:work
```

Restart workers after every code update:

```bash
php artisan queue:restart
```

In production, run the worker under a process supervisor (Supervisor, systemd) so a worker crash does not silently halt all transfers.

## 5. Where translations are stored on the Unopim side

Each translated row written by an export run is recorded in `wk_wpml_data_mapping`:

- `entityType`, `code` — what was translated
- `relatedLanguage`, `langLabel` — the WPML language
- `externalId`, `relatedId` — the WooCommerce IDs returned for the translation and its original
- `jobInstanceId`, `apiUrl` — provenance for debugging

You normally don't touch this table directly, but it is useful for support: if a translation looks wrong on the storefront, look up the row to confirm Unopim sent it to the correct WooCommerce entity.
