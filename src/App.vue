<template>
  <v-app :theme="theme">
    <v-app-bar>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase"> Voting System </v-toolbar-title>
      <!-- <v-spacer></v-spacer> -->
      <v-btn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" @click="toggleTheme">Toggle Theme</v-btn>
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


export default {
  components: { Navbar,AlertSuccuss,Icon }
  , data: () => ({
    drawer: true
    , theme: "light",
    snackbar: {
      show:false,
      text:'My timeout is set to 2000.'
    }
  })
  , methods: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    }
  }
}
</script>