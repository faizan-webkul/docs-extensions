# Data transfer mappings

A **Data Transfer Mapping** records an explicit link between a UnoPim entity (a product, a category, an attribute) and the matching record in your CS-Cart store. The connector creates and reads these automatically — most users never need to open this page.

**Open it from:** *CS-Cart → Data Transfer Mappings*

<!-- TODO: capture screenshot — cscart-data-transfer-mappings.png — Data Transfer Mappings grid -->

## What the grid shows

| Column | What it means |
|--|--|
| **ID** | Internal mapping ID. |
| **Credential** | The CS-Cart credential the mapping belongs to. |
| **Entity Type** | `product`, `category`, or `attribute`. |
| **UnoPim Entity Code** | The UnoPim SKU / category code / attribute code. |
| **CS-Cart Entity ID** | The numeric ID of the matching record in CS-Cart. |

## When you'd open it

- **After an import** — to verify which CS-Cart records were linked to which UnoPim entities.
- **To break a link** — delete a row and the next export will treat that entity as new, creating a fresh CS-Cart record. Use this if a CS-Cart record was deleted manually and you want UnoPim to recreate it.
- **Mass cleanup** — tick rows and use **Selected actions → Delete** to remove links in bulk.

## Heads-up

> [!CAUTION]
> Deleting a mapping does **not** delete anything in CS-Cart. It only removes the link UnoPim uses to find that CS-Cart record. The next export with the same SKU / code will create a **duplicate** in CS-Cart unless CS-Cart's own deduplication kicks in.

Most of the time you should leave this page alone — the connector keeps the mappings in sync on its own.
