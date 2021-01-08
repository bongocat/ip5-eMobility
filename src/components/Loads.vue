<template>
  <v-main>
    <v-container fluid>
      <v-card style="margin-top: 20px" :elevation="5">
        <v-card-title>
          <h3>Loads</h3>
          <v-badge :content="allLoads.length" :value="allLoads.length" color="success" inline/>
        </v-card-title>
        <v-card-text>
          <LoadRegistration></LoadRegistration>
          <LoadTypeRegistration></LoadTypeRegistration>
          <v-data-table
              dense
              style="margin-top: 20px"
              :headers="outerHeaders"
              :items="fillObjectKeysFacilities"
              :single-expand="singleExpand"
              :expanded.sync="expanded"
              item-key="facilityID"
              show-expand
              class="elevation-1"
          >
            <template v-slot:expanded-item="{ headers, item}">
              <td :colspan="headers.length">
                <v-data-table
                    style="margin: 20px; background-color: rgba(0,0,0,0.05)"
                    :headers="innerHeaders"
                    :items="fillObjectKeysLoads.filter(load => load.facilityID == item.facilityID)"
                    item-key="inner"
                    class="elevation-5"
                >
                  <template v-slot:item.actions="{item}">
                    <LoadEdit :load = "item"></LoadEdit>
                  </template>
                </v-data-table>
              </td>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import LoadRegistration from "./LoadRegistration";
import LoadEdit from "./LoadEdit";
import LoadTypeRegistration from "./LoadTypeRegistration";



export default {
  components: {LoadRegistration, LoadEdit, LoadTypeRegistration},
  data() {
    return {
      expanded: [],
      singleExpand: false,
      innerHeaders: [
        {text: 'Load ID', value: 'loadID'},
        {text: 'Anlage', value: 'facility'},
        {text: 'Mieter', value: 'tenant'},
        {text: 'Loadtyp', value: 'loadType'},
        {text: 'Rechnung An', value: 'invoiceToAsString'},
        {text: 'Letze Rechnung', value: 'firstInvoice' },
        {text: 'Zahlungsintervall Strom', value: 'intervalElectricity'},
        {text: 'Zahlungsintervall Service', value: 'intervalService'},
        {text: 'letzter Zählerstand', value: 'counterNew'},
        {text: 'Kommentar', value: 'comment'},
        {text: 'Aktiv', value: 'active'},
        {text: 'Actions', value: 'actions', sortable: false},

      ],
      outerHeaders: [
        {text: 'Name', value: 'designation'},
        {text: 'Verwaltung', value: 'administration'},
        {text: 'Strasse', value: 'street'},
        {text: 'Hausnummer', value: 'streetNumber'},
        {text: 'PLZ', value: 'areaCode' },
        {text: 'Stadt', value: 'city'},
        {text: 'Land', value: 'country'},
        {text: 'Kommentar', value: 'comment'},
        {text: 'Actions', value: 'actions', sortable: false},
        {text: '', value: 'data-table-expand'}
      ]
    }
  },
  computed: {
    ...mapGetters({
      allInvoices: 'allInvoices',
      allLoads: 'allLoads',
      allFacilities: 'allFacilities',
      allLoadTypes: 'allLoadTypes',
      allUsers: 'allUsers',
    }),
    fillObjectKeysLoads: function(){

      var fullLoads = this.allLoads
      var loadTypes = this.allLoadTypes
      var facilities = this.allFacilities
      var users = this.allUsers
      var invoiceToAsString = {}

      fullLoads.forEach(function (item, index) {

        var loadType = loadTypes.filter(loadType => loadType.loadTypeID === item.loadTypeID)
        var facility = facilities.filter(facility => facility.facilityID === item.facilityID)
        var user = users.filter(user => user.userID === item.tenantID)

        var itemFacility = {facility: facility[0].designation}
        var itemLoadType = {loadType: loadType[0].designation}
        var itemUser = {tenant: user[0].name + ' ' + user[0].familyName}

        console.log("ITEMS:", itemLoadType, itemFacility, itemUser);

        Object.assign(item, itemFacility)
        Object.assign(item, itemLoadType)
        Object.assign(item, itemUser)

        if (item.invoiceTo === 2){
          invoiceToAsString = {invoiceToAsString: "Mieter"}
        }
        else {
          invoiceToAsString = {invoiceToAsString: "Vermieter"}
        }

        Object.assign(item, invoiceToAsString)

      });
      return fullLoads
    },

    fillObjectKeysFacilities: function (){

      var fullFacilities = this.allFacilities
      var allUsers = this.allUsers

      fullFacilities.forEach(function (item, index) {

        var itemAdmin = allUsers.filter(user => user.userID === item.administrationID)
        console.log(itemAdmin)
        var itemAdministration = { administration: itemAdmin[0].name + ' ' + itemAdmin[0].familyName}

        Object.assign(item, itemAdministration)
      });
      return fullFacilities
    }
  },
  methods: {
    ...mapActions(['fetchInvoices', 'fetchLoadTypes', 'fetchUsers', 'fetchInvoices', 'fetchFacilities', 'fetchLoads', 'fetchInvoiceTypes']),
  },
  created() {
    this.fetchUsers()
    this.fetchLoadTypes()
    this.fetchFacilities()
    this.fetchLoads()
    this.fetchInvoiceTypes()
    this.fetchInvoices()
  }
}
</script>

<style scoped>
h1, h5 {
  vertical-align: center;
  clear: both;
}
</style>
