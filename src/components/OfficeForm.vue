<template>
  <v-dialog v-model="office_dialog" max-width="600px">
    <template v-slot:activator="{ props }">
      <v-btn v-if="updateForm" color="primary" size="x-small" v-bind="props"> Edit </v-btn>
      <v-btn v-else color="primary" v-bind="props"> Create Office </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <!-- <h2>add office  now</h2> -->
        <v-form ref="form" @submit.prevent="handleSubmit">
          <div class=" grey--text text-h5 font-weight-bold mb-3 text-uppercase">{{ updateForm ? 'Update Office' : 'Add an Office'}}</div>
          <v-alert class="mb-3 py-1" v-if="alert_msgs.length != 0" :type="alert_type" title="" variant="tonal" border="start" close-label="Close Alert">
            <div v-for="(item, i) in alert_msgs" :key="i">{{item}}</div>
          </v-alert>
          <!-- <v-text-field v-if="updateForm" v-model="edited_name" :rules="name_rules" label="First name"></v-text-field> -->
          <v-text-field v-model="name" :rules="name_rules" label="First name"></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" variant="text" @click="office_dialog = false">
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
  // props: ["type","name" ,"other_names","department","avatar","office_id"]
  props: {
    updateForm: {
      type: Boolean
    }
    , initial_form_data: {
      type: Object
    }
    , init_office_name: String
    , office_update_id: String
    , snackbar: {
      type: Object
    }
    // office_dialog:{
    //   type:Boolean  
    // }
  }
  , data: () => ({
    isLoading: false
    , office_dialog: false
    , alert_msgs: []
      // alert_msgs: ['"department" is not allowed to be empty sokjhdf dont', ' "avatar" ijdhfs not allowed to be empty', "odhjfnhduhj"]
    , alert_type: ''
    , name: () => this.updateForm ? 'yes' : 'no'
    , name_rules: [
      value => value ? true : 'First name is required'
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
          name: this.name
        }
        const _this_ = this
        if (this.updateForm) {
          update_office(_this_)
        } else {
          create_office(_this_)
        }
        async function create_office(_this) {

          try {
            const res = await fetch("http://127.0.0.1:500/admin/create-office", {
              method: "POST"
              , body: JSON.stringify(req)
              , headers: {
                "content-Type": "application/json"
              }
            })
            const result = await res.json()
            if (result.ok) {
              _this.isLoading = false
              _this.office_dialog = false
              _this.snackbar['show'] = true
              _this.snackbar['text'] = result.msg
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
        async function update_office(_this) {
          try {

            const res = await fetch("http://127.0.0.1:500/admin/update-office/" + _this.office_update_id, {
              method: "PATCH"
              , body: JSON.stringify(req)
              , headers: {
                "content-Type": "application/json"
              }
            })
            const result = await res.json()
            if (result.ok) {
              _this.isLoading = false
              _this.snackbar['show'] = true
              _this.snackbar['text'] = result.msg
              _this.office_dialog = false
              // _this.alert_msgs = [result.msg]
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
    }
  }
  , async mounted() {
    // any JavaScript Code
    this.name = this.updateForm ? this.init_office_name : ''
    // this.avatar = this.type == "updateForm" ? this.avatar : ''
    console.log(this.offices)
  }
  , computed: {
    edited_name() {
      return this.updateForm ? this.init_office_name : this.name
    }
    // this.name = this.initial_form_data || ''
    // this.alert_msgs = this.alert_msgs != "" ? "this is it" : ""
  }

}
</script>