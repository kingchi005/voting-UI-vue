import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import * as components from 'vuetify/components'
import './assets/main.css'
// import { createApp } from 'vue'
// import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

// createApp(App).use(vuetify).mount('#app')

const app = createApp(App)
app.use(router)
app.use(vuetify)

app.mount('#app')