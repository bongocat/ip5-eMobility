<template>
  <v-card style="margin-top: 20px" :elevation="5">
    <v-container fluid>
      <v-card-title>
        <h1>Loads</h1>
        <v-badge :content="allLoads.length" :value="allLoads.length" color="success" inline/>
        <LoadRegistration></LoadRegistration>
      </v-card-title>
      <v-card-text>
        <v-data-table
            :headers="columnNames"
            :items="allFacilities.filter(anlage => anlage.Count = allLoads.filter(loads => loads.Anlage == anlage.Anlage).length)"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            item-key="Anlage"
            show-expand
            class="elevation-1"
        >
          <template v-slot:item.actions="{item}">
            <v-btn @click="toCSV(item)">
              <v-icon>mdi-file-download</v-icon>
            </v-btn>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
                  <v-data-table
                          style="margin: 20px; background-color: rgba(0,0,0,0.05)"
                          :headers="columnInnerNames"
                          :items="allLoads.filter(loads => loads.Anlage == item.Anlage)"
                          item-key="inner"
                          class="elevation-5"
                  >
                    <template v-slot:item.actions="{item}">
                      <v-btn @click="toCSV(item)">
                        <v-icon>mdi-file-download</v-icon>
                      </v-btn>
                    </template>
                  </v-data-table>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-container>
  </v-card>

</template>

<script>
import { mapGetters } from "vuex";
import LoadRegistration from "./LoadRegistration";

export default {
  components: {LoadRegistration},
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
}
</script>

<style scoped>

h1, h5 {
  vertical-align: center;
  clear: both;
}

</style>
