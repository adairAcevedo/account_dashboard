<template>
  <BaseLayout :title="title">
    <div class="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <h2 class="text-lg text-red-300">{{ errorMsj }}</h2>
    </div>
    
    <UserList :users="users" class="max-w-6xl" :isLoading="isLoading" :sortList="sort" @change-sort="handleChangeSort"/>
    <Pagination :paginate="pagination" class="max-w-6xl" @change-paginate="handleChangePage" :itemsCount="users.length" />
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import Movements from '@/components/Movements.vue';
import Pagination from '@/components/Pagination.vue';
import UsersData from '../utils/users_example.json'
import { authStore } from '@/stores/authStore';
import {ref, onMounted} from 'vue'
import { get, usersURL } from '@/utils/methods';
import UserList from '@/components/UserList.vue';

// onMounted(async () => await getUsers())

let title = ref("Users")
let errorMsj = ref("");
let isLoading = ref(true);
let users = [...UsersData.records] //ref([]);


// renombrar los campos
// let pagination = ref({
// 		page: 23,
// 		totalPages: 23,
// 		totalItems: 111,
// 		hasMoreItems: false
// 	});

let pagination = {...UsersData.pagination}


let sort = ref({field: 'created_at', direction: 'desc'});

const getUsers = async (params = {}) =>{
  let query = {
    page: params['page'] ? params.page : pagination.value.page,
    sortBy: params['field'] ? params.field : sort.value.field,
    sortDirection: params['direction'] ? params.direction : sort.value.direction
  }

  let response = await get(usersURL,query, {'Authorization': `${authStore.token}`})

  validgetUsers(response);
  
} 

const validgetUsers = (response) =>{
  if(response instanceof Error){
    errorMsj.value = "Error, not get users"
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
  
  users.value = response.res['records']
  isLoading.value = false;
}

const handleChangeSort = (updateSort) => {
  console.log('updateSort value ',updateSort)
  isLoading.value = true

  getUsers(
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
  
  getUsers({
    page: updatePage.page,
    field: sort.value.field,
    direction: sort.value.direction
  })
}



</script>