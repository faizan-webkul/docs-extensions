import { defineConfig, type DefaultTheme } from 'vitepress'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function loadSidebar(project: string): DefaultTheme.SidebarItem[] {
  const path = resolve(__dirname, `../${project}/sidebar.json`)
  if (!existsSync(path)) return []
  try {
    return JSON.parse(readFileSync(path, 'utf-8')) as DefaultTheme.SidebarItem[]
  } catch (e) {
    console.warn(`[sidebar] failed to parse ${path}:`, e)
    return []
  }
}

const projects = [
  { slug: 'shopify', label: 'Shopify' },
  { slug: 'magento2', label: 'Magento 2' },
  { slug: 'odoo-erp', label: 'Odoo ERP' },
  { slug: 'bigcommerce', label: 'BigCommerce' },
  { slug: 'shopware6', label: 'Shopware 6' },
  { slug: 'woocommerce', label: 'WooCommerce' },
  { slug: 'bagisto', label: 'Bagisto' },
  { slug: 'cs-cart', label: 'CS-Cart' },
  { slug: 'prestashop', label: 'PrestaShop' },
  { slug: 'icecat', label: 'Icecat' },
  { slug: 'xml-connector', label: 'XML Connector' },
  { slug: 'aws-integration', label: 'AWS Integration' },
  { slug: 'ai-product-feed-openai', label: 'AI Product Feed (OpenAI)' },
  { slug: 'job-scheduler', label: 'Job Scheduler' },
  { slug: 'supplier-data-portal', label: 'Supplier Data Portal' },
  { slug: 'public-image-url', label: 'Public Image URL' },
  { slug: 'maker-checker-workflow', label: 'Maker Checker Workflow' },
  { slug: 'pdf-generator', label: 'PDF Generator' },
  { slug: 'dam', label: 'DAM' },
  { slug: 'starter-pack', label: 'Starter Pack' },
] as const

export default defineConfig({
  title: 'Unopim Extensions',
  description: 'Documentation for Unopim extensions and connectors',
  base: '/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Extensions',
        items: projects.map(p => ({ text: p.label, link: `/${p.slug}/` })),
      },
    ],
    sidebar: Object.fromEntries(
      projects.map(p => [`/${p.slug}/`, loadSidebar(p.slug)])
    ),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/unopim' },
    ],
    search: {
      provider: 'local',
    },
  },
})
