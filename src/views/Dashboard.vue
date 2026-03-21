<template>
  <BaseLayout title="" >
    <div class="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <h2 class="text-lg text-red-300">{{ errorMsj }}</h2>
      <h1 class="text-white">Welcome</h1>
    </div>
  </BaseLayout>
</template>
<script setup>
import BaseLayout from '@/components/BaseLayout.vue';

import {onMounted} from "vue"
// get the current route to mark current with true
const navigation = [{ name: 'Users', route: 'Users', current: false }]
// let title= ref('')

</script>