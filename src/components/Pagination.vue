<template>
    <div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">

      <!-- PAGINATION -->
        <div class="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
        <div class="flex flex-1 justify-between sm:hidden">
            <button @click="prev()" :disabled="paginate.page > 1" class="relative inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10 disabled:opacity-75">Previous 1</button>
            <button @click="next()" class="relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10">Next</button>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
            <p class="text-sm text-gray-300">
                Showing
                <span class="font-medium">{{ countItems.prevItems }}</span>
                to
                <span class="font-medium">{{ countItems.currentTotal }}</span>
                of
                <span class="font-medium">{{ paginate.totalItems }}</span>
                results
            </p>
            </div>
            <div>
            <nav aria-label="Pagination" class="isolate inline-flex -space-x-px rounded-md">
                <button @click="prevPage()" v-if="paginate.page > 1" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 disabled:opacity-75">
                    <span class="sr-only">Previous 2</span>
                    <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
                        <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" fill-rule="evenodd" />
                    </svg>
                </button>
                <!-- Current: "z-10 text-white focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-500 focus-visible:outline-indigo-500", Default: "inset-ring focus:outline-offset-0 text-gray-200 inset-ring-gray-700 hover:bg-white/5" -->

                <!-- aqui empieza -->
                <!-- <button aria-current="page" class="relative z-10 inline-flex items-center bg-indigo-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">1</button>
                <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">2</a>
                <a href="#" class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
                <span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 inset-ring inset-ring-gray-700 focus:outline-offset-0">...</span>
                <a href="#" class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
                <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">9</a>
                <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">10</a> -->

                
                <button v-for="page in countItems.pages" aria-current="page" 
                :class="{'bg-indigo-500': page === paginate.page, 'hover:bg-white/5' : page != paginate.page && typeof page == 'number' }"
                @click="clickPage(page)"
                class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 focus:z-20 focus:outline-offset-0">{{ page }}</button>
                <button @click="nextPage()" v-if="paginate.totalPages > paginate.page" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">
                    <span class="sr-only">Next </span>
                    <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
                        <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
                    </svg>
                </button>
            </nav>
            </div>
        </div>
        </div>

        <!-- PAGINATION -->
    </div>
</template>
<script setup>

import {ref, computed, onMounted} from 'vue'
const props = defineProps(['paginate', 'itemsCount'])
const emit = defineEmits(['changePaginate'])

const countItems = computed(() => {
    if (props.paginate.totalPages == props.paginate.page){
        return {
            prevItems: props.paginate.totalItems - props.itemsCount + 1,
            currentTotal: props.paginate.totalItems,
            pages: props.paginate.totalPages
        }
    }else {
        return {
            prevItems: props.paginate.page == 1 ? 1 : (props.itemsCount * (props.paginate.page-1)) + 1,
            currentTotal: props.paginate.page == 1 ? props.itemsCount : (props.itemsCount * props.paginate.page),
            pages: Math.round(props.paginate.totalItems / props.itemsCount)

        } 
    }
    
})

const clickPage = (newPage) => {
    if(props.paginate.page != newPage && typeof newPage == 'number'){
        console.log(`change page from ${props.paginate.page} to ${newPage}`)
        emit('changePaginate', {page: newPage})
    }
}

const nextPage = () => {
    console.log(`change next page from ${props.paginate.page} to ${props.paginate.page +1 }`)
    emit('changePaginate', {page: props.paginate.page + 1})
}

const prevPage = () => {

    console.log(`change prev page from ${props.paginate.page} to ${props.paginate.page - 1 }`)

    emit('changePaginate', {page: props.paginate.page - 1})
}


// falta prevenir que si hay mas de 6 paginas, que solo imprima las primeras 3 y las ultimas tres y en medio ponga puntos suspensivos
</script>   