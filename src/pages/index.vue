<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div>
    <TheDocumentView path="home" name="index" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
