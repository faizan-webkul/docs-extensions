# Pricing Rule Module User Guide

The `PricingRuleModule` helps you update product price attributes in bulk by defining reusable rules inside Unopim. Each rule checks product data against one or more conditions and then writes a new value into a selected price-type attribute for the chosen channel, locale, and currency.

If you want a hosted documentation setup, use [index.md](./index.md) and [sidebar.json](./sidebar.json) from this package.

## Table of Contents

- [Overview](#overview)
- [What This Module Does](#what-this-module-does)
- [Before You Start](#before-you-start)
- [How the Rule Flow Works](#how-the-rule-flow-works)
- [Open the Module](#open-the-module)
- [Create a New Rule](#create-a-new-rule)
- [Configure Conditions](#configure-conditions)
- [Configure Actions](#configure-actions)
- [Run a Rule](#run-a-rule)
- [CLI Command](#cli-command)
- [Queue and Logs](#queue-and-logs)
- [Permissions](#permissions)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## Overview

This module adds a **Pricing Rule** section to the Unopim admin panel. You can use it when you want to:

- update a price field for many products at once
- target products using attribute-based conditions
- manage different values by channel and locale
- trigger rule execution from the admin grid or from Artisan

## What This Module Does

The current implementation supports:

- creating a rule using a unique **Code**
- adding multiple **conditions** per channel and locale
- using product attributes as condition inputs
- using `Contain` and `Is Equal to` condition operators
- choosing a **price-type attribute** as the action target
- setting a numeric value with a selected currency
- executing one rule or multiple rules from the listing page
- dispatching the rule processing to Laravel queue jobs
- tracking model history and writing rule execution logs

## Before You Start

Please make sure:

1. the module is installed in your Unopim project
2. database migrations have already been run
3. your queue worker is running, because rule execution is dispatched as jobs
4. your admin role has permission to create, edit, and execute pricing rules
5. the price attributes you want to update already exist in Unopim

Recommended queue worker example:

```bash
php artisan queue:work
```

## How the Rule Flow Works

The module follows this flow:

1. Create a rule with a unique code.
2. Add conditions for the products you want to target.
3. Add actions that define which price attribute should be updated.
4. Execute the rule from the grid or CLI.
5. The module finds matching products and updates the selected price attribute values.
6. Execution details are written to the Laravel log system and rule tracker log files.

## Open the Module

In the Unopim admin panel, open:

`Pricing Rule`

The menu entry is registered by the module and opens the rule listing page where you can:

- create a new rule
- review saved rules
- edit a rule
- delete a rule
- execute a rule
- execute multiple rules together

## Create a New Rule

### Step 1: Open the create popup

Click **Create Rule** on the listing page.

### Step 2: Enter the rule code

The first screen asks for one required field:

- **Code**: a unique identifier for the rule

Example:

```text
summer-price-update
```

After saving, Unopim redirects you to the rule editor.

## Configure Conditions

Conditions decide which products should be selected when the rule runs.

### Condition screen

Inside the rule editor:

1. open the **Condition** tab
2. choose the required **Channel**
3. choose the required **Locale**
4. click **Add Attribute**
5. fill in the condition row
6. click **Save Condition**

### Condition fields

Each condition row currently contains:

- **Attribute**: any product attribute available in Unopim
- **Operation**: `Contain` or `Is Equal to`
- **Value**: the text value to match

### Important behavior

- Conditions are saved separately for each channel and locale.
- You can switch channel and locale from the top of the screen.
- The screen warns you before switching if you have unsaved changes.
- Multiple condition rows can be added.
- Only products matching the stored condition set are picked during execution.

### Example condition setup

Use case: update prices for products whose brand contains `Acme`.

- Attribute: `brand`
- Operation: `Contain`
- Value: `Acme`

Use case: update prices for products whose status exactly matches `active`.

- Attribute: `status`
- Operation: `Is Equal to`
- Value: `active`

## Configure Actions

Actions define which price field should be updated for matching products.

### Action screen

Inside the rule editor:

1. open the **Action** tab
2. choose the required **Channel**
3. choose the required **Locale**
4. click **Add Attribute**
5. fill in the action row
6. click **Save Action**

### Action fields

Each action row currently contains:

- **Attribute**: a product attribute of type `price`
- **Currency**: one of the currencies assigned to the selected channel
- **Value**: the numeric amount that should be written

### Important behavior

- Actions are also saved separately for each channel and locale.
- The module writes the provided value directly into the selected product value path.
- The current implementation is best suited for direct price assignment, not formula-based discount logic.

### Example action setup

- Attribute: `price`
- Currency: `USD`
- Value: `499`

This means matching products will get `499` written into the selected channel, locale, and currency-specific price value.

## Run a Rule

You can run rules from the admin grid.

### Run a single rule

On the listing page, click the **play/execute** icon for the required rule.

### Run multiple rules

1. select multiple rows from the grid
2. choose **Mass Execute**

### What happens after execution

- the controller calls the Artisan command
- the Artisan command dispatches a queue job
- the queue job finds matching products
- product IDs are split into chunks
- chunk jobs update the target price attribute values

Because execution is queued, make sure your queue worker is active.

## CLI Command

This module provides the following Artisan command:

```bash
php artisan unopim:price-rule:run {rule_id}
```

Example:

```bash
php artisan unopim:price-rule:run 5
```

### What the command does

- accepts one required argument: `rule_id`
- dispatches the `ApplyPriceRule` job
- prints a confirmation message in the terminal

## Queue and Logs

### Queue jobs used by the module

The module dispatches:

- `ApplyPriceRule`
- `ApplyPriceRuleToProducts`

### History tab

Each rule also has a **History** tab in the editor. This is useful for reviewing saved changes on the rule record itself.

### Execution logs

Rule execution logs are written into the storage directory in a tracker folder.

Pattern:

```text
storage/logs/rule-tracker/{execution_id}/rule.log
```

The module also writes messages into the default Laravel log output.

### If logs are missing

Check:

- queue worker is running
- `storage/` is writable
- Laravel logs are not failing because of server permissions

## Permissions

This module defines permissions for:

- viewing pricing rules
- creating rules
- editing rules
- deleting rules
- mass deleting rules

If a user cannot access the page or buttons, review the assigned admin role permissions.

## Troubleshooting

### Rule runs but no products are updated

Check these points:

1. the rule has both saved conditions and saved actions
2. the selected attribute names are correct
3. the chosen channel and locale match actual product data
4. the queue worker is running
5. the selected action attribute is a valid price-type attribute

### Rule execution starts but changes do not appear

Check:

1. the price value is being saved in the expected channel, locale, and currency path
2. product save events are running normally
3. no later process is overwriting the updated values

### Condition matching feels too limited

That is expected in the current version. The module currently supports:

- `Contain`
- `Is Equal to`

If you need more operators such as greater than, less than, or category-based logic in execution, those would need to be added in code.

### The rule does not appear in the grid

The listing removes incomplete rules where conditions or actions are missing. If you created a code but did not finish setup, complete the condition and action tabs first.

## Best Practices

1. Create a small test rule first and run it on known products.
2. Use a clear rule code such as `b2b-price-usd-update` or `channel-sale-price`.
3. Keep one business purpose per rule instead of mixing many unrelated changes.
4. Verify channel, locale, and currency before saving actions.
5. Keep queue workers monitored in production.
6. Review execution logs after large updates.
7. Back up product data before running bulk pricing changes in production.

## Hosted Documentation

For hosted docs, use these two files:

- [index.md](./index.md)
- [sidebar.json](./sidebar.json)
