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
    <v-data-table
      :headers="election_result_headers"
      :items="election_stats"
      item-value="name"
      class="elevation-1"
    >
      <template v-slot:item.avatar="{ item }">
        <v-avatar :image="item.raw.avatar" :alt="item.raw.first_name" size="40"></v-avatar>
      </template>
    </v-data-table>
  </v-card>
<!--
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
            <!- <v-btn size="x-small" color="primary mx-3" @click="edit_office(item)"> Edit </v-btn> --
            <v-btn size="x-small" color="red" @click="handle_delete_office(item)" class="ms-5"> delete </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
-->



</template>
<script>
  export default {
    data:()=>({
      loading:false,
      election_result_headers: [
        {
          title: 'Avatar',
          align: 'start',
          key: 'avatar',
          sortable: false,
        },
        { title: 'First name', key: 'first_name' },
        { title: 'Other names', key: 'other_names' },
        { title: 'Office', key: 'office' },
        { title: 'Votes', key: 'number_of_votes' },
        // { title: 'Iron (%)', key: 'iron' },
      ],
      election_stats:[]
    }),
    async mounted(){
      const el_stat = [
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
      ]

      try {
        const fetch_el_stat = await fetch("http://127.0.0.1:500/admin/fetch-result/")
        const result = await fetch_el_stat.json()
        if (result.ok) {
          let el_stat = result.election_result.votes
          for(let items of el_stat) {
            for(let item of items.aspirants) {
              this.election_stats.push(item)
            };
          }
          // console.log(this.election_stats)
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
</script>