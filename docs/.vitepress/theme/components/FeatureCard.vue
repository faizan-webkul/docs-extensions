<template>
  <component
    :is="href ? 'a' : 'div'"
    class="feature-card"
    :href="href || null"
    :target="href && external ? '_blank' : null"
    :rel="href && external ? 'noopener noreferrer' : null"
  >
    <div v-if="icon" class="feature-card__icon">{{ icon }}</div>
    <div class="feature-card__body">
      <h3 v-if="title" class="feature-card__title">{{ title }}</h3>
      <p v-if="description" class="feature-card__desc">{{ description }}</p>
      <div v-if="$slots.default" class="feature-card__slot">
        <slot />
      </div>
    </div>
  </component>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  icon: { type: String, default: '' },
  href: { type: String, default: '' },
  external: { type: Boolean, default: false },
})
</script>

<style scoped>
.feature-card {
  display: flex;
  gap: 0.85rem;
  padding: 1rem 1.1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
}

a.feature-card:hover {
  border-color: var(--vp-c-brand, #8b5cf6);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.12);
}

.feature-card__icon {
  font-size: 1.6rem;
  line-height: 1;
  flex-shrink: 0;
}

.feature-card__body {
  min-width: 0;
}

.feature-card__title {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border: none;
  padding: 0;
}

.feature-card__desc {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.feature-card__slot {
  margin-top: 0.4rem;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
}
</style>
