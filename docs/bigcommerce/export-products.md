# Export products

Push **simple products** from UnoPim to BigCommerce — with attribute values, prices, stock, statuses, custom fields, and images.

For configurable products with variants, use [Export configurable products](./export-product-models).

> **Before you start.** Add a [BigCommerce credential](./credentials), configure [Standard mapping](./standard-mapping) (at minimum *Name*, *SKU*, *Price*, *Weight*), and run [Export categories](./export-categories) so the categories the products reference already exist in BigCommerce.

**Open it from:** *Data Transfer → Export → + Create Export Profile*

<!-- TODO: capture screenshot — bigcommerce-export-products.png — Create export profile for products -->

## Steps

### 1. Create the profile

1. Open **Data Transfer → Export → + Create Export Profile**.
2. **Type** — pick **Export Products to BigCommerce**.
3. **Code** — e.g. `bigcommerce_products_daily`.
4. Click **Save**.

### 2. Fill the filter

| Filter | Required | What it does |
|--|--|--|
| **Credential** | ✓ | Which BigCommerce store to push to. Only **active** credentials appear. |

Click **Save**.

### 3. Run it

Open the profile and click **Start Export**. Watch the run on [Tracker](./tracker).

## What gets pushed

For every UnoPim simple product the job:

1. Maps UnoPim attribute values to BigCommerce standard fields via your [Standard mapping](./standard-mapping).
2. Adds any [Custom fields](./custom-mapping) that have a value on the product.
3. Sets the **categories** the product belongs to (using [Category mapping](./other-mapping#category-mapping) where configured, code matching otherwise).
4. Pushes **images** — main image + gallery.
5. Sets **price**, **weight**, **inventory tracking**, **visibility**.

Products already in BigCommerce are matched by **SKU** and updated in place. No duplicates are created.

## Validation errors before the job starts

The export validator checks these before queueing:

- The credential is active and reachable.
- Required [Standard mappings](./standard-mapping) are filled in (Name, SKU, Price).
- Any UnoPim attribute referenced by a mapping still exists.

If anything fails, the profile shows a red banner — fix it and try again. Nothing is sent to BigCommerce until validation passes.

## Notes

- The job is idempotent — running it again only writes what has changed. Already-current products are detected via SKU and updated only where values changed.
- Each row in [Tracker](./tracker) shows a counter — *X of Y products updated*.
- A failed product doesn't stop the job — it's logged and the run continues with the next product.
- Images are uploaded directly to BigCommerce — your UnoPim doesn't need to be publicly reachable. The connector reads the file content and sends it as multipart form data.
