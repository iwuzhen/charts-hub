<script setup lang="ts">
const props = defineProps<{
  path: string
  name: string
}>()
</script>

<template>
  <TheDocumentView :path="props.path" :name="props.name" />
</template>
