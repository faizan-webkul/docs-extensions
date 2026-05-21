# If something doesn't work

**The CS-Cart menu is missing.**
Your role doesn't have CS-Cart permission. Ask an admin to grant it in **Settings → Roles** — see [Installation → Give your role permission](./installation#_6-give-your-role-permission).

**The credential won't save — *Unable to connect to CS-Cart*.**
CS-Cart rejected the API call. Check, in order:

1. The **Shop URL** is reachable from your UnoPim server (try `curl https://your-store.com` on the UnoPim box).
2. The **Admin Email** belongs to an active CS-Cart admin with API access enabled.
3. The **API Key** matches the one shown in CS-Cart *User Profile → API*.
4. *(Multi-Vendor)* The **Company ID** matches the vendor company in CS-Cart.

**Export profile validation fails — *Locale mapping is missing*.**
Open the credential, switch to the **Locale Mapping** tab, and map every UnoPim locale you selected in the export filter. See [Map locales](./locale-mapping).

**Export profile validation fails — *Required attribute mapping is missing*.**
Open the credential, switch to the **Attribute Mapping** tab, and fill in every row that has a red **Required** badge — at minimum Product Code, Product Name, Price, and Quantity Amount. See [Map attributes](./attribute-mapping).

**Job is stuck on *queued*.**
The background worker isn't running. Ask your developer to start `php artisan queue:work` or to check Supervisor / Horizon.

**Product export finishes but no images are showing in CS-Cart.**
CS-Cart couldn't download the image URL. Almost always because UnoPim isn't reachable from CS-Cart's server — `localhost`, `127.0.0.1`, and private IPs won't work. See [Export products → Media requirements](./export-products#media-requirements).

**Product export fails for a specific product — *CS-Cart returned 422*.**
A field value didn't pass CS-Cart's validation — usually a price that's not a number, an empty required field, or an attribute option that doesn't exist in CS-Cart. Open the tracker row's **Errors** panel for the exact field, or `storage/logs/laravel.log` for the full response.

**Quick Export action doesn't appear in the products list.**
One of:

1. No credential is marked **Default for quick Export** — open *CS-Cart → Credentials → edit → Credential Settings* and turn it on.
2. Your role doesn't have **Export to CS-Cart** permission.
3. Refresh the page — the action list loads once when the page opens.

**A UnoPim attribute is missing from the Attribute Mapping dropdown.**
The dropdown only lists attributes whose **type** matches the CS-Cart field. Check the attribute in *Catalog → Attributes* — change its type to match what CS-Cart expects, or pick a different attribute. See [Map attributes → Picking an attribute](./attribute-mapping#picking-an-attribute).

**Locale dropdown on the Locale Mapping tab is empty / missing a language.**
The connector fetches the language list live from CS-Cart. Install the missing language in CS-Cart at *Administration → Languages* and reopen the tab.

**Import created duplicate products in UnoPim.**
The SKUs in CS-Cart differ from what's already in UnoPim. The connector matches by SKU — if the same product was imported under a slightly different SKU, you'll get two UnoPim entries. Standardize on one SKU and remove the duplicates manually.

**Mapping changes don't take effect on the running export.**
By design — the export uses the mapping that was in place when it was queued. Wait for the run to finish, then start a fresh export to pick up the new mapping.
