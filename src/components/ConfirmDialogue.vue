<template>
  <v-row justify="center" class=" mt-5">
    <v-dialog max-width="600px"
      v-model="confirm_dialog['show']"
      persistent
    >
<!--       <template v-slot:activator="{ props }">
        <v-switch v-if="confirm_dialog['btn_type'] == 'switch'" class="ms-5"
          v-model="toggleElection"
          hide-details
          v-bind="props"
          inset
          color="orange-darken-3"
          :label="`Election: ${toggleElection ? 'Started' : 'Ended'}`"
        ></v-switch>
        <v-btn v-else
          size="x-small"
          color="error"
          v-bind="props"
        >
          DELETE
        </v-btn>
      </template>
 -->      <v-card>
        <v-card-title class="text-h5">
          {{confirm_dialog.title}}
        </v-card-title>
        <v-card-text>
          {{confirm_dialog.text}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :color="confirm_dialog.btn_reject_color"
            variant="text"
            @click="confirm_dialog['show'] = false"
          >
            {{confirm_dialog.btn_reject_text}}
          </v-btn>
          <v-btn
            :color="confirm_dialog.btn_resolve_color"
            variant="text"
            @click="handleResolved"
          >
            {{confirm_dialog.btn_resolve_text}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    props: {
      confirm_dialog: {
        type:Object,
      }
      ,test_dialog:String
    },
    data () {
      return {
        toggleElection:false
        // confirm_dialog: false,
      }
    },
    methods:{
      handleResolved(){
        this.confirm_dialog['show'] = false
        this.$emit('resolved',this.confirm_dialog.cb,this.confirm_dialog.cb_arg)
      }
    },
    mounted(){
      // console.log(this.confirm_dialog.text)
    }
  }
</script>