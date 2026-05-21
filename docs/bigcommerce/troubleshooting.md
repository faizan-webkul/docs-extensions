# If something doesn't work

**The BigCommerce menu is missing.**
Your role doesn't have BigCommerce permission. Ask an admin to grant it in **Settings → Roles** — see [Installation → Give your role permission](./installation#_6-give-your-role-permission).

**The credential won't save — *Unable to connect to BigCommerce*.**
BigCommerce rejected the API call. Check, in order:

1. **API URL** is the full path including your store hash — looks like `https://api.bigcommerce.com/stores/<store-hash>/`.
2. **Access Token** matches the one BigCommerce showed when the API account was created. If you've lost it, you can't recover it — create a new API account.
3. **Client ID** and **Client Secret** match the same API account.
4. The API account has the required **scopes** — *Products* (Modify for export, Read-only for import) and *Information & Settings* (Read-only).
5. The API account in BigCommerce hasn't been **deleted** or revoked.

**Credential dropdown on an export / import profile is empty.**
Only **active** credentials appear. Open the credential and flip **Status** to active.

## Job validator errors

**Export profile validation fails — *Required mapping is missing*.**
Open the [Standard mapping](./standard-mapping) page for the selected credential and fill in every row marked required (at minimum Name, SKU, Price).

**Configurable export validation fails — *No variant option types configured*.**
Open [Other mapping](./other-mapping) for the selected credential and pick at least one UnoPim attribute under **Variant option types**.

## Runtime failures

**Job is stuck on *queued*.**
The background worker isn't running. Start `php artisan queue:work` or check Supervisor / Horizon.

**Product export fails for a specific product — *BigCommerce returned 422*.**
A field value didn't pass BigCommerce's validation — usually a price that's not a positive number, an empty required field, or a variant option value that doesn't exist on the parent. Open the tracker row's **Errors** panel for the exact field, or `storage/logs/laravel.log` for the full response.

**Product export fails — *BigCommerce returned 409 Conflict on SKU*.**
The SKU is already in use on the BigCommerce store but assigned to a different product. Either change the UnoPim SKU or delete the conflicting product in BigCommerce.

**Image upload fails — *BigCommerce rejected the file*.**
Common causes: unsupported file type (BigCommerce accepts JPEG, PNG, GIF), file size over BigCommerce's limit, or a path with characters BigCommerce doesn't accept. Re-encode the image and re-run.

**Categories landed under the wrong parent.**
The parent didn't exist when the child was processed. Re-run the [Export categories](./export-categories) job — the second pass picks up the parent and moves the children.

**Variant axis attribute is missing from the *Variant option types* dropdown.**
The dropdown only lists attributes that exist on the active credential's data scope. Check the attribute in *Catalog → Attributes* — make sure it's enabled and reachable for the products you're exporting.

**Import created duplicate products in UnoPim.**
The SKUs in BigCommerce don't match what's already in UnoPim. The connector matches by SKU — if the same product was imported under a slightly different SKU, you'll get two UnoPim entries. Standardize on one SKU and remove the duplicates manually.

**Custom field disappeared after export.**
Probably the source attribute had no value for that product. The connector skips custom fields with empty values — set a value or use a fixed default to keep them in.

**Mapping changes don't take effect on the running export.**
By design — the export uses the mapping that was in place when it was queued. Wait for the run to finish, then start a fresh export to pick up the new mapping.

**A locale-specific value lands as the default value in BigCommerce.**
Open the credential edit page and verify **Locale Mapping** maps your UnoPim locale to a BigCommerce locale. Unmapped locales fall back to the default locale on the credential.
