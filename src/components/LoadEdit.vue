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
              <v-text-field label="AnlageID" v-model=anlageID></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Anlagenname" v-model=anlageName></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Verwalter" v-model=anlageVermieter></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Mieter" v-model=anlageMieter></v-text-field>
            </v-col>
            <v-col>
              <v-select
                      v-model="invoiceTo"
                      :items="['Mieter', 'Vermieter']"
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
                      :items="['monatlich', 'vierteljährlich', 'halbjährlich', 'jährlich']"
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
                      :items="['monatlich', 'vierteljährlich', 'halbjährlich', 'jährlich']"
                      label="Zahlunsintervall"
                      hint="Rechnungsintervall Serviece"
                      persistent-hint
                      return-object
                      single-line
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                      v-model="loadType"
                      :items="['LoadType A', 'LoadType XY', 'LoadType 123', 'LoadType HASD']"
                      label="Load Typ"
                      hint="Load Typ"
                      persistent-hint
                      return-object
                      single-line
              ></v-select>
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
          Anlage erfassen
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
import {mapMutations} from 'vuex'
import {mapGetters} from 'vuex'

export default {
  name: "LoadEdit",
  props: {
    load: Object
  },
  data() {
    return {
      dialog: false,
      loadID: this.load.LoadID,
      anlageName: this.load.Anlage,
      anlageVermieter: this.load.Vermieter,
      anlageMieter: this.load.Mieter,
      rechnungAn: this.load['Rechnung an'],
      anlageID: this.load.AnlageID,
      invoiceTo: this.load.RechnungAn,
      menuFirstPayment: false,
      firstPayment: this.load.ErstesZahlungsdatum.toISOString().substr(0,10),
      paymentIntervalService: this.load.RechnungsIntervallService,
      paymentIntervalElectricity: this.load.RechnungsIntervallStrom,
      loadType: this.load.LoadTyp,
      active: this.load.active
    }
  },
  methods: {
    ...mapMutations({
      addNewLoad: "addNewLoad"
    }),
    saveLoadChanges() {
      this.dialog = false
      this.load.LoadID = this.loadID,
      this.load.AnlageID = this.anlageID,
      this.load.Anlage = this.anlageName,
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
      this.anlageName = this.load.Anlage
      this.anlageVermieter = this.load.Vermieter
      this.anlageMieter = this.load.Mieter
      this.invoiceTo = this.load['Rechnung an']
      this.firstPayment = this.load.ErstesZahlungsdatum
      this.paymentIntervalService = this.load.RechnungsIntervallService
      this.paymentIntervalElectricity = this.load.RechnungsIntervallStrom
      this.loadType = this.load.LoadTyp
      this.active = this.load.active
    },
  },
  computed: {
    ...mapGetters({
      allLoads: 'allLoads',
    }),
    loadNummer() {
      return this.allLoads.length + 1
    },
  },
}
</script>
