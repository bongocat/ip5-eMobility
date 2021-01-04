<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          x-small
          color="success"
          dark
          v-bind="attrs"
          v-on="on"
          @click="console.log('loadID: ', this.loadID)"
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
                              label="Rechnung an"
                              hint="Rechnung an"
                              persistent-hint
                              :item-text = "item => item.tenantID + ' - ' + item.name +'  '+ item.familyName"
                              :item-value= "item => item.tenantID"
              ></v-overflow-btn>
            </v-col>
            <v-col>
              <v-select
                      v-model="invoiceTo"
                      :items="[{text: 'Mieter', value: 0}, {text: 'Vermieter', value: 1}]"
                      label="Rechnung an"
                      hint="Rechnung an"
                      persistent-hint
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
              <v-select
                      v-model="intervalService"
                      :items="[{text: 'monatlich', value: 0}, {text: 'vierteljährlich', value: 1}, {text: 'halbjährlich', value: 2}, {text: 'jährlich', value: 3}]"
                      label="Zahlunsintervall"
                      hint="Rechnungsintervall Strom"
                      persistent-hint
                      single-line
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                      v-model="intervalElectricity"
                      :items="[{text: 'monatlich', value: 0}, {text: 'vierteljährlich', value: 1}, {text: 'halbjährlich', value: 2}, {text: 'jährlich', value: 3}]"
                      label="Zahlunsintervall"
                      hint="Rechnungsintervall Service"
                      persistent-hint
                      single-line
              ></v-select>
            </v-col>
            <v-col>
              <v-overflow-btn style="min-width: 250px"
                              v-model="loadTypeID"
                              dense
                              editable
                              :items="allLoadTypes"
                              label="Load Typ"
                              hint="Load Typ"
                              persistent-hint
                              :item-text = "item => item.loadTypeID + ' - ' + item.designation"
                              :item-value= "item => item.loadTypeID"
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

      loadID: this.load.loadID,
      loadTypeID: this.load.loadTypeID,
      facilityID: this.load.facilityID,
      tenantID: this.load.tenantID,
      invoiceTo: this.load.invoiceTo,
      firstInvoice: new Date (this.load.firstInvoice).toISOString().substr(0,10),
      intervalElectricity: this.load.intervalElectricity,
      intervalService: this.load.intervalService,
      counterOld: this.load.counterOld,
      counterOldDate: new Date (this.load.counterOldDate).toISOString().substr(0,10),
      counterNew: this.load.counterNew,
      counterNewDate: new Date (this.load.counterNewDate).toISOString().substr(0,10),
      active: this.load.active,
      comment: this.load.comment

    }
  },
  methods: {
    saveLoadChanges() {
      this.dialog = false

      const newLoad = {

        loadID: this.loadID,
        loadTypeID: this.loadTypeID,
        facilityID: this.facilityID,
        tenantID: this.tenantID,
        invoiceTo: this.invoiceTo,
        firstInvoice: new Date (this.firstInvoice),
        intervalService: this.intervalService,
        intervalElectricity: this.intervalElectricity,
        counterOld: this.counterOld,
        counterOldDate: new Date (this.counterOldDate),
        counterNew: this.counterNew,
        counterNewDate: new Date (this.counterNewDate),
        active: this.active,
        comment: this.comment
      }

      console.log(newLoad)

      this.editLoad(newLoad)

    },
    reset() {
      this.loadTypeID = this.load.loadTypeID
      this.facilityID = this.load.facilityID
      this.tenantID = this.load.tenantID
      this.invoiceTo = this.load.invoiceTo
      this.firstInvoice = this.load.firstInvoice
      this.intervalService = this.load.intervalService
      this.intervalElectricity = this.load.intervalElectricity
      this.counterOld = this.load.counterOld
      this.counterOldDate = new Date (this.load.counterOldDate)
      this.counterNew = this.load.counterNew
      this.counterNewDate = new Date (this.load.counterNewDate)
      this.active = this.load.active
      this.comment = this.load.comment
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
