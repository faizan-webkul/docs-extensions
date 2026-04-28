<template>
  <div class="gt-wrapper" title="Translate this page" aria-label="Translate this page">
    <div id="google_translate_element"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

function initGoogleTranslate() {
  if (typeof window === 'undefined') return

  window.googleTranslateElementInit = () => {
    if (!window.google || !window.google.translate) return
    // eslint-disable-next-line no-new
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      'google_translate_element'
    )
  }

  const existing = document.querySelector('script[src*="translate_a/element.js"]')
  if (!existing) {
    const script = document.createElement('script')
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.defer = true
    document.body.appendChild(script)
  } else if (window.google && window.google.translate) {
    window.googleTranslateElementInit()
  }
}

onMounted(() => {
  setTimeout(initGoogleTranslate, 50)
})
</script>

<style scoped>
.gt-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  line-height: 1;
}

.gt-wrapper :deep(#google_translate_element) {
  display: inline-flex;
  align-items: center;
  line-height: 1;
}

.gt-wrapper :deep(.goog-te-gadget) {
  font-size: 0 !important;
  color: transparent !important;
  line-height: 1 !important;
}

.gt-wrapper :deep(.goog-te-gadget-simple) {
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  margin: 0 !important;
  background: none !important;
  border: none !important;
  font-size: 0 !important;
  line-height: 1 !important;
  cursor: pointer !important;
}

.gt-wrapper :deep(.goog-te-gadget-simple > span) {
  display: none !important;
}

.gt-wrapper :deep(.goog-te-gadget-simple img) {
  width: 20px !important;
  height: 20px !important;
  margin: 0 !important;
  vertical-align: middle !important;
  filter: none;
  transition: transform 0.15s ease;
}

.gt-wrapper:hover :deep(.goog-te-gadget-simple img) {
  transform: scale(1.1);
}
</style>

<style>
/* Global: hide Google's injected top banner and keep body anchored. */
.goog-te-banner-frame.skiptranslate,
.goog-logo-link,
.goog-te-gadget .goog-logo-link {
  display: none !important;
}

body {
  top: 0 !important;
}

.goog-te-menu-frame {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
  max-width: 90vw !important;
}
</style>
