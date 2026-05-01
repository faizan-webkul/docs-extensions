# Author Guide

A **Rule Author** is any admin user with `create` and `edit` permissions on the Pricing Rule module. Authors define what each rule does — its code, conditions, and actions — but do not necessarily run it.

## Opening the module

In the admin panel, click **Pricing Rule** in the sidebar. The listing page shows every saved rule and is the entry point for creating new ones.

The listing automatically hides incomplete rules (those missing either a condition or an action). If you create a rule code but don't finish the setup, it will not appear here until both tabs are saved.

## Creating a rule

### Step 1 — Enter the rule code

1. Click **Create Rule** on the listing page.
2. Enter a unique **Code** (the only required field on this screen).
3. Save.

Use a descriptive, business-meaningful code, for example:

```text
summer-price-update
b2b-price-usd-update
channel-sale-price
```

After saving, Unopim redirects you to the rule editor where conditions and actions are configured.

### Step 2 — Configure conditions

The **Condition** tab decides which products a rule applies to.

1. Open the **Condition** tab.
2. Choose the required **Channel**.
3. Choose the required **Locale**.
4. Click **Add Attribute**.
5. Fill in the condition row:
   - **Attribute** — any product attribute available in Unopim
   - **Operation** — `Contain` or `Is Equal to`
   - **Value** — the text value to match
6. Repeat to add multiple condition rows.
7. Click **Save Condition**.

::: warning
Conditions are saved separately for each channel/locale pair. Switching channel or locale shows the conditions stored for that combination — the editor warns you before switching if you have unsaved changes.
:::

#### Example condition setups

| Use case | Attribute | Operation | Value |
|---|---|---|---|
| Products whose brand contains "Acme" | `brand` | Contain | `Acme` |
| Products with status exactly `active` | `status` | Is Equal to | `active` |
| Specific SKU | `sku` | Is Equal to | `ABC-123` |

### Step 3 — Configure actions

The **Action** tab defines what gets written to matching products.

1. Open the **Action** tab.
2. Choose the required **Channel**.
3. Choose the required **Locale**.
4. Click **Add Attribute**.
5. Fill in the action row:
   - **Attribute** — a product attribute of type `price`
   - **Currency** — one of the currencies assigned to the selected channel
   - **Value** — the numeric amount to write
6. Click **Save Action**.

#### Example action setup

- Attribute: `price`
- Currency: `USD`
- Value: `499`

This writes `499` into the `price` attribute for the selected channel + locale + USD path on every matching product.

::: warning
The current implementation is built for **direct price assignment**, not formula-based discount logic. The exact value you enter is written as-is to the target attribute.
:::

## Editing a rule

1. Open **Pricing Rule** and click the **Edit** action on the rule row.
2. Modify conditions, actions, or both.
3. Save the relevant tab.

The **History** tab inside the editor records changes made to the rule record itself, useful for tracking who modified what and when.

## Deleting a rule

- **Single delete** — use the **Delete** action on the row.
- **Mass delete** — select multiple rows and choose **Delete** from the mass-action dropdown.

Deleted rules are removed from the listing and cannot be executed.

## What authors should not do

- Edit the wrong channel/locale by mistake — always check the channel/locale selectors at the top of the Condition/Action tabs before editing.
- Mix unrelated business changes in one rule — keep one purpose per rule (one channel sale, one B2B update, etc.).
- Skip the action tab — a rule without an action does nothing and will be hidden from the grid.

## Best practices

1. Author a small test rule first and run it on known products before scaling up.
2. Use a clear, namespaced code such as `b2b-price-usd-update` instead of generic names.
3. Keep one business purpose per rule.
4. Verify the channel, locale, and currency on every action before saving.
5. Make sure the price-type attribute already exists in Unopim before adding it to an action.
