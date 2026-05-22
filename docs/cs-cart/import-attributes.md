# Import attributes

Pull CS-Cart **features** into UnoPim as attributes, so you can enrich them in UnoPim and push them back out later.

> **Before you start.** Add a [CS-Cart credential](./credentials) and [map locales](./locale-mapping).

**Open it from:** *Data Transfer → Import*

![Create import profile page](./assets/import/data-transfer.png)

## Steps

### 1. Create the profile

1. Open **Data Transfer → Import → + Create Import**.

![Create import profile form](./assets/import/create-import.png)

2. **Type** — pick **CsCart Attributes Import**, **Code** — any short identifier, e.g. `cscart_attributes_import`.

![Import profile form filled](./assets/import/attribute-iport.png)

3. **Fill the filter**

| Filter | Required | What it does |
|--|--|--|
| **Credential** | ✓ | Which CS-Cart store to pull from. |
| **Store** | ✓ | The source CS-Cart storefront. |
| **Channel** | ✓ | The UnoPim channel to write imported attributes into. |
| **Locale** | ✓ | One or more UnoPim locales to import translations for. |

![Import profile filters](./assets/import/attribute-settings.png)

Click **Save**.

4. **Run it**

Open the profile and click **Start Import**.

![Start import button](./assets/import/attribute-import-now.png)

The job is queued. Watch progress in the Data Transfer Tracker.

![Tracker import progress](./assets/import/attribute-import-progress.png)
