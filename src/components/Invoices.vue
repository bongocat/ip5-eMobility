<template>
  <v-main>
    <v-container fluid>
      <v-card style="margin-top: 20px" :elevation="5">
        <v-card-title>
          <h1>Rechnungen</h1>
          <v-badge :content="this.allInvoices.length" :value="this.allInvoices.length" color="success" inline/>
        </v-card-title>
        <v-card-text>
          <v-data-table
              dense
              :headers="columnNames"
              :items="allInvoices"
              class="elevation-1"
              :items-per-page="15">
            <template v-slot:item.actions="{item}">
              <v-btn small @click="toCSV(item)">
                <v-icon>mdi-file-download</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-card max-width="300">
        <v-list dense>
          <v-subheader>Rechnungsvorlagen</v-subheader>
          <v-list-item-group
              v-model="selectedItem"
              color="primary"
          >
            <v-list-item
                v-for="(vorlagen, i) in vorlagen"
                :key="i"
            >
              <v-list-item-content>
                <v-list-item-title v-text="vorlagen.text"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon v-text="vorlagen.icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Invoices",
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
      vorlagen: [
        {text: 'Installation', icon: 'mdi-folder-open'},
        {text: 'Strom', icon: 'mdi-folder-open'},
        {text: 'Serviceabonnement', icon: 'mdi-folder-open'},
      ],
    };
  },
  methods: {
    toCSV: function (item) {

      const outputData = [Object.keys(item), Object.values(item)];

      console.log(outputData);
      let csvContent = "data:text/csv;charset=utf-8,";

      outputData.forEach(function (outputData) {
        let row = outputData.join(",");
        csvContent += row + ";\r\n";
      });

      let encodedUri = encodeURI(csvContent);
      window.open(encodedUri);
    }
  },
  computed: {
    columnNames() {
      var computedColumnnames = []
      Object.keys(this.allInvoices[0]).forEach(function (item) {
        computedColumnnames.push({text: item, value: item})
      })
      computedColumnnames.push({text: 'Actions', value: 'actions', sortable: false})
      return computedColumnnames
    },
    ...mapGetters({
      allInvoices: 'allInvoices',
    }),
  }
}

</script>

<style scoped>
h1, h5 {
  vertical-align: center;
  clear: both
}
</style>
