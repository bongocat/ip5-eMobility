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
        Ausserordentliche Rechnung Erstellen
      </v-btn>
    </template>
    <v-card style="padding: 20px">
      <v-card-title>
        <h1 class="headline">Ausserordentliche Rechnung Erstellen</h1>
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
                              v-model = "invoiceTypeID"
                              dense
                              editable
                              :items='[{text:"Diverses", value: 4},{text:"Strom", value: 3}, {text:"Serviceabo", value: 2}, {text:"Installation", value: 1}]'
                              label="Rechnungsart"
                              item-value="value"
                              hint="Rechnungsart"
                              persistent-hint
              ></v-overflow-btn>
            </v-col>
            <v-col>
              <v-overflow-btn style="min-width: 250px"
                              v-model = "currentUser"
                              dense
                              editable
                              :items="allUsers"
                              label="Rechnung an"
                              hint="Rechnung an"
                              persistent-hint
                              :item-text = "item => item.userID + ' - ' + item.name +'  '+ item.familyName"
                              :item-value= "item => item"
              ></v-overflow-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-menu
                  ref="menuFälligAm"
                  v-model="menuFaelligAm"
                  :close-on-content-click="false"
                  :return-value.sync=invoiceDate
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="invoiceDate"
                      label="Fällig Am"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="invoiceDate"
                    no-title
                    scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                      text
                      color="primary"
                      @click="menuFaelligAm = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      text
                      color="primary"
                      @click="$refs.menuFälligAm.save(invoiceDate)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-menu
                  ref="menuZuZahlenBis"
                  v-model= "menuZuZahlenBis"
                  :close-on-content-click="false"
                  :return-value.sync=toPayUntil
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="toPayUntil"
                      label="Zu Zahlen Bis"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="toPayUntil"
                    no-title
                    scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                      text
                      color="primary"
                      @click="menuZuZahlenBis = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      text
                      color="primary"
                      @click="$refs.menuZuZahlenBis.save(toPayUntil)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-text-field v-model="comment"
                            label="Kommentar"></v-text-field>
            </v-col>
          </v-row>
          <h1 class="subtitle-1">Rechnungsposition hinzufügen</h1>
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

                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="item in invoicePositions"
                  :key="item.name"
              >
                <td>{{ item.extraPosDescription }}</td>
                <td>{{ item.extraPosCount }}</td>
                <td>{{ item.extraPosUnitPrice }}</td>
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
            @click="createExceptionalInvoice"
        >
          Rechnung Erstellen
        </v-btn>
        <v-btn
            color="error"
            text
            @click="dialog = false"
        >
          Schliessen
        </v-btn>
        <v-btn
            color="warning"
            text
            @click="reset"
        >
          Zurücksetzen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import {mapGetters, mapMutations, mapActions} from "vuex";
import {exceptionalInvoiceToPDF, normalInvoiceToPDF} from "@/PDFGeneration/generatePDF";


export default {
  name: "InvoiceExceptional",
  data() {
    return {
      menuFaelligAm: false,
      menuZuZahlenBis: false,
      dialog: false,

      currentUser: {},

      invoiceNumber: "",
      invoiceTypeID: "",
      customerRefID: "",
      invoiceToRefID: "",
      loadID: "",
      invoiceDate: "",
      toPayUntil: "",
      payedOn: "",
      name: "",
      familyName: "",
      salutation: "",
      company: "",
      phone: "",
      mobile: "",
      email: "",
      street: "",
      streetNumber: "",
      areaCode: "",
      city: "",
      country: "",
      invoiceToShippingAdress: "",
      shippingStreet: "",
      shippingStreetNumber: "",
      shippingAreaCode: "",
      shippingCity: "",
      shippingCountry: "",
      invoiceStatusID: "",
      active: "",
      comment: "",

      extraPosDescription: "",
      extraPosCount: 0,
      extraPosUnitPrice: 0.0,
      invoicePositions: []
    }
  },
  methods: {
    ...mapActions(['addNewInvoice']),
    createExceptionalInvoice() {
      this.dialog = false

      console.log("CURRENT USER", this.currentUser);

      const invoice = {

        invoiceNumber: this.invoiceNumber,
        invoiceTypeID: this.invoiceTypeID,
        customerRefID: this.currentUser.userID,
        invoiceToRefID: this.currentUser.userID,
        invoiceDate: new Date(this.invoiceDate),
        toPayUntil: new Date(this.toPayUntil),
        isPayed: 1,
        name: this.currentUser.name,
        familyName: this.currentUser.familyName,
        salutation: this.currentUser.salutation,
        company: this.currentUser.company,
        phone: this.currentUser.phone,
        mobile: this.currentUser.mobile,
        email: this.currentUser.email,
        street: this.currentUser.street,
        streetNumber: this.currentUser.streetNumber,
        areaCode: this.currentUser.areaCode,
        city: this.currentUser.city,
        country: this.currentUser.country,

        invoiceToShippingAdress: this.currentUser.invoiceToShippingAdress,
        shippingStreet: this.currentUser.shippingStreet,
        shippingStreetNumber: this.currentUser.shippingStreetNumber,
        shippingAreaCode: this.currentUser.shippingAreaCode,
        shippingCity: this.currentUser.shippingCity,
        shippingCountry: this.currentUser.shippingCountry,

        active: this.currentUser.active,
        comment: this.comment,
      }
      console.log(invoice)
      this.addNewInvoice(invoice)
      exceptionalInvoiceToPDF(invoice, this.allUsers ,this.allFacilities )
    },
    reset() {
      this.$refs.form.reset()
    },
    newInvoicePosition(){
      this.invoicePositions.push({
        extraPosDescription: this.extraPosDescription,
        extraPosCount: this.extraPosCount,
        extraPosUnitPrice: this.extraPosUnitPrice
      })

      this.extraPosDescription = ""
      this.extraPosCount = ""
      this.extraPosUnitPrice = ""
    },
    removeInvoicePosition(position){
      this.invoicePositions.splice(this.invoicePositions.indexOf(position),1)
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
  watch: {},

}
</script>
