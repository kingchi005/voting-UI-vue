<template>
  <main>
    <AspirantForm />
    <AspirantForm type="update_form"
      :init_first_name="initial_form_data.init_first_name"
      :init_other_names="initial_form_data.init_other_names"
      :init_department="initial_form_data.init_department"
      :init_office_id="initial_form_data.init_office_id"
      :init_avatar="initial_form_data.init_avatar"
     />
  </main>
</template>
<script>
import AspirantForm from '../components/AspirantForm.vue'

export default {
  components: { AspirantForm }
  , data: () => ({
    initial_form_data: {
      init_first_name: "Amanda"
      , init_other_names: "Love"
      , init_department: "Beauty department"
      , init_office_id: { name: "i Love you girl", id: 30 }
      , init_avatar: "test avatar "
    }
  })
}
</script>