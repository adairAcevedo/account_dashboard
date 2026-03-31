<template>
    <form @submit.prevent="validateParams()">
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12 dark:border-white/10">
                <h2 class="text-base/7 font-semibold text-gray-900 dark:text-white capitalize">{{t("login")}}</h2>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                <div class="col-span-full">
                    <label for="username" class="block text-sm/6 font-medium text-gray-900 dark:text-white capitalize">{{props.type == 'admin' ? t('username') : t('email')}}</label>
                    <div class="mt-2">
                        <input id="username" type="text" name="username" v-model.trim.lazy="formUser.user" autocomplete="email" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" />
                    </div>
                </div>

                <div class="col-span-full">
                    <label for="password" class="block text-sm/6 font-medium text-gray-900 dark:text-white capitalize">{{ t('password')}}</label>
                    <div class="mt-2">
                        <input id="password" type="password" name="password" v-model.trim.lazy="formUser.password" autocomplete="password" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" />
                    </div>
                </div>

                    <div class="col-span-full">
                        <p class="mt-1 text-sm/6 text-gray-600 dark:text-red-400 capitalize" v-if="msj_errors != ''">{{msj_errors }}</p>

                    </div>
                </div>
            </div>
    
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            
            <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:focus-visible:outline-indigo-500 capitalize">{{t('send')}}</button>
        </div>
    </form>
</template>
<script setup>
    import {ref} from 'vue'
    import {postApi} from '../utils/methods'
    import md5 from 'md5'
    import { jwtDecode } from "jwt-decode";
    import { authStore } from '@/stores/authStore';
    import { useRouter } from 'vue-router';
    import { useI18n } from 'vue-i18n';
    const { t, locale } = useI18n()

    const router = useRouter();
    const props = defineProps(['type'])
    let formUser = ref({user: "", password: ""})
    let msj_errors = ref("")

    const loginConfig = {
        admin: {
            endpoint: '/users/adminLogin',
            field: {identifier: 'user', secret: 'password'},
            initRoute: 'Dashboard',
            role: 'admin'
        },
        client: {
            endpoint: '/users/login',
            field: {identifier: 'email', secret: 'password'},
            initRoute: 'Movements',
            role: 'client'
        }
    }

    const currentConfig = loginConfig[props.type]
    
    const validateParams = async () => {
        if(formUser.value.user !== "" && formUser.value.password !== ""){
            msj_errors.value = ''
            let response = await postApi(currentConfig.endpoint, {
                [currentConfig.field.identifier]: formUser.value.user, 
                [currentConfig.field.secret]: md5(formUser.value.password)
            });
            validateLogin(response);
        }else{
            msj_errors.value = t('invalid_credentials')
        }
    }

    const validateLogin = (response) => {
        if(response instanceof Error){
            console.log("ocurio un error", response)
            return 0;
        }

        if(Object.hasOwn(response, 'errorMsj')){
            msj_errors.value = response['errorMsj']
            return 0;
        }

        
        const token = response.res.headers.get('authorization')
        const tokenDecode = jwtDecode(token);
        authStore.setToken(token)
        authStore.setUser({name: tokenDecode["nombre"], lastName: tokenDecode["apellido"], access_name: formUser.value.user, role: currentConfig.role})
        router.replace({name: currentConfig.initRoute})
    }
</script>