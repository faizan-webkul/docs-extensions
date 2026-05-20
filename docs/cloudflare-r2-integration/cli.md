# CLI Commands

| Command | What it does |
|---|---|
| `cloudflare-r2-package:install` | One-shot installer — deps + migration + assets. |
| `cloudflare_r2:move_existing_files` | Migrate existing local product / category media to R2. |
| `cloudflare_r2:remove_media_files` | Delete local copies after a successful migration. |
| `cloudflare_r2:export-media` | Sync media to R2 (queue-aware). |
| `cloudflare_r2:export-static-content` | Sync static assets to R2 (queue-aware). |

## move_existing_files

The main migration command.

```bash
php artisan cloudflare_r2:move_existing_files [options]
```

Options:

| Flag | What it does |
|---|---|
| `--dry-run` | List files without uploading. |
| `--prefix=public/product/cat-1` | Limit to one local folder. |
| `--resume` | Resume from the last checkpoint. |
| `--metadata-only` | Write mapping rows only — no upload. |

## remove_media_files

```bash
php artisan cloudflare_r2:remove_media_files
```

Asks for confirmation, then verifies each file exists on R2 before deleting the local copy.

## export-media / export-static-content

Both accept `--isqueue=1` to dispatch the work to the queue:

```bash
php artisan cloudflare_r2:export-media --isqueue=1
php artisan cloudflare_r2:export-static-content --isqueue=1
```
