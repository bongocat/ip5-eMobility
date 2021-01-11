<template>
  <v-dialog
      v-model="dialog"
      max-width="1200px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          x-small
          color="success"
          dark
          v-bind="attrs"
          v-on="on"
      >
        Rechnung generieren
      </v-btn>
    </template>
    <v-card style="padding: 20px">
      <v-card-title>
        <h1 class="headline">Rechnung generieren</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
            <v-row>
               <v-col>
                   <v-text-field v-model = "invoiceNumber"
                                 label="Rechnungsnummer"></v-text-field>
               </v-col>
                <v-col>
                    <v-overflow-btn style="min-width: 250px"
                                    v-model = "due"
                                    dense
                                    editable
                                    :items='[{text: "10 Tage", value: 10}, {text: "20 Tage", value: 20}, {text: "30 Tage", value: 30}]'
                                    label="Zahlungsfrist"
                    ></v-overflow-btn>
                </v-col>
                <v-col>
                    <v-text-field v-model = "comment"
                                  label="Kommentar"></v-text-field>
                </v-col>
            </v-row>
          <h3 class="title-3">Rechnungspositionen</h3>
          <h3 class="subtitle-2">Rechnungsposition hinzufügen</h3>
          <v-row>
            <v-col>
              <v-text-field v-model = "extraPosDescription"
                            label="Beschreibung"></v-text-field>
            </v-col>
            <v-col>
            <v-text-field v-model = "extraPosCount"
                          label="Anzahl"
                          type="number"
                          min="0"
            ></v-text-field>
          </v-col>
            <v-col>
              <v-text-field v-model = "extraPosUnitPrice"
                            label="Preis Pro Einheit"
                            type="number"
                            step="0.01"
                            min="0.00"
                            suffix="CHF"
              >

              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model = "extraPosVat"
                            label="Mehrwertsteuersatz"
                            type="number"
                            step="0.1"
                            min="0.00"
                            suffix="%"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-btn
                  color="success"
                  @click="newInvoicePosition"
                  fab
                  small
                  text
              >
                <v-icon small>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Beschreibung
                </th>
                <th class="text-left">
                  Anzahl
                </th>
                <th class="text-left">
                  Preis Pro Einheit
                </th>
                <th class="text-left">
                  Bruttopreis
                </th>
                <th class="text-left">
                  Mwst.
                </th>
                <th class="text-left">
                  Nettopreis
                </th>
                <th class="text-left">
                  Action
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="(item) in invoicePositions"
                  :key="item.positionName"
              >
                <td>{{ item.positionName }}</td>
                <td>{{ item.amount }}</td>
                <td>{{ item.price + " CHF" }}</td>
                <td>{{ item.brutto + " CHF" }}</td>
                <td>{{ (item.vat * 100).toFixed(0) + "%" }}</td>
                <td>{{ item.netto + " CHF"}}</td>
                <td>
                  <v-btn color="error"
                         text
                         @click="removeInvoicePosition(item)"
                         fab
                  small>
                    <v-icon small>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="success"
            text
            @click="dialog = false, exportToPDF(invoice)"
        >
          Generieren
        </v-btn>
        <v-btn
            color="error"
            text
            @click="dialog = false"
        >
          Schliessen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import { regularInvoiceToPDF } from "../PDFGeneration/generatePDF"


export default {
  name: "GenerateInvoice",
  props: {
    invoice: Object
  },
  data() {
    return {
      extraPosDescription: "",
      extraPosCount: "",
      extraPosUnitPrice: "",
      extraPosVat: "",
      invoicePositions: this.invoice.invoicePositions,
      due: 10,
      comment: "",
      dialog: false,

      name: '',
      invoiceNumber: 0,
    }
  },
  methods: {
    ...mapActions(['fetchUsers', 'fetchInvoices', 'fetchFacilities', 'fetchLoads', 'fetchLoadTypes', 'fetchInvoiceTypes', 'editInvoice', 'addNewInvoicePosition', 'addNewInvoice', 'editLoad']),
    newInvoicePosition(){
      this.invoicePositions.push({
        positionName: this.extraPosDescription,
        loadID: "",
        price: this.extraPosUnitPrice,
        amount: this.extraPosCount,
        brutto: this.extraPosUnitPrice * this.extraPosCount,
        netto: this.extraPosUnitPrice * this.extraPosCount + (this.extraPosUnitPrice * this.extraPosCount * this.extraPosVat.toFixed(2)),
        vat: this.extraPosVat,
      })

      this.extraPosVat = ""
      this.extraPosDescription = ""
      this.extraPosCount = ""
      this.extraPosUnitPrice = ""
    },
    removeInvoicePosition(position){
      this.invoicePositions.splice(this.invoicePositions.indexOf(position),1)
    },
    exportToPDF: function (item) {

      item.toPayUntil = item.invoiceDate + this.due
      item.comment = this.comment
      item.invoiceNumber = this.invoiceNumber
      item.invoiceStatusID = 2

      this.addNewInvoice(item)

      this.invoicePositions.forEach((invoicePosition) => {
        invoicePosition.invoiceNumber = this.invoiceNumber
        var currentLoad = this.allLoads.filter(load => load.loadID === invoicePosition.loadID)[0]
        if (item.invoiceTypeID === 2) {
          currentLoad.firstInvoice = new Date(currentLoad.firstInvoice)
          currentLoad.firstInvoice.setMonth(currentLoad.firstInvoice.getMonth() + currentLoad.intervalService)
        }
        if (item.invoiceTypeID === 3){
          currentLoad.counterNewDate = new Date(currentLoad.counterNewDate)
          currentLoad.counterNewDate.setMonth(currentLoad.counterNewDate.getMonth() + currentLoad.counterNewDate)
        }

        this.editLoad(currentLoad)
        this.addNewInvoicePosition(invoicePosition)
      })

      regularInvoiceToPDF(item, this.invoicePositions,this.allUsers, this.allFacilities)
    },
  },
    computed: {
      ...mapGetters({
        upcomingInvoices: 'upcomingInvoices',
        paidInvoices: 'paidInvoices',
        openInvoices: 'openInvoices',
        allFacilities: 'allFacilities',
        allUsers: 'allUsers',
        allLoads: 'allLoads'
      }),
    },
  created() {
    console.log(this.invoice)
  }
}
</script>
