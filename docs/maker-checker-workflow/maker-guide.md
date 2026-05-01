# Maker Guide

A **Maker** is any admin user who creates or edits products and assets. When the Maker Checker workflow is enabled, changes are no longer applied directly — they are saved as a draft and must be sent for review.

## Creating a product

1. Go to **Catalog → Products → Create Product**, select a type, and fill in the product details as normal.
2. Click **Save**. Instead of publishing immediately, the product is saved in **Draft** state.
3. On the product edit page, click **Send for Approval** to submit the draft to the checker queue.

## Editing an existing product

1. Open any published product from **Catalog → Products**.
2. Make your changes and click **Save**. The existing published product is untouched — your changes are captured in a new draft.
3. Click **Send for Approval** when you are ready for review.

Until you send for approval, the draft is only visible to you and is not in the checker queue.

## Working with DAM assets

The same workflow applies to DAM assets:

1. Upload a new asset or edit an existing one in **DAM**.
2. Changes are saved as a draft — the live asset is not modified.
3. Click **Send for Approval** to submit the asset draft for review.

Asset renames also go through the approval workflow — renaming via right-click creates a draft rename request rather than applying immediately.

## Tracking your drafts

Go to **Maker Checker → Approval Requests** to see all requests you have submitted. Each row shows:

| Column | Description |
|---|---|
| Entity | The product SKU or asset name |
| Type | Product or Asset |
| Status | Draft / In Review / Approved / Rejected / Published |
| Submitted At | When you sent it for approval |
| Actions | View the draft comparison page |

## Commenting on a draft

On the draft comparison page, you can leave comments on individual attributes to provide context for the checker. Click the comment icon next to any attribute row to add a note. Checkers will see your comments alongside the diff.

## After rejection

If a checker rejects your draft:
1. You receive a notification (in-app and email if enabled).
2. Open the draft from **Approval Requests** to read the rejection reason or comments.
3. Edit the product/asset again — your changes update the existing draft.
4. Click **Send for Approval** again to re-submit.

## What makers cannot do

- Approve, reject, or publish drafts (checker permissions required).
- Edit a product that has an in-progress draft submitted by another user.
- Bypass the draft — all saves go through the workflow while it is enabled.
