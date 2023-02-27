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


export default {
  components: { Navbar,AlertSuccuss,Icon }
  , data: () => ({
    voted_aspirant:'',
    election_index: [/*{"office_name": "Secretary General", "aspirants": [{"_id": "0b0f0ed25c455b79b", "first_name": "Kenneth", "other_names": "Eze", "department": "IFT", "avatar": "http://127.0.0.1:500/Emmanuel.jpg", "deleted_flag": false, "createdAt": "2023-02-06T20:24:39.000Z", "updatedAt": "2023-02-21T20:41:54.000Z", "office_id": 1, "office": "Secretary General"}, {"_id": "015361ca11ecc7656", "first_name": "Uche", "other_names": "Great Guyy", "department": "ECN", "avatar": "https://res.cloudinary.com/drzmvhomu/image/upload/v1677015520/nmw6xchou977wojyjgtt.jpg", "deleted_flag": false, "createdAt": "2023-02-14T09:48:58.000Z", "updatedAt": "2023-02-21T21:43:43.000Z", "office_id": 1, "office": "Secretary General"} ] }, {"office_name": "Presidential", "aspirants": [         {"_id": "05452b37d4ecd1e58", "first_name": "Anthony", "other_names": "Eze", "department": "IFT", "avatar": "no avatar", "deleted_flag": false, "createdAt": "2023-02-06T20:25:17.000Z", "updatedAt": "2023-02-21T20:36:49.000Z", "office_id": 2, "office": "Presidential"}, {"_id": "049edc9d31cffb09b", "first_name": "Kingchi", "other_names": "Eze", "department": "IFT", "avatar": null, "deleted_flag": false, "createdAt": "2023-02-07T16:42:13.000Z", "updatedAt": "2023-02-19T22:30:40.000Z", "office_id": 2, "office": "Presidential"}, {"_id": "0a89db9e8fb7fad27", "first_name": "Kelechi", "other_names": "Kelly", "department": "BMS", "avatar": "https://res.cloudinary.com/drzmvhomu/image/upload/v1676378346/bi7vwvhhyc0la8bqpqqn.jpg", "deleted_flag": false, "createdAt": "2023-02-14T12:44:03.000Z", "updatedAt": "2023-02-21T20:35:16.000Z", "office_id": 2, "office": "Presidential"} ] }, {"office_name": "Director of Infomation", "aspirants": [{"_id": "02704baf09338f8e5", "first_name": "Loveth", "other_names": "my love", "department": "Beauty department", "avatar": "https://res.cloudinary.com/drzmvhomu/image/upload/v1676477457/t5lov19cncknnl5spaoj.jpg", "deleted_flag": false, "createdAt": "2023-02-06T20:11:47.000Z", "updatedAt": "2023-02-21T21:38:42.000Z", "office_id": 4, "office": "Director of Infomation"}, {"_id": "0e33a064b718eac3f", "first_name": "David", "other_names": "Onyebule", "department": "CSC", "avatar": null, "deleted_flag": false, "createdAt": "2023-02-07T16:44:48.000Z", "updatedAt": "2023-02-19T22:31:34.000Z", "office_id": 4, "office": "Director of Infomation"}, {"_id": "01fd10b0fd38e05fa", "first_name": "Okere", "other_names": "Christopher Okoye", "department": "TST", "avatar": "https://res.cloudinary.com/drzmvhomu/image/upload/v1676379680/rr1k8kbsgqvvasbp2h6w.png", "deleted_flag": false, "createdAt": "2023-02-14T13:06:18.000Z", "updatedAt": "2023-02-21T20:36:01.000Z", "office_id": 4, "office": "Director of Infomation"} ] }, {"office_name": "Office of Tresurer", "aspirants": [] }, {"office_name": "Director of sports", "aspirants": [{"_id": "031afe41fb28fb89b", "first_name": "Divine", "other_names": "Ekwere", "department": "BSC", "avatar": null, "deleted_flag": false, "createdAt": "2023-02-07T16:45:23.000Z", "updatedAt": "2023-02-19T22:32:32.000Z", "office_id": 31, "office": "Director of sports"} ] } */] ,
    // ---------------------------------
    drawer: false
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
      this.$router.push({name:'Login'})
    }
  }
}
</script>