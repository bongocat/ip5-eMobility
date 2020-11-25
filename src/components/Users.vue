<template>
  <div class="container-lg">
    <h1 id = invoices>Nutzer</h1>
    <div class = dataTable>
      <v-data-table
          :headers="columnNames"
          :items="Users"
          class="elevation-1">
        <template v-slot:item.actions="{item}">
          <v-btn @click="toCSV(item)">
            <v-icon>mdi-file-download</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </div>

</template>

<script>

export default {
  name: "Users",
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
      Users: [
        {
          NutzerID: "001",
          Vorname: "John",
          Nachname: "Snow",
          NutzerTyp: "Mieter",
          Firma: "",
          Anrede: "Herr",
          Strasse: "Musterweg",
          Hausnummer: "42",
          PLZ: "2077",
          Ort: "Night-City",
          Land: "Boletaria",
          Mietet: "",
          Vermietet: "",
          Aktiv:"Ja",
          Kommentar:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
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
      Object.keys(this.Users[0]).forEach(function (item) {
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
