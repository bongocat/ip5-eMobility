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
              <v-overflow-btn style="min-width: 250px"
                              v-model = "loadTypeID"
                              dense
                              editable
                              :items="allLoadTypes"
                              label="Load Typ"
                              hint="Load Typ"
                              persistent-hint
                              :item-text = "item => item.loadTypeID + ' - ' + item.designation"
                              :item-value = "item => item.loadTypeID"
              ></v-overflow-btn>
            </v-col>
            <v-col>
              <v-overflow-btn style="min-width: 250px"
                              v-model = "facilityID"
                              dense
                              editable
                              :items="allFacilities"
                              label="Anlage"
                              hint="Anlage"
                              persistent-hint
                              :item-text = "item => item.facilityID + ' - ' + item.designation"
                              :item-value= "item => item.facilityID"
              ></v-overflow-btn>
            </v-col>
              <v-col>
                <v-overflow-btn style="min-width: 250px"
                                v-model = "tenantID"
                                dense
                                editable
                                :items="allUsers"
                                label="Mieter"
                                hint="Mieter"
                                persistent-hint
                                :item-text = "item => item.userID + ' - ' + item.name +'  '+ item.familyName"
                                :item-value= "item => item.userID"
                ></v-overflow-btn>
              </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-menu
                  ref="menuFirstPayment"
                  v-model="menuFirstPayment"
                  :close-on-content-click="false"
                  :return-value.sync=firstInvoice
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="firstInvoice"
                      label="Erste Zahlung"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="firstInvoice"
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
                      @click="$refs.menuFirstPayment.save(firstInvoice)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-overflow-btn
                  v-model="intervalService"
                  :items="[{text: 'monatlich', value: 1}, {text: 'vierteljährlich', value: 3}, {text: 'halbjährlich', value: 6}, {text: 'jährlich', value: 12}]"
                  label="Zahlunsintervall"
                  hint="Zahlungsintervall"
                  persistent-hint
                  single-line
                  item-value="value"
              ></v-overflow-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                  v-model="invoiceTo"
                  :items='["Mieter", "Verwaltung"]'
                  label="Rechnung An"
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field label="Kommentar" v-model=comment
                            counter
                            maxlength="1000"
              ></v-text-field>
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
import {mapMutations, mapActions, mapGetters} from 'vuex'

export default {
  name: "LoadRegistration",
  data() {
    return {
      dialog: false,

      loadTypeID: "",
      facilityID: "",
      tenantID: "",
      invoiceTo: "",
      firstInvoice: new Date().toISOString().substr(0, 10),
      intervalElectricity: "",
      intervalService: "",
      counterOld: "",
      counterOldDate: new Date().toISOString().substr(0, 10),
      counterNew: "",
      counterNewDate: new Date().toISOString().substr(0, 10),
      comment: "",
      active: 0

    }
  },
  methods: {
    ...mapMutations({
      addNewLoad: "addNewLoad"
    }),
    ...mapActions(['fetchLoadTypes', 'addNewLoad']),
    createNewLoadFromForm() {
      this.dialog = false

      const newLoad = {
        loadTypeID: this.loadTypeID,
        facilityID: this.facilityID,
        tenantID: this.tenantID,
        invoiceTo: this.invoiceTo,
        firstInvoice: this.firstInvoice,
        intervalElectricity: this.intervalService,
        intervalService: this.intervalService,
        counterOld: this.counterOld,
        counterOldDate: this.counterOldDate,
        counterNew: this.counterNew,
        counterNewDate: this.firstInvoice,
        comment: this.comment,
      }

      if (newLoad.invoiceTo === "Verwaltung") {
        newLoad.invoiceTo = 1
      }
      else {
        newLoad.invoiceTo = 2
      }
      console.log(newLoad)

      this.addNewLoad(newLoad)
    },
    reset() {
      this.$refs.form.reset()
    },
  },
  computed: {
    ...mapGetters({
      allInvoices: 'allInvoices',
      allLoads: 'allLoads',
      allFacilities: 'allFacilities',
      allLoadTypes: 'allLoadTypes',
      allUsers: 'allUsers',
    }),
  },
  created() {
    this.fetchLoadTypes()
  }
}
</script>
