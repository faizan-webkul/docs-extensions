<template>
  <div class="image-popup">
    <img
      :src="src"
      :alt="alt"
      class="thumbnail"
      loading="lazy"
      @click="open = true"
    />

    <Teleport to="body">
      <div
        v-if="open"
        class="overlay"
        role="dialog"
        aria-modal="true"
        :aria-label="alt || 'Image preview'"
        @click.self="open = false"
      >
        <div class="image-wrapper">
          <button
            type="button"
            class="close-btn"
            aria-label="Close image preview"
            @click="open = false"
          >
            &#x2715;
          </button>
          <img :src="src" :alt="alt" class="popup-image" />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
})

const open = ref(false)

const onKey = (e) => {
  if (e.key === 'Escape') open.value = false
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

onBeforeUnmount(() => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKey)
})
</script>

<style scoped>
.image-popup {
  display: block;
}

.thumbnail {
  cursor: zoom-in;
  max-width: 100%;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.thumbnail:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.18);
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 10, 30, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 99999;
  animation: ip-fade-in 0.2s ease;
}

.image-wrapper {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  animation: ip-zoom-in 0.25s ease;
}

.popup-image {
  display: block;
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.close-btn {
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

.close-btn:hover,
.close-btn:focus-visible {
  background: var(--vp-c-brand-dark, #5a1bb1);
  transform: scale(1.05);
  outline: none;
}

@media (max-width: 600px) {
  .close-btn {
    top: 8px;
    right: 8px;
  }
}

@keyframes ip-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes ip-zoom-in {
  from { transform: scale(0.85); opacity: 0; }
  to   { transform: scale(1);    opacity: 1; }
}
</style>
