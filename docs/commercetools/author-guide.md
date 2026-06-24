# Author Guide

A **Connection Author** is an admin user who sets up commercetools connections and configures the data that flows between UnoPim and commercetools. The author's work happens once per commercetools project (plus occasional updates) and lives entirely under the **Commercetools** admin menu.

This guide covers four areas:

1. Creating and testing a connection
2. Mapping commercetools system fields to UnoPim attributes
3. Importing commercetools product types into UnoPim attribute families
4. Importing the commercetools category tree

Once these are in place, a [Job Operator](./operator-guide) can run product and category jobs.

## Creating and testing a connection

### Step 1 — Open the create-connection screen

Navigate to **Commercetools → Connections** and click **Create Connection**.

### Step 2 — Fill in the form

| Field | What to enter |
|---|---|
| **Name** | A label that identifies this project in the admin (e.g. `Acme Production`). |
| **Project Key** | The commercetools project key. Lowercase letters, digits, hyphens and underscores only. |
| **Client ID** | The API client's ID, from the commercetools Merchant Center. |
| **Client Secret** | The API client's secret (only shown once at creation in commercetools). |
| **Region** | The project region, e.g. `europe-west1.gcp`. |
| **Scopes** | One scope per line, e.g. `manage_project`. Leave blank to use the default `manage_project`. |
| **Active** | Check to make the connection eligible for jobs. |

Save with **Save Connection**.

> Project key + Client ID must be unique across all connections. If the combination already exists you'll see a validation error on save.

### Step 3 — Test the connection

From the **Connections** grid, click the **Test** action on the row.

| Result | Meaning |
|---|---|
| **Connected** | OAuth succeeded and the API responded. The **Last Tested** timestamp updates. |
| **Failed** | Either authentication failed (wrong credentials, project key or scopes) or the API was unreachable. The exact error appears in the toast. |
| **Untested** | The connection has never been tested. |

Re-run the test after any credential edit.

## Mapping commercetools system fields to UnoPim attributes

The connection edit screen has two tabs: **Credentials** (the form from Step 2 above) and **Attribute Mapping**.

### Step 1 — Open the Attribute Mapping tab

From **Commercetools → Connections**, click **Edit** on the row, then open the **Attribute Mapping** tab.

### Step 2 — Pick a UnoPim attribute for each commercetools system field

For every commercetools field the connector needs, choose the UnoPim attribute that feeds it from the dropdown:

| commercetools field | What it carries | Required? |
|---|---|---|
| `sku` | Master variant SKU | **Yes** |
| `key` | Custom unique key | **Yes** |
| `name` | Localized product name | **Yes** |
| `slug` | Localized URL slug | No |
| `description` | Localized description | No |
| `metaTitle` | SEO title | No |
| `metaDescription` | SEO description | No |
| `metaKeywords` | SEO keywords | No |
| `searchKeywords` | Search keywords | No |
| `price` | Product price | No |
| `images` | Product images | No |

The dropdown is **type-aware** — only UnoPim attributes whose type matches the commercetools field appear (for example, `description` only lists textarea attributes; `price` only lists price attributes).

### Step 3 — Save the mapping

Click **Save Mapping**. On success you'll see "Attribute mapping saved."

> `sku`, `key` and `name` are required before any product export or import can run. Until they are mapped, product jobs will fail validation with "The selected connection has no attribute mappings configured."

## Custom attributes (by code)

Beyond the system fields above, **any custom attribute on a commercetools product type is filled from the UnoPim attribute that shares the same code.** No per-field mapping is needed for these — name them identically on both sides.

## Importing commercetools product types

Importing product types creates one UnoPim **attribute family** per commercetools product type, including its attribute groups, attributes and attribute options.

There are two ways to trigger an import:

### From the connection screen (one-click)

Use this when you want to refresh product types immediately, with no filters.

Navigate to **Commercetools → Connections → Edit → Attribute Mapping** and click the **Import Product Types** action. On success you'll see "Product types imported successfully."

### As a Data Transfer job

Use this when you want the import to run on the queue with job history. Hand the job over to a Job Operator — the steps are documented in the [Operator Guide](./operator-guide).

Imported product types are matched back to UnoPim attribute families **by code** on later runs, so re-importing updates the existing family rather than creating duplicates.

## Importing the commercetools category tree

Importing categories pulls the full commercetools category tree into UnoPim, with parent links resolved before children so the tree is built in a valid order. Orphaned categories (parent missing in the response) are skipped.

The flow mirrors product types: use the **Import Categories** action on the connection screen for a quick refresh, or hand a `CommercetoolsCategoryImport` job to a Job Operator for a queued import with full history.

Imported categories keep their commercetools `id`, `key`, `external id` and `order hint` so re-imports update the existing UnoPim category rather than creating duplicates.

## Managing multiple connections

You can create one connection per commercetools project. From the **Connections** grid:

- **Activate / Deactivate** — toggle the active flag on a single row, or use the **Toggle Active** mass action across a selection. An inactive connection is invisible to job filters.
- **Mass Delete** — remove multiple connections from the selection footer.
- **Edit** — re-open the create form to update name, credentials, scopes or active flag. Leave the **Client Secret** field blank to keep the existing value.

## Next steps

With at least one connection tested and the required system fields mapped, hand the connection name to a Job Operator and follow the [Operator Guide](./operator-guide) to run exports and imports.
