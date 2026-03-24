<template>
  <BaseLayout :title="title">
    <div class="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <h2 class="text-lg text-red-300">{{ errorMsj }}</h2>
    </div>
    
    <UserList :users="users" class="max-w-8xl" :isLoading="isLoading" :sortList="sort" @change-sort="handleChangeSort" @go-item="handleGoUser"/>
    <Pagination :paginate="pagination" class="max-w-8xl" @change-paginate="handleChangePage" :itemsCount="users.length" />
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue';

import Pagination from '@/components/Pagination.vue';

import { authStore } from '@/stores/authStore';
import {ref, onMounted} from 'vue';
import { get } from '@/utils/methods';
import { usersURL } from '@/utils/endpoints';
import UserList from '@/components/UserList.vue';
import { useAdminStore } from '@/stores/adminStore';

import router from '@/router/routes';
onMounted(async () => await getUsers())

const adminStore = useAdminStore();
let title = ref("Users")
let errorMsj = ref("");
let isLoading = ref(true);
let users = ref([]);
let pagination = ref({
		page: 1,
		totalPages: 1,
		totalItems: 0,
		hasMoreItems: false
	});

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
  errorMsj.value = ''
  
  users.value = response.res['records']
  isLoading.value = false;
}

const handleChangeSort = (updateSort) => {

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

  isLoading.value = true;
  
  getUsers({
    page: updatePage.page,
    field: sort.value.field,
    direction: sort.value.direction
  })
}

const handleGoUser = ({item: user}) =>{
  console.log(user)
  adminStore.setSelectedUser(user)
  router.push({name: 'MovementsByUser', params: {id: user.uid}})
}



</script>