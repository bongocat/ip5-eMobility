<template>
  <div class="container-lg">
    <h1 id = invoices>Rechnungen</h1>
    <div class = dataTable>
      <v-data-table
          :headers="columnNames"
          :items="Invoices"
          class="elevation-1">
        <template v-slot:item.actions="{item}">
          <v-btn @click="toCSV(item)">
            ↓
          </v-btn>
          <v-btn color="success">
            Rechnung generieren
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>

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
      Invoices: [
        {
          RechnungsID: "001",
          RechnungsNr: "ABCD",
          RechnungsTyp: "Strom",
          MieterReferenz: "1001",
          VermieterReferenz: "2001",
          RechnungAn: "Mieter",
          LoadID: "2222",
          RechnungGestellt: "25.11.2020",
          ZuZahlenBis: "25.12.2020",
          RechungBezahlt: "Nein",
          Vorname: "Peter",
          Nachname: "Karachi",
          Firma: "",
          actions: "",
        },
      ],
      columnNames: [
        {text: 'ID', value: 'RechnungsID'},
        {text: 'Rechnung', value: 'RechnungsNr'},
        {text: 'Rechnungsart', value: 'RechnungsTyp'},
        {text: 'Load', value: 'LoadID'},
        {text: 'Mieter Referenz', value: 'MieterReferenz'},
        {text: 'Vermieter Referenz', value: 'VermieterReferenz'},
        {text: 'Rechnung an', value: 'RechnungAn'},
        {text: 'Vorname', value: 'Vorname'},
        {text: 'Nachname', value: 'Nachname'},
        {text: 'Rechungsdatum', value: 'RechnungGestellt'},
        {text: 'Zahlungsfrist', value: 'ZuZahlenBis'},
        {text: 'Bezahlt am', value: 'RechungBezahlt'},
        {text: 'Firma', value: 'Firma'},
        {text: 'Actions', value: 'actions', sortable: false },
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
