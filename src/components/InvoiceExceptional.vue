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
              <v-overflow-btn style="width: 400px"
                              v-model = "invoiceTypeID"
                              dense
                              editable
                              :items='[{text:"Diverses", value: 1},{text:"Strom", value: 1}, {text:"Serviceabo", value: 1}, {text:"Installation", value: 1}]'
                              label="Rechnungsart"
                              hint="Rechnungsart"
                              persistent-hint
              ></v-overflow-btn>
            </v-col>
            <v-col>

            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-overflow-btn style="width: 400px"
                              v-model = "currentUser"
                              dense
                              editable
                              :items="allUsers"
                              label="Rechnung an"
                              hint="Rechnung an"
                              persistent-hint
                              :item-text = "item => item.NutzerID + ' - ' + item.Vorname +'  '+ item.Nachname"
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
                  :return-value.sync=faelligAm
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
                  :return-value.sync=zuZahlenBis
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
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="Kommentar"
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

import {mapGetters, mapActions} from "vuex";


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
      isPayed: "",
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
      ShippingStreet: "",
      ShippingStreetNumber: "",
      ShippingAreaCode: "",
      ShippingCity: "",
      ShippingCountry: "",
      counterOld: "",
      counterOldDate: "",
      counterNew: "",
      counterNewDate: "",
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

      console.log(this.currentUser);

      const invoice = {

        invoiceNumber: this.invoiceNumber,
        invoiceTypeID: this.invoiceTypeID,
        customerRefID: this.currentUser.NutzerID,
        invoiceToRefID: this.currentUser.NutzerID,
        loadID: 4,
        invoiceDate: new Date(this.invoiceDate),
        toPayUntil: new Date(this.toPayUntil),
        isPayed: 0,
        name: this.currentUser.Vorname,
        familyName: this.currentUser.Nachname,
        salutation: this.currentUser.Anrede,
        company: this.currentUser.Firma,
        phone: this.currentUser.FestnetzNummer,
        mobile: this.currentUser.HandyNummer,
        email: this.currentUser.EMailAdresse,
        street: this.currentUser.WStrasse,
        streetNumber: this.currentUser.WStrassenNr,
        areaCode: this.currentUser.WPLZ,
        city: this.currentUser.WOrt,
        country: this.currentUser.WLand,
        invoiceToShippingAdress: this.currentUser.RiW,
        ShippingStreet: this.currentUser.RStrasse,
        ShippingStreetNumber: this.currentUser.RStrassenNr,
        ShippingAreaCode: this.currentUser.RPLZ,
        ShippingCity: this.currentUser.ROrt,
        ShippingCountry: this.currentUser.RLand,
        counterOld: "",
        counterOldDate: "",
        counterNew: 0,
        counterNewDate: 0,
        active: this.currentUser.Aktiv,
        comment: this.comment,
      }
      console.log(invoice)
      this.addNewInvoice(invoice)

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
