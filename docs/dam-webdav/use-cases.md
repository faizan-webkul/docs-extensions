# Use Cases

All scenarios use the **Nextcloud client** (Desktop or mobile). The DAM admin creates a Credential + Sync Profile per scenario, then hands the user the Nextcloud login-flow URL or QR code.

## 1. Read-only share with an external designer

You don't want to expose the whole DAM to a freelance designer. Create a Credential, bind it to a Sync Profile with **direction = Pull only** and root = `Campaigns/SS26/`. Send the designer the Nextcloud login URL. The designer opens Nextcloud Desktop, signs in, and sees only that one folder — read-only. When the project ends, disable the credential.

## 2. Drop-zone for an outside agency

An agency needs to deliver final assets but should not browse anything else. Create a Sync Profile with **direction = Push only** and root = `Inbox/AcmeAgency/`. The agency syncs *into* that folder; deletes from the DAM never touch their local copy. You see every drop in [Activity](./activity).

## 3. Two-way collaboration with a partner team

A long-running co-creation project needs both sides editing. Create a Sync Profile with **direction = Two-way** and root = `Partners/CoLab/`. Both sides use Nextcloud Desktop; conflicts are visible in Activity and follow the profile's conflict policy.

## 4. Field photographer mobile uploads

A photographer shooting on location uploads from a phone. Create a Push-only profile rooted at `Field/Drops/`. Send the QR code from the credential's Edit page. The photographer scans it from Nextcloud iOS / Android — auto-upload of camera photos lands directly in the DAM over LTE.

## 5. Time-boxed reviewer access

A reviewer needs to check deliverables for one week. Create a Pull-only profile rooted at `Review/Q2/`. Set `expires_at` on the credential so it auto-revokes after 7 days. No manual cleanup.

## 6. Mirror an external Nextcloud (Remote Source)

A partner runs their own Nextcloud and wants you to ingest their `Deliverables/` folder nightly. Add it as a [Remote Source](./remote-sources) with a 6-hour schedule and pull-only direction. The DAM stays in sync with the partner's folder; no human intervention.

## 7. Restore an asset deleted by an external user

A designer accidentally deletes a master file from their synced folder. The asset moves to [Trash](./trash) (retained 30 days). The DAM admin clicks **Restore**; the file reappears in the designer's Nextcloud client on the next sync tick.
