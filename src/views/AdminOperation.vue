<template>
  <AlertSuccuss :snackbar="snackbar" />
  <v-card class="ma-5 pa-5">
    <v-card-title class="mb-5">
      <v-row>
        OFFICES
        <v-spacer></v-spacer>
        <OfficeForm :offices="offices" :snackbar="snackbar" />
      </v-row>
      <v-row>
      </v-row>
    </v-card-title>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-right">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in offices" :key="item.name">
          <td>{{ item.name }}</td>
          <td class="text-right">
            <OfficeForm :offices="offices" updateForm :snackbar="snackbar" :init_office_name="item.name" :office_update_id="item._id" />
            <!-- <v-btn size="x-small" color="primary mx-3" @click="edit_office(item)"> Edit </v-btn> -->
            <v-btn size="x-small" color="error" @click="delete_office(item)" class="ms-5"> delete </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>


  <v-card class="ma-5 pa-5">
    <v-card-title class="mb-5">
      <v-row class="text-uppercase">
        aspirant
        <v-spacer></v-spacer>
        <AspirantForm :aspirants="aspirants" :snackbar="snackbar" />
      </v-row>
      <v-row>
      </v-row>
    </v-card-title>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
	          Avatar
          </th>
          <th class="text-left">
	          First Name
          </th>
          <th class="text-left">
	          Other Names
          </th>
          <th class="text-left">
	          Department
          </th>
          <th class="text-left">
	          Office
          </th>
          <th class="text-right">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in aspirants" :key="item.first_name">
          <td><v-avatar :image="item.avatar" :alt="item.first_name" size="40"></v-avatar></td>
          <td>{{ item.first_name }}</td>
          <td>{{ item.other_names }}</td>
          <td>{{ item.department }}</td>
          <td>{{ item.office }}</td>
          <td class="text-right">
            <AspirantForm :aspirants="aspirants" updateForm :snackbar="snackbar" :initial_asp_form_data="item" :asp_update_id="item._id" />
            <!-- <v-btn size="x-small" color="primary mx-3" @click="edit_office(item)"> Edit </v-btn> -->
            <v-btn size="x-small" color="error" @click="delete_aspirant(item)" class="ms-5"> delete </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
<script>
import AspirantForm from '../components/AspirantForm.vue'
import OfficeForm from '../components/OfficeForm.vue'
import AlertSuccuss from '../components/AlertSuccuss.vue'


export default {
  components: { OfficeForm, AlertSuccuss, AspirantForm }
  , data() {
    return {
      search: ''
      , snackbar: {
        show: false
        , text: 'sample bar'
      }
      , update_office_dialog: false
      , create_office_dialog: false
      , update_aspirant_dialog: false
      , create_aspirant_dialog: false
      , init_office_: { "id": 1, "_id": "039174dd9b734d714", "name": "This is it", "deleted_flag": false, "createdAt": "2023-02-06T20:09:58.000Z", "updatedAt": "2023-02-16T14:51:54.000Z" },
      initial_asp_form_data:{}
      , headers: [{
          align: 'start'
          , key: 'name'
          , sortable: false
          , title: 'Office name'
        , },
        // { key: 'name', title: 'Office Name' },
        // { key: 'fat', title: 'Fat (g)' },
        // { key: 'carbs', title: 'Carbs (g)' },
        // { key: 'protein', title: 'Protein (g)' },
        // { key: 'iron', title: 'Iron (%)' },
      ]
      , offices: [
        /*        { "id": 1, "_id": "039174dd9b734d714", "name": "This is it", "deleted_flag": false, "createdAt": "2023-02-06T20:09:58.000Z", "updatedAt": "2023-02-16T14:51:54.000Z" }
                , { "id": 2, "_id": "07a6ba908e348cd81", "name": "President", "deleted_flag": false, "createdAt": "2023-02-06T20:10:13.000Z", "updatedAt": "2023-02-06T20:10:13.000Z" }
                , { "id": 3, "_id": "065b491048029ea98", "name": "pro", "deleted_flag": false, "createdAt": "2023-02-06T20:10:24.000Z", "updatedAt": "2023-02-06T20:10:24.000Z" }
                , { "id": 4, "_id": "04fd4623ad663594b", "name": "DOI", "deleted_flag": false, "createdAt": "2023-02-06T20:10:34.000Z", "updatedAt": "2023-02-06T20:10:34.000Z" }
                , { "id": 10, "_id": "0bb72d669ab640f98", "name": "test office", "deleted_flag": false, "createdAt": "2023-02-15T15:15:15.000Z", "updatedAt": "2023-02-15T15:15:15.000Z" }
                , { "id": 11, "_id": "043e4eb2fae6aab62", "name": "kingchi office", "deleted_flag": false, "createdAt": "2023-02-15T15:26:23.000Z", "updatedAt": "2023-02-15T15:26:23.000Z" }
        */
      ],
      aspirants:[
        {"id": 3, "_id": "02704baf09338f8e5", "first_name": "Amanda", "other_names": "baby", "department": "Beauty department", "avatar": "http://127.0.0.1:500/Emmanuel.jpg", "deleted_flag": false, "createdAt": "2023-02-06T20:11:47.000Z", "updatedAt": "2023-02-15T16:15:57.000Z", "office_id": 11 },
        {"id": 11, "_id": "0b0f0ed25c455b79b", "first_name": "Kingi", "other_names": "Eze", "department": "IFT", "avatar": "http://127.0.0.1:500/Emmanuel.jpg", "deleted_flag": false, "createdAt": "2023-02-06T20:24:39.000Z", "updatedAt": "2023-02-06T20:24:39.000Z", "office_id": 1 },
        {"id": 13, "_id": "05452b37d4ecd1e58", "first_name": "Okay", "other_names": "Eze", "department": "IFT", "avatar": "http://127.0.0.1:500/Emmanuel.jpg", "deleted_flag": false, "createdAt": "2023-02-06T20:25:17.000Z", "updatedAt": "2023-02-06T20:25:17.000Z", "office_id": 3 },
        {"id": 14, "_id": "0680b43f8f536deb0", "first_name": "Kingchi", "other_names": "Eze", "department": "IFT", "avatar": "http://127.0.0.1:500/Emmanuel.jpg", "deleted_flag": false, "createdAt": "2023-02-07T11:15:37.000Z", "updatedAt": "2023-02-07T11:15:37.000Z", "office_id": 1 },
        {"id": 22, "_id": "049edc9d31cffb09b", "first_name": "Kingch", "other_names": "Eze", "department": "IFT", "avatar": "http://127.0.0.1:500/Emmanuel.jpg", "deleted_flag": false, "createdAt": "2023-02-07T16:42:13.000Z", "updatedAt": "2023-02-07T16:42:13.000Z", "office_id": 1 },
        {"id": 25, "_id": "0e33a064b718eac3f", "first_name": "Kingc", "other_names": "Eze", "department": "IFT", "avatar": "http://127.0.0.1:500/Emmanuel.jpg", "deleted_flag": false, "createdAt": "2023-02-07T16:44:48.000Z", "updatedAt": "2023-02-07T16:44:48.000Z", "office_id": 1 },
        {"id": 28, "_id": "031afe41fb28fb89b", "first_name": "Kin", "other_names": "Eze", "department": "IFT", "avatar": "http://127.0.0.1:500/Emmanuel.jpg", "deleted_flag": false, "createdAt": "2023-02-07T16:45:23.000Z", "updatedAt": "2023-02-07T16:45:23.000Z", "office_id": 1 },
      ]
    }
  }
  , methods: {
    async delete_office(offc) {
      const res = await fetch("http://127.0.0.1:500/admin/delete-office/" + offc._id, {
        method: 'DELETE'
      })
      const deleted = await res.json()
      // console.log(deleted)
      if (deleted.ok) {
        this.snackbar['show'] = true
        this.snackbar['text'] = deleted.msg
        this.offices = this.offices.filter(o => o._id !== offc._id)
      }
    }
    , edit_office(offc) {
      this.init_office_ = offc
      this.update_office_dialog = true

    },
    async delete_aspirant(asp) {
      const res = await fetch("http://127.0.0.1:500/admin/delete-aspirant/" + asp._id, {
        method: 'DELETE'
      })
      const deleted = await res.json()
      // console.log(deleted)
      if (deleted.ok) {
        this.snackbar['show'] = true
        this.snackbar['text'] = deleted.msg
        this.aspirants = this.aspirants.filter(o => o._id !== asp._id)
      }
    }
    , edit_aspirant(asp) {
      this.initial_asp_form_data = asp
      // console.log(this.initial_asp_form_data)
      this.update_aspirant_dialog = true

    }
  }
  , async mounted() {
    try {
      const fetch_offices = await fetch("http://127.0.0.1:500/admin/fetch-office/")
      const result = await fetch_offices.json()
      if (result.ok) {
        this.offices = result.offices
      }
    } catch (e) {
      console.log(e);
    }

    try {
      const fetch_aspirants = await fetch("http://127.0.0.1:500/api/fetch-aspirants/")
      const result = await fetch_aspirants.json()
      if (result.ok) {
      	for (let asp of result.aspirants) {
      		asp.office = this.offices.filter(o => o.id == asp.office_id)[0]?.name
      	}
      	// console.log(result.aspirants)
        this.aspirants = result.aspirants
      }
    } catch (e) {
      console.log(e);
    }
  }
}
</script>