# WooCommerce WPML

The **WooCommerce WPML** add-on extends the existing Unopim WooCommerce connector with **WPML (WordPress Multilingual)** support. It lets you export and import WooCommerce categories, attributes, and products **in multiple languages at once**, keeping translations in sync between Unopim and a WPML-enabled WordPress / WooCommerce store.

## How it works

```
WPML configured in WordPress (default + secondary languages)
        ↓
WooCommerce connector configured in Unopim (credentials, channel mapping)
        ↓
Unopim Operator opens Data Transfer → Imports / Exports
        ↓
Pick "WooCommerce Product / Category / Attribute" job
        ↓
Select credential, channel, and one OR many locales
        ↓
Run the job
        ↓
WPML add-on writes a row per entity + language into wk_wpml_data_mapping
        ↓
WPML links translations on the WordPress side using that mapping
```

The mapping table `wk_wpml_data_mapping` records every external entity ID, related-language ID, language label, job instance, and API URL — that is the bridge that lets WPML treat each language version as a translation of the same product instead of as separate items.

## Key features

- **Seamless WooCommerce + WPML integration** — works with the standard Unopim WooCommerce connector; no separate admin section.
- **Multilingual exports** — `locale` is a **multiselect** on every WooCommerce export filter, so a single job can push a product, category, or attribute in many languages.
- **Multilingual imports** — same multi-locale support on the import side for categories, attributes, and products.
- **Translation tracking** — the `wk_wpml_data_mapping` table records the WPML language and API URL for every exported/imported entity so re-runs update existing translations instead of creating duplicates.
- **Categories, attributes, products, variations** — full coverage of the WooCommerce data model.
- **Compatibility with WPML String Translation** — translated labels and option values land where WPML expects them.
- **Patch-free on Unopim ≥ 0.3.2** — the add-on slots into the modern connector structure without legacy patch files.

## Roles

| Role | Responsibilities |
|---|---|
| **WordPress Admin** | Installs and configures WPML in WordPress; defines the default and secondary languages. |
| **Unopim Operator** | Configures the WooCommerce credential and channel mapping; runs export/import jobs and selects the locales to transfer. |

A user can hold both roles depending on team setup.

## Requirements

- Unopim v2.0.0 or higher (compatibility starts at UnoPim ≥ 0.3.0; v2.0.0+ recommended)
- PHP 8.3+, Laravel 12.x
- The Unopim **WooCommerce** connector installed and connected
- **WPML** plugin installed and configured in WordPress with the languages you intend to use
- Latest stable WooCommerce
- Queue worker running (export/import jobs are queued)

## In this guide

- [Installation](./installation)
- [Configuration](./configuration)
- [Author Guide](./author-guide)
- [Operator Guide](./operator-guide)
