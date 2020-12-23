<template>
  <v-main>
    <v-container fluid>
      <v-card style="margin-top: 20px" :elevation="5">
      <v-expansion-panels multiple>
        <v-expansion-panel>
          <v-expansion-panel-header style="height: 50px;">
              <h3>Anstehende Rechnungen  <v-badge :content="this.upcomingInvoices.length" :value="this.upcomingInvoices.length" color="success"/></h3>
            <template v-slot:actions>
              <v-icon color="primary">
                $expand
              </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
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
                              v-model="filterProperties"
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
                              v-model="filterAdministration"
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
                              v-model="filterTenants"
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
                              v-model="filterCategory"
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
              <template v-slot:item.actions="{}">
                <v-btn x-small @click="{ }">
                  <v-icon>
                    mdi-file-download
                  </v-icon>
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
import {mapGetters} from "vuex";

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
    markAsPaid(items) {
      for (var i = 0; i < items.length; i++) {
        items[i].Bezahlt = "Ja"
        this.sentInvoicesSelected.splice(this.sentInvoicesSelected.indexOf(items[i]), 1)
      }
    },
    markAsSent(items) {
      for (var i = 0; i < items.length; i++) {
        items[i].Versendet = "true"
        this.openInvoicesSelected.splice(this.openInvoicesSelected.indexOf(items[i]), 1)
      }
    },
    resetSelectedOpen() {
      this.openInvoicesSelected = []
    },
    resetSelectedSent() {
      this.sentInvoicesSelected = []
    },
  },
  computed: {
    ...mapGetters({
      upcomingInvoices: 'upcomingInvoices',
      paidInvoices: 'paidInvoices',
      openInvoices: 'openInvoices',
      sentInvoices: 'sentInvoices',
      allFacilities: 'allFacilities',
      allUsers: 'allUsers',
      allLoads: 'allLoads'
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
  return (this.toLocaleDateString())
}
</script>

<style scoped>
h1, h5 {
  vertical-align: center;
  clear: both;
}
</style>
