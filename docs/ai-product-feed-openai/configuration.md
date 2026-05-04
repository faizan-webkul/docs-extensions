# Configuration

Navigate to **Admin Panel → OpenAI Product Feed → Settings** to configure the extension. Settings are split into sections.

## General

| Field | Description |
|---|---|
| **Status** | Enable or disable feed generation. The public feed URL returns a 403 while disabled. |
| **Channel** | The Unopim channel whose products are included in the feed. |
| **Locale** | The locale used for product names, descriptions, and other translatable attributes. |
| **Currency** | 3-letter ISO currency code (e.g., `USD`, `EUR`) used for product prices. |

## Seller Info

This information is included in the feed for attribution and return policy.

| Field | Description |
|---|---|
| **Seller Name** | Your store or brand name (max 70 characters). |
| **Seller URL** | The homepage URL of your store. |
| **Accepts Returns** | Toggle on if your store accepts returns. |
| **Return Deadline (days)** | Number of days a customer has to return a product. |
| **Return Policy URL** | Direct link to your return policy page (optional). |
| **Accepts Exchanges** | Toggle on if your store accepts exchanges. |

## Product Scope

| Field | Description |
|---|---|
| **Only Enabled Products** | When on, skips products marked as disabled in Unopim. |
| **Product Limit** | Maximum number of products to include. Set to `0` for no limit. |
| **Product URL Template** | Template for building product URLs. Use `{sku}` as a placeholder if your URLs are SKU-based. |
| **Image Base URL** | Base URL prepended to image paths if your images use relative paths. |
| **Target Countries** | Comma-separated list of ISO country codes where products are available. |
| **Store Country** | The country your store is based in. |

## Performance

| Field | Description |
|---|---|
| **Batch Size** | Number of products processed per batch (10–5000). Reduce if you hit memory limits on large catalogs. |
| **Cron Interval (hours)** | How often the feed regenerates automatically (1–168 hours). Default is every 12 hours. |

## Format

Choose the output format for the feed file:

- **TSV** — recommended for ChatGPT; tab-separated values.
- **JSON** — machine-readable, useful for custom integrations.

## Security (Token)

The feed URL is protected by a cryptographically secure token. Without it, the endpoint returns a 403.

1. Click **Generate Token** — a new 48-character hex token is created and saved immediately.
2. The full feed URL is displayed: `https://your-domain.com/openai-feed/products?token=<token>`.
3. Copy this URL — you will submit it to `chatgpt.com/merchants`.

To rotate the token, click **Generate Token** again. The old URL will stop working immediately.

## Attribute Mapping

Map your Unopim product attributes to the fields OpenAI expects. Only the codes you select here are exported.

| OpenAI Field | Default Unopim Attribute |
|---|---|
| Title | `name` |
| Description | `description` |
| Brand | `brand` |
| Price | `price` |
| Sale Price | `special_price` |
| Weight | `weight` |
| Weight Unit | `kg` |
| Color | `color` |
| Size | `size` |
| Material | `material` |
| GTIN | `ean` |
| MPN | `mpn` |
| Gender | `gender` |
| Age Group | `age_group` |
| Image | `image` |

Use the dropdowns to select the correct attribute for each field. Any field left blank is omitted from the feed.

Click **Save** to apply all settings. The next feed generation will use the updated configuration.
