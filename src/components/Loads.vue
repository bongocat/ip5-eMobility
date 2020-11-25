<template v-slot:top>
  <div class="container-lg">
    <h1 id = invoices>Loads</h1>
    <div class = dataTable>
      <v-data-table
          :headers="columnNames"
          :items="Loads"
          :single-expand="singleExpand"
          show-expand
          class="elevation-1">
        <template v-slot:item.actions="{item}">
          <v-btn @click="toCSV(item)">
            <v-icon>mdi-file-download</v-icon>
          </v-btn>
        </template>
        <template v-slot:expanded-item="{ }">
          <v-data-table
              :headers-length="columnNames.length"
              :headers="columnNames"
              :items="Loads"
          >

          </v-data-table>
        </template>
      </v-data-table>
    </div>
  </div>

</template>

<script>

export default {
  name: "Loads",
  data() {
    return {
      showModal: false,
      selected: [],
      expanded: [],
      singleExpand: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      Loads: [
        {
          LoadID: "001",
          Anlage: "ABCD",
          AnlageID: "Strom",
          Mieter: "1001",
          Vermieter: "2001",
          RechnungAn: "Mieter",
          Firma: "",
        },
        {
          LoadID: "001",
          Anlage: "ABCD",
          AnlageID: "Strom",
          Mieter: "1001",
          Vermieter: "2001",
          RechnungAn: "Mieter",
          Firma: "",
        },
      ],
      inner: [
        {
          LoadID: "001",
          Loaded: "001",
        },

      ],
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
      Object.keys(this.Loads[0]).forEach(function (item) {
        computedColumnnames.push({text: item, value: item})
      })
      computedColumnnames.push({text: 'Actions', value: 'actions', sortable: false })
      return computedColumnnames
    }
  }
}

</script>

<style scoped>

h1, h5 {
  vertical-align: center;
  clear:both !important;
}

div.dataTable {
  max-width: 1800px;
}

.modal-overlay{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(3, 12, 3, 0.11);
}

.modalPresentation{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width: 100%;
  max-width: 800px;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 25px;
  padding: 20px;
}

.fade-enter-active, .fade-leave-active{
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to{
  opacity: 0;
}

.slide-enter-active, .slide-leave-active{
  transition: opacity 0.5s;
}

.slide-enter, .slide-leave-to{
  opacity: 0;
  transform: translateY(-50%) translateX(100vw);
}

</style>
