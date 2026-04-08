<template>
    <div :class="class" class="flex items-center gap-x-1 cursor-pointer group" @click="sort(fieldName)">
          <p class="text-sm font-semibold tracking-wider text-gray-900 dark:text-white group-hover:text-gray-500 dark:text-gray-400">{{ textHeader }} </p>
          <ArrowsUpDownIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="fieldOrder != fieldName" />
          <ArrowDownIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="fieldOrder == fieldName && fieldDirection =='desc'"/>
        <ArrowUpIcon class="size-3.5 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-500" v-if="fieldOrder == fieldName && fieldDirection =='asc'"/>
    </div>
</template>
<script setup>
import {ArrowsUpDownIcon, ArrowUpIcon, ArrowDownIcon} from '@heroicons/vue/24/outline'

const props = defineProps(['class', 'fieldOrder', 'fieldName', 'textHeader', 'fieldDirection' ])
const emit = defineEmits(['clickHeaderSort'])

const sort = (field) => {
    emit('clickHeaderSort', field)
}

</script>