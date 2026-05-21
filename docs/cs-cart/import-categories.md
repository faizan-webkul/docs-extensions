# Import categories

Pull your CS-Cart category tree into UnoPim, keeping the parent / child hierarchy intact.

> **Before you start.** Add a [CS-Cart credential](./credentials) and [map locales](./locale-mapping).

**Open it from:** *Data Transfer → Import → + Create Import Profile*

<!-- TODO: capture screenshot — cscart-import-categories-profile.png — Create import profile for categories -->

## Steps

### 1. Create the profile

1. Open **Data Transfer → Import → + Create Import Profile**.
2. **Type** — pick **CsCart Categories Import**.
3. **Code** — e.g. `cscart_categories_import`.
4. Click **Save**.

### 2. Fill the filters

| Filter | What it does |
|--|--|
| **Credential** | Which CS-Cart store to pull from. |
| **Store** | The source CS-Cart storefront. |
| **Channel** | The UnoPim channel that owns the imported categories. |
| **Locale** | One or more UnoPim locales to import category names / descriptions for. |

Click **Save**.

### 3. Run it

Open the profile and click **Start Import**. Watch the run on [Tracker](./tracker).

## What gets pulled

For each CS-Cart category the job:

1. Creates the matching UnoPim category if it doesn't exist (code-based match).
2. Imports the name and description in every selected locale.
3. Sets the **parent** so the tree matches CS-Cart.
4. Assigns the category to the selected channel.

Categories already in UnoPim are matched by code and updated in place.

## Notes

- The tree is imported **top-down** — parents first. A child whose parent failed to import is skipped this run; re-run the import to pick it up once the parent is fixed.
- Deleting a category in CS-Cart does **not** delete it in UnoPim — manual cleanup if you need it gone.
