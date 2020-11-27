<template>
   <v-main>
      <v-container fluid>
         <v-card style="margin-top: 20px" :elevation="5">
            <v-card-title>
               <h1>Anstehende Rechnungen</h1>
               <v-badge :content="this.upcomingInvoices.length" :value="this.upcomingInvoices.length" color="success" inline/>
            </v-card-title>
            <v-card-subtitle style="padding-left: 20px; padding-top: -30px">(nächste 30 Tage)</v-card-subtitle>
            <v-card-text>
               <v-expansion-panels style="padding-bottom: 20px">
                  <v-expansion-panel>
                     <v-expansion-panel-header>
                        Filter
                     </v-expansion-panel-header>
                     <v-expansion-panel-content>
                        <v-row dense>
                           <v-col>
                              <v-overflow-btn
                                      dense
                                      editable
                                      full-width="false"
                                      :items="getUniqueProperties"
                                      label="Anlagen"
                                      item-value="text"
                              ></v-overflow-btn>
                           </v-col>
                           <v-col>
                              <v-overflow-btn
                                      deletable-chips
                                      dense
                                      editable
                                      full-width="false"
                                      :items="getUniqueAdministration"
                                      label="Verwaltungen"
                                      item-value="text"
                              ></v-overflow-btn>
                           </v-col>
                           <v-col>
                              <v-overflow-btn
                                      deletable-chips
                                      dense
                                      editable
                                      full-width="false"
                                      :items="getUniqueTenants"
                                      label="Mieter"
                                      item-value="text"
                              ></v-overflow-btn>
                           </v-col>
                           <v-col>
                              <v-overflow-btn
                                      deletable-chips
                                      dense
                                      editable
                                      full-width="false"
                                      :items="getUniqueInvoiceCategory"
                                      label="Rechnungsart"
                                      item-value="text"
                              ></v-overflow-btn>
                           </v-col>
                           <v-col>
                              <v-menu
                                      ref="menuStartingDate"
                                      v-model="menuStartingDate"
                                      :close-on-content-click="false"
                                      :return-value.sync="startingDate"
                                      transition="scale-transition"
                                      offset-y
                                      min-width="290px"
                              >
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                            v-model="startingDate"
                                            label="Startdatum"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                    ></v-text-field>
                                 </template>
                                 <v-date-picker
                                         v-model="startingDate"
                                         no-title
                                         scrollable
                                 >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            text
                                            color="primary"
                                            @click="menuStartingDate = false"
                                    >
                                       Cancel
                                    </v-btn>
                                    <v-btn
                                            text
                                            color="primary"
                                            @click="$refs.menuStartingDate.save(startingDate)"
                                    >
                                       OK
                                    </v-btn>
                                 </v-date-picker>
                              </v-menu>
                           </v-col>
                           <v-col>
                              <v-menu
                                      ref="menuEndDate"
                                      v-model="menuEndDate"
                                      :close-on-content-click="false"
                                      :return-value.sync="endDate"
                                      transition="scale-transition"
                                      offset-y
                                      min-width="290px"
                              >
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                            v-model="endDate"
                                            label="Enddatum"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                    ></v-text-field>
                                 </template>
                                 <v-date-picker
                                         v-model="endDate"
                                         no-title
                                         scrollable
                                 >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            text
                                            color="primary"
                                            @click="menuEndDate = false"
                                    >
                                       Cancel
                                    </v-btn>
                                    <v-btn
                                            text
                                            color="primary"
                                            @click="$refs.menuEndDate.save(endDate)"
                                    >
                                       OK
                                    </v-btn>
                                 </v-date-picker>
                              </v-menu>
                           </v-col>
                        </v-row>
                     </v-expansion-panel-content>
                  </v-expansion-panel>
               </v-expansion-panels>
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
            </v-card-text>
         </v-card>
      <v-card style="margin-top: 20px" :elevation="5">
         <v-card-title>
            <h1>Offene Rechnungen</h1>
            <v-badge :content="upcomingInvoices.length" :value="upcomingInvoices.length" color="success" inline/>
         </v-card-title>
         <v-card-text>
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
         </v-card-text>
         <v-card-actions>
            <v-btn small color="blue" @click="markAsPaid(selected), resetSelected()">
               Ausgewählte als bezahlt markieren
            </v-btn>
         </v-card-actions>
         </v-card>
      <v-card style="margin-top: 20px" :elevation="5">
         <v-card-title>
            <h1>Kürzlich bezahlte Rechnungen</h1>
            <v-badge :content="paidInvoices.length" :value="paidInvoices.length" color="success" inline/>
         </v-card-title>
         <v-card-text>
            <v-data-table
                    v-model="selected"
                    item-key="ID"
                    dense
                    :headers="columnNames"
                    :items="paidInvoices"
                    class="elevation-1"
                    :items-per-page="5">
               <template v-slot:item.actions="{}">
                  <v-btn x-small @click="{}">
                     <v-icon>
                        mdi-file-download
                     </v-icon>
                  </v-btn>
               </template>
            </v-data-table>
         </v-card-text>
         </v-card>
      </v-container>
   </v-main>
</template>

<script>

   import GenerateInvoice from "./GenerateInvoice";
   import { mapGetters } from "vuex";
   import { mapMutations } from 'vuex'

   export default {
      name: "Dashboard",
      components: {GenerateInvoice},
      data() {
         return {
            startingDate: new Date().toISOString().substr(0, 10),
            endDate: new Date().toISOString().substr(0, 10),
            menuStartingDate: false,
            menuEndDate: false,
            currentItem: {},
            showModal: false,
            selected: [],
            page: 1,
            pageCount: 0,
            itemsPerPage: 5,
            dialog: false,
            editedIndex: -1,
            paidInvoices: [],
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
         },
         ...mapMutations([
            'addInvoice',  // map `this.increment()` to `this.$store.commit('increment')`
         ]),
      },
      computed: {
         ...mapGetters({
            upcomingInvoices: 'upcomingInvoices'
         }),
         columnNames() {
            var computedColumnnames  = []
            Object.keys(this.upcomingInvoices[0]).forEach(function (item) {
               computedColumnnames.push({text: item, value: item})
            })
            computedColumnnames.push({text: 'Actions', value: 'actions', sortable: false })
            return computedColumnnames
         },
         getUniqueProperties(){
            var array = [];
            this.upcomingInvoices.forEach(function (item) {
               if (!array.includes(item.Liegenschaft)){
                  array.push(item.Liegenschaft)
               }
            })
            return array
         },
         getUniqueAdministration(){
            var array = [];
            this.upcomingInvoices.forEach(function (item) {
               if (!array.includes(item.Immobilienverwaltung)){
                  array.push(item.Immobilienverwaltung)
               }
            })
            return array
         },
         getUniqueTenants(){
            var array = [];
            this.upcomingInvoices.forEach(function (item) {
               if (!array.includes(item.Mieter)){
                  array.push(item.Mieter)
               }
            })
            return array
         },
         getUniqueInvoiceCategory(){
            var array = [];
            this.upcomingInvoices.forEach(function (item) {
               if (!array.includes(item.Rechnungsart)){
                  array.push(item.Rechnungsart)
               }
            })
            return array
         },
      },
   }

   Date.prototype.toString = function() {
      return "" + this.getUTCDate() + "." + this.getMonth() + "." + this.getFullYear()
   }

</script>

<style scoped>

   h1, h5 {
      vertical-align: center;
      clear:both;
   }
</style>
