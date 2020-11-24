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
      methods:{

         sort(s) {
            //if s == current sort, reverse
            if(s === this.currentSort) {
               this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
            }
            this.currentSort = s;
            this.upcomingInvoices.sort((a,b) => {
               let modifier = 1;
               if(this.currentSortDir === 'desc') modifier = -1;
               if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
               if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
               return 0;
            }).filter((row, index) => {
               let start = (this.currentPage-1)*this.pageSize;
               let end = this.currentPage*this.pageSize;
               if(index >= start && index < end) return true;
            });
         },
         nextPage:function() {
            if((this.currentPage*this.pageSize) < this.upcomingInvoices.length) this.currentPage++;
         },
         prevPage:function() {
            if(this.currentPage > 1) this.currentPage--;
         },
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