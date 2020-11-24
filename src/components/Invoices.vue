<template>
  <div class="container-lg">
    <h1 id = invoices>Rechnungen</h1>
    <div class = dataTable>
      <v-data-table
          dense
          :headers="columnNames"
          :items="Invoices"
          class="elevation-1">
        <template v-slot:item.actions="{}">
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
          ID: 11,
          Liegenschaft: "L1",
          Betrag: 125,
          Rechnungsart: "Serviceabo",
          Mieter: "Mietermann",
          Immobilienverwaltung: "Verwaltung 1",
          fälligAm: "31.12.2020"
        },
        {
          ID: 10,
          Liegenschaft: "L2",
          Betrag: 144,
          Rechnungsart: "Serviceabo",
          Mieter: "Mietermann",
          Immobilienverwaltung: "Verwaltung 1",
          fälligAm: "31.12.2020"
        },
      ],
      columnNames: [
        {text: 'ID', value: 'ID'},
        {text: 'Liegenschaft', value: 'Liegenschaft'},
        {text: 'Betrag', value: 'Betrag'},
        {text: 'Rechnungsart', value: 'Rechnungsart'},
        {text: 'Mieter', value: 'Mieter'},
        {text: 'Immobilienverwaltung', value: 'Immobilienverwaltung'},
        {text: 'Fällig Am', value: 'fälligAm'},
        {text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },
  methods: {
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
