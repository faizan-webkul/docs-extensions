# Commercetools Connector

The **Commercetools Connector** for UnoPim provides a two-way integration between UnoPim and a [commercetools](https://commercetools.com) project. The connector exports UnoPim products, attribute families and categories into commercetools, and imports product types, categories and products back from commercetools. Catalog data stays managed in UnoPim while commercetools continues to power the storefront and commerce APIs.

## How it works

```
                       ┌──────────────────────────────┐
                       │   Commercetools connection   │
                       │   (project key, OAuth, …)    │
                       └─────────────┬────────────────┘
                                     │
                  ┌──────────────────┼──────────────────┐
                  │                  │                  │
                  ▼                  ▼                  ▼
            System-fields    Product types      Categories
              mapping         (Author)          (Author)
                  │                  │                  │
                  └──────────────────┼──────────────────┘
                                     │
                              Operator runs a job
                                     │
            ┌────────────────────────┼────────────────────────┐
            ▼                        ▼                        ▼
   Data Transfer →           Data Transfer →           Data Transfer →
       Exports                  Imports                  Sync logs
  (UnoPim → CT)              (CT → UnoPim)         (audit + prune)
```

## Key features

- **Two-way sync** — products, categories and attribute families flow out to commercetools; product types, categories and products flow back in.
- **Configurable products** — exported as a master variant with a variant list; rebuilt the same way on import.
- **Localized values** — locale-scoped attributes are written and read as `ltext` / `lenum`, one set of values per locale the job selects.
- **Channel-scoped jobs** — every export and import is bound to a UnoPim channel; the locale list is narrowed to that channel's enabled locales.
- **Multiple commercetools projects** — any number of connections can be created and activated independently.
- **OAuth client-credentials** — access tokens are cached and auto-refreshed ahead of expiry.
- **One-click connection test** — credentials are validated against the commercetools API before any job runs.
- **Incremental sync** — product and category jobs can be limited to records changed since the last successful run.
- **Sync log + prune** — every operation is recorded in `commercetools_sync_log`; old rows are removed via `php artisan commercetools:sync-log:prune`.

## Roles

| Role | Responsibilities |
|---|---|
| **Connection Author** | Creates and tests commercetools connections, configures the system-fields mapping, imports product types and categories into UnoPim. |
| **Job Operator** | Runs product / category / family export jobs and product / category / product-type import jobs, monitors job history and sync logs, prunes old log rows. |

A single admin user can hold both roles, depending on the ACL permissions assigned to their UnoPim role.

## Requirements

- UnoPim v2.0.0 or higher
- PHP 8.3+, Laravel 12.x
- The core Unopim **Data Transfer** module (already part of the standard install)
- A Laravel queue worker running (export and import jobs are dispatched to the queue)
- A commercetools project with an **API client** (client id, client secret, project key, region, OAuth scopes)

## In this guide

- [Installation](./installation)
- [Configuration](./configuration)
- [Author Guide](./author-guide)
- [Operator Guide](./operator-guide)
