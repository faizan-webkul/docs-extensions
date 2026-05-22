# Export products

Push **simple products** from UnoPim to BigCommerce — with attribute values, prices, stock, statuses, custom fields, and images.

For configurable products with variants, use [Export configurable products](./export-product-models).

> **Before you start.** Add a [BigCommerce credential](./credentials), configure [Attribute mapping](./standard-mapping), and run [Export categories](./export-categories) so the categories the products reference already exist in BigCommerce.

**Open it from:** *Data Transfer → Export*

![Create export profile page](./assets/export/data-transfer.png)

## Steps

### 1. Create the profile

1. Open **Data Transfer → Export → + Create Export**.

![Create export profile form](./assets/export/create_export.png)

2. **Type** — pick **Export Products to BigCommerce**, **Code** — any short identifier, e.g. `bigcommerce_products`.

![Export profile form filled](./assets/export/simple-product-export.png)

3. **Fill the filter**

| Filter | Required | What it does |
|--|--|--|
| **Credential** | ✓ | Which BigCommerce store to push to. Only **active** credentials appear. |

![Export profile filters](./assets/export/product-fileter.png)

There are no other filters — the job pushes every eligible simple product visible to the user.

Click **Save**.

4. **Run it**

Open the profile and click **Export Now**.

![Start export button](./assets/export/product-export-now.png)

The job is queued. Watch progress in the Data Transfer Tracker.

![Tracker export progress](./assets/export/product-progress.png)
