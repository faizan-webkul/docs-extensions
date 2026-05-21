# Other mapping

The **Other Mapping** page is where you configure the bits that don't fit standard or custom fields:

- **Variant option types** — which UnoPim attributes become variation axes on BigCommerce configurable products (e.g. *color* + *size*).
- **Attributes to be used as modifiers** — UnoPim attributes that become BigCommerce **product modifiers** (price / weight adjusters tied to a customer choice).
- **Category mapping** — link UnoPim categories to BigCommerce categories so products land in the right tree.

**Open it from:** *BigCommerce → Export Mappings → Other Mappings*

<!-- TODO: capture screenshot — bigcommerce-other-mapping.png — Other Mappings page -->

Like the other mapping pages, **Other Mapping** is saved **per credential**.

---

## Variant option types

For a configurable product to come through to BigCommerce as a variable product (with selectable size, color, etc.), the connector needs to know *which UnoPim attributes are the variation axes*.

1. In the **Variant Option Types** section, pick one or more UnoPim attributes.
2. The connector creates a matching BigCommerce **option** for each one on every exported configurable product.
3. Each variant child carries the option values that correspond to its specific combination.

Typical picks: `color`, `size`, `material`. Avoid picking attributes that aren't really variation axes (e.g. `description` or `weight`).

---

## Attributes to be used as modifiers

A BigCommerce **modifier** is an option on the storefront that the customer picks (e.g. *Gift wrap?*, *Engrave name?*). The pick can adjust the product's price, weight, or stock — but unlike a variant, doesn't create separate SKUs.

In the **Attributes to be used as modifiers** section, pick the UnoPim attributes that should become BigCommerce modifiers instead of regular attribute values. The connector pushes them as modifiers on every exported product.

Use modifiers when:

- The choice is **optional** for the customer.
- The choice doesn't justify a separate SKU (no separate inventory).

Use **Variant option types** (above) instead when each combination needs its own SKU and stock.

---

## Category mapping

When exporting a product, the connector needs to know *which BigCommerce categories* the product belongs to. By default it maps category by code — but if your UnoPim and BigCommerce category trees don't share codes, this page lets you draw the links manually.

1. In the **Category Mappings** section, pick a UnoPim category.
2. Pick the matching BigCommerce category.
3. Save.

Products in the mapped UnoPim category will be filed under the corresponding BigCommerce category on export.

If you've also imported BigCommerce categories via [Import categories](./import-categories), the codes line up automatically — you can leave Category Mapping empty.

> [!TIP]
> Map only the categories where the codes **don't** match. Anything left unmapped falls back to code-based matching, which is the most maintainable setup.

---

## Save the mapping

Click **Save** at the bottom of each section. Changes apply to the **next** export — runs already queued use the previous values.

---

## When mappings are missing

The export job's [validator](./troubleshooting#job-validator-errors) checks these before queueing:

- For a **configurable product export** — at least one **variant option type** must be selected.
- For a **product export** — required [standard mappings](./standard-mapping) must be filled in (name, sku, price).

If anything is missing, the profile shows a red banner — fix it and try again.
