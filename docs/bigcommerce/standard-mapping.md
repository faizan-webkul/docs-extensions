# Standard mapping

BigCommerce products have a fixed set of built-in fields — *name*, *price*, *sku*, *weight*, *description*, *meta title*, and so on. The **Standard Mapping** page tells the connector which UnoPim attribute fills each BigCommerce built-in field.

**Open it from:** *BigCommerce → Export Mappings → Standard Mappings*

<!-- TODO: capture screenshot — bigcommerce-standard-mapping.png — Standard Mappings page -->

## What you'll see

The page lists every BigCommerce standard product field with three columns:

| Column | What it means |
|--|--|
| **BigCommerce Field** | The built-in BigCommerce field you're mapping into. Hover the info icon for what the field accepts. |
| **UnoPim Attribute** | Pick the UnoPim attribute whose value populates this field. |
| **Supported Types** | The UnoPim attribute types the field accepts (e.g. *Text* only, or *Text / Textarea*). The dropdown filters to those types. |

The page is **per credential** — pick the credential first, then the mapping shown belongs to that store. Different stores can have different mappings.

---

## Required mappings

At minimum, map these to run a product export:

| BigCommerce Field | Typical UnoPim attribute |
|--|--|
| **Name** | `name` |
| **SKU** | `sku` |
| **Price** | `price` |
| **Weight** | `weight` (or fixed value `0`) |
| **Type** | `physical` or `digital` — usually a fixed value attribute. |

The rest are optional. BigCommerce uses default values for any unmapped optional field.

---

## Picking an attribute

The dropdown only shows UnoPim attributes whose **type** matches the BigCommerce field. For example, *Price* only lets you pick numeric / price attributes; *Description* only lets you pick text / textarea attributes.

> [!TIP]
> If the attribute you want isn't in the list, check its **type** in *Catalog → Attributes* — it probably doesn't match the field's expected data type.

---

## Add an additional standard attribute

Some BigCommerce stores need a few extra standard fields that aren't shown by default. Use **+ Add Additional Attribute** at the bottom of the page to expose them:

1. Click **+ Add Additional Attribute**.
2. Pick the BigCommerce field from the dropdown.
3. Pick the matching UnoPim attribute.

Click the trash icon next to a row to remove an additional attribute.

---

## Save the mapping

Click **Save Mapping** at the bottom. You'll see a success message.

Mapping changes are picked up by the **next** export run — exports already queued use the mapping that was in place when they were queued.

---

## What's *not* on this page

- **BigCommerce custom fields** — they live under [Custom mapping](./custom-mapping).
- **Variant axes** (the attributes a configurable product varies on, e.g. *color* + *size*) — they live under [Other mapping](./other-mapping).
- **Category mappings** — also on [Other mapping](./other-mapping).

For a full picture of how the three mapping pages relate, the rule of thumb is:

| If you're mapping… | Go to |
|--|--|
| A BigCommerce **standard / built-in** field | Standard mapping |
| A BigCommerce **custom field** | [Custom mapping](./custom-mapping) |
| A **variant axis** or **category** | [Other mapping](./other-mapping) |
