# Watch progress

Every import and export — full profile, [quick export](./quick-export), or otherwise — runs as a background job and shows up in the Data Transfer Tracker.

**Open it from:** *Settings → Data Transfer → Tracker*

<!-- TODO: capture screenshot — cscart-tracker.png — Data transfer tracker showing CS-Cart jobs -->

Each row shows:

- **Type** — *CsCart Product Export*, *CsCart Categories Import*, etc.
- **Status** — *queued / running / completed / failed*.
- **Progress** — counter, e.g. *34 of 120 products updated*.
- **Started / Finished** timestamps.
- A short summary once the job finishes.

## What creates a row

| Flow | Row(s) it creates |
|--|--|
| [Export attributes](./export-attributes) | One row per run. |
| [Export categories](./export-categories) | One row per run. |
| [Export products](./export-products) | One row per run. |
| [Quick export](./quick-export) | One row per quick export click. |
| [Import attributes / categories / products](./import-attributes) | One row per run. |

## Notifications

You'll also see admin notifications:

- ✅ *CS-Cart export completed* — with the count.
- ❌ *CS-Cart export failed* — with the error.

## When jobs are stuck on *queued*

The background worker isn't running. Ask your developer to start it:

```bash
php artisan queue:work
```

In production check Supervisor / Horizon / systemd. Without a worker, nothing in the queue ever runs.

## Inspecting failures

- Open the tracker row — the **Errors** panel lists every failed item with the reason.
- Full stack traces and API responses go to `storage/logs/laravel.log`.
- Common reasons: locale not mapped, required attribute mapping missing, CS-Cart API returning *401* (bad key) or *403* (wrong company / vendor ID).
