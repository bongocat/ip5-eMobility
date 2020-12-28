<template>
  <v-main>
    <v-container fluid>
      <v-card style="margin-top: 20px" :elevation="5">
        <v-card-title>
          <h3>Loads</h3>
          <v-badge :content="allLoads.length" :value="allLoads.length" color="success" inline/>
        </v-card-title>
        <v-card-text>
          <LoadRegistration></LoadRegistration>
          <LoadTypeRegistration></LoadTypeRegistration>
          <v-data-table
              dense
              style="margin-top: 20px"
              :headers="columnNames"
              :items="allFacilities.filter(anlage => anlage.Count = allLoads.filter(loads => loads.Anlage == anlage.Anlage).length)"
              :single-expand="singleExpand"
              :expanded.sync="expanded"
              item-key="AnlageID"
              show-expand
              class="elevation-1"
          >
            <template v-slot:item.actions="{item}">
              <v-btn small @click="toCSV(item)">
                <v-icon>mdi-file-download</v-icon>
              </v-btn>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <v-data-table
                    style="margin: 20px; background-color: rgba(0,0,0,0.05)"
                    :headers="columnInnerNames"
                    :items="allLoads.filter(loads => loads.AnlageNr == item.AnlageID)"
                    item-key="inner"
                    class="elevation-5"
                >
                  <template v-slot:item.actions="{item}">
                    <LoadEdit :load = "item"></LoadEdit>
                  </template>
                </v-data-table>
              </td>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import LoadRegistration from "./LoadRegistration";
import LoadEdit from "./LoadEdit";
import LoadTypeRegistration from "./LoadTypeRegistration";



export default {
  components: {LoadRegistration, LoadEdit, LoadTypeRegistration},
  data() {
    return {
      expanded: [],
      singleExpand: false,
    }
  },
  computed: {
    columnNames() {
      let facilityHeaders = []
      Object.keys(this.allFacilities[0]).forEach(function (item) {
        facilityHeaders.push({text: item, value: item},)
      })
      facilityHeaders.push({text: 'Actions', value: 'actions', sortable: false})
      facilityHeaders.push({text: '', value: 'data-table-expand'})
      return facilityHeaders
    },
    columnInnerNames() {
      let loadHeader = []
      Object.keys(this.allLoads[0]).forEach(function (item) {
        loadHeader.push({text: item, value: item},)
      })
      loadHeader.push({text: 'Actions', value: 'actions', sortable: false})
      return loadHeader
    },
    ...mapGetters({
      allLoads: 'allLoads',
      allFacilities: 'allFacilities'
    }),
  },
  methods: {
    ...mapActions(['fetchLoads']),
    toCSV: function (item) {

      const outputData = [Object.keys(item), Object.values(item)];

      console.log(outputData);
      let csvContent = "data:text/csv;charset=utf-8,";

      outputData.forEach(function (outputData) {
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
  created() {
    this.fetchLoads()
  }
}
</script>

<style scoped>
h1, h5 {
  vertical-align: center;
  clear: both;
}
</style>
