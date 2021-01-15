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
              <v-text-field v-model="invoiceNumber"
                            label="Rechnungsnummer"></v-text-field>
            </v-col>
            <v-col>
              <v-overflow-btn style="min-width: 250px"
                              v-model="due"
                              dense
                              editable
                              :items='[{text: "10 Tage", value: 10}, {text: "20 Tage", value: 20}, {text: "30 Tage", value: 30}]'
                              label="Zahlungsfrist"
              ></v-overflow-btn>
            </v-col>
            <v-col>
              <v-text-field v-model="comment"
                            label="Kommentar"></v-text-field>
            </v-col>
          </v-row>
          <h3 class="title-3">Rechnungspositionen</h3>
          <h3 class="subtitle-2">Rechnungsposition hinzufügen</h3>
          <v-row>
            <v-col>
              <v-text-field v-model="extraPosDescription"
                            label="Beschreibung"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="extraPosCount"
                            label="Anzahl"
                            type="number"
                            min="0"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="extraPosUnitPrice"
                            label="Preis Pro Einheit"
                            type="number"
                            step="0.01"
                            min="0.00"
                            suffix="CHF"
              >

              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="extraPosVat"
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
          <v-simple-table dense v-if="this.invoice.invoiceTypeID === 2">
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
                  :key="item.invoicePositionID"
              >
                <td>{{ item.positionName + " - Load ID: " + item.loadID }}</td>
                <td>{{ item.amount }}</td>
                <td>{{ item.price + " CHF" }}</td>
                <td>{{ item.brutto + " CHF" }}</td>
                <td>{{ (item.vat * 100).toFixed(2) + "%" }}</td>
                <td>{{ item.netto.toFixed(2) + " CHF" }}</td>
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
          <v-simple-table dense v-if="this.invoice.invoiceTypeID === 3">
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">
                Beschreibung
              </th>
              <th class="text-left">
                Zählerstand Alt
              </th>
              <th class="text-left">
              Zählerstand Neu
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
                :key="item.invoicePositionID"
            >
              <td>{{ item.positionName + " - Load ID: " + item.loadID }}</td>
              <td>
                <v-text-field v-model="item.counterOld"
                              label="Zählerstand Alt"
                              type="number"
                              step="0.01"
                              min="0.00"
                              suffix="kWh"
                ></v-text-field>
              </td>
              <td>
                <v-text-field v-model="item.counterNew"
                              label="Zählerstand Neu"
                              type="number"
                              step="0.01"
                              min="0.00"
                              suffix="kWh"
                ></v-text-field>
              </td>
              <td>
                <v-text-field v-model="item.price"
                              label="Bruttopreis"
                              type="number"
                              step="0.01"
                              min="0.00"
                              suffix="CHF"
                ></v-text-field>
              </td>
              <td>
                <v-text-field v-model="item.vat"
                              label="Mehrwertsteuersatz"
                              type="number"
                              step="0.01"
                              min="0.00"
                              suffix="%"
                ></v-text-field>
              </td>
              <td> {{ getNettoPriceElectricity(item) }} </td>
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
            <thead>
            <tr>
              <th class="text-left">
              </th>
              <th class="text-left">
              </th>
              <th class="text-left">
              </th>
              <th class="text-left">
              </th>
              <th class="text-left">
              </th>
              <th class="text-left">
              </th>
              <th class="text-left">
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(item) in extraInvoicePositions"
                :key="item.invoicePositionID"
            >
              <td>{{ item.positionName }}</td>
              <td>{{ item.amount }}</td>
              <td>{{ item.price + " CHF" }}</td>
              <td>{{ item.brutto + " CHF" }}</td>
              <td>{{ (item.vat * 100).toFixed(2) + "%" }}</td>
              <td>{{ item.netto.toFixed(2) + " CHF" }}</td>
              <td>
                <v-btn color="error"
                       text
                       @click="removeExtraInvoicePosition(item)"
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
import {regularInvoiceToPDF} from "../PDFGeneration/generatePDF"


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
      extraInvoicePositions: [],
      due: 10,
      comment: "",
      dialog: false,

      invoiceNumber: "",
    }
  },
  methods: {
    ...mapActions(['fetchUsers', 'fetchInvoices', 'fetchFacilities', 'fetchLoads', 'fetchLoadTypes', 'fetchInvoiceTypes', 'editInvoice', 'addNewInvoicePosition', 'addNewInvoice', 'editLoad', "fetchInvoicePositions"]),
    newInvoicePosition() {
      if (this.invoice.invoiceTypeID === 2){
        this.invoicePositions.push({
          positionName: this.extraPosDescription,
          loadID: "",
          price: this.extraPosUnitPrice,
          amount: this.extraPosCount,
          brutto: this.extraPosUnitPrice * this.extraPosCount,
          netto: this.extraPosUnitPrice * this.extraPosCount + (this.extraPosUnitPrice * this.extraPosCount * Number(this.extraPosVat*0.01).toFixed(2)),
          vat: this.extraPosVat * 0.01,
        })
      }
      else {
        this.extraInvoicePositions.push({
          positionName: this.extraPosDescription,
          loadID: "",
          price: this.extraPosUnitPrice,
          amount: this.extraPosCount,
          brutto: this.extraPosUnitPrice * this.extraPosCount,
          netto: this.extraPosUnitPrice * this.extraPosCount + (this.extraPosUnitPrice * this.extraPosCount * Number(this.extraPosVat*0.01).toFixed(2)),
          vat: this.extraPosVat * 0.01,
        })
      }

      this.extraPosVat = ""
      this.extraPosDescription = ""
      this.extraPosCount = ""
      this.extraPosUnitPrice = ""
    },
    removeInvoicePosition(position) {
      this.invoicePositions.splice(this.invoicePositions.indexOf(position), 1)
    },
    removeExtraInvoicePosition(position){
      this.extraInvoicePositions.splice(this.extraInvoicePositions.indexOf(position), 1)

    },
    exportToPDF: function (item) {

      item.toPayUntil = this.addDays(item.invoiceDate, this.due) //adds the days of "due" to the invoice date
      item.comment = this.comment
      item.invoiceNumber = this.invoiceNumber
      item.invoiceStatusID = 2
      this.addNewInvoice(item)

      this.invoicePositions.forEach((invoicePosition) => {
        invoicePosition.invoiceNumber = this.invoiceNumber
        invoicePosition.active = 1
        invoicePosition.comment = ""
        var currentLoad = this.allLoads.filter(load => load.loadID === invoicePosition.loadID)[0]

        if (item.invoiceTypeID === 2) {
          currentLoad.firstInvoice = this.addMonths(new Date(currentLoad.firstInvoice), currentLoad.intervalService)
        }
        if (item.invoiceTypeID === 3) {
          invoicePosition.vat = invoicePosition.vat / 100
          invoicePosition.amount = 1;
          currentLoad.counterOld = invoicePosition.counterOld
          currentLoad.counterNew = invoicePosition.counterNew
          currentLoad.counterOldDate = currentLoad.counterNewDate
          currentLoad.counterNewDate = this.addMonths(new Date(currentLoad.counterNewDate), currentLoad.intervalElectricity)
        }

        this.editLoad(currentLoad)
        this.addNewInvoicePosition(invoicePosition)
      })

      this.extraInvoicePositions.forEach((invoicePosition) => {
        invoicePosition.invoiceNumber = this.invoiceNumber
        invoicePosition.active = 1
        invoicePosition.comment = ""
        invoicePosition.loadID = null
        this.addNewInvoicePosition(invoicePosition)
      })

      regularInvoiceToPDF(item, this.invoicePositions.concat(this.extraInvoicePositions))
    },
    addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    },
    addMonths(date, amount) {
      const endDate = new Date(date.getTime());
      const originalTimeZoneOffset = endDate.getTimezoneOffset();
      endDate.setMonth(endDate.getMonth() + amount);
      while (this.monthDiff(date, endDate) > amount) {
        endDate.setDate(endDate.getDate() - 1);
      }
      const endTimeZoneOffset = endDate.getTimezoneOffset();
      const diff = endTimeZoneOffset - originalTimeZoneOffset;
      const finalDate = diff ? endDate.setMinutes(endDate.getMinutes() - diff) : endDate;
      return new Date(finalDate);
    },
    monthDiff(from, to) {
      const years = to.getFullYear() - from.getFullYear();
      const months = to.getMonth() - from.getMonth();
      return 12 * years + months;
    },
    getNettoPriceElectricity(item) {
      var price = Number(item.price)
      item.brutto = price
      var netto = Number(price) * Number((item.vat/100 + 1))
      item.netto = Number(netto).toFixed(2)
      return item.netto
    }
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
    this.fetchUsers()
    this.fetchFacilities()
    this.fetchLoadTypes()
    this.fetchInvoices()
    this.fetchInvoiceTypes()
    this.fetchLoads()
  },
}
</script>
