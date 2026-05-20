# Generating & Submitting the Feed

## Dashboard

Navigate to **Admin Panel → OpenAI Product Feed** to see the feed dashboard. It shows:

- The current feed status (enabled / disabled).
- The public feed URL with token.
- A log of the last 5 generation attempts — each showing the status (success / failed), number of products exported, file format, and timestamp.

The dashboard polls for status updates automatically so you can watch a generation in progress without refreshing.

## Generating the feed

### Manual generation

Click **Generate Feed** on the dashboard. The job is dispatched to the queue and the log updates in real time. Make sure a queue worker is running (see [Installation](./installation)).

### Automated generation (cron)

The extension registers a scheduled task with Laravel's scheduler. Add this entry to your server's crontab once:

```bash
* * * * * cd /path-to-your-unopim && php artisan schedule:run >> /dev/null 2>&1
```

The scheduler runs every minute and triggers feed generation at the interval you set in **Settings → Cron Interval**. No other configuration is needed — the extension registers itself automatically via the service provider.

### CLI generation

Trigger generation directly from the command line:

```bash
# Generate the feed
php artisan openai-feed:generate

# Generate and print the public feed URL
php artisan openai-feed:generate --show-url
```

Use `--show-url` to quickly copy the URL when setting up a new integration.

## Previewing the feed

Navigate to **OpenAI Product Feed → Preview** to browse the products that will be included in the next generation. Use this to verify attribute mapping is correct before submitting to ChatGPT.

## Downloading the feed file

Navigate to **OpenAI Product Feed → Download** to download the latest generated feed file locally (TSV or JSON depending on your format setting).

## Submitting to ChatGPT

1. Go to [chatgpt.com/merchants](https://chatgpt.com/merchants) and sign in.
2. Add a new product feed and paste your feed URL (`https://your-domain.com/openai-feed/products?token=<token>`).
3. ChatGPT will fetch and index your products. Indexing may take some time after the initial submission.

## Feed status endpoint

A lightweight status endpoint is available for monitoring:

```
GET /openai-feed/status
```

Returns JSON with the feed's enabled state, last generation time, and product count. No token required — suitable for uptime checks.

## Troubleshooting

**Feed generation is stuck** — Check that a queue worker is running (`php artisan queue:work`). Check the Laravel log (`storage/logs/laravel.log`) for job errors.

**Feed URL returns 403** — Make sure the feed is set to **Enabled** in Settings and the token in the URL matches the one in Settings → Security.

**Products are missing** — Check your **Product Scope** settings. If **Only Enabled Products** is on, disabled products are excluded. If **Product Limit** is set, some products may be cut off.

**Attribute values are empty** — Open **Settings → Attribute Mapping** and confirm each field is mapped to an attribute that actually has data for your products.
