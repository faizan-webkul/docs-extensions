# UnoPim - Export Products to ERPNext

Exporting your UnoPim product catalog to ERPNext as **Items**.

## Overview

This export job pushes your UnoPim products - both **simple** and **variant** products, with attributes, images, and pricing - into ERPNext as **Item** records.

The job type is listed as **ERPNext: Products → Item**.

## Prerequisites

Before exporting products, complete the following:

1. [Set up your ERPNext credentials](./setup-credentials.md).
2. Configure [Attribute Mapping](./attribute-mapping.md) so product data lands in the right ERPNext Item fields.
3. (Recommended) Run the [Export Attributes](./export-attributes.md) and [Export Categories](./export-categories.md) jobs first, so variant attributes and Item Groups already exist in ERPNext.

## How to Export Products

### Step 1: Go to Data Transfer

Navigate to the **Data Transfer** section from the main menu.

### Step 2: Open Exports

Click on **Exports** to view the available export jobs.

### Step 3: Create Export

Click **Create Export**, then enter a unique **Code** and **Label** for the job.

### Step 4: Select Type

Select **ERPNext: Products → Item** as the export type.

### Step 5: Set the Filters

The product export gives you fine-grained control over what gets exported:

| Filter | What it does |
| --- | --- |
| **ERPNext Credential** | Select which ERPNext site to export to. *(required)* |
| **Channel** | Export products from a specific channel. *(required)* |
| **Locale** | Export product data in a specific language. *(required)* |
| **Currency** | Currency used for exported pricing. *(required)* |
| **Product Filter (SKU)** | Optional. Export only specific products by entering their SKUs. Leave blank to export the full catalog. |

#### Targeted export by SKU

To export only a few products, enter their **SKUs** in the **Product Filter (SKU)** field. This is useful for pushing a single new product or a small batch of updates without running a full catalog export.

### Step 6: Save

Click **Save** to store the export job.

### Step 7: Export Now

Click **Export Now** to run the job and push your products to ERPNext.

### Step 8: Monitor Progress

Track the job in the **Job Tracker**. Live **Created / Updated / Skipped** counts tick up as the job runs, and any errors appear in the log.

## Exporting Products with Variations

Many products in UnoPim aren't single items - they come in variations such as **size**, **color**, or **material**. The **ERPNext: Products → Item** job handles these automatically:

- The parent product is exported as an ERPNext **Item template** (with **Has Variants** enabled).
- Each variation is exported as a **variant Item** linked to that template.

Make sure the relevant variant attributes have been exported first (see [Export Attributes](./export-attributes.md)), so ERPNext can build the variants correctly.

## Re-running an Export

You can re-run a product export at any time to push the latest changes. Sync mappings keep each product's identity across runs, so re-syncs **update** existing ERPNext Items instead of creating duplicates. On conflicting updates, the connector uses a **last-write-wins** rule based on the `modified` timestamps on each side.
