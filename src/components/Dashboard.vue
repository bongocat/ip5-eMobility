<template>
   <v-main>
      <v-container fluid>
         <v-card style="margin-top: 20px">
            <v-card-title>
               <h1>Kürzlich bezahlte Rechnungen</h1>
            </v-card-title>
            <v-data-table
                    dense
                    :headers="columnNames"
                    :items="upcomingInvoices"
                    class="elevation-1"
                    :items-per-page="5">
               <template v-slot:item.actions="{item}">
                  <GenerateInvoice :invoice="item"></GenerateInvoice>
               </template>
            </v-data-table>
         </v-card>
      <v-card style="margin-top: 20px">
         <v-card-title>
            <h1>Offene Rechnungen</h1>
         </v-card-title>
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
               </template>
         </v-data-table>
         <v-card-actions>
            <v-btn small color="blue" @click="markAsPaid(selected), resetSelected()">
               Ausgewählte als bezahlt markieren
            </v-btn>
         </v-card-actions>
         </v-card>
      <v-card style="margin-top: 20px">
         <v-card-title>
            <h1>Kürzlich bezahlte Rechnungen</h1>
         </v-card-title>
         <v-data-table
                 v-model="selected"
                 item-key="ID"
                 dense
                 :headers="columnNames"
                 :items="paidInvoices"
                 class="elevation-1"
                 :items-per-page="5">
            <template v-slot:item.actions="{}">
               <v-btn color="light-blue" x-small @click="{}">
                  <v-icon light>
                     mdi-file-download-outline
                  </v-icon>
               </v-btn>
            </template>
            </v-data-table>
         </v-card>
      </v-container>
   </v-main>
</template>

<script>

   import GenerateInvoice from "./GenerateInvoice";
   export default {
      name: "Dashboard",
      components: {GenerateInvoice},
      data() {
         return {
            currentItem: {},
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
