# Checker Guide

A **Checker** is an admin user with approval permissions. Checkers review drafts submitted by makers and decide whether to approve, reject, or publish them.

## Viewing approval requests

Navigate to **Maker Checker → Approval Requests** to see all pending requests. The grid shows:

| Column | Description |
|---|---|
| Entity | Product SKU or asset name |
| Type | Product or Asset |
| Status | Current workflow stage |
| Requested By | The maker who submitted the draft |
| Reviewed By | Checkers who have already acted on this request |
| Actions | Open the draft comparison page |

Filter by status to focus on requests that need action.

## Reviewing a draft

Click **View** on any request to open the **draft comparison page**. This page shows the original (published) values and the draft (proposed) values side by side for every attribute.

- Attributes highlighted in the diff have changed values.
- Attributes excluded in configuration are not shown here — they were applied directly.
- Scroll through each section (General, Attributes, Images, etc.) to review all changes.

## Reading comments

Before acting, check the **Comment Details** panel on the comparison page. It shows:
- Any notes the maker left on specific attributes.
- Comments from other checkers who already approved or acted on this request.
- A full timeline of all actions taken on the draft so far.

## Actions

### Approve

Click **Approve** to record your approval. If the draft has reached the **minimum approvals** threshold set in configuration, the **Publish** button becomes available. If more approvals are still needed, the request stays in review and the next checker is notified.

### Reject

Click **Reject** to decline the request. You can (and should) leave a comment explaining the reason. The maker is notified immediately and the draft is returned to them for revision.

### Publish

Once the minimum number of approvals is reached, click **Publish** to apply the draft changes to the live product or asset. The published version immediately reflects the maker's changes, and all participants receive a publish notification.

## Commenting

You can leave comments on individual attributes from the comparison page at any stage — before approving, after approving, or before rejecting. This keeps the review conversation in context of the specific data being changed.

To add a comment:
1. Click the comment icon on any attribute row.
2. Type your note and submit.
3. The maker and other checkers receive a notification.

## Notifications

As a checker you receive notifications when:
- A new draft is submitted for approval.
- A maker re-submits a previously rejected draft.
- Another checker approves or rejects a request you are also reviewing.
- A draft you acted on is published.

Notifications appear in the header bell icon in real time. Email notifications are also sent if enabled in configuration.

## What checkers cannot do

- Edit the draft content — only the maker can modify the draft.
- Approve their own submissions — a maker cannot also act as checker for their own draft.
- Publish without the required number of approvals being met.
