<template>
  <v-main>
    <v-container fluid>
      <v-card style="margin-top: 20px" :elevation="5">
        <v-card-title>
          <h1>Anstehende Rechnungen</h1>
          <v-badge :content="this.upcomingInvoices.length" :value="this.upcomingInvoices.length" color="success"
                   inline/>
        </v-card-title>
        <v-card-subtitle style="padding-left: 20px; padding-top: -30px">(nächste 30 Tage)</v-card-subtitle>
        <v-card-text>
          <v-expansion-panels style="padding-bottom: 20px">
            <v-expansion-panel>
              <v-expansion-panel-header>
                Filter
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row dense>
                  <v-col>
                    <v-overflow-btn
                        dense
                        editable
                        full-width="false"
                        :items="getUniqueProperties"
                        label="Anlagen"
                        item-value="text"
                    ></v-overflow-btn>
                  </v-col>
                  <v-col>
                    <v-overflow-btn
                        deletable-chips
                        dense
                        editable
                        full-width="false"
                        :items="getUniqueAdministration"
                        label="Verwaltungen"
                        item-value="text"
                    ></v-overflow-btn>
                  </v-col>
                  <v-col>
                    <v-overflow-btn
                        deletable-chips
                        dense
                        editable
                        full-width="false"
                        :items="getUniqueTenants"
                        label="Mieter"
                        item-value="text"
                    ></v-overflow-btn>
                  </v-col>
                  <v-col>
                    <v-overflow-btn
                        deletable-chips
                        dense
                        editable
                        full-width="false"
                        :items="getUniqueInvoiceCategory"
                        label="Rechnungsart"
                        item-value="text"
                    ></v-overflow-btn>
                  </v-col>
                  <v-col>
                    <v-menu
                        ref="menuStartingDate"
                        v-model="menuStartingDate"
                        :close-on-content-click="false"
                        :return-value.sync="startingDate"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="startingDate"
                            label="Startdatum"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="startingDate"
                          no-title
                          scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="menuStartingDate = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.menuStartingDate.save(startingDate)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col>
                    <v-menu
                        ref="menuEndDate"
                        v-model="menuEndDate"
                        :close-on-content-click="false"
                        :return-value.sync="endDate"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="endDate"
                            label="Enddatum"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="endDate"
                          no-title
                          scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="menuEndDate = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.menuEndDate.save(endDate)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-data-table
              dense
              :headers="upcomingHeaders"
              :items="upcomingInvoices"
              class="elevation-1"
              :items-per-page="5">
            <template v-slot:item.actions="{item}">
              <GenerateInvoice :invoice="item"></GenerateInvoice>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-card style="margin-top: 20px" :elevation="5">
        <v-card-title>
          <h1>Offene Rechnungen</h1>
          <v-badge :content="openInvoices.length" :value="openInvoices.length" color="success" inline/>
        </v-card-title>
        <v-card-text>
          <v-data-table
              v-model="selected"
              item-key="ID"
              show-select
              :single-select="false"
              dense
              :headers="openInvoicesHeaders"
              :items="openInvoices"
              class="elevation-1"
              :items-per-page="5">
            <template v-slot:item.actions="{item}">
              <v-btn color="success" x-small class="mr-2" @click="markAsPaid([item])">
                Als Bezahlt markieren
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-btn small color="blue" @click="markAsPaid(selected), resetSelected()">
            Ausgewählte als bezahlt markieren
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card style="margin-top: 20px" :elevation="5">
        <v-card-title>
          <h1>Kürzlich bezahlte Rechnungen</h1>
          <v-badge :content="paidInvoices.length" :value="paidInvoices.length" color="success" inline/>
        </v-card-title>
        <v-card-text>
          <v-data-table
              v-model="selected"
              item-key="ID"
              dense
              :headers="upcomingHeaders"
              :items="paidInvoices"
              class="elevation-1"
              :items-per-page="5">
            <template v-slot:item.actions="{}">
              <v-btn x-small @click="{ toPDF() }">
                <v-icon>
                  mdi-file-download
                </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import GenerateInvoice from "./GenerateInvoice";
import {mapGetters} from "vuex";
import {mapMutations} from 'vuex';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {

  name: "Dashboard",
  components: {GenerateInvoice},
  data() {
    return {
      startingDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      menuStartingDate: false,
      menuEndDate: false,
      currentItem: {},
      showModal: false,
      selected: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      dialog: false,
      editedIndex: -1,
      upcomingHeaders: [
        {text: 'Rechnungs ID', value: 'RechnungsID'},
        {text: 'Rechnungsart', value: 'RechnungsArt'},
        {text: 'Betrag', value: 'Betrag'},
        {text: 'Vermieter', value: 'VermieterReferenz'},
        {text: 'Rechnung An', value: 'RechnungAn'},
        {text: 'Anlagename', value: 'Anlagename'},
        {text: 'Load ID', value: 'LoadID'},
        {text: 'Fällig Am', value: 'Fällig Am'},
        {text: 'Mieter Vorname', value: 'Vorname'},
        {text: 'Mieter Nachname', value: 'Nachname'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      openInvoicesHeaders: [
        {text: 'Rechnungs ID', value: 'RechnungsID'},
        {text: 'Rechnungsart', value: 'RechnungsArt'},
        {text: 'Betrag', value: 'Betrag'},
        {text: 'Vermieter', value: 'VermieterReferenz'},
        {text: 'Rechnung An', value: 'RechnungAn'},
        {text: 'Anlagename', value: 'Anlagename'},
        {text: 'Load ID', value: 'LoadID'},
        {text: 'Zu Zahlen Bis', value: 'Zu Zahlen Bis'},
        {text: 'Mieter Vorname', value: 'Vorname'},
        {text: 'Mieter Nachname', value: 'Nachname'},
        {text: 'Actions', value: 'actions', sortable: false}
      ]
    };
  },
  methods: {
    toPDF() {

      var dd = {
        content: [
          {text: 'Datum', alignment: 'left' },
          {text: 'Adresse', alignment: 'left' },
          {text: 'der', alignment: 'left' },
          {text: 'Verwaltung', alignment: 'left' },

          {text: 'Rechnung für Serviceabo der Ladeinfrastruktur ', style: 'header', margin: [0, 30]},

          {
            style: 'tableExample',
            table: {
              widths: ['*', '*', '*'],
              heights: [30, 30, 30],
              body: [
                ['Objekt', 'Column 2', '-'],
                ['Projekt', 'Projektname', '-'],
                ['Abrechnungsperiode', '-', '-']
              ]
            }
          },


          {text: 'Total aktive Berechnungseinheiten (1BE = 1x16A / 230V):15 BE -> 8.50 / BE '},

          {
            style: 'tableExample', width: '*',
            table: {
              widths: ['auto', '*', 'auto', 'auto', 'auto'],
              heights: ['auto', 'auto', 'auto', 'auto', 'auto'],
              body: [
                ['Pos. ', 'Beschreibung ', 'Stk. ', 'Preis/Stk. ', 'Gesamtpreis'],
                ['1', 'Powerbox Gateway (3-phasig) \n PP8 (Name Nutzer)', '1x3 ', '8.50 ', '25.50 '],
                ['2', 'Powerbox Gateway (3-phasig) \n PP14 + PP16 (Name Nutzer) ', '2x3 ', '8.50 ', '51.00 '],
                ['3', 'Powerbox Gateway (3-phasig) \n PP20 (Name Nutzer)', '1x3 ', '8.50 ', '25.50 '],
                ['4', 'Powerbox Gateway (3-phasig) \n PP32 (Name Nutzer) ', '1x3 ', '8.50 ', '25.50 '],
                ['', {text: 'Total exkl. MwSt', bold: true}, '', '', {text: '127.50 ', bold: true}],
                ['', '7.7% MwSt ', '', '', '9.80 '],
                ['', {text: 'Total inkl. MwSt, zahlbar innert 10 Tagen ', bold: true}, '', '', {text: '137.80 ', bold: true}]
              ]
            }
          },

          {text: 'Freundliche Grüsse', alignment: 'left', margin: [0,15] },

          {text: 'megalog AG \n Markus Bossert', alignment: 'left' },

          {text: 'Bankverbindung', alignment: 'left', bold: true, margin: [0,15, 0, 0]},
          {text: 'Bank: Postfinance  |  KontoNr: CH51 0900 0000 1526 2931 0  |  Kontoinhaber: megalog AG, Luzern ', alignment: 'left' },
          {text: 'Vermerk: Abo Anlage 14 ', alignment: 'left' },

        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5]
          },
          tableExample: {
            margin: [0, 5, 0, 15]
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          }
        },
        defaultStyle: {
          // alignment: 'justify'
        }

      }

      pdfMake.createPdf(dd).download();
    },
    markAsPaid(items) {
      for (var i = 0; i < items.length; i++) {
        items[i].Bezahlt = "Ja"
      }
    },
    resetSelected() {
      this.selected = []
    },
    ...mapMutations([
      'addInvoice',  // map `this.increment()` to `this.$store.commit('increment')`
    ]),
  },
  computed: {
    ...mapGetters({
      upcomingInvoices: 'upcomingInvoices',
      paidInvoices: 'paidInvoices',
      openInvoices: 'openInvoices'
    }),
    getUniqueProperties() {
      var array = [];
      this.upcomingInvoices.forEach(function (item) {
        if (!array.includes(item.AnlageID)) {
          array.push(item.AnlageID)
        }
      })
      return array
    },
    getUniqueAdministration() {
      var array = [];
      this.upcomingInvoices.forEach(function (item) {
        if (!array.includes(item.Anlagename)) {
          array.push(item.Anlagename)
        }
      })
      return array
    },
    getUniqueTenants() {
      var array = [];
      this.upcomingInvoices.forEach(function (item) {
        if (!array.includes(item.Nachname)) {
          array.push(item.Nachname)
        }
      })
      return array
    },
    getUniqueInvoiceCategory() {
      var array = [];
      this.upcomingInvoices.forEach(function (item) {
        if (!array.includes(item.RechnungsArt)) {
          array.push(item.RechnungsArt)
        }
      })
      return array
    },
  },
}

Date.prototype.toString = function () {
  return this.toDateString()
}
</script>

<style scoped>
h1, h5 {
  vertical-align: center;
  clear: both;
}
</style>
