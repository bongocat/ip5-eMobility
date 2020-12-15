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
        <v-icon small>mdi-pencil</v-icon>
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
                              persistent-hint = "true"
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
                              persistent-hint = "true"
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
                :return-value.sync=faelligAm
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
            <v-col>
              <v-menu
                  ref="menuBezahltAm"
                  v-model= "menuBezahltAm"
                  :close-on-content-click="false"
                  :return-value.sync="BezahltAm"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="BezahltAm"
                      label="Bezahlt Am"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="BezahltAm"
                    no-title
                    scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                      text
                      color="primary"
                      @click="menuBezahltAm = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      text
                      color="primary"
                      @click="$refs.menuBezahltAm.save(BezahltAm)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-switch
                v-model = "Bezahlt"
                color= "success"
                label = 'Bezahlt'
            >
            </v-switch>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
            </v-col>
            <v-col>
              <v-text-field v-model="Kommentar"
                            label="Kommentar"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="success"
            text
            @click="dialog = false, saveInvoiceChanges()"
        >
          Änderungen speichern
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

import {mapGetters} from "vuex";

export default {
  name: "InvoiceEdit",
  props: {
    invoice: Object
  },
  data() {
    return {
      menuFaelligAm: false,
      menuZuZahlenBis: false,
      menuBezahltAm: false,
      dialog: false,
      Betrag: this.invoice.Betrag,
      RechnungsID: this.invoice.RechnungsID,
      RechnungsNr: this.invoice.RechnungsNr,
      RechnungsArt: this.invoice.RechnungsArt,
      MieterReferenz: this.invoice.MieterReferenz,
      VermieterReferenz: this.invoice.VermieterReferenz,
      RechnungAn: this.invoice.RechnungAn,
      Anlagename: this.invoice.Anlagename,
      AnlageID: this.invoice.AnlageID,
      LoadID: this.invoice.LoadID,
      faelligAm: this.invoice['Fällig Am'].toISOString().substr(0, 10),
      zuZahlenBis: this.invoice['Zu Zahlen Bis'].toISOString().substr(0, 10),
      Bezahlt: this.invoice.Bezahlt,
      BezahltAm: this.invoice.BezahltAm.toISOString().substr(0, 10),
      Vorname: this.invoice.Nachname,
      Nachname: this.invoice.Nachname,
      Firma: this.invoice.Firma,
      Kommentar: this.invoice.Kommentar
    }
  },
  methods: {
    saveInvoiceChanges() {

      this.dialog = false

      this.invoice.Betrag = this.Betrag
      this.invoice.RechnungsID = this.RechnungsID,
          this.invoice.RechnungsNr = this.RechnungsNr,
          this.invoice.RechnungsArt = this.RechnungsArt,
          this.invoice.MieterReferenz = this.MieterReferenz,
          this.invoice.VermieterReferenz = this.VermieterReferenz,
          this.invoice.RechnungAn = this.RechnungAn,
          this.invoice.Anlagename = this.Anlagename,
          this.invoice.AnlageID = this.AnlageID,
          this.invoice.LoadID = this.LoadID,
          this.invoice['Fällig Am'] = this.faelligAm,
          this.invoice['Zu Zahlen Bis'] = this.zuZahlenBis,
          this.invoice.Bezahlt = this.Bezahlt,
          this.invoice.BezahltAm = this.BezahltAm,
          this.invoice.Nachname = this.Vorname,
          this.invoice.Nachname = this.Nachname,
          this.invoice.Firma = this.Firma,
          this.invoice.Kommentar = this.Kommentar
    },
    reset() {
      this.Betrag = this.invoice.Betrag,
          this.RechnungsID = this.invoice.RechnungsID,
          this.RechnungsNr = this.invoice.RechnungsNr,
          this.RechnungsArt = this.invoice.RechnungsArt,
          this.MieterReferenz = this.invoice.MieterReferenz,
          this.VermieterReferenz = this.invoice.VermieterReferenz,
          this.RechnungAn = this.invoice.RechnungAn,
          this.Anlagename = this.invoice.Anlagename,
          this.AnlageID = this.invoice.AnlageID,
          this.LoadID = this.invoice.LoadID,
          this.faelligAm = this.invoice['Fällig Am'].toISOString().substr(0, 10),
          this.zuZahlenBis = this.invoice['Zu Zahlen Bis'].toISOString().substr(0, 10),
          this.Bezahlt = this.invoice.Bezahlt,
          this.BezahltAm = this.invoice.BezahltAm.toISOString().substr(0, 10),
          this.Vorname = this.invoice.Nachname,
          this.Nachname = this.invoice.Nachname,
          this.Firma = this.invoice.Firma,
          this.Kommentar = this.invoice.Kommentar
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
    meterDifferenceEnabled() {
      return !(this.meterReadingOld && this.meterReadingNew)
    }
  },
  watch: {},

}
</script>
