<template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbar['show']"
      :timeout="5000"
      :color="snackbar.color"
      location="top"

    >
      {{ snackbar.text }}

      <template v-slot:actions>
        <v-btn
          color=""
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
  export default {
    props:{
      snackbar:{
        type:Object
      }
    },
  }
</script>