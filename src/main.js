import { createApp } from 'vue'
import VueAxios from 'vue-axios'

import App from './App.vue'

createApp(App).use(VueAxios, axios).mount('#app')
