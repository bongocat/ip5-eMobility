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
            <template v-slot:item.actions="{item}">
               <v-btn color="success" @click="generateModal(item)">
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
      <transition name="fade" appear>
         <div class = "modal-overlay" v-if="showModal" @click="showModal = false"></div>
      </transition>
      <transition name="slide" appear>
         <div class="modalPresentation" v-if="showModal">
            <GenerateInvoice :invoice="currentItem"></GenerateInvoice>
            <v-btn @click="showModal = false">
               Abbrechen
            </v-btn>
         </div>
      </transition>
   </div>
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
      },
      methods: {
         generateModal: function(item){
            this.showModal = true
            this.currentItem = item
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