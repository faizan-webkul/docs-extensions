# Export categories

Push your UnoPim category tree to CS-Cart, keeping the parent / child hierarchy intact.

> **Before you start.** Add a [CS-Cart credential](./credentials), [map your locales](./locale-mapping), and ideally run [Export attributes](./export-attributes) first if any of your categories carry custom attributes.

**Open it from:** *Data Transfer → Export → + Create Export Profile*

<!-- TODO: capture screenshot — cscart-export-categories-profile.png — Create export profile for categories -->

## Steps

### 1. Create the profile

1. Open **Data Transfer → Export → + Create Export Profile**.
2. **Type** — pick **CsCart Categories Export**.
3. **Code** — any short identifier, e.g. `cscart_categories`.
4. Click **Save**.

### 2. Fill the filters

| Filter | What it does |
|--|--|
| **Credential** | Which CS-Cart store to export to. |
| **Store** | The target CS-Cart storefront. |
| **Channel** | The UnoPim channel whose category tree you're exporting. |
| **Locale** | One or more UnoPim locales to push category names / descriptions for. |

Click **Save**.

### 3. Run it

Open the profile and click **Start Export**. Watch the run on [Tracker](./tracker).

## What gets pushed

For each UnoPim category the job:

1. Creates the matching CS-Cart category if it doesn't exist (matched by code).
2. Updates name and description in every selected locale.
3. Sets the **parent category** in CS-Cart so the tree stays in shape.
4. Sets `status` to active.

Categories already in CS-Cart are matched by code and updated in place.

## Notes

- The job runs the tree **top-down** — parents are created before their children. If the parent fails, its descendants are skipped for that run and reported in the tracker.
- Re-run the export to fix up children once you've resolved the parent.
- Deleting a category in UnoPim does **not** delete it in CS-Cart. Remove it in CS-Cart manually if you want it gone.
