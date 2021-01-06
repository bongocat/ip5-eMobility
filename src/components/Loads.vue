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
              :items="this.allFacilities.filter(anlage => anlage.Count = allLoads.filter(loads => loads.Anlage == anlage.Anlage).length)"
              :single-expand="singleExpand"
              :expanded.sync="expanded"
              item-key="facilityID"
              show-expand
              class="elevation-1"
          >
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <v-data-table
                    style="margin: 20px; background-color: rgba(0,0,0,0.05)"
                    :headers="innerHeaders"
                    :items="fillObjectKeys.filter(loads => loads.facilityID === item.facilityID)"
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
        {text: 'Name', value: 'facilityName'},
        {text: 'Anlage', value: 'facility'},
        {text: 'Mieter', value: 'tenant'},
        {text: 'Rechnung An', value: 'invoiceTo'},
        {text: 'Letze Rechnung', value: 'firstInvoice' },
        {text: 'Zahlungsintervall Strom', value: 'intervalElectricity'},
        {text: 'Zahlungsintervall Service', value: 'intervalService'},
        {text: 'letzter Zählerstand', value: 'counterNew'},
        {text: 'Kommentar', value: 'comment'},
        {text: 'Aktiv', value: 'active'},
      ],
      outerHeaders: [
        {text: 'Name', value: 'facilityName'},
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
    columnNames() {
      let facilityHeaders = []
      Object.keys(this.allFacilities[0]).forEach(function (item) {
        facilityHeaders.push({text: item, value: item},)
      })
      facilityHeaders.push({text: 'Actions', value: 'actions', sortable: false})
      facilityHeaders.push({text: '', value: 'data-table-expand'})
      return facilityHeaders
    },
    columnInnerNames() {
      let loadHeader = []
      Object.keys(this.allLoads[0]).forEach(function (item) {
        loadHeader.push({text: item, value: item},)
      })
      loadHeader.push({text: 'Actions', value: 'actions', sortable: false})
      return loadHeader
    },
    ...mapGetters({
      allLoads: 'allLoads',
      allFacilities: 'allFacilities'
    }),
  },
  methods: {
    ...mapActions(['fetchLoads']),
    fillObjectKeys(){

      var fullLoads = this.allLoads

      fullLoads.forEach(function (item, index) {

        var loadType = this.allLoadTypes.filter(loadType => loadType.loadTypeID === item.loadTypeID)
        var facility = this.allFacilities.filter(facility => facility.facilityID === item.facilityID)
        var user = this.allUsers.filter(user => user.userID === item.tenantID)

        var itemFacility = {facility: facility.facilityName}
        var itemLoadType = {loadType: loadType.designation}
        var itemUser = {tenant: user.name + ' ' + user.familyName}

        Object.assign(item, itemFacility)
        Object.assign(item, itemLoadType)
        Object.assign(item, itemUser)

      });

      return fullLoads
    }
  },
  created() {
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
