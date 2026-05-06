# Translate after import or save

When auto-translate is on, DeepL fills missing translations for you — no extra clicks.

> **Before you start.** Set up auto-translate on your default key — see [Credentials → Settings](./credentials), turn on **Enable Auto Translate**, and fill in the **Mapping**. Tick **AI Translate** on every field that should be auto-translated (see [Mark fields](./attribute-setup)).

## After every import

Every product import ends with a translation pass:

1. Each newly imported product is queued for translation.
2. Empty target-language values get filled by DeepL.
3. If **Replace Existing Value** is on, it also overwrites values that are already filled. If off, those are left alone.

Watch the runs in [Watch progress](./tracker).

## After saving a product

Save a product in the admin and a small prompt appears asking which fields to translate into which languages.

The prompt only lists fields where you've ticked **AI Translate** (see [Mark fields](./attribute-setup)). Untick a field there and it stops appearing in the prompt — anything not flagged is left alone.

Confirm to queue the translation as a background job. Watch it in [Watch progress](./tracker).

<!-- TODO: capture screenshot — After-Save-DeepL-Prompt.png — the prompt that appears after saving a product -->

## Turn it off

Open the default key and turn **Enable Auto Translate** off. Both flows stop straight away. Your mapping stays saved, so turning it back on later is one click.
