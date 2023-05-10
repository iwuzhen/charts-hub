<script>
export default {
  name: 'LogOutput',
  props: {
    logs: {
      type: Array,
      required: true,
    },
  },
}
</script>

<template>
  <div>
    <div v-for="log in logs" :key="log.id" class="log-item">
      {{ log.message }}
    </div>
  </div>
</template>

  <style>
  .log-item {
    display: block;
  }
  </style>
