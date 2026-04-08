<template>
  <div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
    <div class="grid grid-cols-12 gap-x-6 px-0 py-3 border-b border-gray-200 dark:border-white/10">
      <HeaderList class="col-span-6" :field-order="sortList.field" :field-direction="sortList.direction" field-name="description" :text-header="t('movements.description')" @click-header-sort="clickSort"/>
      <HeaderList class="col-span-3" :field-order="sortList.field" :field-direction="sortList.direction" field-name="created_at" :text-header="t('movements.date')" @click-header-sort="clickSort"/>
      <HeaderList class="col-span-3" :field-order="sortList.field" :field-direction="sortList.direction" field-name="amount" :text-header="t('movements.amount')" @click-header-sort="clickSort"/>
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
import {formatDate, convertionCurrency } from '@/utils/methods';
import {useCurrentConfigStore} from '@/stores/configStore'
import { useI18n } from 'vue-i18n';
import HeaderList from './lists/HeaderList.vue';

const {t} = useI18n();
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

// make a fade card to represent data loading
</script>