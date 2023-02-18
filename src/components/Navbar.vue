<template>

    <v-list>
      <v-list-item v-for="link in links" :prepend-icon="link.icon" :key="link.route" router :to="link.route" :title="link.text">
      </v-list-item>
    </v-list>

</template>
<script>
import { RouterLink } from 'vue-router'

export default {
  props:{
    snackbar:{
      type: Object
    }
  },
  data: () => ({
    drawer: false
    , links: [
      { icon: "dashboard", text: 'Dashboard', route: '/' }
      , { icon: "folder", text: 'About', route: '/about' }
      , { icon: "mdi-view-dashboard", text: 'Admin Operation', route: '/operation' }
      // , { icon: "folder", text: 'About', route: '/about' }
      // ,{icon:"dashboard",text:'Dashboard', route:'/'}
      // ,{icon:"dashboard",text:'Dashboard', route:'/'}
    ]
  })
}
</script>