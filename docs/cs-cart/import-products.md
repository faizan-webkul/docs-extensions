# Import products

Pull CS-Cart products into UnoPim so you can enrich them — better descriptions, more locales, richer attributes — and push them back out later.

> **Before you start.** Add a [CS-Cart credential](./credentials), [map locales](./locale-mapping), [map attributes](./attribute-mapping), and ideally run [Import attributes](./import-attributes) and [Import categories](./import-categories) first so the products land with all their features and category links intact.

**Open it from:** *Data Transfer → Import → + Create Import Profile*

<!-- TODO: capture screenshot — cscart-import-products-profile.png — Create import profile for products -->

## Steps

### 1. Create the profile

1. Open **Data Transfer → Import → + Create Import Profile**.
2. **Type** — pick **CsCart Product Import**.
3. **Code** — e.g. `cscart_products_import`.
4. Click **Save**.

### 2. Fill the filters

| Filter | Required | What it does |
|--|--|--|
| **Credential** | ✓ | Which CS-Cart store to pull from. |
| **Store** | ✓ | The source CS-Cart storefront. |
| **Channel** | ✓ | UnoPim channel the products will belong to. |
| **Locale** | ✓ | One or more UnoPim locales — must all be mapped. |
| **With media** | — | When on, downloads product images from CS-Cart into UnoPim. |

Click **Save**.

### 3. Run it

Open the profile and click **Start Import**. Watch the run on [Tracker](./tracker).

## What gets pulled

For every CS-Cart product the job:

1. Creates the matching UnoPim product if it doesn't exist (matched by `product_code` / SKU).
2. Writes attribute values into the UnoPim attributes set up in [Attribute Mapping](./attribute-mapping).
3. Imports name, description, price, stock, status, and any extra mapped attributes.
4. Links the product to imported categories.
5. **Variants** — child products in CS-Cart come in as configurable variants in UnoPim under their parent.
6. **Images** — if **With media** is on, each image is fetched from CS-Cart and uploaded into UnoPim media.

Products already in UnoPim are matched by SKU and updated in place.

## Notes

- Run **attribute import** and **category import** before products so the imported product has everywhere to land its values and links.
- The tracker row shows a counter — *X of Y products imported*. Failed products are logged in `storage/logs/laravel.log` and don't stop the run.
- Re-running the import is safe — existing products are detected and updated, not duplicated.
