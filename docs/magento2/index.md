# Magento 2 Connector

The UnoPim Magento 2 Connector allows businesses to integrate one or more Magento 2 stores with the UnoPim PIM platform.

## Introduction

With this connector, store owners can synchronize catalog data between UnoPim and Magento 2, including Adobe Commerce Cloud stores, through API-based integration.

It supports both export and import workflows, allowing businesses to manage product information in one central system and keep data aligned across platforms more efficiently.

## What the Connector Supports

The connector supports the export and import of categories, attributes, attribute options, attribute families, simple products, configurable products, and their variants.

It also supports mapping for standard attributes, custom attributes, categories, images, videos, store views, channels, locales, and currencies, so product data can be transferred in a structured and reliable way.

## Why Use This Connector

Whether you manage a single Magento 2 storefront or multiple stores, the UnoPim Magento 2 Connector helps reduce manual work by automating both catalog exports and Magento-to-UnoPim imports.

It keeps product data consistent across platforms and supports important product details such as title, description, SKU, price, quantity, weight, SEO data, images, videos, category assignments, attribute options, and association data.


## Basic Requirements

- Magento 2.3.x up to the latest supported Magento 2 version.
- Make sure the Magento reindex cron job is running properly.
- UnoPim version `v0.2.x or Later`.
- Node.js and Yarn packages must be installed.
- Your server must meet the UnoPim system requirements before installation.

## Features of UnoPim Magento 2 Connector

### Bidirectional Data Sync

- Supports a full Magento 2 to UnoPim import pipeline in addition to UnoPim to Magento 2 exports.
- Supports SKU-based product filtering to import only a specific comma-separated list of SKUs.
- Persists store view credential mappings in credential extras so they can be reused across import runs.

### Export Capabilities

- Exports categories from UnoPim to Magento 2.
- Exports attributes, attribute options, and attribute families to Magento as attribute sets.
- Exports both simple and configurable products.
- Exports product variants together with their parent configurable products.
- Exports important product data such as title, description, SKU, price, quantity, weight, SEO values, images, videos, and category assignments.
- Supports re-running export jobs to update previously exported catalog data.

### Export Mapping and Filtering

- Supports standard attribute mapping and additional custom Magento attribute mapping.
- Supports category mapping, image mapping, and video mapping.
- Supports filtering exported products by store view, family, status, product type, and SKU.
- Allows exporting single or multiple specific products using SKU identifiers.
- Supports multiple export job profiles for Magento category, attribute, attribute set, and product exports.

### Import Capabilities

- Imports Magento attributes with automatic type resolution and syncs attribute options.
- Imports Magento attribute sets as UnoPim attribute families with translated labels and mapped groups.
- Imports categories with full hierarchy, localized values, and mapped category attributes.
- Imports simple and configurable products with attribute mapping, media sync, category links, and association data.
- Imports Magento store groups as UnoPim channels with locale and currency configuration.

### Import Mapping and Filtering

- Supports store view mapping to UnoPim channels, locales, and currencies.
- Supports SKU-based product filtering for importing selected products only.
- Supports category fields and attributes with select, multiselect, and checkbox handling.
- Automatically creates an `Others` group when no matching attribute group is found.
- Automatically enables required locales and currencies during the import process.

You can also explore the UnoPim Maker Checker Workflow extension for product and asset approvals, as well as the UnoPim Public Image URL extension for simplified media handling.
