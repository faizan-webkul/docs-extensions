<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import DefaultTheme from 'vitepress/theme'
import GoogleTranslate from './components/GoogleTranslate.vue'

const { Layout } = DefaultTheme

let observer: MutationObserver | null = null

function scrollActiveTocIntoView() {
  const active = document.querySelector('.VPDocAsideOutline .outline-link.active')
  if (active && (active as HTMLElement).scrollIntoView) {
    ;(active as HTMLElement).scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }
}

onMounted(() => {
  scrollActiveTocIntoView()
  const toc = document.querySelector('.VPDocAsideOutline')
  if (toc) {
    observer = new MutationObserver(() => scrollActiveTocIntoView())
    observer.observe(toc, { subtree: true, attributes: true, attributeFilter: ['class'] })
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <div class="vp-nav-icons">
        <a
          class="vp-nav-icon vp-nav-icon--github"
          href="https://github.com/unopim"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="UnoPim on GitHub"
          title="GitHub"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path fill="currentColor" d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.19.69-3.87-1.54-3.87-1.54-.52-1.32-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.04 11.04 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.82 1.19 3.08 0 4.43-2.69 5.41-5.25 5.69.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.13 0 .31.21.68.8.56C20.22 21.38 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5Z"/>
          </svg>
        </a>
        <GoogleTranslate class="vp-nav-icon vp-nav-icon--translate" />
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.vp-nav-icons {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding-left: 0.75rem;
}

.vp-nav-icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
  border-radius: 9999px;
  color: var(--vp-c-text-1);
  transition: background-color 0.2s ease, color 0.2s ease;
}

.vp-nav-icon::before {
  content: '';
  position: absolute;
  left: -0.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 1.25rem;
  background-color: var(--vp-c-divider);
  pointer-events: none;
}

.vp-nav-icon:hover {
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-brand);
}

.vp-nav-icon :deep(img),
.vp-nav-icon :deep(svg) {
  display: block;
}
</style>
