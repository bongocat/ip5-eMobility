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
        Neue Anlage erfassen
      </v-btn>
    </template>
    <v-card style="padding: 20px">
      <v-card-title>
        <h1 class="headline">Anlage erfassen</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col>
              <v-text-field label="Name" v-model=facilityName></v-text-field>
            </v-col>
            <v-col>
              <v-overflow-btn style="width: 400px"
                              v-model = "administrationID"
                              dense
                              editable
                              :items="allUsers"
                              label="Rechnung an"
                              hint="Rechnung an"
                              persistent-hint
                              :item-text = "item => item.NutzerID + ' - ' + item.Vorname +'  '+ item.Nachname"
                              :item-value= "item => item"
              ></v-overflow-btn>
            </v-col>
            <v-col>
              <v-text-field label="Strasse" v-model=street></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Hausnummer" v-model=streetNumber></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Ort" v-model=city></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Postleitzahl" v-model=ZIPCode></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Land" v-model=country></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Kommentar" v-model=comment></v-text-field>
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
            @click="createNewFacilityFromForm"
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
import {mapActions, mapMutations} from 'vuex'
import {mapGetters} from 'vuex'

export default {
  name: "FacilityRegistration",
  data() {
    return {
      dialog: false,

      facilityName: "",
      administrationID: "",
      street: "",
      streetNumber: "",
      ZIPCode: "",
      country: "",
      comment: "",
      city: "",
      active: 0,
    }
  },
  methods: {
    ...mapActions(['addNewFacility', 'fetchFacilities']),
    createNewFacilityFromForm() {
      this.dialog = false

      const newFacility = {
        administratorID: this.administrationID.NutzerID,
        designation: this.facilityName,
        city: this.city,
        street: this.street,
        streetNumber: this.streetNumber,
        areaCode: this.ZIPCode,
        country: this.country,
        comment: this.comment,
        active: this.active
      }

      this.addNewFacility(newFacility)
      this.fetchFacilities()
    },
    reset() {
      this.$refs.form.reset()
    },
  },
  computed: {
    ...mapGetters(['allFacilities', "allUsers"]),
  },
}
</script>
