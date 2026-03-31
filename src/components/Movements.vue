<template>
    <div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <div class="grid grid-cols-12 gap-x-6 px-0 py-3 border-b border-gray-200 dark:border-white/10">
        <div class="col-span-6 flex items-center gap-x-1 cursor-pointer group" @click="clickSort('description')">
          <p class="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white group-hover:text-gray-500 dark:text-gray-400">Descripciòn</p>
          <ArrowsUpDownIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field != 'description'" />
          <ArrowDownIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field =='description' && sortList.direction =='desc'"/>
          <ArrowUpIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field =='description' && sortList.direction =='asc'"/>
        </div>
        <div class="col-span-3 flex items-center gap-x-1 cursor-pointer group" @click="clickSort('created_at')">
          <p class="text-xs font-semibold uppercase tracking-wider dark:text-white group-hover:text-gray-500 dark:text-gray-400">Fecha</p>
          <ArrowsUpDownIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field != 'created_at'" />
          <ArrowDownIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field =='created_at' && sortList.direction =='desc'"/>
          <ArrowUpIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field =='created_at' && sortList.direction =='asc'"/>

        </div>
        <div class="col-span-3 flex items-center gap-x-1 cursor-pointer group" @click="clickSort('amount')">
          <p class="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white group-hover:text-gray-500 dark:text-gray-400">Monto</p>
          <ArrowsUpDownIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field != 'amount'"/>
          <ArrowDownIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field =='amount' && sortList.direction =='desc'"/>
          <ArrowUpIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field =='amount' && sortList.direction =='asc'"/>

        </div>
      </div>
      <div>
          <ul role="list" class="divide-y divide-white/5" v-for="movement in movements" :key="movement.uid">
            <li class="grid grid-cols-12 gap-x-6 py-5 items-center gap-x-6 py-5 hover:bg-gray-700" >
              <div class="col-span-6 flex min-w-0 gap-x-4 px-5">
                <div class="min-w-0 flex-auto">
                  <p class="text-sm/6 font-semibold text-white">{{ movement.description }}</p>
                </div>
              </div>
              <div class="col-span-3">
                <p class="mt-1 text-xs/5 text-white dark:text-gray-400">{{ formatDate(movement.created_at)}}
                </p>
              </div>
              <div class="col-span-3 text-right">
                <p class="text-sm/6 text-white"> {{ getAmount(movement.amount) }}</p>
              </div>
            </li>
          </ul>
      </div>
        
    </div>
</template>
<script setup>
const props = defineProps(['movements', 'sortList', 'isLoading'])
const emit = defineEmits(['changeSort']);
import { centsToUnits, formatDate, convertionCurrency } from '@/utils/methods';
import {ArrowsUpDownIcon, ArrowDownIcon, ArrowUpIcon} from '@heroicons/vue/24/outline'
import {computed, onMounted} from 'vue'

import {useCurrentConfigStore} from '@/stores/configStore'
const currenConfigStore = useCurrentConfigStore();


const sortNextDirections = {
  desc: 'asc',
  asc: 'desc'
}

const clickSort = (field) => {

  let directionValue = getDirectionValue(field)
  emit('changeSort', {field: field, direction: directionValue})
}

const getDirectionValue = (field) => {
  if(props.sortList.field === field){
    return sortNextDirections[props.sortList.direction]
  }
  return 'desc'
}

const getAmount = (amount) => {
  return convertionCurrency({amount: amount,base_currency: currenConfigStore.baseCurrency, current_currency: currenConfigStore.selectedCurrency,currencies: currenConfigStore.currencies, exchangesCurrencies: currenConfigStore.currenciesConversion})
}
// make a component, to represente arrows funcionality
// make a fade card to represent data loading
</script>