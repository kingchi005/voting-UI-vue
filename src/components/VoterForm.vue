<template>
  <v-dialog v-model="voter_dialog" max-width="600px">
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props"> Bulk Create Voters </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <!-- <h2>add office  now</h2> -->
        <v-form ref="form" @submit.prevent="handleSubmit">
          <div class=" grey--text text-h5 font-weight-bold mb-3 text-uppercase">Add multiple voters</div>
          <small class="">Enter at least 5 Reg numbers adding ',' after <br>each Reg no to append to the list <br>
          You can also paste at least 5 Reg numbers <br>adding a comma ',' after each Reg no and click fill list</small>
          <v-alert class="mb-3 py-1" v-if="alert_msgs.length != 0" :type="alert_type" title="" variant="tonal" border="start" close-label="Close Alert">
            <div v-for="(item, i) in alert_msgs" :key="i">{{item}}</div>
          </v-alert>
          <v-text-field v-model="tempVoterRegNo" @keyup.alt="addVoter" label="Reg numbers"></v-text-field>
          <v-btn color="info" size="x-small"> fill </v-btn>
          <div>Voters: {{reg_nos}}</div>
          <!-- <div v-for="no in reg_nos" :key="reg_nos"> {{no}} </div> -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" variant="text" @click="voter_dialog = false">
              Cancel
            </v-btn>
            <v-btn color="green-darken-1" variant="text" type="submit" :loading="isLoading" :disabled="isLoading">
              save
            </v-btn>
          </v-card-actions>
          <!-- <v-btn type="submit" :loading="isLoading" :disabled="isLoading"  rounded="lg" color="primary">save</v-btn> -->
        </v-form>
      </v-card-title>
    </v-card>
  </v-dialog>
</template>
<script>
import { onMounted } from 'vue'

export default {
  props: {
    snackbar: {
      type: Object
    },
  }
  , data: () => ({
    isLoading: false
    , voter_dialog: false
    , alert_msgs: []
      // alert_msgs: ['"department" is not allowed to be empty sokjhdf dont', ' "avatar" ijdhfs not allowed to be empty', "odhjfnhduhj"]
    , alert_type: ''
    , reg_nos: []
    , tempVoterRegNo: ''
    , reg_no_rules: [
      value => value ? true : 'First Reg no is required'
    ]
  })
  , methods: {
    async handleSubmit(e) {
      this.isLoading = true
      this.alert_msgs = []
      // console.log(this.$refs.form)
      // if (!this.$refs.form.validate()) return false
      if (this.$refs.form.validate()) {
        const req = {
          reg_nos: this.reg_nos
        }
        const _this_ = this
        create_voters(_this_)
        async function create_voters(_this) {

          try {
            const res = await fetch("http://127.0.0.1:500/admin/register-voters", {
              method: "POST"
              , body: JSON.stringify(req)
              , headers: {
                "content-Type": "application/json"
              }
            })
            const result = await res.json()
            if (result.ok) {
              _this.isLoading = false
              _this.voter_dialog = false
              _this.snackbar['show'] = true
              _this.snackbar['text'] = result.msg
              _this.reg_nos = []
              _this.voters.push(result.voter)
              // _this.alert_type = "success"
              // console.log(result)
            } else {
              _this.isLoading = false
              _this.alert_type = "error"
              result.msg = result.msg.split(".")
              // console.log(result.msg)
              _this.alert_msgs = result.msg
              // console.log(result.msg)
            }
          } catch (e) {
            _this.isLoading = false
            _this.alert_type = "warning"
            _this.alert_msgs = [e.message]
            console.log("error:", e.message);
          }
        }
      }
    },
    addVoter(e){
      if (!this.reg_nos.includes(this.tempVoterRegNo) && !isNaN(this.tempVoterRegNo)) {
        if (e.key === ',' && this.tempVoterRegNo) {
          this.reg_nos.push(this.tempVoterRegNo)
          this.tempVoterRegNo = ''
        }
      }else{
        this.tempVoterRegNo = ''
      }
    }
  }
  , async mounted() {
  }
  , computed: {
  }

}
</script>