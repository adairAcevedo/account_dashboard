<template>
  <BaseLayout :title="title" >
    <div class="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-white">{{t("welcome.index")}}</h1>
    </div>
  </BaseLayout>
</template>
<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import { useI18n } from 'vue-i18n';
import {computed} from 'vue'
import {authStore} from '@/stores/authStore'
const {t} = useI18n()

let title = computed(() =>   
  authStore.isAdmin ? t("admin.dashboard") : t("dashboard")
)

</script>