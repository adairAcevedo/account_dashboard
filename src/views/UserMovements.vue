<template>
  <BaseLayout>
    <div class="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <h2 class="text-lg text-red-300">{{ errorMsj }}</h2>
    </div>
    
    <Movements :movements="movements" :isLoading="isLoading"/>
    
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import Movements from '@/components/Movements.vue';
import movementsData from '../utils/movements_example.json'
import { authStore } from '@/stores/authStore';
import {ref, onMounted} from 'vue'
import { get, clientMovementsURL } from '@/utils/methods';

onMounted(async () => getMovements())

let errorMsj = ref("");
let isLoading = ref(true);
let movements = ref([]);
let pagination = ref({});

const getMovements = async () =>{
  let response = await get(clientMovementsURL,{}, {'Authorization': `${authStore.token}`})
  
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




</script>