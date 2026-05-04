# Configuration

Navigate to **Admin Panel → Maker Checker → Configuration** to set up the workflow. The configuration page has two tabs: **General** and **Users**.

## General tab

### Enable Maker Checker

Master toggle for the entire workflow. When disabled:
- Products and assets save and publish immediately without going through any approval process.
- The Users tab is inaccessible until the workflow is re-enabled.

### Minimum Approvals Required

The number of checker approvals a draft must collect before the **Publish** action becomes available. For example, setting this to `2` means two different checkers must approve a draft before it can go live.

::: warning
Changing this value affects all existing in-progress drafts immediately — their stage is recalculated against the new threshold.
:::

### Exclude Attributes (Whitelist)

Select product attributes that should bypass the approval cycle entirely. Changes to these attributes are applied directly to the published product without creating a draft.

Common candidates: `price`, `status`, `stock`, `sku`. Use this to keep high-velocity operational fields out of the review queue while still protecting content-heavy attributes like descriptions and images.

### Notify Users

Toggle email notifications on or off globally. When enabled, all participants (makers and checkers) receive emails on approval, rejection, publish, and new comments.

Click **Save** to apply changes. A history log at the bottom of the page records every configuration change with a timestamp and the user who made it.

---

## Users tab

Lists all admin users who have the checker permissions (`approve`, `reject`, `publish`) assigned to their role. This tab is read-only — to change who can act as a checker, update role permissions under **Settings → Roles**.

The tab is only accessible when the Maker Checker workflow is enabled. Navigating to it while the workflow is disabled redirects back with a warning.

---

## Setting up checker permissions

Checker actions are permission-controlled. To grant a user checker access:

1. Go to **Settings → Roles** and open or create the checker role.
2. Enable the following permissions under **Maker Checker**:
   - `maker_checker.approval_requests.approve`
   - `maker_checker.approval_requests.reject`
   - `maker_checker.approval_requests.publish`
3. Assign the role to the relevant admin users.

Users without these permissions can still create and edit products (acting as makers) but will not see the approve/reject/publish actions on the draft comparison page.
