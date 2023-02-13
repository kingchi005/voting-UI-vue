<template>
  <v-sheet width="300" class="mx-auto m-3">
    <v-form ref="form" @submit.prevent="handleSubmit">
      <v-text-field v-model="first_name" :rules="first_name_rules" label="First name"></v-text-field>
      <v-text-field v-model="other_names" :rules="other_names_rules" label="Other names"></v-text-field>
      <v-text-field v-model="department" :rules="department_rules" label="Department"></v-text-field>
      <v-select v-model="office_id" :items="offices" item-title="name" item-value="id" label="Select office" persistent-hint return-object single-line></v-select>
      <v-file-input :rules="avatar_rules" accept="image/png, image/jpeg, image/jpg" placeholder="Pick an avatar" label="Avatar" @change="uploadImage" show-size></v-file-input>
      <v-btn type="submit" block rounded="lg"  color="primary">
        Rounded Button
      </v-btn>
    </v-form>
  </v-sheet>
</template>
<script>
export default {
  data: () => ({
    first_name: ''
    , other_names: ''
    , avatar: ''
    , department: ''
    , office_id: { name: "Select an office", id: 0 }
    , offices: [
      { "id": 1, "_id": "039174dd9b734d714", "name": "SEC GEN", "deleted_flag": false, "createdAt": "2023-02-06T20:09:58.000Z", "updatedAt": "2023-02-06T20:09:58.000Z" }
      , { "id": 2, "_id": "07a6ba908e348cd81", "name": "President", "deleted_flag": false, "createdAt": "2023-02-06T20:10:13.000Z", "updatedAt": "2023-02-06T20:10:13.000Z" }
      , { "id": 3, "_id": "065b491048029ea98", "name": "pro", "deleted_flag": false, "createdAt": "2023-02-06T20:10:24.000Z", "updatedAt": "2023-02-06T20:10:24.000Z" }
      , { "id": 4, "_id": "04fd4623ad663594b", "name": "DOI", "deleted_flag": false, "createdAt": "2023-02-06T20:10:34.000Z", "updatedAt": "2023-02-06T20:10:34.000Z" }
      , { "id": 6, "_id": "06230f29a9a92f7b4", "name": "test office", "deleted_flag": false, "createdAt": "2023-02-07T11:14:34.000Z", "updatedAt": "2023-02-07T11:14:34.000Z" }
    ]
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
      value => !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
    ]
  })
  , methods: {
    handleSubmit(e) {
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
        console.log(req)

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

}
</script>