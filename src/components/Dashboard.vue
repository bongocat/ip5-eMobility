<template>
   <div class="container-fluid">
      <div class = "heading">
         <h1>Anstehende Rechnungen</h1>
         <h5>(Nächste 30 Tage)</h5>
      </div>
         <table class="table">
            <thead>
            <tr>
               <th v-for="(item, index) in columnNames"  v-bind:key="index" scope="col">{{item}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index1) in items"  v-bind:key="index1">
               <td v-for="(category, index2) in item"  v-bind:key="index2">
                  {{category}}
               </td>
            </tr>
            </tbody>
         </table>
   </div>
</template>

<script>
    export default {
        name: "MegalogDashboard",
       data(){
           return {
              items: [
                 {Liegenschaft: "L1", Betrag: 125 + "CHF", Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
                 {Liegenschaft: "L2", Betrag: 144 + "CHF", Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"},
                 {Liegenschaft: "L3", Betrag: 172 + "CHF", Rechnungsart: "Serviceabo", Mieter: "Mietermann", Immobilienverwaltung: "Verwaltung 1", fälligAm: "31.12.2020"}
              ],
              columnNames: ["Liegenschaft", "Betrag", "Rechnungsart", "Mieter", "Immobilienverwaltung", "Fällig Am"]
           };
       },
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