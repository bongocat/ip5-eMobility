<template>
  <v-data-table
      :headers="columnNames"
      :items="anlage.filter(anlage => anlage.Count = loads.filter(loads => loads.Anlage == anlage.Anlage).length)"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="Anlage"
      show-expand
      class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Expandable Table</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-switch
            v-model="singleExpand"
            label="Single expand"
            class="mt-2"
        ></v-switch>
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-data-table
            :headers="columnInnerNames"
            :items="loads.filter(loads => loads.Anlage == item.Anlage)"
            item-key="inner"
            class="elevation-1"
        >
        </v-data-table>
      </td>

    </template>
  </v-data-table>
</template>

<script>
export default {
  data () {
    return {
      expanded: [],
      singleExpand: false,
      anlage: [
        {
          Anlage: "ABCD",
          ['Anlage ID']: "1010",
          Vermieter: "2001",
          ['Rechnung an']: "Mieter",
          Count: "",
        },
        {
          Anlage: "XXXX",
          ['Anlage ID']: "2020",
          Vermieter: "2001",
          ['Rechnung an']: "Mieter",
          Count: "",
        },
      ],
      loads: [
        {
          LoadID: "001",
          Anlage: "ABCD",
          ['Anlage ID']: "1010",
          Mieter: "1001",
          Vermieter: "2001",
          ['Rechnung an']: "Mieter",
        },
        {
          LoadID: "002",
          Anlage: "ABCD",
          ['Anlage ID']: "1010",
          Mieter: "1001",
          Vermieter: "2001",
          ['Rechnung an']: "Mieter",
        },
        {
          LoadID: "003",
          Anlage: "XXXX",
          ['Anlage ID']: "2020",
          Mieter: "1001",
          Vermieter: "2001",
          ['Rechnung an']: "Mieter",
        },
      ],
    }
  },
  computed: {
    columnNames() {
      let anlageHeaders = []
      Object.keys(this.anlage[0]).forEach(function (item) {
        anlageHeaders.push({text: item, value: item},)
      })
      anlageHeaders.push({text: 'Actions', value: 'actions', sortable: false })
      anlageHeaders.push({ text: '', value: 'data-table-expand' })
      return anlageHeaders
    },
    columnInnerNames() {
      let computeddessertHeaders = []
      Object.keys(this.loads[0]).forEach(function (item) {
        computeddessertHeaders.push({text: item, value: item},)
      })
      computeddessertHeaders.push({ text: '', value: 'data-table-expand' })
      return computeddessertHeaders
    },
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
