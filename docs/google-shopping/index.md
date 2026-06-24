# Google Shopping Connector

The **Google Shopping Connector** for UnoPim provides a **one-way export integration** between UnoPim and [Google Merchant Center](https://merchants.google.com/). It pushes your UnoPim product catalog to Google Shopping through the **Content API for Shopping v2.1**, maps UnoPim attributes to Google's product schema, and resolves your UnoPim categories against Google's official taxonomy. Catalog data stays managed in UnoPim while Google Shopping ads, free listings and Merchant Center keep reflecting the latest catalog without manual re-entry.

## How it works

```
                       ┌──────────────────────────────┐
                       │   Google Shopping connection │
                       │   (merchant ID, OAuth, …)    │
                       └─────────────┬────────────────┘
                                     │
                  ┌──────────────────┼──────────────────┐
                  │                  │                  │
                  ▼                  ▼                  ▼
            Required          Attribute           Category
            Settings           Mapping            Mapping
            (Author)          (Author)           (Author)
                  │                  │                  │
                  └──────────────────┼──────────────────┘
                                     │
                              Operator runs an export
                                     │
            ┌────────────────────────┼────────────────────────┐
            ▼                        ▼                        ▼
   Data Transfer →           Quick Export →            Real-time push →
   Wizard export             one-click button          on product save
  (full filter set)        (sensible defaults)        (auto, per save)
                                     │
                                     ▼
                        Google Merchant Center
                     (products/batch, upsert)
```

## Key features

- **One-way export** — products (and their variants as separate offers) are pushed to Google Merchant Center; nothing is imported back.
- **Direct Content API** — products are mapped and pushed straight to Google's `products/batch` endpoint, with no intermediate feed file.
- **Global attribute mapping** — map any of Google's ~45 product fields (title, price, brand, gtin, condition, image links, shipping weight, custom labels, …) to UnoPim attributes, with per-field fallback chains and static-value overrides.
- **Category mapping with Google taxonomy** — map your UnoPim category tree to Google's official taxonomy (~5,500 bundled entries); the deepest mapped path wins per product, and unmapped categories fall back to `productTypes`.
- **Required settings** — one shared set of defaults (target country, content language, default channel, condition / availability, default Google category).
- **OAuth 2.0 with offline access** — each connection authorizes through Google's consent screen; access tokens auto-refresh ahead of expiry with a one-shot 401 retry.
- **Wizard export** — run filtered exports through UnoPim's Data Transfer pipeline (connection, channel, locale, currency, status, category, family, time condition).
- **Quick Export** — a per-connection one-click button that exports with sensible defaults, no wizard.
- **Real-time product push** — saving a product auto-dispatches a single-product upsert to every Quick-Export-enabled connection.
- **Encrypted, audit-safe credentials** — secrets are stored with Laravel's `encrypted` cast and excluded from history audit rows.

## Roles

| Role | Responsibilities |
|---|---|
| **Connection Author** | Creates and OAuth-authorizes Google Shopping connections, configures the Required Settings, Attribute Mapping and Category Mapping, and toggles Quick Export per connection. |
| **Job Operator** | Runs product export jobs through Data Transfer, triggers Quick Export, and monitors run outcomes in the Data Transfer tracker. |

A single admin user can hold both roles, depending on the ACL permissions assigned to their UnoPim role.

## Requirements

- UnoPim v2.0.0 or higher
- PHP 8.3+, Laravel 12.x
- The core UnoPim **Data Transfer** module (already part of the standard install)
- A Laravel queue worker running (export jobs are dispatched to the queue)
- A **Google Merchant Center** account with API access
- A **Google Cloud OAuth client** (Client ID + Secret) with the `content` scope and a configured redirect URI

## In this guide

- [Installation](./installation)
- [Configuration](./configuration)
- [Author Guide](./author-guide)
- [Operator Guide](./operator-guide)
