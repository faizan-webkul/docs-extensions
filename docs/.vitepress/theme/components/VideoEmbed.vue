<template>
  <div class="video-embed">
    <iframe
      :src="embedUrl"
      :title="title"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy"
    ></iframe>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  title: { type: String, default: 'Embedded video' },
})

// Accept: raw YouTube URL, youtu.be short link, loom.com share URL, or a full embed URL.
const embedUrl = computed(() => {
  const s = props.src.trim()
  const yt = s.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`
  const loom = s.match(/loom\.com\/share\/([\w-]+)/)
  if (loom) return `https://www.loom.com/embed/${loom[1]}`
  return s
})
</script>

<style scoped>
.video-embed {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin: 1.25rem 0;
  border-radius: 10px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
}

.video-embed iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
