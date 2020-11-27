<template>
  <v-main>
    <v-container fluid>
      <v-card style="margin-top: 20px" :elevation="5">
        <v-card-title>
          <h1>Nutzer</h1>
          <v-badge :content="allUsers.length" :value="allUsers.length" color="success" inline/>
        </v-card-title>
        <v-card-text>
          <UserRegistration></UserRegistration>
          <v-data-table style="margin-top: 20px"
              dense
              :headers="columnNames"
              :items="allUsers"
              class="elevation-1"
              :items-per-page="5">
            <template v-slot:item.actions="{item}">
              <v-btn small @click="toCSV(item)">
                <v-icon>mdi-file-download</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import UserRegistration from "./UserRegistration";
import { mapGetters } from "vuex";

export default {
  name: "Users",
  components: {UserRegistration},
  data() {
    return {
      showModal: false,
      selected: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
    };
  },
  methods: {
    toCSV: function(item) {

      const outputData = [Object.keys(item), Object.values(item)];

      console.log(outputData);
      let csvContent = "data:text/csv;charset=utf-8,";

      outputData.forEach(function(outputData) {
        let row = outputData.join(",");
        csvContent += row + ";\r\n";
      });

      let encodedUri = encodeURI(csvContent);
      window.open(encodedUri);
    }
  },
  computed: {
    columnNames() {
      var computedColumnnames  = []
      Object.keys(this.allUsers[0]).forEach(function (item) {
        computedColumnnames.push({text: item, value: item})
      })
      computedColumnnames.push({text: 'Actions', value: 'actions', sortable: false })
      return computedColumnnames
    },
    ...mapGetters({
      allUsers: 'allUsers'
    }),
  }
}
</script>

<style scoped>
h1, h5 {
  vertical-align: center;
  clear:both;
}
</style>
