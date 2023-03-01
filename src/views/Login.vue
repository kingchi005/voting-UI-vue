<template>
  <div class="py-4">
    <!-- <v-img
      class="mx-auto mb-10"
      max-width="228"
      src="/Emmanuel.jpg"
    ></v-img> -->

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
    <v-form ref="form" @submit.prevent="handleLogin" >
      <div class="text-title text-h4 mb-5">Admin Login</div>
      <v-alert class="mb-3 py-1" v-if="alert_msg" :type="alert_type" title="" variant="tonal" border="start" close-label="Close Alert">
        {{alert_msg}}
      </v-alert>
      <div class="text-subtitle-1 text-medium-emphasis">Admin Name</div>

      <v-text-field
        density="compact"
        placeholder="Admin user name"
        prepend-inner-icon="mdi-account-key"
        variant="outlined"
        v-model="pass_name"
        :rules="name_rules"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Token
      </div>

      <v-text-field
        v-model="pass_token"
        :append-inner-icon="pass_visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="pass_visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your token"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        :rules="pass_rules"
        @click:append-inner="pass_visible = !pass_visible"
      ></v-text-field>
      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        type="submit"
        :loading="isLoading"
        :disabled="isLoading"
      >
        Log In
      </v-btn>
    </v-form>
    </v-card>
  </div>
</template><script>
  import axios from 'axios'

export default {
  components: { }
  , data: () => ({
    alert_msg:'',
    alert_type:'',
    pass_visible:false,
    pass_name:'',
    pass_token:'',
    isLoading:false,
    name_rules: [value => value ? true : 'Name is required'],
    pass_rules: [value => value ? true : 'Token is required']

  }),
  methods:{
    async handleLogin(){
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        this.isLoading = true
        const req = {
          pass_name:this.pass_name,
          pass_token:this.pass_token
        }
        try {
          const result = await (await axios.post("/auth/login-admin",req)).data
          if (result.ok) {
            this.isLoading = false
            this.alert_type = 'success'
            this.alert_msg = result.msg
            sessionStorage.setItem('_x__r_a_y__m_u_m_m_y_',result.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('_x__r_a_y__m_u_m_m_y_')}`

            this.$router.push({name:'Admin Operation'})

            // this.alert_type = "success"
            // console.log(result)
          } else {
            this.isLoading = false
            this.alert_type = "error"
            this.alert_msg = result.msg
          }
            // statements
        } catch(e) {
          this.isLoading = false
          if (e.name == 'AxiosError') {
            this.alert_type = "error"
            this.alert_msg = e.response?.data?.msg
            console.log(e.response?.data)
          }
          console.log(e);
        }
      }
    }
  }
}
</script>