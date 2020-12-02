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
    <v-stepper
            v-model="stepperCount"
            vertical
    >
      <v-stepper-step
              :complete="stepperCount > 1"
              step="1"
      >
        Load Details
      </v-stepper-step>
      <v-stepper-content step="1">
        <v-card
                color="grey lighten-1"
                class="mb-12"
                min-height="250px"
                style="padding: 20px"
        >
          <v-card-text>
            <v-form>
              <v-row>
                <v-col>
                  <v-text-field label="Name" v-model=loadName></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field label="Load ID" v-model=loadID></v-text-field>
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
                              v-model="initialStartUp"
                              label="Inbetriebnahme"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                            v-model="initialStartUp"
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
                              @click="$refs.menuEndDate.save(initialStartUp)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
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
                              label="Erstabrechnung Serviceabo"
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
                              label="Erstabrechnung Strom"
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
              <v-row>
                <v-col>
                  <v-overflow-btn
                          deletable-chips
                          dense
                          editable
                          full-width="false"
                          :items="getUniqueInvoiceCategory"
                          label="Stromkosten Rechnungsintervall"
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
                          label="Serviceabo Rechnungsintervall"
                          item-value="text"
                  ></v-overflow-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
        <v-btn
                color="primary"
                @click="stepperCount = 2"
        >
          Continue
        </v-btn>
        <v-btn text @click="dialog = false, stepperCount = 1, reset">
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-step
              :complete="stepperCount > 2"
              step="2"
      >
        Configure analytics for this app
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-card
                color="grey lighten-1"
                class="mb-12"
                height="200px"
        ></v-card>
        <v-btn
                color="primary"
                @click="stepperCount = 3"
        >
          Continue
        </v-btn>
        <v-btn text @click="dialog = false, stepperCount = 1, reset">
          Cancel
        </v-btn>
        <v-btn text @click="stepperCount -= 1">
          Back
        </v-btn>
      </v-stepper-content>

      <v-stepper-step
              :complete="stepperCount > 3"
              step="3"
      >
        Select an ad format and name ad unit
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-card
                color="grey lighten-1"
                class="mb-12"
                height="200px"
        ></v-card>
        <v-btn
                color="primary"
                @click="stepperCount = 4"
        >
          Continue
        </v-btn>
        <v-btn text @click="dialog = false, stepperCount = 1, reset">
          Cancel
        </v-btn>
        <v-btn text @click="stepperCount -= 1">
          Back
        </v-btn>
      </v-stepper-content>
      <v-stepper-step step="4">
        View setup instructions
      </v-stepper-step>
      <v-stepper-content step="4">
        <v-card
                color="grey lighten-1"
                class="mb-12"
                height="200px"
        ></v-card>
        <v-btn
                color="primary"
                @click="stepperCount = 1"
        >
          Continue
        </v-btn>
        <v-btn text @click="dialog = false, stepperCount = 1">
          Cancel
        </v-btn>
        <v-btn text @click="stepperCount -= 1">
          Back
        </v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-dialog>
</template>

<script>
import {mapMutations} from 'vuex'
import {mapGetters} from 'vuex'

export default {
  name: "LoadRegistration",
  data() {
    return {
      stepperCount : 1,
      dialog: false,
      anlageID: "",
      anlageName: "",
      anlageVermieter: "",
      anlageMieter: "",
      rechnungAn: "",
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
        ['Rechnung an']: this.rechnungAn,
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
