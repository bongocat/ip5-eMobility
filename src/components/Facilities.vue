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
      selected: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      dialog: false,
      editedIndex: -1,
      paidInvoices: [],
      facilityHeaders: [
        {text: 'Name', value: 'facilityName'},
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
    resetSelected() {
      this.selected = []
    },
  },
  computed: {
    ...mapActions(['fetchFacilities']),
    ...mapGetters({
      allFacilities: 'allFacilities'
    }),
    fillObjectKeys: function (){

      var fullFacilities = this.allFacilities

      fullFacilities.forEach(function (item, index) {
        var administration = this.allUsers.filter(user => user.administrationID === item.facilityID)
        var itemAdministration = {administration: '' + administration.familyName + ' ' + administration.name}

        Object.assign(item, itemAdministration)
      });

      return fullFacilities
    }
  },
  created() {
    this.fetchFacilities();
  }
}
</script>

<style scoped>
h1, h5 {
  vertical-align: center;
  clear: both;
}
</style>
