# If something doesn't work

**The DeepL menu is missing.**
Your role doesn't have DeepL permission. Ask an admin to grant it in **Settings → Roles**.

**The DeepL Translate button isn't showing on a field.**
Walk through this list — the first reason is the most common:

1. Is **AI Translate** ticked on the field? See [Mark fields](./attribute-setup).
2. Is the field a **Text** or **Textarea**?
3. Does your role have DeepL translate permission?
4. Is at least one DeepL key turned **on** in [Credentials](./credentials)?

**A field is missing from the bulk-translate or wizard list.**
Same checks as above, plus the field needs **Value Per Locale** turned on. Open the attribute, fix it, save, and reopen the wizard.

**The job is stuck on *queued*.**
The background worker isn't running. Ask your developer to start it.

**Auto-translate isn't running after import.**
Open your **default** key. Check **Enable Auto Translate** is on and the **Mapping** is filled in. See [Credentials](./credentials).

**A language is being skipped.**
DeepL doesn't support that language. See [Supported languages](./supported-locales).

**The credential won't save.**
DeepL rejected your API key. The error message tells you why — usually a typo, an exhausted quota, or rate-limiting. See [Credentials](./credentials).

**Bulk action shows *Bulk action context not available*.**
Refresh the products page and re-tick the rows.

**The agent says *No translatable source content found*.**
The product has no text in that source language, or the field list you picked has nothing on this product. See [AI agent](./agentic-pim).
