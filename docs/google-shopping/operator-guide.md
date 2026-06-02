# Operator Guide

A **Job Operator** is an admin user who runs Google Shopping product exports. By the time you reach this guide, a [Connection Author](./author-guide) has already created and authorized a connection, saved the Required Settings, and configured the attribute and category mappings.

There are three ways products reach Google Merchant Center:

1. **Wizard export** — a filtered Data Transfer export job.
2. **Quick Export** — a one-click button on the Connections grid.
3. **Real-time push** — automatic, fired when a product is created or saved.

All three push to Google's `products/batch` endpoint, distinguishing inserts from updates with a pre-check probe.

## Wizard export

The connector registers one exporter: **Google Shopping Product Export**.

### Step 1 — Open the export creation page

Navigate to **Data Transfer → Exports → Create**.

### Step 2 — Pick the exporter

In the **Type** dropdown, choose **Google Shopping Product Export**.

### Step 3 — Configure the filters

| Filter | Required | Notes |
|---|---|---|
| **Connection** | Yes | Only configured connections appear. |
| **Channel** | Yes | The UnoPim channel whose data you are exporting. Choosing a channel narrows the **Locale** and **Currency** fields to that channel. |
| **Locale** | Yes | The single locale to export. Localized attributes resolve through this locale's bucket. |
| **Currency** | Yes | Which currency to extract from UnoPim's currency-keyed price attributes; emitted as Google `Money` objects. |
| **Status** | No | `Enable` / `Disable` product status (legacy `1` / `0` also accepted). |
| **Categories** | No | Limit the run to products in the selected UnoPim categories. |
| **Families** | No | Limit the run to products in the selected attribute families. |
| **Time Condition** | No | None / last N days / since a date / since last export. The two sibling inputs below it (**days** and **date**) are read only when the matching time-condition option is chosen. |

### Step 4 — Save and run

Save the job, then click **Run**. The job is dispatched to the queue:

```
Operator clicks Run
        ↓
Job dispatched to the queue
        ↓
Worker reads UnoPim products in batches of 1000
        ↓
Variants exported as separate offers (itemGroupId = parent SKU);
configurable parents skipped (their values merge into variants)
        ↓
For each offerId: productExists probe against Google
        ↓
Found → update bucket    /    Not found → create bucket
        ↓
Buckets flushed via Google products/batch
        ↓
Per-row created / updated / skipped / failed tallied back
```

### Step 5 — Monitor

Watch the job in **Data Transfer → Exports**. On completion the row shows the standard *created / updated / skipped / failed* counts. The full per-row outcome — including **skip reasons** (long SKU, duplicate offerId, mapping mismatch) and **category warnings** (product had unmapped categories) — is written to the per-job log file, downloadable from the tracker.

> Run history lives in the **Data Transfer tracker**. There is no separate sync-jobs page or prune command in this connector.

## Quick Export

Quick Export bypasses the wizard and pushes with sensible defaults.

- **Where** — the **Quick Export** button on a connection's row in **Google Shopping → Connections**. It only appears when **Quick Export Enabled** is on for that connection.
- **Gating** — the connection must be both **Active** and **authenticated**, or the run is refused.
- **Pre-flight** — requires a **Quick Export Currency** set in Required Settings, at least one channel, and at least one locale on that channel; missing prerequisites flash a clear error.
- **Defaults used** — first channel, that channel's first locale, the saved Quick Export currency, and no category / family / status / time filters.
- **Result** — produces a one-off job and dispatches the same export pipeline; you land on the standard Data Transfer tracker page, exactly like a wizard export.

## Real-time product push

This is automatic and needs no operator action:

- **Trigger** — UnoPim events `catalog.product.create.after` and `catalog.product.update.after`, fired once per created or saved product.
- **Scope** — standalone products and configurable parents trigger it; variants on their own do not (their values are merged through the parent).
- **Connections** — one push is dispatched per connection that is **active**, **authenticated** and **Quick Export Enabled**; others are skipped silently.
- **Queue** — each push runs as a single-product upsert on the dedicated `google-shopping-realtime` queue, with `$tries = 1` (a transient failure is logged, never retried, so it can't delay subsequent saves).

To process these promptly, run a worker on that queue:

```bash
php artisan queue:work --queue=google-shopping-realtime
```

## How offers are built (reference)

- **Stable Google ID** — each product's Google ID is `{channel}:{contentLanguage}:{targetCountry}:{offerId}`, so re-runs reliably hit the same row.
- **offerId** — the UnoPim SKU. SKUs longer than Google's 50-character limit are **pre-skipped** with a clear reason before any API call.
- **In-batch de-duplication** — if two rows share an offerId in one batch (parent/variant SKU collision), only the first is kept; the duplicate is skipped with a reason.
- **Fault tolerance** — a network or 5xx error during the `productExists` probe downgrades that offer to "create-as-upsert" with a logged reason rather than failing the whole batch.

## Troubleshooting

### Jobs stuck in "Pending"

No queue worker is running. Start one with:

```bash
php artisan queue:work
```

Then re-run the job from **Data Transfer → Exports**. For real-time pushes, also run a worker on `--queue=google-shopping-realtime`.

### Quick Export button is missing

**Quick Export Enabled** is off for that connection. Turn it on from **Google Shopping → Connections** (see the [Author Guide](./author-guide)).

### Quick Export refuses to run

The connection is not both **Active** and **authenticated**, or the pre-flight failed. Confirm the connection is active and authorized, and that **Quick Export Currency**, a channel and a locale are all configured.

### Authentication failures (HTTP 401)

A single 401 is handled automatically: the connector force-refreshes the access token and retries the request once. If the retry also fails, the stored tokens are invalid — **re-authorize** the connection from the grid (see the [Author Guide](./author-guide)). The refresh buffer is controlled by `oauth.token_refresh_buffer_seconds` — see [Configuration](./configuration).

### Products skipped with "SKU too long"

The product's SKU exceeds Google's 50-character `offerId` limit. Shorten the SKU in UnoPim, or accept that the product is excluded.

### Category warnings in the job log

The product had UnoPim categories with no Google taxonomy mapping. The export still succeeds — breadcrumbs are salvaged into `productTypes` and the default Google category is used for `googleProductCategory`. Add the missing mappings on the **Category Mapping** tab to silence the warning (see the [Author Guide](./author-guide)).
