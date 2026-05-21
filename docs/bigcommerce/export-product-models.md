# Export configurable products

Push **configurable products** (one parent + multiple variants) from UnoPim to BigCommerce. The connector creates a BigCommerce **variable product** with one option per variation axis (e.g. *size* + *color*) and one SKU per variant combination.

For non-configurable products, use [Export products](./export-products) instead.

> **Before you start.** Add a [BigCommerce credential](./credentials), configure [Standard mapping](./standard-mapping), and most importantly — **pick the variation axes** under [Other mapping → Variant option types](./other-mapping#variant-option-types). Without that the export has nothing to use for variant options.

**Open it from:** *Data Transfer → Export → + Create Export Profile*

<!-- TODO: capture screenshot — bigcommerce-export-product-models.png — Create export profile for configurable products -->

## Steps

### 1. Create the profile

1. Open **Data Transfer → Export → + Create Export Profile**.
2. **Type** — pick **Export Configurable Product to BigCommerce**.
3. **Code** — e.g. `bigcommerce_configurables`.
4. Click **Save**.

### 2. Fill the filter

| Filter | Required | What it does |
|--|--|--|
| **Credential** | ✓ | Pick the BigCommerce credential. Only **active** credentials appear. |

Click **Save**.

### 3. Run it

Open the profile and click **Start Export**. Watch progress on [Tracker](./tracker).

## What gets pushed

For every UnoPim configurable parent the job:

1. Creates the BigCommerce product (using the parent's attribute values via [Standard mapping](./standard-mapping)).
2. Creates one BigCommerce **option** per attribute listed under [Variant option types](./other-mapping#variant-option-types).
3. Creates one **variant SKU** per child product, with the option values that correspond to its specific combination.
4. Pushes per-variant **price** and **stock** levels — if the variant carries channel/locale-specific values these are sent through the credential's locale/currency mappings.
5. Pushes images — main image at parent level, plus each variant's images if configured.

## Configurable vs. simple

| Use **Export products** | Use **Export configurable products** |
|--|--|
| Each product is unique — one SKU. | Multiple variants share a parent. |
| No variation axis. | At least one variation axis (color, size, …). |
| Faster — one job, one SKU per product. | Slower per product — multiple SKUs created per parent. |

If you have a **mix** of simple and configurable products in your catalog, run both export profiles. Each profile only picks up the matching product type.

## Validation errors before the job starts

The validator checks:

- Credential is active and reachable.
- Required standard mappings exist (Name, SKU, Price).
- **At least one variant option type** is selected under [Other mapping](./other-mapping).

If any check fails the profile shows a red banner — fix it and try again.

## Notes

- The parent SKU and each variant SKU are sent as-is from UnoPim. Make sure they're unique across BigCommerce — duplicates cause the variant to be merged into an existing record.
- Re-running the export only writes changes — already-current products and variants are detected and updated in place.
- A failed parent skips its variants for that run. Re-run after fixing the parent to pick up its variants.
- Adding or removing a variant axis means **deleting and re-creating** the product on BigCommerce — variant option configuration can't be changed in-place via the API. The connector handles this automatically when it detects the option set changed.
