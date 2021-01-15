<template>
  <v-main>
    <v-container fluid>
      <v-card style="margin-top: 20px" :elevation="5">
        <v-card-title>
          <h3>Anlagen</h3>
          <v-badge :content="allFacilities.length" :value="allFacilities.length" color="success" inline/>
        </v-card-title>
        <v-card-text>
          <facility-registration></facility-registration>
          <v-expansion-panels style="padding-bottom: 20px; margin-top: 20px">
<!--            <v-expansion-panel>-->
<!--              <v-expansion-panel-header>-->
<!--                Filter-->
<!--              </v-expansion-panel-header>-->
<!--              <v-expansion-panel-content>-->
<!--                <v-row dense>-->
<!--                  <v-col>-->
<!--                    <v-overflow-btn-->
<!--                        dense-->
<!--                        editable-->
<!--                        full-width="false"-->
<!--                        :items="getUniqueProperties"-->
<!--                        label="Anlagen"-->
<!--                        item-value="text"-->
<!--                    ></v-overflow-btn>-->
<!--                  </v-col>-->
<!--                  <v-col>-->
<!--                    <v-overflow-btn-->
<!--                        deletable-chips-->
<!--                        dense-->
<!--                        editable-->
<!--                        full-width="false"-->
<!--                        :items="getUniqueAdministration"-->
<!--                        label="Immobilienverwaltung"-->
<!--                        item-value="text"-->
<!--                    ></v-overflow-btn>-->
<!--                  </v-col>-->
<!--                  <v-col>-->
<!--                    <v-overflow-btn-->
<!--                        deletable-chips-->
<!--                        dense-->
<!--                        editable-->
<!--                        full-width="false"-->
<!--                        :items="getUniqueTenants"-->
<!--                        label="PLZ"-->
<!--                        item-value="text"-->
<!--                    ></v-overflow-btn>-->
<!--                  </v-col>-->
<!--                  <v-col>-->
<!--                    <v-overflow-btn-->
<!--                        deletable-chips-->
<!--                        dense-->
<!--                        editable-->
<!--                        full-width="false"-->
<!--                        :items="getUniqueInvoiceCategory"-->
<!--                        label="Land"-->
<!--                        item-value="text"-->
<!--                    ></v-overflow-btn>-->
<!--                  </v-col>-->
<!--                </v-row>-->
<!--              </v-expansion-panel-content>-->
<!--            </v-expansion-panel>-->
          </v-expansion-panels>
          <v-data-table
              dense
              :headers="facilityHeaders"
              :items="fillObjectKeys"
              class="elevation-1"
              :items-per-page="20">
            <template v-slot:item.actions="{item}">
              <FacilityEdit :facility = "item"></FacilityEdit>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import FacilityRegistration from "./FacilityRegistration";
import FacilityEdit from "./FacilityEdit";

import {mapActions, mapGetters} from "vuex";

export default {
  name: "facilities",
  components: {FacilityRegistration, FacilityEdit},
  data() {
    return {
      currentItem: {},
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      dialog: false,
      editedIndex: -1,
      facilityHeaders: [
        {text: 'Name', value: 'designation'},
        {text: 'Verwaltung', value: 'administration'},
        {text: 'Strasse', value: 'street'},
        {text: 'Hausnummer', value: 'streetNumber'},
        {text: 'PLZ', value: 'areaCode' },
        {text: 'Stadt', value: 'city'},
        {text: 'Land', value: 'country'},
        {text: 'Kommentar', value: 'comment'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
    };
  },
  methods: {
    ...mapActions(['fetchUsers', 'fetchInvoices', 'fetchFacilities', 'fetchLoads', 'fetchLoadTypes', 'fetchInvoiceTypes', 'editInvoice', 'fetchInvoicePositions']),
  },
  computed: {
    ...mapGetters({
      upcomingInvoices: 'upcomingInvoices',
      paidInvoices: 'paidInvoices',
      openInvoices: 'openInvoices',
      sentInvoices: 'sentInvoices',
      allFacilities: 'allFacilities',
      allUsers: 'allUsers',
      allLoads: 'allLoads',
      allLoadTypes: 'allLoadTypes',
      allInvoicePositions: 'allInvoicePositions',
      allInvoices: 'allInvoices',
      allInvoiceTypes: 'allInvoiceTypes'
    }),

    fillObjectKeys: function (){

      var fullFacilities = this.allFacilities
      var allUsers = this.allUsers

      fullFacilities.forEach(function (item, index) {

        var itemAdmin = allUsers.filter(user => user.userID === item.administrationID)
        var itemAdministration = {administration: itemAdmin[0].name + ' ' + itemAdmin[0].familyName}


        Object.assign(item, itemAdministration)
      });

      return fullFacilities
    }
  },
  created() {
    this.fetchInvoicePositions()
    this.fetchUsers()
    this.fetchFacilities()
    this.fetchLoadTypes()
    this.fetchInvoices()
    this.fetchInvoiceTypes()
    this.fetchLoads()
  }
}
</script>

<style scoped>
h1, h5 {
  vertical-align: center;
  clear: both;
}
</style>
