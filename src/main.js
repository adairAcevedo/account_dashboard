import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routes';

const app = createApp(app);
app.use(router)
app.mount('#app')
