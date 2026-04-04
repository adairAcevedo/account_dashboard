<template>
    <div class="mx-auto px-4 py-6 sm:px-6 lg:px-8" :class="class">
      <div class="grid grid-cols-12 gap-x-6 px-0 py-3 border-b border-gray-200 dark:border-white/10">
        <div class="col-span-1 flex items-center gap-x-1 cursor-pointer group" @click="clickSort('nombre')">
          <p class="text-sm font-semibold  tracking-wider text-gray-900 dark:text-white group-hover:text-gray-500 dark:text-gray-400">{{t("user.name")}}</p>
          <ArrowsUpDownIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field != 'nombre'" />
          <ArrowDownIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field =='nombre' && sortList.direction =='desc'"/>
          <ArrowUpIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field =='nombre' && sortList.direction =='asc'"/>
        </div>
        <div class="col-span-2 flex items-center gap-x-1 cursor-pointer group" @click="clickSort('segundo_nombre')">
          <p class="text-sm font-semibold  tracking-wider text-gray-900 dark:text-white group-hover:text-gray-500 dark:text-gray-400">{{t("user.second_name")}}</p>
          <ArrowsUpDownIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field != 'segundo_nombre'" />
          <ArrowDownIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field =='segundo_nombre' && sortList.direction =='desc'"/>
          <ArrowUpIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field =='segundo_nombre' && sortList.direction =='asc'"/>
        </div>
        <div class="col-span-2 flex items-center gap-x-1 cursor-pointer group" @click="clickSort('apellido')">
          <p class="text-sm font-semibold  tracking-wider text-gray-900 dark:text-white group-hover:text-gray-500 dark:text-gray-400">{{t("user.last_name")}}</p>
          <ArrowsUpDownIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field != 'apellido'" />
          <ArrowDownIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field =='apellido' && sortList.direction =='desc'"/>
          <ArrowUpIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field =='apellido' && sortList.direction =='asc'"/>
        </div>
        <div class="col-span-2 flex items-center gap-x-1 cursor-pointer group" @click="clickSort('segundo_apellido')">
          <p class="text-sm font-semibold  tracking-wider text-gray-900 dark:text-white group-hover:text-gray-500 dark:text-gray-400">{{t("user.second_last_name")}}</p>
          <ArrowsUpDownIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field != 'segundo_apellido'" />
          <ArrowDownIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field =='segundo_apellido' && sortList.direction =='desc'"/>
          <ArrowUpIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field =='segundo_apellido' && sortList.direction =='asc'"/>
        </div>
        <div class="col-span-2 flex items-center gap-x-1 cursor-pointer group" @click="clickSort('email')">
          <p class="text-sm font-semibold  tracking-wider dark:text-white group-hover:text-gray-500 dark:text-gray-400">{{t("email")}}</p>
          <ArrowsUpDownIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field != 'email'" />
          <ArrowDownIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field =='email' && sortList.direction =='desc'"/>
          <ArrowUpIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field =='email' && sortList.direction =='asc'"/>
        </div>

        <div class="col-span-2 flex items-center gap-x-1 cursor-pointer group" @click="clickSort('created_at')">
          <p class="text-sm font-semibold  tracking-wider dark:text-white group-hover:text-gray-500 dark:text-gray-400">{{t("user.created_at")}}</p>
          <ArrowsUpDownIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field != 'created_at'" />
          <ArrowDownIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field =='created_at' && sortList.direction =='desc'"/>
          <ArrowUpIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="sortList.field =='created_at' && sortList.direction =='asc'"/>
        </div>
        
        <div class="col-span-1 flex items-center gap-x-1 cursor-pointer group">
          <p class="text-sm font-semibold  tracking-wider dark:text-white group-hover:text-gray-500 dark:text-gray-400">{{ t('user.status') }}</p>
        </div>
      </div>
      <div>
          <ul role="list" class="divide-y divide-white/5" v-for="user in users" :key="user.uid">
            <li class="grid grid-cols-12 gap-x-6 py-5 items-center gap-x-6 py-5 hover:bg-gray-700 cursor-pointer" @click="clickItem(user)">
              <div class="col-span-1 flex min-w-0 gap-x-4 px-5">
                <div class="min-w-0 flex-auto">
                  <p class="text-sm/6 font-semibold text-white">{{ user.nombre }}</p>
                </div>
              </div>
              <div class="col-span-2 flex min-w-0 gap-x-4 px-5">
                <div class="min-w-0 flex-auto">
                  <p class="text-sm/6 font-semibold text-white">{{ user.segundo_nombre }}</p>
                </div>
              </div>
              <div class="col-span-2 flex min-w-0 gap-x-4 px-5">
                <div class="min-w-0 flex-auto">
                  <p class="text-sm/6 font-semibold text-white">{{ user.apellido }}</p>
                </div>
              </div>
              <div class="col-span-2 flex min-w-0 gap-x-4 px-5">
                <div class="min-w-0 flex-auto">
                  <p class="text-sm/6 font-semibold text-white">{{ user.segundo_apellido }}</p>
                </div>
              </div>
              <div class="col-span-2 flex min-w-0 gap-x-4 px-5">
                <div class="min-w-0 flex-auto">
                  <p class="text-sm/6 font-semibold text-white">{{ user.email }}</p>
                </div>
              </div>
              <div class="col-span-2 flex min-w-0 gap-x-4 px-5">
                <div class="min-w-0 flex-auto">
                  <p class="text-sm/6 font-semibold text-white">{{ formatDate(user.created_at) }}</p>
                </div>
              </div>
              <div class="col-span-1 flex min-w-0 gap-x-4 px-5">
                <span :class="{'text-green-400 bg-green-400/10 inset-ring-green-500/20': user.active, 'bg-gray-400/10 text-gray-400 inset-ring-gray-400/20': !user.active}" class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium inset-ring ">{{user.active ? t('user.active') : t('user.inactive')}} </span>
              </div>
              
            </li>
          </ul>
      </div>
        
    </div>
</template>
<script setup>
const props = defineProps(['users', 'sortList', 'isLoading', 'class'])
const emit = defineEmits(['changeSort', 'goItem']);
import {ArrowsUpDownIcon, ArrowDownIcon, ArrowUpIcon} from '@heroicons/vue/24/outline'
import {formatDate} from '@/utils/methods'
import { useI18n } from 'vue-i18n';
const {t} = useI18n()
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

const clickItem=(item) => {
  emit('goItem', {item: item})
}

// make a component, to represente arrows funcionality
// make a fade card to represent data loading
</script>