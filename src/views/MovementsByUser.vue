<template>
  <BaseLayout :title="title">
    <div class="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <h2 class="text-lg text-red-300">{{ errorMsj }}</h2>
      <h1 class="text-lg dark:text-white">Movements of: {{ user.email }}</h1>
    </div>
    
    <Movements :movements="movements" :isLoading="isLoading" :sortList="sort" @change-sort="handleChangeSort"/>
    <Pagination :paginate="pagination" class="max-w-4xl" @change-paginate="handleChangePage" :itemsCount="movements.length" />
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import Movements from '@/components/Movements.vue';
import Pagination from '@/components/Pagination.vue';
import { authStore } from '@/stores/authStore';
import {ref, onMounted} from 'vue'
import { get } from '@/utils/methods';
import { userMovementsURL } from '@/utils/endpoints';
import { onBeforeRouteLeave } from 'vue-router';
import { useAdminStore } from '@/stores/adminStore';

import { moneyConversionURL } from '@/utils/endpoints';
import {useCurrentConfigStore} from '@/stores/configStore';
const currentConfigStore = useCurrentConfigStore();

onMounted(async () => {
  getExchangeCurrencies()
  await getMovements()
})
onBeforeRouteLeave((to, from) => {
    if(to.name !== 'MovementsByUser'){
        adminStore.clearSelectedUser();
        return true;
    }
})

const adminStore = useAdminStore();
const user = adminStore.selectedUser;

let title = ref("Movements")
let errorMsj = ref("");
let isLoading = ref(true);
let movements = ref([]);

// renombrar los campos
let pagination = ref({
		page: 1,
		totalPages: 1,
		totalItems: 0,
		hasMoreItems: false
	});

let sort = ref({field: 'created_at', direction: 'desc'});

const getMovements = async (params = {}) =>{
  let query = {
    page: params['page'] ? params.page : pagination.value.page,
    sortBy: params['field'] ? params.field : sort.value.field,
    sortDirection: params['direction'] ? params.direction : sort.value.direction
  }

  let response = await get(userMovementsURL.replace(':user_uid', user.uid),query, {'Authorization': `${authStore.token}`})

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
  pagination.value = {
    page: response.res['pagination']['page'],
		totalPages: response.res['pagination']['totalPages'],
		totalItems: response.res['pagination']['totalItems'],
		hasMoreItems: response.res['pagination']['hasMoreItems']
  }
  errorMsj.value = ''
  
  movements.value = response.res['records']
  isLoading.value = false;
}

const handleChangeSort = (updateSort) => {
  console.log('updateSort value ',updateSort)
  isLoading.value = true

  getMovements(
    {
      page: pagination.value.page,
      field: updateSort.field,
      direction: updateSort.direction
    }
  ).then(
    sort.value ={...updateSort}
  )
}

const handleChangePage = (updatePage) => {
  console.log('update Page', updatePage)
  isLoading.value = true;
  
  getMovements({
    page: updatePage.page,
    field: sort.value.field,
    direction: sort.value.direction
  })
}


const getExchangeCurrencies = async () =>{
  if(Object.keys(currentConfigStore.currenciesConversion).length === 0){ 
    console.log('voy por las exchance currency')
    let response = await get(moneyConversionURL)
    validGetExchange(response)
  }else{
    console.log('ya las tengo en localStorage las exchance currency')
    console.log(currentConfigStore.currenciesConversion) 
  }
} 

const validGetExchange =(response) =>{
  if(response instanceof Error){
    return 0;
  }
  if(Object.hasOwn(response, 'errorMsj')){
    return 0;
  }
  currentConfigStore.setExchanceCurrencies(response.res)
  console.log(currentConfigStore.currenciesConversion)
}


</script>