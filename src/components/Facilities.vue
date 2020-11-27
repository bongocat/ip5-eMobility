<template>
  <v-main>
    <v-container fluid>
      <v-card style="margin-top: 20px" :elevation="5">
        <v-card-title>
          <h1>Anlagen</h1>
          <v-badge :content="allFacilities.length" :value="allFacilities.length" color="success" inline/>
        </v-card-title>
        <v-card-text>
          <facility-registration></facility-registration>
          <v-expansion-panels style="padding-bottom: 20px; margin-top: 20px">
            <v-expansion-panel>
              <v-expansion-panel-header>
                Filter
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row dense>
                  <v-col>
                    <v-overflow-btn
                        dense
                        editable
                        full-width="false"
                        :items="getUniqueProperties"
                        label="Anlagen"
                        item-value="text"
                    ></v-overflow-btn>
                  </v-col>
                  <v-col>
                    <v-overflow-btn
                        deletable-chips
                        dense
                        editable
                        full-width="false"
                        :items="getUniqueAdministration"
                        label="Immobilienverwaltung"
                        item-value="text"
                    ></v-overflow-btn>
                  </v-col>
                  <v-col>
                    <v-overflow-btn
                        deletable-chips
                        dense
                        editable
                        full-width="false"
                        :items="getUniqueTenants"
                        label="PLZ"
                        item-value="text"
                    ></v-overflow-btn>
                  </v-col>
                  <v-col>
                    <v-overflow-btn
                        deletable-chips
                        dense
                        editable
                        full-width="false"
                        :items="getUniqueInvoiceCategory"
                        label="Land"
                        item-value="text"
                    ></v-overflow-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-data-table
              dense
              :headers="columnNames"
              :items="allFacilities"
              class="elevation-1"
              :items-per-page="20">
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


import FacilityRegistration from "./FacilityRegistration";
import { mapGetters } from "vuex";

export default {
  name: "facilities",
  components: {FacilityRegistration},
  data() {
    return {
      currentItem: {},
      selected: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      dialog: false,
      editedIndex: -1,
      paidInvoices: [],
    };
  },
  methods: {
    resetSelected(){
      this.selected = []
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
      window.open(encodedUri);
    }
  },
  computed: {
    ...mapGetters({
      allFacilities: 'allFacilities'
    }),
    columnNames() {
      var computedColumnnames  = []
      Object.keys(this.allFacilities[0]).forEach(function (item) {
        computedColumnnames.push({text: item, value: item})
      })
      computedColumnnames.push({text: 'Actions', value: 'actions', sortable: false })
      return computedColumnnames
    },
    getUniqueProperties(){
      var array = [];
      this.allFacilities.forEach(function (item) {
        if (!array.includes(item.Name)){
          array.push(item.Name)
        }
      })
      return array
    },
    getUniqueAdministration(){
      var array = [];
      this.allFacilities.forEach(function (item) {
        if (!array.includes(item.Immobilienverwaltung)){
          array.push(item.Immobilienverwaltung)
        }
      })
      return array
    },
    getUniqueTenants(){
      var array = [];
      this.allFacilities.forEach(function (item) {
        if (!array.includes(item.PLZ)){
          array.push(item.PLZ)
        }
      })
      return array
    },
    getUniqueInvoiceCategory(){
      var array = [];
      this.allFacilities.forEach(function (item) {
        if (!array.includes(item.Land)){
          array.push(item.Land)
        }
      })
      return array
    }
  }
}

</script>

<style scoped>

h1, h5 {
  vertical-align: center;
  clear:both;
}
</style>
