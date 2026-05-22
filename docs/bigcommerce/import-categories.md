# Import categories

Pull your BigCommerce category tree into UnoPim, keeping the parent / child hierarchy intact.

> **Before you start.** Add a [BigCommerce credential](./credentials).

**Open it from:** *Data Transfer → Import*

![Create import profile page](./assets/import/data-transfer.png)

## Steps

### 1. Create the profile

1. Open **Data Transfer → Import → + Create Import**.

![Create import profile form](./assets/import/create-import.png)

2. **Type** — pick **Import Categories from BigCommerce**, **Code** — any short identifier, e.g. `bigcommerce_categories_import`.

![Import profile form filled](./assets/import/category-import.png)

3. **Fill the filter**

| Filter | Required | What it does |
|--|--|--|
| **Credential** | ✓ | Which BigCommerce store to pull from. Only **active** credentials appear. |

![Import profile filters](./assets/import/category-import-filter.png)

There are no other filters — the job pulls every available category from the selected BigCommerce store.

Click **Save**.

4. **Run it**

Open the profile and click **Start Import**.

![Start import button](./assets/import/category-import-now.png)

The job is queued. Watch progress in the Data Transfer Tracker.

![Tracker import progress](./assets/import/category-progress.png)
