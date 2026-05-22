# Import categories

Pull your CS-Cart category tree into UnoPim, keeping the parent / child hierarchy intact.

> **Before you start.** Add a [CS-Cart credential](./credentials) and [map locales](./locale-mapping).

**Open it from:** *Data Transfer → Import*

![Create import profile page](./assets/import/data-transfer.png)

## Steps

### 1. Create the profile

1. Open **Data Transfer → Import → + Create Import**.

![Create import profile form](./assets/import/create-import.png)

2. **Type** — pick **CsCart Categories Import**, **Code** — any short identifier, e.g. `cscart_categories_import`.

![Import profile form filled](./assets/import/category-import.png)

3. **Fill the filter**

| Filter | Required | What it does |
|--|--|--|
| **Credential** | ✓ | Which CS-Cart store to pull from. |
| **Store** | ✓ | The source CS-Cart storefront. |
| **Channel** | ✓ | The UnoPim channel that owns the imported categories. |
| **Locale** | ✓ | One or more UnoPim locales to import category names and descriptions for. |

![Import profile filters](./assets/import/category-settings.png)

Click **Save**.

4. **Run it**

Open the profile and click **Start Import**.

![Start import button](./assets/import/category-import-now.png)

The job is queued. Watch progress in the Data Transfer Tracker.

![Tracker import progress](./assets/import/category-import-progress.png)
