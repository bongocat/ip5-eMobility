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
        Neue Load erfassen
      </v-btn>
    </template>
    <v-card style="padding: 20px">
      <v-card-title>
        <h1 class="headline">Load erfassen</h1>
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
                      hint="Rechnungsintervall Service"
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
            @click="createNewLoadFromForm"
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
        <v-btn
            text
            color="warning"
            @click="reset"
        >
          Zurücksetzen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapMutations} from 'vuex'
import {mapGetters} from 'vuex'

export default {
  name: "LoadRegistration",
  data() {
    return {
      dialog: false,
      anlageID: "",
      anlageName: "",
      anlageVermieter: "",
      anlageMieter: "",
      invoiceTo: "",
      menuFirstPayment: false,
      firstPayment: new Date(Date.now()).toISOString().substr(0,10),
      paymentIntervalService: 'jährlich',
      paymentIntervalElectricity: 'jährlich',
      loadType: '',
      active: true
    }
  },
  methods: {
    ...mapMutations({
      addNewLoad: "addNewLoad"
    }),
    createNewLoadFromForm() {
      this.dialog = false

      const newLoad = {
        LoadID: this.loadNummer,
        AnlageID: this.anlageID,
        Anlage: this.anlageName,
        Vermieter: this.anlageVermieter,
        Mieter: this.anlageMieter,
        ['Rechnung an']: this.invoiceTo,
        ErstesZahlungsdatum: new Date(this.firstPayment),
        RechnungsIntervallStrom: this.paymentIntervalElectricity,
        RechnungsIntervallService: this.paymentIntervalService,
        LoadTyp: this.loadType,
      }
      this.addNewLoad(newLoad)
    },
    reset() {
      this.$refs.form.reset()
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
