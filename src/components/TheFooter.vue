<script setup lang="ts">
// const { t, locale } = useI18n()

// async function toggleLocales() {
//   // change to some real logic
//   const locales = availableLocales
//   const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
//   await loadLanguageAsync(newLocale)
//   locale.value = newLocale
// }
</script>

<template>
  <nav flex="~ gap-4" mt-6 justify-center text-xl>
    <!-- <RouterLink icon-btn to="/" :title="t('button.home')"> -->
    <RouterLink icon-btn to="/" title="Home">
      <div i-carbon-home />
    </RouterLink>

    <!-- <button icon-btn :title="t('button.toggle_dark')" @click="toggleDark()">
      <div i="carbon-sun dark:carbon-moon" />
    </button> -->

    <!-- <a icon-btn :title="t('button.toggle_langs')" @click="toggleLocales()">
      <div i-carbon-language />
    </a> -->

    <!-- <RouterLink icon-btn :title="t('button.editor')" to="/admin/editor"> -->
    <RouterLink icon-btn title="Editor" to="/admin/editor">
      <div i-carbon-pen />
    </RouterLink>
  </nav>
</template>
