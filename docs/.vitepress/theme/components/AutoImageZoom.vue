<!--
  AutoImageZoom.vue
  Attaches click-to-zoom to every <img> rendered inside the doc body
  (.vp-doc img), without requiring authors to wrap images in
  <ImagePopup>. Re-binds after every VitePress route change.

  Visual style mirrors components/ImagePopup.vue so manual and auto
  zoom feel identical.
-->
<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="aiz-overlay"
      role="dialog"
      aria-modal="true"
      :aria-label="alt || 'Image preview'"
      @click.self="close"
    >
      <div class="aiz-wrapper">
        <button
          type="button"
          class="aiz-close"
          aria-label="Close image preview"
          @click="close"
        >
          &#x2715;
        </button>
        <img :src="src" :alt="alt" class="aiz-image" />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

const open = ref(false)
const src = ref('')
const alt = ref('')

let attached: HTMLImageElement[] = []

function onImageClick(event: Event) {
  const img = event.currentTarget as HTMLImageElement
  src.value = img.currentSrc || img.src
  alt.value = img.alt || ''
  open.value = true
}

function shouldZoom(img: HTMLImageElement): boolean {
  // Skip images that are themselves inside a link — the link should win.
  if (img.closest('a')) return false
  // Skip tiny / decorative images (icons, emoji, badges).
  if (img.naturalWidth && img.naturalWidth < 80) return false
  // Skip images explicitly opted out.
  if (img.dataset.noZoom !== undefined) return false
  return true
}

function bind(img: HTMLImageElement) {
  if ((img as any).__aizBound) return
  ;(img as any).__aizBound = true
  img.style.cursor = 'zoom-in'
  img.addEventListener('click', onImageClick)
  attached.push(img)
}

function unbindAll() {
  for (const img of attached) {
    img.removeEventListener('click', onImageClick)
    delete (img as any).__aizBound
  }
  attached = []
}

function scan() {
  if (typeof document === 'undefined') return
  const imgs = document.querySelectorAll<HTMLImageElement>('.vp-doc img')
  imgs.forEach((img) => {
    if (shouldZoom(img)) bind(img)
  })
}

function close() {
  open.value = false
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

watch(open, (isOpen) => {
  if (typeof document === 'undefined') return
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
  } else {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', onKey)
  }
})

watch(
  () => route.path,
  () => {
    unbindAll()
    nextTick(() => {
      // Wait one more frame so VitePress finishes rendering the new page.
      requestAnimationFrame(scan)
    })
  }
)

onMounted(() => {
  nextTick(() => requestAnimationFrame(scan))
})

onBeforeUnmount(() => {
  unbindAll()
  if (typeof document === 'undefined') return
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKey)
})
</script>

<style scoped>
.aiz-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 10, 30, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 99999;
  animation: aiz-fade-in 0.2s ease;
}

.aiz-wrapper {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  animation: aiz-zoom-in 0.25s ease;
}

.aiz-image {
  display: block;
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.aiz-close {
  position: absolute;
  top: -18px;
  right: -18px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand, #8b5cf6);
  color: #fff;
  border: 2px solid #fff;
  border-radius: 50%;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: background 0.15s ease, transform 0.15s ease;
}

.aiz-close:hover,
.aiz-close:focus-visible {
  background: var(--vp-c-brand-dark, #5a1bb1);
  transform: scale(1.05);
  outline: none;
}

@media (max-width: 600px) {
  .aiz-close {
    top: 8px;
    right: 8px;
  }
}

@keyframes aiz-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes aiz-zoom-in {
  from { transform: scale(0.85); opacity: 0; }
  to   { transform: scale(1);    opacity: 1; }
}
</style>
