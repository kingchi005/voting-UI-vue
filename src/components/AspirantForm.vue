<template>
  <v-sheet width="350" class="mx-auto pa-5">

    <v-form ref="form" @submit.prevent="handleSubmit">
      <div class=" grey--text text-h5 font-weight-bold">{{ updateForm ? 'Update Aspirant' : 'Add an Aspirant'}}</div>
      <v-alert class="mb-3 py-1" v-if="alert_msgs.length != 0" :type="alert_type" title="" variant="tonal" border="start" close-label="Close Alert">
        <div v-for="(item, i) in alert_msgs" :key="i">{{item}}</div>
      </v-alert>
      <v-text-field v-model="first_name" :rules="first_name_rules" label="First name"></v-text-field>
      <v-text-field v-model="other_names" :rules="other_names_rules" label="Other names"></v-text-field>
      <v-text-field v-model="department" :rules="department_rules" label="Department"></v-text-field>
      <v-select v-model="office_id" :items="offices" item-title="name" item-value="id" label="Select office" persistent-hint return-object single-line></v-select>
      <v-file-input :rules="avatar_rules" accept="image/png, image/jpeg, image/jpg" placeholder="Pick an avatar" label="Avatar" @change="uploadImage" show-size></v-file-input>
      <v-btn type="submit" :disabled="isLoading" block rounded="lg" color="primary">{{ updateForm ? 'Update Aspirant' : 'Create Aspirant'}}</v-btn>
    </v-form>
  </v-sheet>
</template>
<script>
import { onMounted } from 'vue'
export default {
  // props: ["type","first_name" ,"other_names","department","avatar","office_id"]
  props:{
    updateForm:{
      type:Boolean
    },
    initial_form_data:{
      type:Object
    },
    asp_update_id: String
  }
  , data: () => ({
    isLoading: true
    ,alert_msgs: []
      // alert_msgs: ['"department" is not allowed to be empty sokjhdf dont', ' "avatar" ijdhfs not allowed to be empty', "odhjfnhduhj"]
    , alert_type: ''
    , alert_type: ''
    , first_name: ''
    , other_names: ''
    , department: ''
    , avatar: ''
    , office_id: { name: "Select an office", id: 9 }
    , offices: [ /*      { "id": 1, "_id": "039174dd9b734d714", "name": "SEC GEN", "deleted_flag": false, "createdAt": "2023-02-06T20:09:58.000Z", "updatedAt": "2023-02-06T20:09:58.000Z" } , { "id": 2, "_id": "07a6ba908e348cd81", "name": "President", "deleted_flag": false, "createdAt": "2023-02-06T20:10:13.000Z", "updatedAt": "2023-02-06T20:10:13.000Z" } , { "id": 3, "_id": "065b491048029ea98", "name": "pro", "deleted_flag": false, "createdAt": "2023-02-06T20:10:24.000Z", "updatedAt": "2023-02-06T20:10:24.000Z" } , { "id": 4, "_id": "04fd4623ad663594b", "name": "DOI", "deleted_flag": false, "createdAt": "2023-02-06T20:10:34.000Z", "updatedAt": "2023-02-06T20:10:34.000Z" } , { "id": 6, "_id": "06230f29a9a92f7b4", "name": "test office", "deleted_flag": false, "createdAt": "2023-02-07T11:14:34.000Z", "updatedAt": "2023-02-07T11:14:34.000Z" } */ ]
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
      value => value ? true : 'You must enter a first name.'
    ]
    , avatar_rules: [
      value => !value || !value.length || value[0].size < 1000000 || 'Avatar size should be less than 1MB!'
    ]
  })
  , methods: {
    async handleSubmit(e) {
      this.alert_msgs = []
      // console.log(this.$refs.form)
      // if (!this.$refs.form.validate()) return false
      if (this.$refs.form.validate()) {
        const req = {
          first_name: this.first_name
          , other_names: this.other_names
          , department: this.department
          , office_id: this.office_id.id
          , avatar: this.avatar
        }
        const _this_ = this
        if (this.updateForm) {
          update_aspirant(_this_)
        }else{
          create_aspirant(_this_)
        }
        async function create_aspirant(_this) {
          const res = await fetch("http://127.0.0.1:500/admin/create-aspirant", {
            method: "POST"
            , body: JSON.stringify(req)
            , headers: {
              "content-Type": "application/json"
            }
          })
          const result = await res.json()
          if (result.ok) {
            _this.alert_msgs = [result.msg]
            _this.alert_type = "success"
            // console.log(result)
          } else {
            _this.alert_type = "error"
            result.msg = result.msg.split(".")
            // console.log(result.msg)
            _this.alert_msgs = result.msg
            // console.log(result.msg)
          }
        }
        async function update_aspirant (_this) {
          const res = await fetch("http://127.0.0.1:500/admin/update-aspirant/"+_this.asp_update_id, {
            method: "PATCH"
            , body: JSON.stringify(req)
            , headers: {
              "content-Type": "application/json"
            }
          })
          const result = await res.json()
          if (result.ok) {
            _this.alert_msgs = [result.msg]
            _this.alert_type = "success"
            // console.log(result)
          } else {
            _this.alert_type = "error"
            result.msg = result.msg.split(".")
            // console.log(result.msg)
            _this.alert_msgs = result.msg
            // console.log(result.msg)
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
    this.first_name = this.updateForm ? this.initial_form_data.first_name : ''
    this.other_names = this.updateForm ? this.initial_form_data.other_names : ''
    this.department = this.updateForm ? this.initial_form_data.department : ''
    this.office_id = this.updateForm ? this.initial_form_data.office_id : this.office_id
    // this.avatar = this.type == "updateForm" ? this.avatar : ''
    // console.log(this.initial_form_data)

    const res = await fetch("http://127.0.0.1:500/admin/fetch-office/")
    const result = await res.json()
    if (result?.ok) {
      this.offices = result.offices
    }

  }
  , computed() {
    // console.log(this.type)
    // this.first_name = this.initial_form_data || ''
    // this.alert_msgs = this.alert_msgs != "" ? "this is it" : ""
  }

}
</script>