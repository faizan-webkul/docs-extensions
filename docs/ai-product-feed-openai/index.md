# AI Product Feed (OpenAI)

The **AI Product Feed** extension automatically syncs your Unopim product catalog with **OpenAI / ChatGPT Search**. It generates a product feed in TSV or JSON format, protects it with a secure token, and exposes a public URL you submit to `chatgpt.com/merchants`.

## How it works

1. You configure the feed settings (channel, locale, attribute mapping, seller info) once in the admin panel.
2. The extension generates a feed file from your product catalog.
3. The feed is served at a token-protected public URL — only the URL holder (ChatGPT) can access it.
4. ChatGPT indexes your products and can surface them in shopping responses.

## Key features

- **Multi-format** — TSV (recommended for ChatGPT) or JSON output.
- **Secure token** — cryptographically generated URL token; regenerate any time.
- **Dashboard** — real-time status polling showing the last 5 generation attempts.
- **Attribute mapping** — map any Unopim attribute to OpenAI's required fields (title, description, brand, price, GTIN, etc.).
- **Flexible generation** — manual from the admin panel, automated via cron, or on-demand from the CLI.
- **Performance** — configurable batch size handles large catalogs without memory issues.

## Requirements

| Requirement | Version |
|---|---|
| Unopim | >= 2.0.0 |
| PHP | >= 8.3 |
| Laravel | ^12.0 |

## In this guide

- [Installation](./installation)
- [Configuration](./configuration)
- [Generating & Submitting the Feed](./feed-generation)
