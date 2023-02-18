import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import * as components from 'vuetify/components'
// import './assets/main.css'
// import { createApp } from 'vue'
// import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
// console.log(md,fa)

const vuetify = createVuetify({
  components: { ...components, VDataTable }
  , directives,
  icons: {
     defaultSet: 'mdi',
     aliases,
     sets: {
       mdi,
     }
   },
 })

// createApp(App).use(vuetify).mount('#app')

const app = createApp(App)
app.use(router)
app.use(vuetify)

app.mount('#app')