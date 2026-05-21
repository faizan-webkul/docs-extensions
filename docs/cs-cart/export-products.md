# Export products

Push UnoPim products — with attribute values, prices, stock, statuses, and images — to CS-Cart.

> **Before you start.** Add a [CS-Cart credential](./credentials), [map locales](./locale-mapping), [map attributes](./attribute-mapping), and run [Export attributes](./export-attributes) and [Export categories](./export-categories) at least once so CS-Cart has the features and categories the products reference.

**Open it from:** *Data Transfer → Export → + Create Export Profile*

<!-- TODO: capture screenshot — cscart-export-products-profile.png — Create export profile for products -->

## Steps

### 1. Create the profile

1. Open **Data Transfer → Export → + Create Export Profile**.
2. **Type** — pick **CsCart Product Export**.
3. **Code** — e.g. `cscart_products_full`.
4. Click **Save**.

### 2. Fill the filters

| Filter | Required | What it does |
|--|--|--|
| **Credential** | ✓ | Which CS-Cart store to export to. |
| **Store** | ✓ | The target CS-Cart storefront. |
| **Channel** | ✓ | UnoPim channel whose product values are exported. |
| **Locale** | ✓ | One or more UnoPim locales — must all be mapped. |
| **Currency** | ✓ | Which UnoPim currency the price is read from. |
| **Product SKU** | — | Optional. Pick specific SKUs to export. Leave empty to export everything in the channel. |
| **With media** | — | When on, product images are pushed to CS-Cart too. |

Click **Save**.

### 3. Run it

Open the profile and click **Start Export**. Watch the run on [Tracker](./tracker).

## What gets pushed

For every product the job:

1. Maps UnoPim attribute values to CS-Cart fields using your [Attribute Mapping](./attribute-mapping).
2. Pushes name, description, price, stock, statuses, and any extra mapped attributes.
3. **Variants** — for configurable products, creates one CS-Cart product per variant with the variation axis tied to the parent.
4. **Images** — if **With media** is on, sends each product image URL to CS-Cart for download.

Products already in CS-Cart are matched by SKU and updated in place.

## Media requirements

> [!IMPORTANT]
> CS-Cart downloads the images from your UnoPim instance. UnoPim **must be reachable** from CS-Cart's server over the public internet. `localhost`, `127.0.0.1`, and private IPs will not work — the image will fail to download and the product will export without images.

If your UnoPim isn't public, consider:

- Hosting UnoPim behind a public URL and an HTTPS reverse proxy, or
- Using a tunnel service (ngrok, Cloudflare Tunnel) for a one-off sync.

## Validation errors before the job starts

The job validator checks these before queueing:

- Every selected locale is mapped (see [Map locales](./locale-mapping)).
- Required attribute mappings exist (Product Code, Name, Price, Quantity Amount).
- The credential is reachable.

If any check fails the profile shows a red banner — fix it and try again. Nothing is sent to CS-Cart until validation passes.

## Notes

- Re-running the export only changes what's different — already-current products are detected via SKU and updated only where values changed.
- Each row in [Tracker](./tracker) shows a counter — *X of Y products updated*.
- A failed product doesn't stop the job — it's logged in `storage/logs/laravel.log` and the run continues.
