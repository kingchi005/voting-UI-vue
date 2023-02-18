<template>
  <AlertSuccuss :snackbar="snackbar" />
  <v-card class="ma-5 pa-5">
    <v-card-title class="mb-5">
    	<v-row>
	      OFFICES
      <v-spacer></v-spacer>
	      <OfficeForm :snackbar="snackbar" />
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
          <th class="text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in offices" :key="item.name">
          <td>{{ item.name }}</td>
          <td class="">
          	<OfficeForm updateForm :snackbar="snackbar" :init_office_name="item.name" :office_update_id="item._id" />
            <!-- <v-btn size="x-small" color="primary mx-3" @click="edit_offices(item)"> Edit </v-btn> -->
            <v-btn size="x-small" color="error" @click="delete_offices(item)" class="ms-5"> delete </v-btn>
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
	components:{OfficeForm,AlertSuccuss},
  data() {
    return {
      search: '',
      snackbar:{
      	show:false,
      	text:'sample bar'
      },
      update_office_dialog:false,
      create_office_dialog:true,
      init_office_:{"id": 1, "_id": "039174dd9b734d714", "name": "This is it", "deleted_flag": false, "createdAt": "2023-02-06T20:09:58.000Z", "updatedAt": "2023-02-16T14:51:54.000Z" }
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
*/      ]
    , }
  }
  , methods: {
    async delete_offices(off) {
      const res = await fetch("http://127.0.0.1:500/admin/delete-office/" + off._id,{
      	method:'DELETE'
      })
      const deleted = await res.json()
      // console.log(deleted)
    	if (deleted.ok) {
    		this.snackbar['show'] = true
    		this.snackbar['text'] = deleted.msg
    		this.offices = this.offices.filter(o => o._id !== off._id)
     	}
    },
    edit_offices(off){
    	this.init_office_ = off
    	this.update_office_dialog = true

    }
  },
  async mounted(){
  	try {
	    const res = await fetch("http://127.0.0.1:500/admin/fetch-office/")
	    const result = await res.json()
	    if (result.ok) {
	    	this.offices = result.offices
	    }
  	} catch(e) {
  		console.log(e);
  	}
  }
}
</script>