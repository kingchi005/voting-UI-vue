<template>
  <v-app :theme="theme">


    <v-app-bar>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase"> vs admin portal</v-toolbar-title>
      <v-btn icon variant="tonal" @click="toggleTheme" class="me-3"> <v-icon>{{theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'}}</v-icon> </v-btn>
      <v-btn color="warning" icon variant="tonal" @click="logout" class="me-3"> <v-icon>mdi-export</v-icon> </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
      <Navbar :snackbar="snackbar" />
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
    <AlertSuccuss :snackbar="snackbar" />


  </v-app>
</template>
<script>
// import { RouterLink } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import AlertSuccuss from '@/components/AlertSuccuss.vue'
import { Icon } from '@iconify/vue';
import axios from 'axios'


export default {
  components: { Navbar,AlertSuccuss,Icon }
  , data: () => ({
    voted_aspirant:'',
    election_index: [] ,
    // ---------------------------------
    drawer: true
    , theme: "dark",
    snackbar: {
      show:false,
      text:'My timeout is set to 2000.'
    }
  })
  , methods: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },
    logout(){
      sessionStorage.setItem('_x__r_a_y__m_u_m_m_y_', '')
      axios.defaults.headers.common['Authorization'] = ``
      this.$router.push({name:'Login'})
    }
  }
}
</script>