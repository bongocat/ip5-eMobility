<template>
   <div class="container-lg">
      <h1 id = invoices>Anstehende Rechnungen</h1>
      <h5>(in den nächsten 30 Tagen)</h5>
      <div class = dataTable>
         <v-data-table
                 dense
                 :headers="columnNames"
                 :items="upcomingInvoices"
                 class="elevation-1">
            <template v-slot:item.actions="{  }">
               <v-btn color="success">
                  Rechnung generieren
               </v-btn>
            </template>
         </v-data-table>
      </div>
      <h1>Offene Zahlungen</h1>
      <div class = dataTable>
         <v-data-table
                 v-model="selected"
                 item-key="ID"
                 show-select
                 :single-select="false"
                 dense
                 :headers="columnNames"
                 :items="upcomingInvoices"
                 class="elevation-1">
            <template v-slot:item.actions="{  }">
               <v-btn color="warning">
                  Mahnung
               </v-btn>
            </template>
            <template v-slot:item.actions="{  }">
               <v-btn color="warning">
                  Als Bezahlt markieren
               </v-btn>
            </template>
         </v-data-table>
         <v-btn color="blue" @click="console.log(selected[0])">
            Markierte als bezahlt markieren
         </v-btn>
      </div>
   </div>
</template>

<script>

   export default {
      name: "Dashboard",
      data() {
         return {
            selected: [],
            page: 1,
            pageCount: 0,
            itemsPerPage: 10,
            dialog: false,
            dialogDelete: false,
            editedIndex: -1,
            upcomingInvoices: [
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
               {
                  ID: 9,
                  Liegenschaft: "L3",
                  Betrag: 172,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  ID: 8,
                  Liegenschaft: "L1",
                  Betrag: 125,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  ID: 7,
                  Liegenschaft: "L2",
                  Betrag: 144,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  ID: 6,
                  Liegenschaft: "L3",
                  Betrag: 172,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  ID: 5,
                  Liegenschaft: "L1",
                  Betrag: 125,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  ID: 4,
                  Liegenschaft: "L2",
                  Betrag: 144,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  ID: 3,
                  Liegenschaft: "L3",
                  Betrag: 172,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  ID: 2,
                  Liegenschaft: "L1",
                  Betrag: 125,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  ID: 1,
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

</style>