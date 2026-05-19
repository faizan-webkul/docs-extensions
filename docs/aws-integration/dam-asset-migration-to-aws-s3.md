# DAM Asset Migration to AWS S3

If you use **UnoPim DAM** together with the **AWS S3 Integration**, you can move DAM asset files from the local private disk to your configured **Amazon S3** bucket.

This is useful when:

- your DAM assets were uploaded before AWS S3 was enabled,
- you want DAM files to be served from the same S3 storage as the rest of your media,
- you want to reduce storage usage on the local server after a successful migration.

## Command Signature

Run the following Artisan command from your UnoPim project:

```bash
php artisan unopim:dam:move-asset-to-s3
```

## Before You Start

Make sure the following setup is already complete:

1. The **AWS Integration** module is installed and configured.
2. Your **Amazon S3 bucket** is reachable with valid credentials.
3. The **UnoPim DAM** module is installed and working correctly.
4. The DAM assets you want to migrate are still available on the local private disk.

If your AWS setup is not ready yet, complete these guides first:

- [Setup Credentials in Amazon S3](./setup-amazon.md)
- [AWS S3 Setup in UnoPim](./aws-s3-setup-in-unopim.md)

## Authentication Required

For security, this command requires valid **admin credentials** before the migration begins.

During execution, you will be prompted to enter:

- your **admin email**,
- your **admin password**.

Access is granted only if those credentials belong to an admin user in UnoPim.

> [!NOTE]
> Keep the terminal session private while entering credentials, especially on shared servers or staging environments.

## What the Command Prompts For

After authentication, the command asks how you want to handle the migration.

## What You Will See in the Terminal

During execution, the command prompts you in this order:

```bash
Enter your Email:
> admin@example.com

Enter your Password:
>

Want to migrate only new uploaded files from your local to s3 (yes/no):
>

Migrate New only flag: No

Want to delete files from local once uploaded to s3? (yes/no):
>

Delete flag: No
Starting migration to aws
10/10 [============================] 100%
Done Moving DAM Assets.
```

This confirms that the command:

- authenticates the admin user first,
- asks whether only new files should be migrated,
- asks whether local files should be deleted after upload,
- then starts the DAM asset transfer to Amazon S3.

### Migrate Only New Files

The command asks whether you want to migrate only files that are not already present on S3.

- Choose **Yes** when you want to upload only newly added or still-unmigrated DAM assets.
- Choose **No** when you want the command to process the full DAM asset set again.

This is helpful when you run the migration regularly and want to avoid reprocessing files that already exist in S3.

### Delete Local Files After Upload

The command also asks whether local files should be deleted after a successful upload to S3.

- Choose **Yes** to free local server storage after the migration completes successfully.
- Choose **No** if you want to keep the local files as a backup copy.

> [!CAUTION]
> Delete local files only after you confirm the migrated DAM assets are accessible from Amazon S3.

## Recommended Migration Flow

Use this order in production:

1. Run the command.
2. Authenticate with a valid admin account.
3. Start with **migrate only new files = Yes** if you are doing an incremental migration.
4. Keep **delete local files = No** on the first run.
5. Verify that DAM asset files are opening correctly from S3.
6. Run the command again with local-file deletion only when you are fully confident in the migration result.

## After Migration

After the command finishes:

- verify a few DAM assets from the admin panel,
- confirm the files exist in your S3 bucket,
- check whether old local files should remain for backup or be removed in a follow-up run.

If you also need the DAM-side view of this process, see [DAM Asset Migration to AWS S3](../dam/dam-asset-migration-to-aws-s3.md).
