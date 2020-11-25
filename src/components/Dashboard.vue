<template>
   <div class="container-lg">
      <h1 id = invoices>Anstehende Rechnungen</h1>
      <h5>(in den nächsten 30 Tagen)</h5>
      <div class = dataTable>
         <v-data-table
                 dense
                 :headers="columnNames"
                 :items="upcomingInvoices"
                 class="elevation-1"
                 :items-per-page="5">
            <template v-slot:item.actions="{item}">
               <v-dialog max-width="800px" v-model="showModal" appendTo="@(body)">
                  <v-btn slot="activator" color="success" @click="showModal = true" x-small>
                     Rechnung generieren
                  </v-btn>
                  <GenerateInvoice :invoice="item"></GenerateInvoice>
               </v-dialog>
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
                 class="elevation-1"
                 :items-per-page="5">
               <template v-slot:item.actions="{item}">
                  <v-btn color="success" x-small class="mr-2" @click="markAsPaid([item])">
                     Als Bezahlt markieren
                  </v-btn>
                  <v-btn color="warning" x-small class="mr-2">
                     Mahnung
                  </v-btn>
               </template>
         </v-data-table>
         <div class="text-center pt-2">
            <v-btn color="blue" @click="markAsPaid(selected), resetSelected()">
               Markierte als bezahlt markieren
            </v-btn>
         </div>
         <h1>Kürzlich bezahlte Rechnungen</h1>
         <v-data-table
                 v-model="selected"
                 item-key="ID"
                 show-select
                 :single-select="false"
                 dense
                 :headers="columnNames"
                 :items="paidInvoices"
                 class="elevation-1"
                 :items-per-page="5">
         </v-data-table>
      </div>
   </div>
</template>

<script>

   import GenerateInvoice from "./GenerateInvoice";
   export default {
      name: "Dashboard",
      components: {GenerateInvoice},
      data() {
         return {
            showModal: false,
            selected: [],
            page: 1,
            pageCount: 0,
            itemsPerPage: 5,
            dialog: false,
            editedIndex: -1,
            paidInvoices: [],
            upcomingInvoices: [
               {
                  ID: 11,
                  Liegenschaft: "L1",
                  Betrag: 125,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  ['Fällig Am']: "31.12.2020"
               },
               {
                  ID: 10,
                  Liegenschaft: "L2",
                  Betrag: 144,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  ['Fällig Am']: "31.12.2020"
               },
               {
                  ID: 9,
                  Liegenschaft: "L3",
                  Betrag: 172,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  ['Fällig Am']: "31.12.2020"
               },
               {
                  ID: 8,
                  Liegenschaft: "L1",
                  Betrag: 125,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  ['Fällig Am']: "31.12.2020"
               },
               {
                  ID: 7,
                  Liegenschaft: "L2",
                  Betrag: 144,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  ['Fällig Am']: "31.12.2020"
               },
               {
                  ID: 6,
                  Liegenschaft: "L3",
                  Betrag: 172,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  ['Fällig Am']: "31.12.2020"
               },
               {
                  ID: 5,
                  Liegenschaft: "L1",
                  Betrag: 125,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  ['Fällig Am']: "31.12.2020"
               },
               {
                  ID: 4,
                  Liegenschaft: "L2",
                  Betrag: 144,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  ['Fällig Am']: "31.12.2020"
               },
               {
                  ID: 3,
                  Liegenschaft: "L3",
                  Betrag: 172,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  ['Fällig Am']: "31.12.2020"
               },
               {
                  ID: 2,
                  Liegenschaft: "L1",
                  Betrag: 125,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  ['Fällig Am']: "31.12.2020"
               },
               {
                  ID: 1,
                  Liegenschaft: "L2",
                  Betrag: 144,
                  Rechnungsart: "Serviceabo",
                  Mieter: "Mietermann",
                  Immobilienverwaltung: "Verwaltung 1",
                  ['Fällig Am']: "31.12.2020"
               },
            ],
         };
      },
      methods: {
         markAsPaid(items){
            for (var i = 0; i < items.length; i++){
               this.paidInvoices.push(items[i])
               this.upcomingInvoices.splice(this.upcomingInvoices.indexOf(items[i]), 1)
               console.log(items[i])
            }
         },
         resetSelected(){
            this.selected = []
         }
      },
      computed: {
         columnNames() {
            var computedColumnnames  = []
            Object.keys(this.upcomingInvoices[0]).forEach(function (item) {
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
      clear:both;
   }
</style>