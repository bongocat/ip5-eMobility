<template>
  <v-main>
    <v-container fluid>
      <v-card style="margin-top: 20px" :elevation="5">
      <v-expansion-panels multiple>
        <v-expansion-panel>
          <v-expansion-panel-header style="height: 50px;">
              <h3>Anstehende Rechnungen  <v-badge :content="this.fillObjectKeys.length" :value="this.fillObjectKeys.length" color="success"/></h3>
            <template v-slot:actions>
              <v-icon color="primary">
                $expand
              </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
                <v-expansion-panels style="padding-bottom: 20px">
                </v-expansion-panels>
                <v-data-table
                    dense
                    :headers="upcomingHeaders"
                    :items="fillObjectKeys"
                    class="elevation-1"
                    :items-per-page="5">
                  <template v-slot:item.actions="{ item }">
                    <GenerateInvoice :invoice="item"></GenerateInvoice>
                  </template>
                </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header style="height: 55px">
            <h3>Offene Rechnungen <v-badge :content="openInvoices.length" :value="openInvoices.length" color="success"/></h3>
            <template v-slot:actions>
              <v-icon color="primary">
                $expand
              </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
                v-model="openInvoicesSelected"
                item-key="RechnungsID"
                show-select
                :single-select="false"
                dense
                :headers="openInvoicesHeaders"
                :items="openInvoices"
                class="elevation-1"
                :items-per-page="5">
              <template v-slot:item.actions="{item}">
                <v-btn color="success" x-small class="mr-2" @click="markAsSent([item])">
                  Als verschickt markieren
                </v-btn>
              </template>
            </v-data-table>
            <v-card-actions>
              <v-btn small color="blue" @click="markAsSent(openInvoicesSelected), resetSelectedOpen()" :disabled="(openInvoicesSelected.length === 0)">
                Ausgewählte als verschickt markieren
              </v-btn>
            </v-card-actions>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header style="height: 55px">
            <h3>Verschickte Rechnungen <v-badge :content="sentInvoices.length" :value="sentInvoices.length" color="success" /></h3>
            <template v-slot:actions>
              <v-icon color="primary">
                $expand
              </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
                v-model="sentInvoicesSelected"
                item-key="RechnungsID"
                show-select
                :single-select="false"
                dense
                :headers="openInvoicesHeaders"
                :items="sentInvoices"
                class="elevation-1"
                :items-per-page="5">
              <template v-slot:item.actions="{item}">
                <v-btn color="success" x-small class="mr-2" @click="markAsPaid([item])">
                  Als Bezahlt markieren
                </v-btn>
                <v-btn color="warning" x-small class="mr-2" @click="undoSending(item)">
                  <v-icon>mdi-undo</v-icon>
              </v-btn>
              </template>
            </v-data-table>
            <v-card-actions>
              <v-btn small color="blue" @click="markAsPaid(sentInvoicesSelected), resetSelectedSent()" :disabled="(sentInvoicesSelected.length === 0)">
                Ausgewählte als bezahlt markieren
              </v-btn>
            </v-card-actions>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header style="height: 55px">
            <h3>Kürzlich bezahlte Rechnungen <v-badge :content="paidInvoices.length" :value="paidInvoices.length" color="success" /> </h3>
            <template v-slot:actions>
              <v-icon color="primary">
                $expand
              </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
                v-model="sentInvoicesSelected"
                item-key="RechnungsID"
                dense
                :headers="upcomingHeaders"
                :items="paidInvoices"
                class="elevation-1"
                :items-per-page="5">
              <template v-slot:item.actions="{item}">
                <v-btn x-small @click="exportToPDF(item)" color="blue" dark>
                  <v-icon>
                    mdi-file-download
                  </v-icon>
                </v-btn>
                <v-btn color="warning" x-small class="mr-2" @click="undoPaid(item)">
                  <v-icon>mdi-undo</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import GenerateInvoice from "./GenerateInvoice";
import {mapActions, mapGetters} from "vuex";
import { regularInvoiceToPDF } from "../PDFGeneration/generatePDF"

export default {

  name: "Dashboard",
  components: {GenerateInvoice},
  data() {
    return {
      filterProperties: String,
      filterAdministration: String,
      filterTenants: String,
      filterCategory: String,
      startingDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      menuStartingDate: false,
      menuEndDate: false,
      currentItem: {},
      openInvoicesSelected: [],
      sentInvoicesSelected: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      dialog: false,
      editedIndex: -1,
      upcomingHeaders: [
        {text: 'Rechnungsart', value: 'invoiceTypeID'},
        {text: 'Verwaltung', value: 'customerRefID'},
        {text: 'Anlage', value: 'facility'},
        {text: 'Fällig Am', value: 'invoiceDate'},
        {text: 'Empfänger', value: 'recipient'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      openInvoicesHeaders: [
        {text: 'Rechnungsart', value: 'invoiceTypeID'},
        {text: 'Verwaltung', value: 'customerRefID'},
        {text: 'Anlage', value: 'facility'},
        {text: 'Fällig Am', value: 'invoiceDate'},
        {text: 'Empfänger', value: 'recipient'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
    // {invoiceTypeID: invoicePosition.invoiceType, customerRefID: invoicePosition.administration.userID,
    //     invoiceToRefID: invoicePosition.recipient.userID, invoiceDate: invoicePosition.positionDate, loadID: invoicePosition.loadID,
    //     facility: invoicePosition.facility, toPayUntil: "", payedOn: "", invoiceStatusID: 1, invoicePositions:[
    //   {invoiceNumber: "", positionName: invoicePosition.loadType.designation, loadID: invoicePosition.loadID, price: price,
    //     amount: 1, netto: price * vat, vat:price * vat vat, brutto: price * this.amount, active: 1, comment: ""}]}
    };
  },
  methods: {
    markAsPaid(items) {
      for (var i = 0; i < items.length; i++) {
        items[i].Status += 1
        items[i].RechnungBezahlt = new Date()
        this.editInvoice(items[i])
      }
    },
    markAsSent(items) {
      for (var i = 0; i < items.length; i++) {
        items[i].Status += 1
        this.editInvoice(items[i])
      }
    },
    resetSelectedOpen() {
      this.openInvoicesSelected = []
    },
    resetSelectedSent() {
      this.sentInvoicesSelected = []
    },
    undoSending(item) {
      item.Status -= 1
      this.editInvoice(item)
    },
    undoPaid(item) {
      item.Status -= 1
      this.editInvoice(item)
    },
    exportToPDF: function (item) {
      regularInvoiceToPDF(item, this.allUsers, this.allFacilities)
    },
    ...mapActions(['fetchUsers', 'fetchInvoices', 'fetchFacilities', 'fetchLoads', 'fetchLoadTypes', 'fetchInvoiceTypes', 'editInvoice', 'fetchInvoicePositions']),
  },
  created() {
    this.fetchLoadTypes()
    this.fetchLoads()
    this.fetchUsers()
    this.fetchFacilities()
    this.fetchInvoices()
    this.fetchInvoiceTypes()
    this.fetchInvoicePositions()
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
      allInvoicePositions: 'allInvoicePositions'
    }),
    fillObjectKeys(){

      var fullInvoices = this.getInvoicePositionsFromLoads
      var allLoads = this.allLoads
      var allFacilities = this.allFacilities

      fullInvoices.forEach(function (item, index) {
        if (item.loadID !== undefined){
          var load = allLoads.filter(load => load.loadID === item.loadID)
          var facility = allFacilities.filter(facility => facility.facilityID === load[0].facilityID)
          var itemFacility = {facility: facility[0].designation}
          var recipient = {recipient: item.name + " " + item.familyName}

          Object.assign(item, itemFacility)
          Object.assign(item, recipient)
        }
      });

      var invoicesIn30Days = fullInvoices.filter(invoice => new Date(invoice.invoiceDate) <= this.todayIn30Days)
      console.log("INVOICES IN 30 DAYS", invoicesIn30Days)
      return invoicesIn30Days
    },

    todayIn30Days(){
      var today = new Date()
      return today.setDate(today.getDate() + 30)
    },

    getInvoicePositionsFromLoads(){

      var upcomingInvoicesService = []
      var upcomingInvoicesElectricity = []
      var allServiceInvoicePositions = []
      var allElectricityInvoicePositions = []
      var allUsers = this.allUsers

      this.allLoads.forEach((load, index) => {

        var loadType = this.allLoadTypes.filter(loadtype => loadtype.loadTypeID === load.loadTypeID)
        var facility = this.allFacilities.filter(facility => facility.facilityID === load.facilityID)
        var administration = allUsers.filter(user => user.userID === facility[0].administrationID)
        console.log("ADMINISTRATION", administration)

        var tenant = allUsers.filter(user => user.userID === load.tenantID)
        var invoiceTo = load.invoiceTo
        var recipient = (invoiceTo === 1) ? administration[0] : tenant[0]

        var positionDate = new Date (load.firstInvoice) //Needs Date calculations
        var positionPricePerMonth = (load.active === 1) ? loadType[0].standardPriceWhenActive : loadType[0].standardPriceWhenInactive


        var serviceInvoicePosition =
            {invoiceType: 2, loadID: load.loadID, facility:  load.facilityID,
          invoiceTo: invoiceTo, positionDate: positionDate, positionPricePerMonth: positionPricePerMonth, interval: load.intervalService,
          loadType: loadType[0], administration: administration[0], tenant: tenant[0], recipient: recipient}

        var electricityInvoicePosition =
            {invoiceType: 3, loadID: load.loadID, facility: load.facilityID,
          invoiceTo: invoiceTo, positionDate: new Date(load.counterNewDate), powerCountOld: load.counterOld, powerCountNew: load.counterNew,
          counterOldDate: load.counterOldDate, counterNewDate: load.counterNewDate, interval: load.intervalElectricity,
          loadType: loadType[0], administration: administration[0], tenant: tenant[0], recipient: recipient}

        allServiceInvoicePositions.push(serviceInvoicePosition)
        allElectricityInvoicePositions.push(electricityInvoicePosition)

        console.log("SERVICE INVOICE POSITIONS", allServiceInvoicePositions)
        console.log("ELECTRICITY INVOICE POSITIONS", allElectricityInvoicePositions)
      });

      allServiceInvoicePositions.forEach((invoicePosition) => {

        var price = invoicePosition.positionPricePerMonth * invoicePosition.interval
        var vat = 0.18
        var amount = 1
        var brutto = price * amount
        var netto = brutto + (brutto * vat)

        if (upcomingInvoicesService.length === 0){
          upcomingInvoicesService.push(
              {invoiceNumber: "", invoiceTypeID: invoicePosition.invoiceType, customerRefID: invoicePosition.administration.userID,
                invoiceToRefID: invoicePosition.recipient.userID, invoiceDate: invoicePosition.positionDate, loadID: invoicePosition.loadID,
                facility: invoicePosition.facility, toPayUntil: "", payedOn: "", invoiceStatusID: 1,
                name: invoicePosition.recipient.name, familyName: invoicePosition.recipient.familyName, salutation:invoicePosition.recipient.salutation,
                company: invoicePosition.recipient.company, phone: invoicePosition.recipient.phone, mobile: invoicePosition.recipient.mobile,
                email: invoicePosition.recipient.email, street: invoicePosition.recipient.street,streetNumber: invoicePosition.recipient.streetNumber, areaCode: invoicePosition.recipient.areaCode,
                city: invoicePosition.recipient.city, country: invoicePosition.recipient.country, invoiceToShippingAdress: invoicePosition.recipient.invoiceToShippingAdress,
                shippingStreet: invoicePosition.recipient.shippingStreet, shippingStreetNumber: invoicePosition.recipient.shippingStreetNumber,
                shippingAreaCode: invoicePosition.recipient.shippingAreaCode, shippingCity: invoicePosition.recipient.shippingCity,
                shippingCountry: invoicePosition.recipient.shippingCountry, comment: "", active: 1, invoicePositions:[
                    {invoiceNumber: "", positionName: invoicePosition.loadType.designation, loadID: invoicePosition.loadID, price: price,
                      amount: amount, netto: netto, vat: vat, brutto: brutto, active: 1, comment: ""}]}
          )
          console.log("SERVICE ONE INVOICE", upcomingInvoicesService)
        }
        else {
          var foundExistingInvoice = false
          upcomingInvoicesService.forEach((invoice) => {
            if (invoice.invoiceToRefID === invoicePosition.recipient.userID && invoice.invoiceDate.getTime() === invoicePosition.positionDate.getTime()){
              foundExistingInvoice = true
              invoice.invoicePositions.push({invoiceNumber: "", positionName: invoicePosition.loadType.designation, loadID: invoicePosition.loadID, price: price,
                amount: 1, netto: netto, vat: vat, brutto: brutto, active: 1, comment: ""})
            }
          });
          if (foundExistingInvoice === false){
            upcomingInvoicesService.push(
                {invoiceNumber: "", invoiceTypeID: invoicePosition.invoiceType, customerRefID: invoicePosition.administration.userID,
                  invoiceToRefID: invoicePosition.recipient.userID, invoiceDate: invoicePosition.positionDate, loadID: invoicePosition.loadID,
                  facility: invoicePosition.facility, toPayUntil: "", payedOn: "", invoiceStatusID: 1,
                  name: invoicePosition.recipient.name, familyName: invoicePosition.recipient.familyName, salutation:invoicePosition.recipient.salutation,
                  company: invoicePosition.recipient.company, phone: invoicePosition.recipient.phone, mobile: invoicePosition.recipient.mobile,
                  email: invoicePosition.recipient.email, street: invoicePosition.recipient.street, streetNumber: invoicePosition.recipient.streetNumber, areaCode: invoicePosition.recipient.areaCode,
                  city: invoicePosition.recipient.city, country: invoicePosition.recipient.country, invoiceToShippingAdress: invoicePosition.recipient.invoiceToShippingAdress,
                  shippingStreet: invoicePosition.recipient.shippingStreet, shippingStreetNumber: invoicePosition.recipient.shippingStreetNumber,
                  shippingAreaCode: invoicePosition.recipient.shippingAreaCode, shippingCity: invoicePosition.recipient.shippingCity,
                  shippingCountry: invoicePosition.recipient.shippingCountry, comment: "", active: 1, invoicePositions:
                      [{invoiceNumber: "", positionName: invoicePosition.loadType.designation, loadID: invoicePosition.loadID, price: price,
                        amount: 1, netto: netto, vat: vat, brutto: brutto, active: 1, comment: ""}]}
            )
          }
        }
      });

      allElectricityInvoicePositions.forEach((invoicePosition) => {
        var price = 0.1926 //preis pro kwh (wird aus datenbank geladen),
        var vat = 0.12
        var amount = invoicePosition.powerCountNew - invoicePosition.powerCountOld
        var brutto = price * amount
        var netto = brutto + (brutto * vat)

        if (upcomingInvoicesElectricity.length === 0){
          upcomingInvoicesElectricity.push(
              {invoiceNumber: "", invoiceTypeID: invoicePosition.invoiceType, customerRefID: invoicePosition.administration.userID,
                invoiceToRefID: invoicePosition.recipient.userID, invoiceDate: invoicePosition.positionDate, loadID: invoicePosition.loadID,
                facility: invoicePosition.facility, toPayUntil: "", payedOn: "", invoiceStatusID: 1,
                name: invoicePosition.recipient.name, familyName: invoicePosition.recipient.familyName, salutation:invoicePosition.recipient.salutation,
                company: invoicePosition.recipient.company, phone: invoicePosition.recipient.phone, mobile: invoicePosition.recipient.mobile,
                email: invoicePosition.recipient.email, street: invoicePosition.recipient.street,streetNumber: invoicePosition.recipient.streetNumber, areaCode: invoicePosition.recipient.areaCode,
                city: invoicePosition.recipient.city, country: invoicePosition.recipient.country, invoiceToShippingAdress: invoicePosition.recipient.invoiceToShippingAdress,
                shippingStreet: invoicePosition.recipient.shippingStreet, shippingStreetNumber: invoicePosition.recipient.shippingStreetNumber,
                shippingAreaCode: invoicePosition.recipient.shippingAreaCode, shippingCity: invoicePosition.recipient.shippingCity,
                shippingCountry: invoicePosition.recipient.shippingCountry, comment: "", active: 1,  invoicePositions:
                    [{invoiceNumber: "", positionName: invoicePosition.loadType.designation + " Zählerstand hier", loadID: invoicePosition.loadID, price: price,
                      amount: amount, netto: netto, vat: vat, brutto: brutto, active: 1, comment: ""}]}
          )
          console.log("UPCOMING INVOICES ONE ELEMENT", upcomingInvoicesService)
        }

        else {
          var foundExistingInvoice = false
          upcomingInvoicesElectricity.forEach((invoice) => {
            if (invoice.invoiceToRefID === invoicePosition.recipient.userID && invoice.invoiceDate.getTime() === invoicePosition.positionDate.getTime()){
              foundExistingInvoice = true
              invoice.invoicePositions.push({invoiceNumber: "", positionName: invoicePosition.loadType.designation + " Zählerstand hier", loadID: invoicePosition.loadID, price: price,
                amount: amount, netto: netto, vat: vat, brutto: brutto, active: 1, comment: ""})
            }
          });
          if (foundExistingInvoice === false){
            upcomingInvoicesElectricity.push(
                {invoiceNumber: "", invoiceTypeID: invoicePosition.invoiceType, customerRefID: invoicePosition.administration.userID,
                  invoiceToRefID: invoicePosition.recipient.userID, invoiceDate: invoicePosition.positionDate, loadID: invoicePosition.loadID,
                  facility: invoicePosition.facility, toPayUntil: "", payedOn: "", invoiceStatusID: 1,
                  name: invoicePosition.recipient.name, familyName: invoicePosition.recipient.familyName, salutation:invoicePosition.recipient.salutation,
                  company: invoicePosition.recipient.company, phone: invoicePosition.recipient.phone, mobile: invoicePosition.recipient.mobile,
                  email: invoicePosition.recipient.email, street: invoicePosition.recipient.street,streetNumber: invoicePosition.recipient.streetNumber, areaCode: invoicePosition.recipient.areaCode,
                  city: invoicePosition.recipient.city, country: invoicePosition.recipient.country, invoiceToShippingAdress: invoicePosition.recipient.invoiceToShippingAdress,
                  shippingStreet: invoicePosition.recipient.shippingStreet, shippingStreetNumber: invoicePosition.recipient.shippingStreetNumber,
                  shippingAreaCode: invoicePosition.recipient.shippingAreaCode, shippingCity: invoicePosition.recipient.shippingCity,
                  shippingCountry: invoicePosition.recipient.shippingCountry, comment: "", active: 1,  invoicePositions:
                      [{invoiceNumber: "", positionName: invoicePosition.loadType.designation + " Zählerstand hier", loadID: invoicePosition.loadID, price: price,
                        amount: amount, netto: netto, vat: vat, brutto: brutto, active: 1, comment: ""}]}
            )
          }
        }
      })
      var allUpcomingInvoices = upcomingInvoicesService.concat(upcomingInvoicesElectricity)
      console.log("ALL UPCOMING INVOICES", allUpcomingInvoices)
      return allUpcomingInvoices
    }
  },

}

Date.prototype.toString = function () {
  return (this.toLocaleDateString('de-CH'))
}
</script>

<style scoped>
h1, h5 {
  vertical-align: center;
  clear: both;
}
</style>
