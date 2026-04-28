<template>
  <div class="steps-root">
    <slot />
  </div>
</template>

<script setup>
// Steps is a thin wrapper. Inside it, each top-level ordered-list item
// is rendered with a numbered badge and a left rail connecting them.
// Usage in markdown:
//
// <Steps>
//
// 1. First, do this.
// 2. Then this.
//
// </Steps>
</script>

<style scoped>
.steps-root :deep(ol) {
  counter-reset: step;
  list-style: none;
  padding-left: 0;
  margin: 1.25rem 0;
  border-left: 2px solid var(--vp-c-divider);
}

.steps-root :deep(ol > li) {
  counter-increment: step;
  position: relative;
  padding: 0 0 1.25rem 2.75rem;
  margin-left: -1px;
}

.steps-root :deep(ol > li:last-child) {
  padding-bottom: 0.25rem;
}

.steps-root :deep(ol > li::before) {
  content: counter(step);
  position: absolute;
  left: -15px;
  top: -2px;
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--vp-c-brand, #8b5cf6);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 0 0 4px var(--vp-c-bg, #fff);
}

.steps-root :deep(ol ol),
.steps-root :deep(ol ul) {
  border-left: none;
  padding-left: 1.25rem;
  margin: 0.5rem 0;
}

.steps-root :deep(ol ol > li),
.steps-root :deep(ol ul > li) {
  padding-left: 0;
}

.steps-root :deep(ol ol > li::before),
.steps-root :deep(ol ul > li::before) {
  display: none;
}
</style>
