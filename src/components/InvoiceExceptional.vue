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
              <v-text-field v-model="Betrag"
                            label="Betrag"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="RechnungsID"
                            label="Rechnungs ID"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="RechnungsNr"
                            label="Rechnungsnummer"></v-text-field>
            </v-col>
            <v-col>
              <v-overflow-btn style="width: 400px"
                              v-model = "RechnungsArt"
                              dense
                              editable
                              :items='["Strom", "Serviceabo", "Installation" ]'
                              label="Rechnungsart"
                              item-value="string"
                              hint="Rechnungsart"
                              persistent-hint
              ></v-overflow-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="MieterReferenz"
                            label="Mieter ID"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="VermieterReferenz"
                            label="Vermieter ID"></v-text-field>
            </v-col>
            <v-col>
              <v-overflow-btn style="width: 400px"
                              v-model = "RechnungAn"
                              dense
                              editable
                              :items='["Mieter", "Vermieter"]'
                              label="Rechnung an"
                              item-value="string"
                              hint="Rechnung An"
                              persistent-hint
              ></v-overflow-btn>
            </v-col>
            <v-col>
              <v-text-field v-model="AnlageID"
                            label="Anlage ID"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="LoadID"
                            label="Load ID"></v-text-field>
            </v-col>
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
                      v-model="faelligAm"
                      label="Fällig Am"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="faelligAm"
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
                      @click="$refs.menuFälligAm.save(faelligAm)"
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
                      v-model="zuZahlenBis"
                      label="Zu Zahlen Bis"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="zuZahlenBis"
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
                      @click="$refs.menuZuZahlenBis.save(zuZahlenBis)"
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

import {mapGetters, mapMutations} from "vuex";


export default {
  name: "InvoiceExceptional",
  data() {
    return {
      menuFaelligAm: false,
      menuZuZahlenBis: false,
      dialog: false,
      Betrag: "",
      RechnungsID: "",
      RechnungsNr: "",
      RechnungsArt: "",
      MieterReferenz: "",
      VermieterReferenz: "",
      RechnungAn: "",
      Anlagename: "",
      AnlageID: "",
      LoadID: "",
      faelligAm: new Date(Date.now()).toISOString().substr(0,10),
      zuZahlenBis: new Date(Date.now()).toISOString().substr(0,10),
      Vorname: "",
      Nachname: "",
      Firma: "",
      Kommentar: "",
      invoicePositions: [],
      extraPosDescription: "",
      extraPosCount: "",
      extraPosUnitPrice: "",
    }
  },
  methods: {
    ...mapMutations({
      addNewInvoice: "addNewInvoice"
    }),
    createExceptionalInvoice() {
      this.dialog = false

      const invoice = {
          Betrag: 0,
          RechnungsID: this.RechnungsID,
          RechnungsNr: this.RechnungsNr,
          RechnungsArt: this.RechnungsArt,
          MieterReferenz: this.MieterReferenz,
          VermieterReferenz: this.VermieterReferenz,
          RechnungAn: this.RechnungAn,
          Anlagename: this.Anlagename,
          AnlageID: this.AnlageID,
          LoadID: this.LoadID,
        ['Fällig Am']: new Date(this.faelligAm),
        ['Zu Zahlen Bis']: new Date(this.zuZahlenBis),
          Vorname: this.Vorname,
          Nachname: this.Nachname,
          Firma: this.Firma,
          Kommentar: this.Kommentar,
          invoicePositions: this.invoicePositions,
          BezahltAm: "",
          Generiert: "false",
          Versendet: "false",
          Bezahlt: "false",
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
