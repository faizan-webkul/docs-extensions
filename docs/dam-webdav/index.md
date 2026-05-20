# DAM NextCloud

The **DAM NextCloud** extension turns your UnoPim Digital Asset Management library into a folder that any **Nextcloud** client can mount and sync — without giving the user access to the rest of UnoPim.

## The problem this solves

Your DAM holds thousands of brand assets organised into directories — campaigns, products, regions, partners. You frequently need to share a slice of it with someone outside your team:

- A freelance designer who needs *only* the `Campaigns/SS26/` folder, read-only.
- An agency working on a single product line who should see *only* their directory.
- A field photographer who must drop new shoots into one inbox folder, but never browse the rest.
- A reviewer who needs read-only access to deliverables for one week.

Without this extension you have two bad options: invite them as a full UnoPim admin (over-permissioned, scary), or zip-and-email assets back and forth (slow, no audit trail, drift).

DAM WebDAV gives you a third option: hand them a **Nextcloud account** that points only at the directory you choose, in the direction you choose, for as long as you choose.

## Who it's for

- **DAM managers / brand teams** who collaborate with external designers, agencies, photographers, retouchers, or reviewers.
- **PIM admins** who want to expose a subset of the DAM without writing custom integrations.
- **IT / DevOps** who already run Nextcloud-compatible tooling and want UnoPim to play in the same ecosystem.

## A real example

> *"We don't want to share our whole DAM and directories with every external designer. So we hand them a Nextcloud client connection — read-only, scoped to one folder. They sync that folder to their laptop, work on it, and we revoke the credential when the project ends. No screen-sharing, no zip files, no surprises."*

The flow:

1. DAM admin creates a **Credential** for the designer.
2. Binds it to a **Sync Profile** with direction = **Pull only** and root = `Campaigns/SS26/`.
3. Sends the designer the Nextcloud login-flow URL (or QR code on a mobile device).
4. Designer signs in via Nextcloud Desktop or Nextcloud iOS/Android — the folder appears as a synced drive.
5. Designer sees `Campaigns/SS26/` and **nothing else**. Cannot create, modify, or delete (read-only).
6. Project ends — admin disables the credential. Designer's client immediately loses access on the next sync tick.

## Benefits

- **Least-privilege sharing** — one credential = one directory. Everything else stays invisible.
- **Direction control** — Pull only (read), Push only (drop-zone), or Two-way (collaboration) per credential.
- **No new accounts in UnoPim** — credentials are WebDAV users, not admin users; they can't log into the admin panel.
- **Audit trail** — every read, write, conflict, and error logged in [Activity](./activity).
- **Soft-delete safety net** — accidental deletes go to [Trash](./trash), retained 30 days.
- **Native Nextcloud experience** — the freelancer uses the official Nextcloud Desktop or mobile app they already know; no UnoPim-specific tool to learn.
- **Revocable in one click** — disable a credential and all their sessions die immediately.

## How it works

Once installed, UnoPim publishes a **Nextcloud-compatible** WebDAV mount at `/remote.php/dav/files/<username>/` and the Nextcloud login-flow-v2 endpoints. The official Nextcloud apps connect via QR code or browser-grant — no manual URL typing.

Files dropped into a mounted folder land inside the DAM directory bound to that user's **Sync Profile**. Files deleted from the client are soft-deleted into **Trash**, recoverable until purged.

## Key features

- **Per-user credentials** — each WebDAV user maps to one DAM directory through a Sync Profile, isolated from every other user.
- **Nextcloud login-flow-v2** — connect Nextcloud Desktop / mobile by scanning a QR code; no client-secret juggling.
- **Direction modes** — Two-way / Push only / Pull only, set per Sync Profile.
- **Remote Sources** — pull from external Nextcloud-compatible servers on a schedule; mirror their contents into the DAM.
- **Sync Activity log** — every push, pull, conflict, and error timestamped and filterable.
- **Trash with restore** — soft-delete with one-click restore until purged by the configured retention.
- **Instant revocation** — disable a credential to kill all its active sessions.

## Requirements

- **UnoPim** 2.0 or higher
- **PHP** 8.3+
- **`unopim/dam`** 2.0+
- An nginx (or Apache) reverse proxy that forwards WebDAV verbs (PROPFIND, MKCOL, MOVE, COPY, LOCK, UNLOCK, REPORT, SEARCH) to PHP-FPM unmodified.

## In this guide

- [Installation](./installation)
- [Use Cases](./use-cases)
- [Dashboard](./dashboard)
- [Credentials](./credentials)
- [Sync Profiles](./sync-profiles)
- [Remote Sources](./remote-sources)
- [Activity](./activity)
- [Trash](./trash)
- [Settings](./settings)
- [Nextcloud Clients](./nextcloud-clients)
