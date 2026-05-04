# Maker Checker Workflow

The **Maker Checker Workflow** extension adds a structured approval process to Unopim for both products and DAM assets. Changes made by a **Maker** are saved as a draft and must be reviewed and approved by one or more **Checkers** before going live — preventing unreviewed data from entering the published catalog.

## How it works

```
Maker edits product/asset
        ↓
   Saved as Draft
        ↓
Maker sends for Approval
        ↓
Checker reviews (side-by-side diff)
        ↓
  Approve / Reject
        ↓
 Publish → Goes Live
```

Each step is tracked in a visual workflow, and all participants receive real-time and email notifications at every stage.

## Key features

- **Products & DAM assets** — approval workflow covers both product catalog changes and digital asset updates.
- **Configurable approval levels** — set the minimum number of approvals required before a draft can be published.
- **Side-by-side comparison** — checkers see original and draft values next to each other before acting.
- **Exclude attributes** — whitelist specific attributes (e.g., price, status) to skip the approval cycle entirely.
- **Comments** — makers and checkers can leave comments on individual attributes throughout the review.
- **Approval history** — full log of all configuration changes, approval actions, and who performed them.
- **Notifications** — real-time in-app alerts and email notifications on approval, rejection, publish, and comments.
- **Permission-based access** — only users with the correct role permissions can approve, reject, or publish.

## Roles

| Role | Responsibilities |
|---|---|
| **Maker** | Creates or edits products/assets; sends drafts for approval |
| **Checker** | Reviews drafts; approves, rejects, or publishes them |

A user can hold both roles depending on their permissions.

## Requirements

- Unopim v2.0.0 or higher
- PHP 8.3+, Laravel 12.x
- Queue worker running (for email notifications)

## In this guide

- [Installation](./installation)
- [Configuration](./configuration)
- [Maker Guide](./maker-guide)
- [Checker Guide](./checker-guide)
