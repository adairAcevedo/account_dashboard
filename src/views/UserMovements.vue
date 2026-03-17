<template>
  <BaseLayout :title="title">
    <div class="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <h2 class="text-lg text-red-300">{{ errorMsj }}</h2>
    </div>
    
    <Movements :movements="movements" :isLoading="isLoading" :sortList="sort" @change-sort="handleChangeSort"/>
    <Pagination :pagination="pagination"/>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import Movements from '@/components/Movements.vue';
import Pagination from '@/components/Pagination.vue';
import movementsData from '../utils/movements_example.json'
import { authStore } from '@/stores/authStore';
import {ref, onMounted} from 'vue'
import { get, clientMovementsURL } from '@/utils/methods';

onMounted(async () => await getMovements())

let title = ref("Movimientos")
let errorMsj = ref("");
let isLoading = ref(true);
let movements = ref([]);
let pagination = ref({});
let sort = ref({field: 'created_at', direction: 'desc'});
let currentPage = ref(1);

const getMovements = async (params = {}) =>{
  let query = {
    page: params['page'] ? params.page : currentPage.value,
    sortBy: params['field'] ? params.field : sort.value.field,
    sortDirection: params['direction'] ? params.direction : sort.value.direction
  }

  let response = await get(clientMovementsURL,query, {'Authorization': `${authStore.token}`})

  validGetMovements(response);
  
} 

const validGetMovements = (response) =>{
  if(response instanceof Error){
    errorMsj.value = "Error, not get movements"
    isLoading.value = false;
    return 0;
  }

  if(Object.hasOwn(response, 'errorMsj')){
    errorMsj.value = response['errorMsj']
    isLoading.value = false;
    return 0;
  }
  pagination.value = response.res['pagination']
  movements.value = response.res['records']
  isLoading.value = false;
}

const handleChangeSort = (updateSort) => {
  console.log('updateSort value ',updateSort)
  isLoading.value = true
  sort.value ={...updateSort}

  getMovements(
    {
      page: currentPage.value,
      field: updateSort.field,
      direction: updateSort.direction
    }
  )
}



</script>