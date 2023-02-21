<template>

  <v-card class="ma-5 pa-5">
    <v-card-title class="mb-5">
      <v-row class="text-uppercase">
        Election result
        <v-spacer></v-spacer>
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
          <td>
            <v-avatar :image="item.avatar" :alt="item.first_name" size="40"></v-avatar>
          </td>
          <td>{{ item.first_name }}</td>
          <td>{{ item.other_names }}</td>
          <td>{{ item.department }}</td>
          <td>{{ item.office.name }}</td>
          <td class="text-right">
            <!-- <v-btn size="x-small" color="primary mx-3" @click="edit_office(item)"> Edit </v-btn> -->
            <v-btn size="x-small" color="red" @click="handle_delete_aspirant(item)" class="ms-5"> remove </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>

  <v-card class="ma-5 pa-5">
    <v-card-title class="mb-5">
      <v-row>
        OFFICES
        <v-spacer></v-spacer>
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
            <!-- <v-btn size="x-small" color="primary mx-3" @click="edit_office(item)"> Edit </v-btn> -->
            <v-btn size="x-small" color="red" @click="handle_delete_office(item)" class="ms-5"> delete </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>


</template>
<script>
  export default {
    data:()=>({
      loading:false,
      election_stats:[
        {
          "office_name": "Secretary General",
          "aspirants": []
        },
        {
          "office_name": "President",
          "aspirants": [
            {
              "id": 22,
              "_id": "049edc9d31cffb09b",
              "first_name": "Kingchi",
              "other_names": "Eze",
              "department": "IFT",
              "avatar": null,
              "deleted_flag": false,
              "createdAt": "2023-02-07T16:42:13.000Z",
              "updatedAt": "2023-02-19T22:30:40.000Z",
              "office": "President",
              "number_of_votes": 0
            }
          ]
        },
        {
          "office_name": "Director of Infomation",
          "aspirants": [
            {
              "id": 25,
              "_id": "0e33a064b718eac3f",
              "first_name": "David",
              "other_names": "Onyebule",
              "department": "CSC",
              "avatar": null,
              "deleted_flag": false,
              "createdAt": "2023-02-07T16:44:48.000Z",
              "updatedAt": "2023-02-19T22:31:34.000Z",
              "office": "Director of Infomation",
              "number_of_votes": 0
            }
          ]
        },
        {
          "office_name": "Office of Tresurer",
          "aspirants": []
        },
        {
          "office_name": "Director of sports",
          "aspirants": [
            {
              "id": 28,
              "_id": "031afe41fb28fb89b",
              "first_name": "Divine",
              "other_names": "Ekwere",
              "department": "BSC",
              "avatar": null,
              "deleted_flag": false,
              "createdAt": "2023-02-07T16:45:23.000Z",
              "updatedAt": "2023-02-19T22:32:32.000Z",
              "office": "Director of sports",
              "number_of_votes": 0
            }
          ]
        }
      ],
      election_result_headers: [
        {
          title: '',
          align: 'start',
          key: 'name',
          sortable: false,
        },
        { title: 'Calories', key: 'calories' },
        { title: 'Fat (g)', key: 'fat' },
        { title: 'Carbs (g)', key: 'carbs' },
        { title: 'Protein (g)', key: 'protein' },
        { title: 'Iron (%)', key: 'iron' },
      ]
    })
  }
</script>