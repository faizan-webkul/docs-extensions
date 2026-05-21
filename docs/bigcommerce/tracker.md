# Watch progress

Every import and export — full profile or otherwise — runs as a background job and shows up in the **Data Transfer Tracker**.

**Open it from:** *Settings → Data Transfer → Tracker*

<!-- TODO: capture screenshot — bigcommerce-tracker.png — Data Transfer Tracker with BigCommerce jobs -->

Each row shows:

- **Type** — *Export Products to BigCommerce*, *Import Categories from BigCommerce*, etc.
- **Status** — *queued / running / completed / failed*.
- **Progress** — counter, e.g. *34 of 120 products updated*.
- **Started / Finished** timestamps.
- A short summary once the job finishes.

## What creates a row

| Flow | Rows it creates |
|--|--|
| [Export categories](./export-categories) | One row per run. |
| [Export products](./export-products) | One row per run. |
| [Export configurable products](./export-product-models) | One row per run. |
| [Import categories](./import-categories) | One row per run. |
| [Import products](./import-products) | One row per run. |

## Notifications

You'll also see admin notifications:

- ✅ *BigCommerce export completed* — with the count.
- ❌ *BigCommerce export failed* — with the error.

Same for imports.

## When jobs are stuck on *queued*

The background worker isn't running. Ask your developer to start it:

```bash
php artisan queue:work
```

In production check Supervisor / Horizon / systemd. Without a worker, nothing in the queue ever runs.

## Inspecting failures

- Open the tracker row — the **Errors** panel lists every failed item with the reason.
- Full stack traces and API responses go to `storage/logs/laravel.log`.
- Common reasons: credential expired (`401`), missing required field on a product (`422` from BigCommerce), category not found (`404` from BigCommerce).
