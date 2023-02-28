import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import * as components from 'vuetify/components'
// import './assets/main.css'
// import { createApp } from 'vue'
// import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:500';
axios.defaults.headers.common['Authorization'] = !sessionStorage.getItem('_x__r_a_y__m_u_m_m_y_') || `Bearer ${sessionStorage.getItem('_x__r_a_y__m_u_m_m_y_')}`


// console.log(md,fa)

const vuetify = createVuetify({
  components: { ...components, VDataTable }
  , directives,
  icons: {
      defaultSet: 'mdi', // This is already the default value - only for display purposes
    },
 })

// createApp(App).use(vuetify).mount('#app')

const app = createApp(App)
app.use(router)
app.use(vuetify)

app.mount('#app')