<template>
  <main>

    <template> Loading... </template>
    <OfficeForm />
    <OfficeForm updateForm :init_office_name="init_office_name" :office_update_id="office_update_id" />
    
<!--     <AspirantForm />
    <AspirantForm updateForm :initial_form_data="initial_form_data" :asp_update_id="asp_update_id" /> -->
  </main>
</template>
<script>
import AspirantForm from '../components/AspirantForm.vue'
import OfficeForm from '../components/OfficeForm.vue'

export default {
  components: { AspirantForm, OfficeForm }
  , data: () => ({
    initial_form_data: {
      first_name: "Amanda"
      , other_names: "baby"
      , department: "Beauty department"
      , office_id: { name: "i Love you girl", id: 30 }
      , avatar: "test avatar "
    }
    ,init_office_name:'tested and want to trust'
    ,office_update_id:'039174dd9b734d714'
    ,asp_update_id:'02704baf09338f8e5'
  })
}
</script>