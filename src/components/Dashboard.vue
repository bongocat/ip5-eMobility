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
   </div>
</template>

<script>

   export default {
      name: "Dashboard",
      data() {
         return {
            page: 1,
            pageCount: 0,
            itemsPerPage: 10,
            dialog: false,
            dialogDelete: false,
            editedIndex: -1,
            upcomingInvoices: [
               {
                  Liegenschaft: "L1",
                  Betrag: 125,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L2",
                  Betrag: 144,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L3",
                  Betrag: 172,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L1",
                  Betrag: 125,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L2",
                  Betrag: 144,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L3",
                  Betrag: 172,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L1",
                  Betrag: 125,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L2",
                  Betrag: 144,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L3",
                  Betrag: 172,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L1",
                  Betrag: 125,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L2",
                  Betrag: 144,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L3",
                  Betrag: 172,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L1",
                  Betrag: 125,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L2",
                  Betrag: 144,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L3",
                  Betrag: 172,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L2",
                  Betrag: 144,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L3",
                  Betrag: 172,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L1",
                  Betrag: 125,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L2",
                  Betrag: 144,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L3",
                  Betrag: 172,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L1",
                  Betrag: 125,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L2",
                  Betrag: 144,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               },
               {
                  Liegenschaft: "L3",
                  Betrag: 172,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  fälligAm: "31.12.2020"
               }
            ],
            columnNames: [
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
        toCSV: function() {

          const outputData = [
            ["Liegenschaft", "Betrag", "Rechnungsart", "Mieter", "Immobilienverwaltung", "fälligAm"],
            ["name2", "city2", "more info"]
          ];

          let csvContent = "data:text/csv;charset=utf-8,";

          outputData.forEach(function(outputData) {
            let row = outputData.join(",");
            csvContent += row + "\r\n";
          });

          let encodedUri = encodeURI(csvContent);
          window.open(encodedUri);
        }
     },
     mounted:function(){
       this.toCSV()
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
