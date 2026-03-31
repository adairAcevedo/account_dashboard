<template>
  <BaseLayout title="" >
    <div class="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-white">{{t("welcome.index")}}</h1>
    </div>
  </BaseLayout>
</template>
<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import { useI18n } from 'vue-i18n';
const {t, locale} = useI18n()

</script>