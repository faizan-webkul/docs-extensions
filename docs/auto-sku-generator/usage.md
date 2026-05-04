# Using the SKU Generator

Once [configured](./configuration), the Auto SKU Generator works transparently during the normal product creation workflow.

## Simple products

1. Go to **Catalog → Products → Create Product** and select the **Simple** type.
2. Leave the **SKU** field blank.
3. Fill in the rest of the product details — including any attribute values you mapped in the generator options (e.g., color, size).
4. Click **Save**. The extension generates a SKU automatically before the product is stored.

The generated SKU appears on the product edit page and in the product listing immediately after saving.

## Live SKU preview on the product form

As you fill in attribute values on the product creation form, the SKU field updates in real time to show the SKU that will be generated. This gives you a chance to review the output before committing.

The preview does **not** consume a sequence number — the counter only increments when the product is actually saved.

## Configurable product variants

When adding a new variant to a configurable product:

1. Open a configurable product and go to the **Variants** section.
2. Add a new variant and leave its **SKU** field blank.
3. Save the product. Each new variant with an empty SKU receives a unique auto-generated SKU.

Variants that already have a SKU assigned are not touched.

## Manual override

If you type a SKU into the SKU field yourself, the auto-generator will not overwrite it. The rule is simple: **if the field has a value when the product is saved, that value is kept as-is.**

This lets you auto-generate SKUs for most products while still manually assigning SKUs for special cases.

## Read-only mode

If **Read-only SKU field** is enabled in the configuration, the SKU input on the product form is disabled — it cannot be edited. All SKUs come exclusively from the generator. This is useful when you want to enforce strict catalog consistency across all users.

## Troubleshooting

**SKU field is not being auto-filled**
- Confirm the generator is set to **Enabled** in the configuration.
- Check that the SKU field is actually blank when you save — a space counts as a value.

**Generated SKU is missing attribute parts**
- Make sure you selected the attributes in **Generator Options** and that those attributes have values set on the product before saving.
- Confirm the correct **Locale** is selected in the configuration so attribute option labels resolve correctly.

**Sequence is not incrementing as expected**
- The sequence only increments when a product is saved with an auto-generated SKU. Manual SKUs do not advance the counter.
- If you changed **Start Sequence**, the counter resets to the new value from that point forward.
