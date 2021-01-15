<template>
  <v-main>
    <v-container fluid>
      <v-card style="margin-top: 20px" :elevation="5">
        <v-card-title>
          <h3>Rechnungen</h3>
          <v-badge :content="this.allInvoices.length" :value="this.allInvoices.length" color="success" inline/>
        </v-card-title>
        <v-card-text>
          <InvoiceExceptional></InvoiceExceptional>
          <v-data-table
              dense
              :headers="invoiceHeaders"
              :items="this.allInvoices"
              class="elevation-1"
              :items-per-page="15"
          style="margin-top: 20px">
            <template v-slot:item.facility ="{item}">
              {{ facilityFromInvoice(item) }}
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
              <v-btn
                  text
                  color="success"
                  @click="exportToPDF(item)"
              >
                <v-icon>mdi-download</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
<!--      <v-card max-width="300">-->
<!--        <v-list dense>-->
<!--          <v-subheader>Rechnungsvorlagen</v-subheader>-->
<!--          <v-list-item-group-->
<!--              v-model="selectedItem"-->
<!--              color="primary"-->
<!--          >-->
<!--            <v-list-item-->
<!--                v-for="(vorlagen, i) in vorlagen"-->
<!--                :key="i"-->
<!--            >-->
<!--              <v-list-item-content>-->
<!--                <v-list-item-title v-text="vorlagen.text"></v-list-item-title>-->
<!--              </v-list-item-content>-->
<!--              <v-list-item-icon>-->
<!--                <v-icon v-text="vorlagen.icon"></v-icon>-->
<!--              </v-list-item-icon>-->
<!--            </v-list-item>-->
<!--          </v-list-item-group>-->
<!--        </v-list>-->
<!--      </v-card>-->
    </v-container>
  </v-main>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import InvoiceExceptional from "../components/InvoiceExceptional";
import {regularInvoiceToPDF} from "@/PDFGeneration/generatePDF";

export default {
  name: "Invoices",
  components: {InvoiceExceptional},
  data() {
    return {
      selected: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      dialog: false,
      dialogDelete: false,
      invoiceHeaders: [
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
  methods: {
    invoiceTypeFromInvoice(invoice){
      return this.allInvoiceTypes.filter(type => type.invoiceTypeID === invoice.invoiceTypeID)[0].designation
    },

    administrationFromInvoice(invoice){

      var invoicePositions = this.allInvoicePositions.filter(position => position.invoiceNumber === invoice.invoiceNumber)

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

    facilityFromInvoice(invoice){
      var invoicePositions = []

      invoicePositions = this.allInvoicePositions.filter(position => position.invoiceNumber === invoice.invoiceNumber)

      if (invoicePositions.length > 0){
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
    exportToPDF: function (item) {
      var invoicePositions = this.allInvoicePositions.filter(invoicePosition => invoicePosition.invoiceNumber === item.invoiceNumber)
      regularInvoiceToPDF(item, invoicePositions)
      },
    ...mapActions(['fetchUsers', 'fetchInvoices', 'fetchFacilities', 'fetchLoads', 'fetchLoadTypes', 'fetchInvoiceTypes', 'editInvoice', 'fetchInvoicePositions', 'addNewInvoice']),
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
  },
  created() {
    this.fetchInvoicePositions()
    this.fetchLoadTypes()
    this.fetchLoads()
    this.fetchUsers()
    this.fetchFacilities()
    this.fetchInvoices()
    this.fetchInvoiceTypes()
  },
}
</script>

<style scoped>
h1, h5 {
  vertical-align: center;
  clear: both
}
</style>
