<template>
  <v-sheet width="350" class="mx-auto pa-5">
    <v-form ref="form" @submit.prevent="handleSubmit">
      <div class=" grey--text text-h5 font-weight-bold">{{ updateForm ? 'Update Office' : 'Add an Office'}}</div>

      <v-alert class="mb-3 py-1" v-if="alert_msgs.length != 0" :type="alert_type" title="" variant="tonal" border="start" close-label="Close Alert">
        <div v-for="(item, i) in alert_msgs" :key="i">{{item}}</div>
      </v-alert>

      <v-text-field v-model="name" :rules="name_rules" label="First name"></v-text-field>
      <v-btn type="submit" :disabled="isLoading" block rounded="lg" color="primary">{{ updateForm ? 'Update Aspirant' : 'Create Aspirant'}}</v-btn>
    </v-form>
  </v-sheet>
</template>
<script>
import { onMounted } from 'vue'
export default {
  // props: ["type","name" ,"other_names","department","avatar","office_id"]
  props:{
    updateForm:{
      type:Boolean
    },
    initial_form_data:{
      type:Object
    },
    init_office_name: String,
    office_update_id: String
  }
  , data: () => ({
  	isLoading: false,
    alert_msgs: []
      // alert_msgs: ['"department" is not allowed to be empty sokjhdf dont', ' "avatar" ijdhfs not allowed to be empty', "odhjfnhduhj"]
    , alert_type: ''
    , name: ''
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
        }else{
          create_office(_this_)
        }
        async function create_office(_this) {
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
            _this.alert_msgs = [result.msg]
            _this.alert_type = "success"
            // console.log(result)
          } else {
          	_this.isLoading = false
            _this.alert_type = "error"
            result.msg = result.msg.split(".")
            // console.log(result.msg)
            _this.alert_msgs = result.msg
            // console.log(result.msg)
          }
        }
        async function update_office (_this) {
        	const res = await fetch("http://127.0.0.1:500/admin/update-office/"+_this.office_update_id, {
        	  method: "PATCH"
        	  , body: JSON.stringify(req)
        	  , headers: {
        	    "content-Type": "application/json"
        	  }
        	})
        	const result = await res.json()
        	if (result.ok) {
        		_this.isLoading = false
        	  _this.alert_msgs = [result.msg]
        	  _this.alert_type = "success"
        	  // console.log(result)
        	} else {
        		_this.isLoading = false
        	  _this.alert_type = "error"
        	  result.msg = result.msg.split(".")
        	  // console.log(result.msg)
        	  _this.alert_msgs = result.msg
        	  // console.log(result.msg)
        	}
        }
      }
    }
  }
  , async mounted() {
    // any JavaScript Code
    this.name = this.updateForm ? this.init_office_name : ''
    // this.avatar = this.type == "updateForm" ? this.avatar : ''
    // console.log(this.initial_form_data)
  }
  , computed() {
    // console.log(this.type)
    // this.name = this.initial_form_data || ''
    // this.alert_msgs = this.alert_msgs != "" ? "this is it" : ""
  }

}
</script>