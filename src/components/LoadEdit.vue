<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          x-small
          color="success"
          dark
          v-bind="attrs"
          v-on="on"
      >
        <v-icon small>
          mdi-pencil
        </v-icon>
      </v-btn>
    </template>
    <v-card style="padding: 20px">
      <v-card-title>
        <h1 class="headline">Load bearbeiten</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col>
              <v-overflow-btn style="width: 400px"
                              v-model = "facilityNumber"
                              dense
                              editable
                              :items="allFacilities"
                              label="Anlage"
                              hint="Anlage"
                              persistent-hint
                              :item-text = "item => item.AnlageID + ' - ' + item.Bezeichnung"
                              :item-value= "item => item.AnlageID"
              ></v-overflow-btn>
            </v-col>
            <v-col>
              <v-overflow-btn style="width: 400px"
                              v-model = "tenantID"
                              dense
                              editable
                              :items="allUsers"
                              label="Rechnung an"
                              hint="Rechnung an"
                              persistent-hint
                              :item-text = "item => item.NutzerID + ' - ' + item.Vorname +'  '+ item.Nachname"
                              :item-value= "item => item.NutzerID"
              ></v-overflow-btn>
            </v-col>
            <v-col>
              <v-select
                      v-model="invoiceTo"
                      :items="[{text: 'Mieter', value: 0}, {text: 'Vermieter', value: 1}]"
                      label="Rechnung an"
                      hint="Rechnung an"
                      persistent-hint
                      return-object
                      single-line
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-menu
                      ref="menuFirstPayment"
                      v-model="menuFirstPayment"
                      :close-on-content-click="false"
                      :return-value.sync=firstPayment
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                          v-model="firstPayment"
                          label="Erste Zahlung"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                        v-model="firstPayment"
                        no-title
                        scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                          text
                          color="primary"
                          @click="menuFirstPayment = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                          text
                          color="primary"
                          @click="$refs.menuFirstPayment.save(firstPayment)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-select
                      v-model="paymentIntervalService"
                      :items="[{text: 'monatlich', value: 0}, {text: 'vierteljährlich', value: 1}, {text: 'halbjährlich', value: 2}, {text: 'jährlich', value: 3}]"
                      label="Zahlunsintervall"
                      hint="Rechnungsintervall Strom"
                      persistent-hint
                      return-object
                      single-line
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                      v-model="paymentIntervalElectricity"
                      :items="[{text: 'monatlich', value: 0}, {text: 'vierteljährlich', value: 1}, {text: 'halbjährlich', value: 2}, {text: 'jährlich', value: 3}]"
                      label="Zahlunsintervall"
                      hint="Rechnungsintervall Serviece"
                      persistent-hint
                      return-object
                      single-line
              ></v-select>
            </v-col>
            <v-col>
              <v-overflow-btn style="width: 400px"
                              v-model="loadType"
                              dense
                              editable
                              :items="allLoadTypes"
                              label="Load Typ"
                              hint="Load Typ"
                              persistent-hint
                              :item-text = "item => item.LoadTypID + ' - ' + item.Bezeichnung"
                              :item-value= "item => item.LoadTypID"
              ></v-overflow-btn>
            </v-col>
            <v-col>
              <v-switch v-model="active"
                        label="Aktiv"
                        color="success"

              >
              </v-switch>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
                color="success"
                text
                @click="saveLoadChanges"
        >
          Load anpassen
        </v-btn>
        <v-btn
                color="error"
                text
                @click="dialog = false"
        >
          Schliessen
        </v-btn>
<!--        <v-btn-->
<!--                text-->
<!--                color="warning"-->
<!--                @click="reset"-->
<!--        >-->
<!--          Zurücksetzen-->
<!--        </v-btn>-->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "LoadEdit",
  props: {
    load: Object
  },
  data() {
    return {
      dialog: false,
      menuFirstPayment: false,

      loadID: this.load.LoadID,
      loadType: this.load.LoadTypID,
      facilityNumber: this.load.AnlageNr,
      tenantID: this.load.MieterID,
      invoiceTo: this.load.RechnungAn,
      firstPayment: this.load.ErsteRechnung.toISOString().substr(0,10),
      paymentIntervalService: this.load.ServiceIntervall,
      paymentIntervalElectricity: this.load.StromIntervall,
      active: this.load.Aktiv,
      comment: this.load.Kommentar

    }
  },
  methods: {
    saveLoadChanges() {
      this.dialog = false

      this.load.LoadID = this.loadID,
      this.load.Anlage = this.facilityNumber,
      this.load.Vermieter = this.anlageVermieter,
      this.load.Mieter = this.anlageMieter,
      this.load['Rechnung an'] =  this.invoiceTo,
      this.load.ErstesZahlungsdatum = this.firstPayment,
      this.load.RechnungsIntervallService = this.paymentIntervalService
      this.load.RechnungsIntervallStrom = this.paymentIntervalElectricity
      this.load.LoadTyp = this.loadType
      this.load.active = this.active

    },
    reset() {
      this.loadNummer = this.load.LoadID
      this.anlageID = this.load.AnlageID
      this.facilityNumber = this.load.Anlage
      this.anlageVermieter = this.load.Vermieter
      this.anlageMieter = this.load.Mieter
      this.invoiceTo = this.load['Rechnung an']
      this.firstPayment = this.load.ErstesZahlungsdatum
      this.paymentIntervalService = this.load.RechnungsIntervallService
      this.paymentIntervalElectricity = this.load.RechnungsIntervallStrom
      this.loadType = this.load.LoadTyp
      this.active = this.load.active
    },
    ...mapActions(['editLoad'])
  },
  computed: {
    ...mapGetters(['allFacilities', 'allUsers', 'allLoads', 'allLoadTypes']),
  },
  created() {
  }
}
</script>
