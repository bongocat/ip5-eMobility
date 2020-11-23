<template>
   <div class="container-fluid">
      <div class = "heading">
         <h1>Anstehende Rechnungen</h1>
         <h5>(Nächste 30 Tage)</h5>
      </div>
         <table class="table table-dark">
            <thead>
            <tr>
               <th @click='sort(item)' v-for="(item, index) in columnNames" v-bind:key="index" scope="col">{{item}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index1) in upcomingInvoices"  v-bind:key="index1">
               <td v-for="(category, index2) in item"  v-bind:key="index2">
                  {{category}}
               </td>
            </tr>
            </tbody>
         </table>
      debug: sort={{currentSort}}, dir={{currentSortDir}}
      <p>
         <button @click="prevPage">Previous</button>
         <button @click="nextPage">Next</button>
      </p>
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
                 {Liegenschaft: "L3", Betrag: 172, Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"}
              ],
              columnNames: ["Liegenschaft", "Betrag", "Rechnungsart", "Mieter", "Immobilienverwaltung", "Fällig Am"],
              currentSort:'name',
              currentSortDir:'asc',
              pageSize:3,
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
             if((this.currentPage*this.pageSize) < this.cats.length) this.currentPage++;
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
      float: left !important;
      vertical-align: center;
   }

   .heading {
      vertical-align: center;
   }
</style>