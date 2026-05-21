# Export attributes

Push UnoPim attributes to CS-Cart as **features**. Run this once before exporting products that use those attributes — otherwise CS-Cart has no field to store the values in.

> **Before you start.** Add a [CS-Cart credential](./credentials) and map every locale you plan to export — see [Map locales](./locale-mapping).

**Open it from:** *Data Transfer → Export → + Create Export Profile*

<!-- TODO: capture screenshot — cscart-export-attributes-profile.png — Create export profile for attributes -->

## Steps

### 1. Create the profile

1. Open **Data Transfer → Export → + Create Export Profile**.
2. **Type** — pick **CsCart Attributes Export**.
3. **Code** — any short identifier, e.g. `cscart_attributes_daily`.
4. Click **Save**.

### 2. Fill the filters

The export needs:

| Filter | What it does |
|--|--|
| **Credential** | Which CS-Cart store to export to. |
| **Store** | Which CS-Cart storefront inside that store. *(Multi-Vendor / multi-storefront only.)* |
| **Channel** | The UnoPim channel whose attribute values you're exporting. |
| **Locale** | One or more UnoPim locales to push translations for. **Each must be mapped** — see [Map locales](./locale-mapping). |

Click **Save**.

### 3. Run it

Open the profile and click **Start Export**.

The job is queued. Watch it on **Settings → Data Transfer → Tracker** — see [Watch progress](./tracker).

## What gets pushed

For each UnoPim attribute the job:

1. Creates the matching CS-Cart **feature** if it doesn't exist yet.
2. Updates its label in every selected locale.
3. Pushes the attribute's **options** (for select / multiselect attributes) as feature variants in CS-Cart.

Attributes that already exist in CS-Cart are matched by code and updated in place — duplicates are not created.

## Notes

- Run the **attribute** export before the **product** export. Products reference attributes; if the feature doesn't exist in CS-Cart, the product value can't be stored.
- The job is idempotent — running it again only writes what has changed.
