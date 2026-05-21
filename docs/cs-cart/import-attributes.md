# Import attributes

Pull CS-Cart **features** into UnoPim as attributes, so you can enrich them in UnoPim and push them back out later.

> **Before you start.** Add a [CS-Cart credential](./credentials) and [map locales](./locale-mapping).

**Open it from:** *Data Transfer → Import → + Create Import Profile*

<!-- TODO: capture screenshot — cscart-import-attributes-profile.png — Create import profile for attributes -->

## Steps

### 1. Create the profile

1. Open **Data Transfer → Import → + Create Import Profile**.
2. **Type** — pick **CsCart Attributes Import**.
3. **Code** — e.g. `cscart_attributes_import`.
4. Click **Save**.

### 2. Fill the filters

| Filter | What it does |
|--|--|
| **Credential** | Which CS-Cart store to pull from. |
| **Store** | The source CS-Cart storefront. |
| **Channel** | The UnoPim channel to write attribute values into. |
| **Locale** | One or more UnoPim locales to import translations for. |

Click **Save**.

### 3. Run it

Open the profile and click **Start Import**. Watch the run on [Tracker](./tracker).

## What gets pulled

For each CS-Cart feature the job:

1. Creates the matching UnoPim attribute if it doesn't exist (code-based match).
2. Sets its **type** based on the CS-Cart feature type (text, select, multiselect, etc.).
3. Imports labels for every selected locale.
4. Imports **options** for select / multiselect features.

The attribute is added to a default attribute group — move it to the group you want from *Catalog → Attribute Groups* after the import.

## Notes

- Run **attribute import** before **product import** if you want the products to come in with their full set of features.
- Re-running the import is safe — existing UnoPim attributes are matched by code and updated, not duplicated.
