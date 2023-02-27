<template>

  <v-dialog v-model="aspirant_dialog" max-width="600px">
    <template v-slot:activator="{ props }">
      <!-- <v-btn v-if="updateForm" color="primary" size="x-small" v-bind="props"> Edit </v-btn> -->
      <v-icon v-if="updateForm"
        size="small"
        class="me-2"
        v-bind="props"
      >
        mdi-square-edit-outline
      </v-icon>
      <v-btn v-else color="primary" v-bind="props"> Create Aspirant </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <v-form ref="form" @submit.prevent="handleSubmit">
          <div class=" grey--text text-h5 font-weight-bold mb-3 text-uppercase">{{ updateForm ? 'Update Aspirant' : 'Add an Aspirant'}}</div>
          <v-alert class="mb-3 py-1" v-if="alert_msgs.length != 0" :type="alert_type" title="" variant="tonal" border="start" close-label="Close Alert">
            <div v-for="(item, i) in alert_msgs" :key="i">{{item}}</div>
          </v-alert>
          <v-text-field v-model="first_name" :rules="first_name_rules" label="First name"></v-text-field>
          <v-text-field v-model="other_names" :rules="other_names_rules" label="Other names"></v-text-field>
          <v-text-field v-model="department" :rules="department_rules" label="Department"></v-text-field>
          <v-select v-model="office" :items="offices" item-title="name" item-value="id" label="Select office"  return-object ></v-select>
          <v-file-input :rules="avatar_rules" accept="image/png, image/jpeg, image/jpg" placeholder="Pick an avatar" label="Avatar" @change="uploadImage" show-size></v-file-input>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" variant="text" @click="aspirant_dialog = false">
              Cancel
            </v-btn>
            <v-btn color="green-darken-1" variant="text" type="submit" :loading="isLoading" :disabled="isLoading">
              save
            </v-btn>
          </v-card-actions>

          <!-- <v-btn type="submit" :loading="isLoading" :disabled="isLoading" block rounded="lg" color="primary">{{ updateForm ? 'Update Aspirant' : 'Create Aspirant'}}</v-btn> -->
        </v-form>
      </v-card-title>
    </v-card>
  </v-dialog>
</template>
<script>
import { onMounted } from 'vue'
import axios from 'axios'
export default {
  // props: ["type","first_name" ,"other_names","department","avatar","office"]
  props:{
    updateForm:{
      type:Boolean
    },
    initial_asp_form_data:{
      type:Object
    },
    asp_update_id: String,
    aspirants:{
      type:Object
    }
    ,snackbar:{
      type:Object
    }
    ,offices:{
      type:Object
    }
  }
  , data: () => ({
    isLoading: false,
    aspirant_dialog:false
    ,alert_msgs: []
      // alert_msgs: ['"department" is not allowed to be empty sokjhdf dont', ' "avatar" ijdhfs not allowed to be empty', "odhjfnhduhj"]
    , alert_type: ''
    , first_name: ''
    , other_names: ''
    , department: ''
    , avatar: ''
    , office: { name: "Select an office", id: 9 }
    , first_name_rules: [
      value => value ? true : 'First name is required'
    ]
    , other_names_rules: [
      value => value ? true : 'Enter at least other name.'
    ]
    , department_rules: [
      value => value ? true : 'Department is required.'
    ]
    , select_rules: [
      value => value ? true : 'You must enter an  office name.'
    ]
    , avatar_rules: [
      value => !value || !value.length || value[0].size < 1000000 || 'Avatar size should be less than 1MB!'
    ]
  })
  , methods: {
    async handleSubmit(e) {
      this.isLoading = true
      this.alert_msgs = []
      // console.log(this.$refs.form)
      // if (!this.$refs.form.validate()) return false
      const { valid } = await this.$refs.form.validate()
      if (!valid) return this.isLoading = false
      if (valid) {
        const req = {
          first_name: this.first_name
          , other_names: this.other_names
          , department: this.department
          , office_id: this.office.id
          , avatar: this.avatar
        }
        const _this_ = this
        if (this.updateForm) {
          update_aspirant(_this_)
        }else{
          create_aspirant(_this_)
        }
        async function create_aspirant(_this) {
          try {
            const result = await (await axios.post("/admin/create-aspirant",req)).data
            if (result.ok) {
              _this.isLoading = false
              _this.aspirant_dialog = false
              _this.snackbar['show'] = true
              _this.snackbar['text'] = result.msg
              _this.first_name = ''
              _this.other_names = ''
              _this.department = ''
              _this.aspirants.push(result.aspirant)
            } else {
              _this.isLoading = false
              _this.alert_type = "error"
              result.msg = result.msg.split(".")
              // console.log(result.msg)
              _this.alert_msgs = result.msg
              // console.log(result.msg)
            }
          } catch(e) {
            _this.isLoading = false
            _this.alert_type = "warning"
            _this.alert_msgs = [e.message]
            console.log("error:",e.message);
          }
        }
        async function update_aspirant (_this) {
          try {
            const result = await (await axios.patch("/admin/update-aspirant/"+_this.asp_update_id,req)).data
            if (result.ok) {
              _this.isLoading = false
              _this.snackbar['show'] = true
              _this.snackbar['text'] = result.msg
              _this.aspirant_dialog = false
              _this.aspirants.forEach( function(asp, i) {
                if (asp._id === _this.asp_update_id) {
                  asp.first_name = req.first_name
                  asp.other_names = req.other_names
                  asp.department = req.department
                  asp.office = _this.office
                }
              });

            } else {
              _this.isLoading = false
              _this.alert_type = "error"
              result.msg = result.msg.split(".")
              // console.log(result.msg)
              _this.alert_msgs = result.msg
              // console.log(result.msg)
            }
          } catch(e) {
            _this.isLoading = false
            _this.alert_type = "warning"
            _this.alert_msgs = [e.message]
            console.log("error:",e.message);
          }
        }
      }
    }
    , convertBase64(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)

        fileReader.onload = () => {
          resolve(fileReader.result)
        }

        fileReader.onerror = err => {
          reject(err)
        }
      })
    }
    , async uploadImage(e) {
      // console.log('changgeed')
      const file = e.target.files[0]
      const base64 = await this.convertBase64(file)
      this.avatar = base64
    }
  }
  , async mounted() {
    // any JavaScript Code
    this.first_name = this.updateForm ? this.initial_asp_form_data.first_name : ''
    this.other_names = this.updateForm ? this.initial_asp_form_data.other_names : ''
    this.department = this.updateForm ? this.initial_asp_form_data.department : ''
    this.office = this.updateForm ? this.initial_asp_form_data.office : this.office
  }
  , computed() {
  }

}
</script>