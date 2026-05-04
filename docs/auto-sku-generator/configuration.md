# Configuration

Navigate to **Admin Panel → Auto SKU Generator → Configuration** to set up your SKU generation rules.

## Settings reference

### General

| Field | Description |
|---|---|
| **Enable Auto SKU Generator** | Master toggle. When off, no SKUs are auto-generated and the product form behaves normally. |
| **Read-only SKU field** | When on, the SKU input on the product creation form is locked and cannot be edited manually. Useful when you want all SKUs to come exclusively from the generator. |

### SKU Format

| Field | Description |
|---|---|
| **Prefix** | Fixed string prepended to every generated SKU (e.g., `PROD`, `WK`). Leave blank for no prefix. |
| **Suffix** | Fixed string appended to every generated SKU (e.g., `2024`, `INT`). Leave blank for no suffix. |
| **Separator** | Character used to join the parts of a SKU. Choose `_` (underscore) or `-` (hyphen). |
| **Locale** | Locale used when reading translatable attribute values for SKU parts. Select the locale your attribute options are defined in. |

### Sequence

| Field | Description |
|---|---|
| **Start Sequence** | The number the auto-increment counter starts from (minimum 1). Changing this resets the current counter to the new value. |

::: warning
Changing the **Start Sequence** resets the internal counter immediately. Make sure no duplicate SKUs will result before saving.
:::

### Attribute-based Parts

The **Generator Options** field lets you select one or more `select` or `multiselect` product attributes whose values will be included as parts of the SKU.

For example, selecting the `color` attribute means the chosen color option value (e.g., `RED`, `BLUE`) will be inserted between the prefix and the sequence number.

Only `select` and `multiselect` attribute types are available here, as they have discrete option values that translate cleanly into SKU parts.

## Live preview

Click **Preview SKU** on the configuration page to see a sample SKU generated with your current settings — without incrementing the sequence counter. Use this to verify the format before saving.

The generated SKU format follows:

```
[prefix][separator][attribute value(s)][separator][sequence][suffix]
```

**Example** — Prefix: `WK`, Separator: `-`, Attribute: color (`RED`), Sequence starts at `1`:

```
WK-RED-1
```

**Example** — Prefix: `PROD`, Separator: `_`, No attributes, Sequence starts at `100`:

```
PROD_100
```

## Saving settings

Click **Save Configuration** to persist your settings. The next product created with a blank SKU will use the updated rules.
