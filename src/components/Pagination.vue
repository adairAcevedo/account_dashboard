<template>
    <div :class="class" class="mx-auto px-4 py-6 sm:px-6 lg:px-8">

      <!-- PAGINATION -->
        <div class="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
        <div class="flex flex-1 justify-between sm:hidden">
            <button @click="prevPage()" :disabled="paginate.page == 1" class="relative inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10 disabled:opacity-75">Previous</button>
            <button  @click="nextPage()" v-if="paginate.totalPages > paginate.page" class="relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10">Next</button>
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

import {computed} from 'vue'
const props = defineProps(['paginate', 'itemsCount', 'class'])
const emit = defineEmits(['changePaginate'])
const space = "..."
const countItems = computed(() => {
    if (props.paginate.totalPages == props.paginate.page){
        return {
            prevItems: props.paginate.totalItems - props.itemsCount + 1,
            currentTotal: props.paginate.totalItems,
            pages: calculatePages(props.paginate.totalPages, props.paginate.page)
        }
    }else {
        return {
            prevItems: props.paginate.page == 1 ? 1 : (props.itemsCount * (props.paginate.page-1)) + 1,
            currentTotal: props.paginate.page == 1 ? props.itemsCount : (props.itemsCount * props.paginate.page),
            pages: calculatePages(props.paginate.totalPages, props.paginate.page)
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
    console.log(`change next page from ${props.paginate.page} to ${props.paginate.page + 1 }`)
    emit('changePaginate', {page: props.paginate.page + 1})
}

const prevPage = () => {

    console.log(`change prev page from ${props.paginate.page} to ${props.paginate.page - 1 }`)

    emit('changePaginate', {page: props.paginate.page - 1})
}


const calculatePages = (total, current)=>{
    // Caso 1: 7 páginas o menos
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    // Caso 2: Cerca del inicio (1, 2, 3,4,5)
    if (current <= 5) return [1, 2, 3, 4, 5, '...', total];

    // Caso 3: Cerca del final (ajustado para que no sobre la última elipsis)
    // Si la página actual es 96 de 100, mostrará [1, '...', 96, 97, 98, 99, 100]
    if (current >= total - 4) {
        const lastPages = Array.from({ length: 5 }, (_, i) => total - 4 + i);
        return [1, '...', ...lastPages];
    }

    // Caso 4: En el medio
    return [1, '...', current, current + 1, current + 2, '...', total];
}


</script>   