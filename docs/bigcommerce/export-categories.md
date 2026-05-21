# Export categories

Push your UnoPim category tree to BigCommerce, keeping the parent / child hierarchy intact.

> **Before you start.** Add a [BigCommerce credential](./credentials) and configure [Category mapping](./other-mapping#category-mapping) if your UnoPim and BigCommerce category codes don't already match.

**Open it from:** *Data Transfer → Export → + Create Export Profile*

<!-- TODO: capture screenshot — bigcommerce-export-categories.png — Create export profile for categories -->

## Steps

### 1. Create the profile

1. Open **Data Transfer → Export → + Create Export Profile**.
2. **Type** — pick **Export Categories to BigCommerce**.
3. **Code** — any short identifier, e.g. `bigcommerce_categories`.
4. Click **Save**.

### 2. Fill the filter

| Filter | Required | What it does |
|--|--|--|
| **Credential** | ✓ | Pick the BigCommerce credential to export to. Only **active** credentials appear in the dropdown. |

There are no other filters — the job pushes every UnoPim category visible to the user.

Click **Save**.

### 3. Run it

Open the profile and click **Start Export**.

The job is queued. Watch progress on [Tracker](./tracker).

## What gets pushed

For each UnoPim category the job:

1. Creates the matching BigCommerce category if it doesn't exist yet (matched by code or by the [Category mapping](./other-mapping#category-mapping) you configured).
2. Updates the name and description.
3. Sets the **parent** category in BigCommerce so the tree stays in shape.
4. Marks the category as **visible** on the storefront.

Categories already in BigCommerce are matched (by code or via your category mapping) and updated in place — duplicates are not created.

## Notes

- Runs **top-down** — parents are created before their children. If a parent fails, its descendants are skipped for that run and reported in the tracker.
- Re-run the export to retry skipped children once you've fixed the parent.
- Deleting a category in UnoPim does **not** delete it in BigCommerce. Remove it in BigCommerce manually if you want it gone.
