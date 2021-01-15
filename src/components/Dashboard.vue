<template>
  <v-main>
    <v-container fluid>
      <v-card style="margin-top: 20px" :elevation="5">
      <v-expansion-panels multiple v-model="panel">
        <v-expansion-panel >
          <v-expansion-panel-header style="height: 50px;">
              <h3>Anstehende Rechnungen  <v-badge :content="this.getInvoicePositionsFromLoads.length" :value="this.getInvoicePositionsFromLoads.length" color="success"/></h3>
            <template v-slot:actions>
              <v-icon color="primary">
                $expand
              </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
                <v-data-table
                    dense
                    :headers="invoiceUpcomingHeaders"
                    :items="getInvoicePositionsFromLoads"
                    class="elevation-1"
                    :items-per-page="5"
                    item-key="id">
                  <template v-slot:item.facility ="{item}">
                    {{ facilityDesignationFromInvoice(item) }}
                  </template>
                  <template v-slot:item.administration ="{item}">
                    {{ administrationFromInvoice(item) }}
                  </template>
                  <template v-slot:item.invoiceTypeID ="{item}">
                    {{ invoiceTypeFromInvoice(item) }}
                  </template>
                  <template v-slot:item.invoiceToRefID ="{item}">
                    {{ item.name + " "+ item.familyName }}
                  </template>
                  <template v-slot:item.invoiceDate ="{item}">
                    {{ new Date(item.invoiceDate) }}
                  </template>
                  <template v-slot:item.actions="{item}">
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
                item-key="invoiceID"
                show-select
                :single-select="false"
                dense
                :headers="invoiceHeaders"
                :items="allInvoices.filter(invoice => invoice.invoiceStatusID === 2)"
                class="elevation-1"
                :items-per-page="5">
              <template v-slot:item.facility ="{item}">
                {{ facilityDesignationFromInvoice(item) }}
              </template>
              <template v-slot:item.administration ="{item}">
                {{ administrationFromInvoice(item) }}
              </template>
              <template v-slot:item.invoiceTypeID ="{item}">
                {{ invoiceTypeFromInvoice(item) }}
              </template>
              <template v-slot:item.invoiceToRefID ="{item}">
                {{ item.name + " "+ item.familyName }}
              </template>
              <template v-slot:item.invoiceDate ="{item}">
                {{ new Date(item.invoiceDate) }}
              </template>
              <template v-slot:item.toPayUntil ="{item}">
                {{ new Date(item.toPayUntil) }}
              </template>
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
                item-key="invoiceID"
                show-select
                :single-select="false"
                dense
                :headers="invoiceHeaders"
                :items="allInvoices.filter(invoice => invoice.invoiceStatusID === 3)"
                class="elevation-1"
                :items-per-page="5">
              <template v-slot:item.facility ="{item}">
                {{ facilityDesignationFromInvoice(item) }}
              </template>
              <template v-slot:item.administration ="{item}">
                {{ administrationFromInvoice(item) }}
              </template>
              <template v-slot:item.invoiceTypeID ="{item}">
                {{ invoiceTypeFromInvoice(item) }}
              </template>
              <template v-slot:item.invoiceToRefID ="{item}">
                {{ item.name + " "+ item.familyName }}
              </template>
              <template v-slot:item.invoiceDate ="{item}">
                {{ new Date(item.invoiceDate) }}
              </template>
              <template v-slot:item.toPayUntil ="{item}">
                <v-chip v-if="(new Date(item.toPayUntil).getTime()) <= (new Date(Date.now()).getTime())"
                        color="red"
                        text-color="white"
                        small
                >
                  {{ new Date(item.toPayUntil) }}
                </v-chip>
                <v-chip v-else
                        color="green"
                        text-color="white"
                        small
                >
                  {{ new Date(item.toPayUntil) }}
                </v-chip>
              </template>
              <template v-slot:item.actions="{item}">
                <v-btn color="success" x-small class="mr-2" @click="markAsPaid([item])">
                  Als Bezahlt markieren
                </v-btn>
                <v-btn color="warning" x-small class="mr-2" @click="decrementInvoiceStatus(item)">
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
                item-key="invoiceID"
                dense
                :headers="invoicePaidHeaders"
                :items="allInvoices.filter(invoice => invoice.invoiceStatusID === 4)"
                class="elevation-1"
                :items-per-page="5">
              <template v-slot:item.facility ="{item}">
                {{ facilityDesignationFromInvoice(item) }}
              </template>
              <template v-slot:item.administration ="{item}">
                {{ administrationFromInvoice(item) }}
              </template>
              <template v-slot:item.invoiceTypeID ="{item}">
                {{ invoiceTypeFromInvoice(item) }}
              </template>
              <template v-slot:item.invoiceToRefID ="{item}">
                {{ item.name + " "+ item.familyName }}
              </template>
              <template v-slot:item.invoiceDate ="{item}">
                {{ new Date(item.invoiceDate) }}
              </template>
              <template v-slot:item.payedOn ="{item}">
                {{ new Date(item.payedOn) }}
              </template>
              <template v-slot:item.actions="{item}">
                <v-btn x-small @click="exportPaidToPDF(item)" color="blue" dark>
                  <v-icon>
                    mdi-file-download
                  </v-icon>
                </v-btn>
                <v-btn color="warning" x-small class="mr-2" @click="decrementInvoiceStatus(item)">
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
      panel: [0],
      componentLoaded: false,
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
      invoiceUpcomingHeaders: [
        {text: 'Rechnungsart', value: 'invoiceTypeID'},
        {text: 'Verwaltung', value: 'administration'},
        {text: 'Anlage', value: 'facility'},
        {text: 'Rechnungsdatum', value: 'invoiceDate'},
        {text: 'Empfänger', value: 'invoiceToRefID'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      invoiceHeaders: [
        {text: 'Rechnungsnummer', value: 'invoiceNumber'},
        {text: 'Empfänger', value: 'invoiceToRefID'},
        {text: 'Rechnungsart', value: 'invoiceTypeID'},
        {text: 'Verwaltung', value: 'administration'},
        {text: 'Anlage', value: 'facility'},
        {text: 'Rechnungsdatum', value: 'invoiceDate'},
        {text: 'Zu Bezahlen Bis', value: 'toPayUntil'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      invoicePaidHeaders: [
        {text: 'Rechnungsnummer', value: 'invoiceNumber'},
        {text: 'Empfänger', value: 'invoiceToRefID'},
        {text: 'Rechnungsart', value: 'invoiceTypeID'},
        {text: 'Verwaltung', value: 'administration'},
        {text: 'Anlage', value: 'facility'},
        {text: 'Rechnungsdatum', value: 'invoiceDate'},
        {text: 'Bezahlt Am', value: 'payedOn'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
    };
  },
  mounted() {
    this.componentLoaded = true;
  },
  methods: {
    addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    },
    invoiceTypeFromInvoice(invoice){
      return this.allInvoiceTypes.filter(type => type.invoiceTypeID === invoice.invoiceTypeID)[0].designation
    },

    administrationFromInvoice(invoice){

      if (invoice.invoicePositions){
        var invoicePositions = invoice.invoicePositions
      }
      else {
          invoicePositions = this.allInvoicePositions.filter(position => position.invoiceNumber === invoice.invoiceNumber)
        }

      if (invoicePositions.length > 0){
        if (invoicePositions[0].loadID){
          var load = this.allLoads.filter(load => load.loadID === invoicePositions[0].loadID)[0]
          var facility = this.allFacilities.filter(facility => facility.facilityID === load.facilityID)[0]
          var administration = this.allUsers.filter(user => user.userID === facility.administrationID)[0]
          var administrationCompany = (administration.company === "") ? "" : (" (" + administration.company + ")")

          return administration.name + " " + administration.familyName + administrationCompany
        }
        return "-"
      }
      else {
        return "-"
      }
    },
    facilityDesignationFromInvoice(invoice){
      var invoicePositions = []

      if (invoice.invoicePositions){
        invoicePositions = invoice.invoicePositions
      }
      else{
        invoicePositions = this.allInvoicePositions.filter(position => position.invoiceNumber === invoice.invoiceNumber)
      }

      if (invoicePositions.length != 0){
        if (invoicePositions[0].loadID){
          var load = this.allLoads.filter(load => load.loadID === invoicePositions[0].loadID)[0]
          var facility = this.allFacilities.filter(facility => facility.facilityID === load.facilityID)[0]
          return facility.designation
        }
      }
      else {
        return "-"
      }
    },
    facilityFromInvoice(invoice){
      var invoicePositions = []

      if (invoice.invoicePositions){
        invoicePositions = invoice.invoicePositions
      }
      else{
        invoicePositions = this.allInvoicePositions.filter(position => position.invoiceNumber === invoice.invoiceNumber)
      }

      if (invoicePositions.length != 0){
        if (invoicePositions[0].loadID){
          var load = this.allLoads.filter(load => load.loadID === invoicePositions[0].loadID)[0]
          var facility = this.allFacilities.filter(facility => facility.facilityID === load.facilityID)[0]
          return facility
        }
      }
      else {
        return "-"
      }
    },
    markAsPaid(items) {
      for (var i = 0; i < items.length; i++) {
        var item = items[i]
        var payedOn = new Date(Date.now())

        const invoice = {

          invoiceID: item.invoiceID,
          invoiceNumber: item.invoiceNumber,
          invoiceTypeID: item.invoiceTypeID,
          customerRefID: item.customerRefID,
          invoiceToRefID: item.invoiceToRefID,
          invoiceDate:item.invoiceDate,
          toPayUntil: item.toPayUntil,
          payedOn: payedOn,
          name: item.name,
          familyName: item.familyName,
          salutation: item.salutation,
          company: item.company,
          phone: item.phone,
          mobile: item.mobile,
          email: item.email,
          street: item.street,
          streetNumber: item.streetNumber,
          areaCode: item.areaCode,
          city: item.city,
          country: item.country,

          invoiceToShippingAdress: item.invoiceToShippingAdress,
          shippingStreet: item.shippingStreet,
          shippingStreetNumber: item.shippingStreetNumber,
          shippingAreaCode: item.shippingAreaCode,
          shippingCity: item.shippingCity,
          shippingCountry: item.shippingCountry,

          invoiceStatusID: item.invoiceStatusID +=1,

          active: item.active,
          comment: item.comment,
        }
        this.editInvoice(invoice)
      }
    },
    markAsSent(items) {
      for (var i = 0; i < items.length; i++) {

        var item = items[i]

        const invoice = {

          invoiceID: item.invoiceID,
          invoiceNumber: item.invoiceNumber,
          invoiceTypeID: item.invoiceTypeID,
          customerRefID: item.customerRefID,
          invoiceToRefID: item.invoiceToRefID,
          invoiceDate: item.invoiceDate,
          toPayUntil: item.toPayUntil,
          payedOn: item.payedOn,
          name: item.name,
          familyName: item.familyName,
          salutation: item.salutation,
          company: item.company,
          phone: item.phone,
          mobile: item.mobile,
          email: item.email,
          street: item.street,
          streetNumber: item.streetNumber,
          areaCode: item.areaCode,
          city: item.city,
          country: item.country,

          invoiceToShippingAdress: item.invoiceToShippingAdress,
          shippingStreet: item.shippingStreet,
          shippingStreetNumber: item.shippingStreetNumber,
          shippingAreaCode: item.shippingAreaCode,
          shippingCity: item.shippingCity,
          shippingCountry: item.shippingCountry,

          invoiceStatusID: item.invoiceStatusID +=1,

          active: item.active,
          comment: item.comment,
        }
        this.editInvoice(invoice)
      }
    },
    resetSelectedOpen() {
      this.openInvoicesSelected = []
    },
    resetSelectedSent() {
      this.sentInvoicesSelected = []
    },
    decrementInvoiceStatus(item) {
      const invoice = {

        invoiceID: item.invoiceID,
        invoiceNumber: item.invoiceNumber,
        invoiceTypeID: item.invoiceTypeID,
        customerRefID: item.customerRefID,
        invoiceToRefID: item.invoiceToRefID,
        invoiceDate: item.invoiceDate,
        toPayUntil: item.toPayUntil,
        payedOn: "",
        isPayed: 1,
        name: item.name,
        familyName: item.familyName,
        salutation: item.salutation,
        company: item.company,
        phone: item.phone,
        mobile: item.mobile,
        email: item.email,
        street: item.street,
        streetNumber: item.streetNumber,
        areaCode: item.areaCode,
        city: item.city,
        country: item.country,
        invoiceStatusID: item.invoiceStatusID -=1,
        invoiceToShippingAdress: item.invoiceToShippingAdress,
        shippingStreet: item.shippingStreet,
        shippingStreetNumber: item.shippingStreetNumber,
        shippingAreaCode: item.shippingAreaCode,
        shippingCity: item.shippingCity,
        shippingCountry: item.shippingCountry,
        active: item.active,
        comment: item.comment,
      }
      this.editInvoice(invoice)
    },
    exportToPDF: function (item) {
      regularInvoiceToPDF(item, item.invoicePositions)
    },
    exportPaidToPDF(invoice){
      var invoicePositions = this.allInvoicePositions.filter(invoicePosition => invoicePosition.invoiceNumber === invoice.invoiceNumber)
      regularInvoiceToPDF(invoice, invoicePositions)
    },
    ...mapActions(['fetchUsers', 'fetchInvoices', 'fetchFacilities', 'fetchLoads', 'fetchLoadTypes', 'fetchInvoiceTypes', 'editInvoice', 'fetchInvoicePositions']),
  },
  created() {
    this.fetchInvoicePositions()
    this.fetchUsers()
    this.fetchFacilities()
    this.fetchLoadTypes()
    this.fetchInvoices()
    this.fetchInvoiceTypes()
    this.fetchLoads()
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

    todayIn30Days(){
      var today = new Date()
      return today.setDate(today.getDate() + 30)
    },
    getInvoicePositionsFromLoads(){

      if(! this.componentLoaded)
        return [];

      var upcomingInvoicesService = []
      var upcomingInvoicesElectricity = []
      var allServiceInvoicePositions = []
      var allElectricityInvoicePositions = []
      var allUsers = this.allUsers

      this.allLoads.forEach((load, index) => {

        var loadType = this.allLoadTypes.filter(loadtype => loadtype.loadTypeID === load.loadTypeID)[0]
        var facility = this.allFacilities.filter(facility => facility.facilityID === load.facilityID)[0]
        var administration = allUsers.filter(user => user.userID === facility.administrationID)[0]
        var tenant = allUsers.filter(user => user.userID === load.tenantID)[0]


        var invoiceTo = load.invoiceTo
        var recipient = (invoiceTo === 1) ? administration : tenant

        var positionDateService = new Date (load.firstInvoice)
        var positionDateElectricity = new Date (load.counterNewDate) //Needs Date calculations
        var positionPricePerMonth = (load.active === 1) ? loadType.standardPriceWhenActive : loadType.standardPriceWhenInactive


        var serviceInvoicePosition =
            {invoiceType: 2, loadID: load.loadID, facility:  load.facilityID,
              invoiceTo: invoiceTo, positionDate: positionDateService, positionPricePerMonth: positionPricePerMonth, interval: load.intervalService,
              loadType: loadType, administration: administration, tenant: tenant, recipient: recipient}

        if (load.active === 1){
          var electricityInvoicePosition =
              {invoiceType: 3, loadID: load.loadID, facility: load.facilityID,
                invoiceTo: invoiceTo, positionDate: positionDateElectricity, powerCountOld: load.counterOld, powerCountNew: load.counterNew,
                counterOldDate: load.counterOldDate, counterNewDate: load.counterNewDate, interval: load.intervalElectricity,
                loadType: loadType, administration: administration, tenant: tenant, recipient: recipient}
          allElectricityInvoicePositions.push(electricityInvoicePosition)

        }
        allServiceInvoicePositions.push(serviceInvoicePosition)


      });

      var id = 0

      allServiceInvoicePositions.forEach((invoicePosition) => {


        var price = invoicePosition.positionPricePerMonth * invoicePosition.interval
        var vat = 0.18
        var amount = 1
        var brutto = price * amount
        var netto = brutto + (brutto * vat)

        if (upcomingInvoicesService.length === 0){
          upcomingInvoicesService.push(
              {id: id,invoiceNumber: "", invoiceTypeID: invoicePosition.invoiceType, customerRefID: invoicePosition.tenant.userID,
                invoiceToRefID: invoicePosition.recipient.userID, invoiceDate: new Date(invoicePosition.positionDate), toPayUntil: "", payedOn: "", invoiceStatusID: 1,
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
        }
        else {
          var foundExistingInvoice = false
          upcomingInvoicesService.forEach((invoice) => {
            if (invoice.invoiceToRefID === invoicePosition.recipient.userID && invoice.invoiceDate.getTime() === invoicePosition.positionDate.getTime() && this.facilityFromInvoice(invoice).facilityID === invoicePosition.facility){
              foundExistingInvoice = true
              invoice.invoicePositions.push({invoiceNumber: "", positionName: invoicePosition.loadType.designation, loadID: invoicePosition.loadID, price: price,
                amount: 1, netto: netto, vat: vat, brutto: brutto, active: 1, comment: ""})
            }
          });
          if (foundExistingInvoice === false){
            upcomingInvoicesService.push(
                {id: id, invoiceNumber: "", invoiceTypeID: invoicePosition.invoiceType, customerRefID: invoicePosition.tenant.userID,
                  invoiceToRefID: invoicePosition.recipient.userID, invoiceDate: new Date(invoicePosition.positionDate), toPayUntil: "", payedOn: "", invoiceStatusID: 1,
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
        id += 1
      });

      allElectricityInvoicePositions.forEach((invoicePosition) => {
        var price = 0 //preis pro kwh (wird aus datenbank geladen),
        var vat = 0
        var amount = invoicePosition.powerCountNew - invoicePosition.powerCountOld
        var brutto = price * amount
        var netto = brutto + (brutto * vat)

        if (upcomingInvoicesElectricity.length === 0){
          upcomingInvoicesElectricity.push(
              {id: id, invoiceNumber: "", invoiceTypeID: invoicePosition.invoiceType, customerRefID: invoicePosition.tenant.userID,
                invoiceToRefID: invoicePosition.recipient.userID, invoiceDate: new Date(invoicePosition.positionDate), toPayUntil: "", payedOn: "", invoiceStatusID: 1,
                name: invoicePosition.recipient.name, familyName: invoicePosition.recipient.familyName, salutation:invoicePosition.recipient.salutation,
                company: invoicePosition.recipient.company, phone: invoicePosition.recipient.phone, mobile: invoicePosition.recipient.mobile,
                email: invoicePosition.recipient.email, street: invoicePosition.recipient.street,streetNumber: invoicePosition.recipient.streetNumber, areaCode: invoicePosition.recipient.areaCode,
                city: invoicePosition.recipient.city, country: invoicePosition.recipient.country, invoiceToShippingAdress: invoicePosition.recipient.invoiceToShippingAdress,
                shippingStreet: invoicePosition.recipient.shippingStreet, shippingStreetNumber: invoicePosition.recipient.shippingStreetNumber,
                shippingAreaCode: invoicePosition.recipient.shippingAreaCode, shippingCity: invoicePosition.recipient.shippingCity,
                shippingCountry: invoicePosition.recipient.shippingCountry, comment: "", active: 1,  invoicePositions:
                    [{invoiceNumber: "", positionName: invoicePosition.loadType.designation, loadID: invoicePosition.loadID, price: price,
                      amount: amount, netto: netto, vat: vat, brutto: brutto, active: 1, comment: ""}]}
          )
        }

        else {
          var foundExistingInvoice = false
          upcomingInvoicesElectricity.forEach((invoice) => {
            if (invoice.invoiceToRefID === invoicePosition.recipient.userID && invoice.invoiceDate.getTime() === invoicePosition.positionDate.getTime()){
              foundExistingInvoice = true
              invoice.invoicePositions.push({invoiceNumber: "", positionName: invoicePosition.loadType.designation, loadID: invoicePosition.loadID, price: price,
                amount: amount, netto: netto, vat: vat, brutto: brutto, active: 1, comment: ""})
            }
          });
          if (foundExistingInvoice === false){
            upcomingInvoicesElectricity.push(
                {id: id, invoiceNumber: "", invoiceTypeID: invoicePosition.invoiceType, customerRefID: invoicePosition.tenant.userID,
                  invoiceToRefID: invoicePosition.recipient.userID, invoiceDate: new Date(invoicePosition.positionDate), toPayUntil: "", payedOn: "", invoiceStatusID: 1,
                  name: invoicePosition.recipient.name, familyName: invoicePosition.recipient.familyName, salutation:invoicePosition.recipient.salutation,
                  company: invoicePosition.recipient.company, phone: invoicePosition.recipient.phone, mobile: invoicePosition.recipient.mobile,
                  email: invoicePosition.recipient.email, street: invoicePosition.recipient.street,streetNumber: invoicePosition.recipient.streetNumber, areaCode: invoicePosition.recipient.areaCode,
                  city: invoicePosition.recipient.city, country: invoicePosition.recipient.country, invoiceToShippingAdress: invoicePosition.recipient.invoiceToShippingAdress,
                  shippingStreet: invoicePosition.recipient.shippingStreet, shippingStreetNumber: invoicePosition.recipient.shippingStreetNumber,
                  shippingAreaCode: invoicePosition.recipient.shippingAreaCode, shippingCity: invoicePosition.recipient.shippingCity,
                  shippingCountry: invoicePosition.recipient.shippingCountry, comment: "", active: 1,  invoicePositions:
                      [{invoiceNumber: "", positionName: invoicePosition.loadType.designation, loadID: invoicePosition.loadID, price: price,
                        amount: amount, netto: netto, vat: vat, brutto: brutto, active: 1, comment: ""}]}
            )
          }
        }
        id += 1
      })
      var allUpcomingInvoices = upcomingInvoicesService.concat(upcomingInvoicesElectricity)
      allUpcomingInvoices = allUpcomingInvoices.filter(invoice => invoice.invoiceDate.getTime() < new Date(this.todayIn30Days).getTime())
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
