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
        <v-icon small>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card style="padding: 20px">
      <v-card-title>
        <h1 class="headline">Anlage anpassen</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col>
              <v-text-field label="Name" v-model=designation></v-text-field>
            </v-col>
            <v-col>
              <v-overflow-btn style="width: 400px"
                              v-model = "administratorID"
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
              <v-text-field label="Strasse" v-model=street></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Hausnummer" v-model=streetNumber></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Postleitzahl" v-model=areaCode></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Land" v-model=country></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Stadt" v-model=city></v-text-field>
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
            @click="saveFacilityChanges"
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
<!--        <v-btn-->
<!--            text-->
<!--            color="warning"-->
<!--            @click="reset"-->
<!--        >-->
<!--          Zurücksetzen-->
<!--        </v-btn>-->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

export default {
  name: "FacilityEdit",
  props: {
    facility: Object
  },
  data() {
    return {
      dialog: false,

      facilityID: this.facility.AnlageID,
      designation: this.facility.Bezeichnung,
      administratorID: this.facility.VerwalterID,
      street: this.facility.Strasse,
      streetNumber: this.facility.StrassenNr,
      areaCode: this.facility.PLZ,
      country: this.facility.Land,
      comment: this.facility.Kommentar,
      city: this.facility.Ort,
      active: this.facility.Aktiv,
    }
  },
  methods: {
    ...mapActions(['editFacility']),
    saveFacilityChanges() {

      this.dialog = false

      const updatedFacility = {
        facilityID: this.facilityID,
        designation: this.designation,
        administratorID: this.administratorID,
          street: this.street,
          streetNumber: this.streetNumber,
          areaCode: this.areaCode,
          city: this.city,
          country: this.country,
          active: this.active,
          comment: this.comment,
    }
      this.editFacility(updatedFacility)

      console.log(updatedFacility)
      },
    reset() {

      this.Anlage = this.facility.Anlage
          this.Immobilienverwaltung = this.facility.Immobilienverwaltung
          this.Strasse = this.facility.Strasse
          this.Hausnummer = this.facility.Hausnummer
          this.PLZ = this.facility.PLZ
          this.Ort = this.facility.Ort
          this.Land = this.facility.Land
          this.Count = this.facility.Count
    }
  },
  computed: {
    ...mapGetters(['allFacilities', 'allUsers']),
  },
}
</script>
