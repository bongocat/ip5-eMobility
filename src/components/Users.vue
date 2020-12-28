<template>
  <v-main>
    <v-container fluid>
      <v-card style="margin-top: 20px" :elevation="5">
        <v-card-title>
          <h3>Nutzer</h3>
          <v-badge :content="allUsers.length" :value="allUsers.length" color="success" inline/>
        </v-card-title>
        <v-card-text>
          <UserRegistration></UserRegistration>
          <v-data-table
              dense
              style="margin-top: 20px"
              :headers="columnNames"
              :items="allUsers"
              class="elevation-1"
              :items-per-page="5"
              :item-class="itemRowBackground"
          >
            <template v-slot:item.actions="{item}">
              <UserEdit :user = "item" ></UserEdit>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import UserEdit from "./UserEdit";
import UserRegistration from "./UserRegistration";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Users",
  components: {UserRegistration, UserEdit},
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
      edit: false
    };
  },
  methods: {
    ...mapActions(['fetchUsers']),
    itemRowBackground: function (item) {
      return item.Kommentar.length > 100 ? 'style-1' : 'style-2'
    },
    toCSV: function(item) {

      const outputData = [Object.keys(item), Object.values(item)];

      console.log(outputData);
      let csvContent = "data:text/csv;charset=utf-8,";

      outputData.forEach(function(outputData) {
        let row = outputData.join(",");
        csvContent += row + ";\r\n";
      });

      let encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "megalog_invoice.csv");
      document.body.appendChild(link);
      link.click();
    }
  },
  computed: {
    columnNames() {
      var computedColumnnames  = []
      Object.keys(this.allUsers[0]).forEach(function (item) {
        if (item === 'Kommentar'){
          computedColumnnames.push({text: item, value: item, class: 'tableComment', width: "25%"})
        }
        else {
          computedColumnnames.push({text: item, value: item})
        }
      })
      computedColumnnames.push({text: 'Actions', value: 'actions', sortable: false })
      console.log(this.allUsers)
      return computedColumnnames
    },
    ...mapGetters({
      allUsers: 'allUsers'
    }),
  },
  created() {
    this.fetchUsers();
  }
}
</script>

<style>

h1, h5 {
  vertical-align: center;
  clear:both;
}

.style-1 .text-start {
  overflow-y: auto;
  overflow-x: auto;
  text-overflow-ellipsis: true;
  white-space: nowrap;
  max-width: 300px;
  height: 300px;
}

.style-2 {
}

</style>
