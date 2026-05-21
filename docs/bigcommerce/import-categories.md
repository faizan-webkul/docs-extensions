# Import categories

Pull your BigCommerce category tree into UnoPim, keeping the parent / child hierarchy intact.

> **Before you start.** Add a [BigCommerce credential](./credentials).

**Open it from:** *Data Transfer → Import → + Create Import Profile*

<!-- TODO: capture screenshot — bigcommerce-import-categories.png — Create import profile for categories -->

## Steps

### 1. Create the profile

1. Open **Data Transfer → Import → + Create Import Profile**.
2. **Type** — pick **Import Categories from BigCommerce**.
3. **Code** — e.g. `bigcommerce_categories_import`.
4. Click **Save**.

### 2. Fill the filter

| Filter | Required | What it does |
|--|--|--|
| **Credential** | ✓ | Which BigCommerce store to pull from. Only **active** credentials appear. |

Click **Save**.

### 3. Run it

Open the profile and click **Start Import**. Watch progress on [Tracker](./tracker).

## What gets pulled

For each BigCommerce category the job:

1. Creates the matching UnoPim category if it doesn't exist yet (code-based match).
2. Imports the **name** and **description**.
3. Sets the **parent** so the tree matches BigCommerce.
4. Imports the **URL key**, **visibility**, and **sort order**.

Categories already in UnoPim are matched by code and updated in place.

## Notes

- The tree is imported **top-down** — parents first. A child whose parent failed to import is skipped this run; re-run the import to pick it up once the parent is fixed.
- Deleting a category in BigCommerce does **not** delete it in UnoPim — manual cleanup if you need it gone.
- After this import, the codes between UnoPim and BigCommerce match — so you can leave [Category mapping](./other-mapping#category-mapping) empty for those categories, and let the connector use code matching automatically.

## Use this before importing products

Run **Import categories** before [Import products](./import-products). Products carry category references — if the category isn't in UnoPim, the link is dropped and reported in the tracker.
