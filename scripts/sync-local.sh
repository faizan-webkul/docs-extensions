#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# sync-local.sh — mirror what .github/workflows/deploy.yml does, locally.
#
# Clones each project repo into tmp/{slug} with a sparse + blobless checkout
# (fast — only docs/ blobs fetched on demand) and copies docs/ into
# docs/{slug}/. If a repo has no docs/, the placeholder is preserved.
#
# Usage:
#   ./scripts/sync-local.sh           # sync all projects
#   ./scripts/sync-local.sh shopify   # sync one project
#
# Env:
#   GIT_REF  override branch/tag (default: main)
# ---------------------------------------------------------------------------
set -euo pipefail

# slug:repo pairs — keep aligned with .github/workflows/deploy.yml
PROJECTS=(
  "shopify:unopim/unopim-shopify"
  "magento2:unopim/unopim-magento2"
  "odoo-erp:unopim/unopim-odoo-erp"
  "bigcommerce:unopim/unopim-bigcommerce"
  "shopware6:unopim/unopim-shopware6"
  "woocommerce:unopim/unopim-woocommerce"
  "bagisto:unopim/unopim-bagisto"
  "cs-cart:unopim/unopim-cs-cart"
  "prestashop:unopim/unopim-prestashop"
  "icecat:unopim/unopim-icecat"
  "xml-connector:unopim/unopim-xml-connector"
  "aws-integration:unopim/unopim-aws-integration"
  "ai-product-feed-openai:unopim/unopim-ai-product-feed-openai"
  "job-scheduler:unopim/unopim-job-scheduler"
  "supplier-data-portal:unopim/unopim-supplier-data-portal"
  "public-image-url:unopim/unopim-public-image-url"
  "maker-checker-workflow:unopim/unopim-maker-checker-workflow"
  "pdf-generator:unopim/unopim-pdf-generator"
  "dam:unopim/unopim-dam"
  "starter-pack:unopim/unopim-starter-pack"
)

REF="${GIT_REF:-main}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FILTER="${1:-}"

cd "$ROOT"
mkdir -p tmp

for entry in "${PROJECTS[@]}"; do
  slug="${entry%%:*}"
  repo="${entry##*:}"

  if [ -n "$FILTER" ] && [ "$FILTER" != "$slug" ]; then
    continue
  fi

  echo "==> $slug ($repo @ $REF)"
  rm -rf "tmp/$slug"

  if ! git clone \
        --depth 1 \
        --filter=blob:none \
        --sparse \
        --branch "$REF" \
        "https://github.com/${repo}.git" \
        "tmp/$slug" 2>/dev/null; then
    echo "    skip — repo unavailable or branch '$REF' missing"
    continue
  fi

  (cd "tmp/$slug" && git sparse-checkout set docs >/dev/null)

  src="tmp/$slug/docs"
  dst="docs/$slug"

  if [ -d "$src" ] && [ -n "$(ls -A "$src" 2>/dev/null)" ]; then
    cp -R "$src"/. "$dst"/
    echo "    staged $(find "$src" -type f | wc -l) files into $dst"
  else
    echo "    no docs/ in source — placeholder kept"
  fi
done

echo
echo "Done. Run 'npm run docs:dev' to preview."
