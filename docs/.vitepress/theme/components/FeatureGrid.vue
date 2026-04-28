<template>
  <div class="feature-grid" :style="gridStyle">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  columns: { type: [Number, String], default: 3 },
  minWidth: { type: String, default: '240px' },
})

const gridStyle = computed(() => ({
  '--fg-columns': String(props.columns),
  '--fg-min': props.minWidth,
}))
</script>

<style scoped>
.feature-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(var(--fg-min), 100%), 1fr)
  );
  gap: 1rem;
  margin: 1.25rem 0;
}

@media (min-width: 960px) {
  .feature-grid {
    grid-template-columns: repeat(var(--fg-columns), minmax(0, 1fr));
  }
}
</style>
