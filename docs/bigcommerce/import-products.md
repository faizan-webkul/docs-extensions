# Import products

Pull BigCommerce products into UnoPim - both **simple products** and **configurable products** (variable products in BigCommerce terminology) come in through the same job.

> **Before you start.** Add a [BigCommerce credential](./credentials) and run [Import categories](./import-categories) so the products land with all of their category links intact.

**Open it from:** *Data Transfer → Import*

![Create import profile page](./assets/import/data-transfer.png)

## Steps

### 1. Create the profile

1. Open **Data Transfer → Import → + Create Import**.

![Create import profile form](./assets/import/create-import.png)

2. **Type** - pick **Import Products from BigCommerce**, **Code** - any short identifier, e.g. `bigcommerce_products_import`.

![Import profile form filled](./assets/import/product-import.png)

3. **Fill the filter**

| Filter | Required | What it does |
|--|--|--|
| **Credential** | ✓ | Which BigCommerce store to pull from. Only **active** credentials appear. |

![Import profile filters](./assets/import/product-imprt-filter.png)

There are no other filters - the job pulls every available product from the selected BigCommerce store.

Click **Save**.

4. **Run it**

Open the profile and click **Start Import**.

![Start import button](./assets/import/product-import-now.png)

The job is queued. Watch progress in the Data Transfer Tracker.


![Tracker import progress](./assets/import/product-import-progress.png)
