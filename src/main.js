import './assets/dashboard.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router/routes';
import {i18n} from '@/utils/locales/index'

const app = createApp(App);
const pinia = createPinia();
app.use(i18n)
app.use(pinia)
app.use(router)
app.mount('#app')
