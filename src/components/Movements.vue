<template>
    <div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <div class="flex justify-between gap-x-6 px-0 py-3 border-b border-gray-200 dark:border-white/10">
    <div class="flex min-w-0 gap-x-4">
      <div class="size-3 flex-none"></div> 
      <div class="min-w-0">
        <p class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Descripcion</p>
      </div>
    </div>
    <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
      <p class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Monto</p>
    </div>
  </div>
        <div>
            <ul role="list" class="divide-y divide-white/5" v-for="movement in movements" :key="movement.uid">
              <li class="flex justify-between gap-x-6 py-5 hover:bg-gray-700" >
                <div class="flex min-w-0 gap-x-4 px-5">
                  <div class="min-w-0 flex-auto">
                    <p class="text-sm/6 font-semibold text-white">{{ movement.description }}</p>
                  </div>
                </div>
                <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p class="text-sm/6 text-white">$ {{ centsToUnits(movement.amount) }}</p>
                </div>
              </li>
            </ul>
        </div>
        
    </div>
</template>
<script setup>
import {ref} from 'vue'
const props = defineProps(['movements'])
// import movementsData from '../utils/movements_example.json'
import { centsToUnits } from '@/utils/methods';
// import { onMounted } from 'vue'
// import { get, clientMovementsURL } from '@/utils/methods';

const pagination = ref({});

</script>