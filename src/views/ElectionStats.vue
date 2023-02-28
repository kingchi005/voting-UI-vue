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
      <template v-slot:item.number_of_votes="{ item }">
        <v-chip
          class="ma-2"
          color="primary"
          text-color="white"
        >
          {{item.raw.number_of_votes}}
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
  import axios from 'axios'

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
    methods:{
      async fetch_result(){
        const fetch_el_stat = await (await axios.get("/admin/fetch-result/")).data
        if (fetch_el_stat.ok) {
          let el_stat = fetch_el_stat.election_result.votes
          let arr = []
          for(let items of el_stat) {
            for(let item of items.aspirants) {
              arr.push(item)
            };
          }
          this.election_stats = arr
          arr = []
          if (fetch_el_stat.election_started) setTimeout(this.fetch_result, 5000)
          // console.log(this.election_stats)
        }
      }
    },
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
        // const fetch_int = setInterval(this.fetch_result,5000)
        this.fetch_result()
      } catch (e) {
        clearInterval(fetch_int)
        console.log(e);
      }
    }
  }
</script>