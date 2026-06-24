# Author Guide

A **Connection Author** is an admin user who sets up Google Shopping connections and configures the data that flows from UnoPim to Google Merchant Center. The author's work happens once per Merchant Center account (plus occasional updates) and lives entirely under the **Google Shopping** admin menu.

This guide covers four areas:

1. Creating and OAuth-authorizing a connection
2. Configuring Required Settings
3. Mapping Google product fields to UnoPim attributes (Attribute Mapping)
4. Mapping UnoPim categories to Google's taxonomy (Category Mapping)

Once these are in place, a [Job Operator](./operator-guide) can run product exports.

> The **Mapping** sidebar page hosts three tabs — **Attribute Mapping**, **Category Mapping** and **Required Settings**. They are all on one page, not separate sidebar entries.

## Creating and authorizing a connection

### Step 1 — Open the create-connection screen

Navigate to **Google Shopping → Connections** and click **Create Connection**.

### Step 2 — Fill in the form

| Field | What to enter |
|---|---|
| **Name** | A label that identifies this connection in the admin (e.g. `Acme US Store`). |
| **Merchant ID** | Your Google Merchant Center account ID. |
| **Client ID** | The OAuth client's ID, from the Google Cloud Console. |
| **Client Secret** | The OAuth client's secret. |
| **Redirect URI** | The callback URL registered on the OAuth client (must match exactly — see [Configuration](./configuration)). |
| **Active** | Check to make the connection eligible for jobs. |
| **Quick Export Enabled** | Check to show the one-click Quick Export button on the grid and include this connection in real-time product pushes. |

### Step 3 — Authorize with Google (OAuth)

A new connection is only persisted **after** OAuth succeeds. From the connection form (new connection) or the **Connections** grid (existing connection), click **Authorize** / **Re-authorize**:

1. You are redirected to Google's consent screen.
2. Sign in with the Google account that owns the Merchant Center and grant the requested **content** access.
3. Google redirects back to the connector's callback; the access token, refresh token and expiry are stored, and the connection is marked **authenticated**.

Because the flow uses `access_type=offline`, a refresh token is returned, so tokens auto-refresh later without re-prompting.

| Connection state | Meaning |
|---|---|
| **untested** | Created but never authorized. |
| **authenticated** | OAuth succeeded; tokens stored and valid. |
| **token_expired** | The stored token has expired and could not be refreshed — re-authorize. |
| **failed** | Authorization or an API check failed — re-authorize and verify the credentials / redirect URI. |

Re-run authorization after any credential edit.

## Configuring Required Settings

Open **Google Shopping → Mapping → Required Settings**. These values are shared across every connection and supply defaults the exporter needs.

| Setting | Purpose |
|---|---|
| **Target Country** | The Google `targetCountry` for offers (249 options via Symfony Intl). |
| **Content Language** | The Google `contentLanguage` for offers. |
| **Default Channel** | The channel used as the default for one-click / real-time flows. |
| **Default Condition** | Fallback `condition` (`new` / `refurbished` / `used`). |
| **Default Availability** | Fallback `availability` (`in stock` / `out of stock` / `preorder` / `backorder`). |
| **Default Google Category** | A global Google taxonomy entry used as `googleProductCategory` whenever a product has no mapped UnoPim category. Picked through the same async taxonomy dropdown as the Category Mapping tab. |
| **Quick Export Currency** | The currency Quick Export and real-time pushes extract from price attributes. |

Click **Save** to persist. Set the **Default Google Category** and **Quick Export Currency** before relying on Quick Export.

## Attribute Mapping

Open **Google Shopping → Mapping → Attribute Mapping**. This single global page lists Google's ~45 product fields (title, description, link, image links, brand, gtin, mpn, condition, availability, price, salePrice, shipping weight/dimensions, custom labels, …).

For each Google field you want to send:

1. **Pick one or more UnoPim attributes** in the field's multi-select. They form a **fallback chain** — the first non-empty value wins.
2. Or toggle **Use static value** and enter a constant (e.g. `brand = Acme`, `condition = new`, `identifierExists = yes`).

Type-aware coercion is applied automatically — text, booleans, prices (Google `Money` objects), measurements (`{value, unit}`), integers, images (absolutized URLs) and arrays each have a dedicated coerce path.

Click **Save**. Saving **merges** with existing rules, so rules for fields not currently shown in the UI are preserved.

> Do **not** try to map `googleProductCategory` here — it is sourced from the Category Mapping tab and the Required Settings default. Any such rule is ignored at export time.

## Category Mapping

Open **Google Shopping → Mapping → Category Mapping**. This tab maps your UnoPim categories to Google's official taxonomy (~5,500 entries bundled in the package — no runtime fetch).

To add a mapping:

1. In the **UnoPim category** dropdown, search and pick a category (shown as a breadcrumb path).
2. In the **Google taxonomy** dropdown, search and pick the matching Google category (searchable by full path).
3. Click **Add** to append the row.

Repeat for each category you want to map, then click **Save**.

How mappings are used at export time:

- **Deepest-mapped wins** — when a product belongs to several mapped categories, the exporter picks the Google path with the most `" > "` segments.
- **Default fallback** — products with no mapped category use the **Default Google Category** from Required Settings.
- **`productTypes` auto-fallback** — UnoPim categories that have no Google mapping still have their breadcrumb labels sent in Google's `productTypes` field (de-duplicated alongside any admin-mapped values), so category context is never lost.

> **Save is full-sync.** The submitted rows become the new truth — removed rows are deleted. "Remove one row and save" and "remove all and save" both persist correctly.

## Managing multiple connections

From the **Connections** grid you can:

- **Activate / Deactivate** a connection (inactive connections are invisible to job filters).
- **Toggle Quick Export Enabled** to control the one-click button and real-time push eligibility.
- **Edit** to update name, merchant ID, credentials, redirect URI and flags.
- **Delete** a connection.
- View the **History** tab on the edit screen (via the `?history` query parameter) — every change is audited, with credentials and tokens excluded so secrets never appear in audit rows.

## Next steps

With at least one connection authorized, Required Settings saved, and the attribute and category mappings configured, hand the connection name to a Job Operator and follow the [Operator Guide](./operator-guide) to run exports.
