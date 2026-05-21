# Import products

Pull BigCommerce products into UnoPim — both **simple products** and **configurable products** (variable products in BigCommerce terminology) come in through the same job.

> **Before you start.** Add a [BigCommerce credential](./credentials) and run [Import categories](./import-categories) so the products land with all of their category links intact.

**Open it from:** *Data Transfer → Import → + Create Import Profile*

<!-- TODO: capture screenshot — bigcommerce-import-products.png — Create import profile for products -->

## Steps

### 1. Create the profile

1. Open **Data Transfer → Import → + Create Import Profile**.
2. **Type** — pick **Import Products from BigCommerce**.
3. **Code** — e.g. `bigcommerce_products_import`.
4. Click **Save**.

### 2. Fill the filter

| Filter | Required | What it does |
|--|--|--|
| **Credential** | ✓ | Which BigCommerce store to pull from. Only **active** credentials appear. |

Click **Save**.

### 3. Run it

Open the profile and click **Start Import**. Watch progress on [Tracker](./tracker).

## What gets pulled

For every BigCommerce product the job:

1. Creates the matching UnoPim product if it doesn't exist yet (matched by SKU).
2. Writes attribute values into UnoPim attributes using your [Standard mapping](./standard-mapping) and [Custom mapping](./custom-mapping) — in reverse.
3. Imports **name**, **description**, **price**, **weight**, **inventory level**, **visibility**.
4. Links the product to imported **categories** (categories must exist in UnoPim — run [Import categories](./import-categories) first).
5. Downloads **images** — main image and gallery — into UnoPim media.
6. **Variants** — child variants of a BigCommerce variable product come in as configurable variants in UnoPim under their parent. The variation axes are detected from BigCommerce option names.

Products already in UnoPim are matched by SKU and updated in place. No duplicates are created.

## Notes

- The tracker row shows a counter — *X of Y products imported*. Failed products are logged in the tracker and don't stop the run.
- Categories the product links to but that **don't exist in UnoPim** are dropped (and logged). Run [Import categories](./import-categories) first to avoid this.
- Custom fields come in as **attribute values** in UnoPim if their name matches a UnoPim attribute. Otherwise they're dropped — the import only writes data into attributes that already exist.
- Image filenames are kept exactly as BigCommerce reports them — re-running the import doesn't re-download the same image twice.

## Recommended import order

For a clean catalog ingestion from BigCommerce into UnoPim:

1. **[Import categories](./import-categories)** — so the category links resolve.
2. **Import products** — once.

Re-running either job is safe — both are idempotent.
