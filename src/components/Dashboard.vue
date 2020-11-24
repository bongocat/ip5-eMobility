<template>
   <div>
      <h1 id = invoices>Anstehende Rechnungen</h1>
      <v-data-table :headers="columnNames" :items="upcomingInvoices" :items-per-page="10" class="elevation-1"></v-data-table>
   </div>
</template>

<script>
   export default {
      name: "Dashboard",
      data(){
         return {
            upcomingInvoices: [
               {Liegenschaft: "L1", Betrag: 125, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L2", Betrag: 144, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L3", Betrag: 172, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L1", Betrag: 125, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L2", Betrag: 144, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L3", Betrag: 172, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L1", Betrag: 125, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L2", Betrag: 144, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L3", Betrag: 172, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L1", Betrag: 125, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L2", Betrag: 144, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L3", Betrag: 172, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L1", Betrag: 125, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L2", Betrag: 144, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L3", Betrag: 172, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L2", Betrag: 144, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L3", Betrag: 172, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L1", Betrag: 125, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L2", Betrag: 144, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L3", Betrag: 172, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L1", Betrag: 125, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L2", Betrag: 144, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
               {Liegenschaft: "L3", Betrag: 172, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"}
            ],
            columnNames: [
               {text: 'Liegenschaft', value: 'Liegenschaft'},
               {text: 'Betrag', value: 'Betrag'},
               {text: 'Rechnungsart', value: 'Rechnungsart'},
               {text: 'Mieter', value: 'Mieter'},
               {text: 'Immobilienverwaltung', value: 'Immobilienverwaltung'},
               {text: 'Fällig Am', value: 'fälligAm'},
            ],
            currentSort:'name',
            currentSortDir:'asc',
            pageSize:7,
            currentPage:1
         };
      },
      methods: {
        getData: function () {
        }
      },
     mounted:function(){
       this.getData()
     },
      watch: {
      }
   }

</script>

<style scoped>
   h1, h5 {
      margin: 20px;
      vertical-align: center;
      clear:both !important;
   }

</style>
