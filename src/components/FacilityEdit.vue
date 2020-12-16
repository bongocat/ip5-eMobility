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
              <v-text-field label="Name" v-model=Anlage></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Immobilienverwaltung" v-model=Immobilienverwaltung></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Strasse" v-model=Strasse></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Hausnummer" v-model=Hausnummer></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Postleitzahl" v-model=PLZ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Land" v-model=Land></v-text-field>
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
  name: "FacilityEdit",
  props: {
    facility: Object
  },
  data() {
    return {
      dialog: false,
      facilityID: this.facility.AnlageID,
      Anlage: this.facility.Anlage,
      Immobilienverwaltung: this.facility.Immobilienverwaltung,
      Strasse: this.facility.Strasse,
      Hausnummer: this.facility.Hausnummer,
      Ort: this.facility.Ort,
      PLZ: this.facility.PLZ,
      Land: this.facility.Land,
      Count: this.facility.Count,
    }
  },
  methods: {
    ...mapMutations({
      addNewFacility: "addNewFacility"
    }),
    saveFacilityChanges() {
      this.dialog = false

      this.facility.AnlageID = this.facilityID,
          this.facility.Anlage = this.Anlage,
          this.facility.Immobilienverwaltung= this.Immobilienverwaltung,
          this.facility.Strasse= this.Strasse,
          this.facility.Hausnummer= this.Hausnummer,
          this.facility.PLZ= this.PLZ,
          this.facility.Ort= this.Ort,
          this.facility.Land= this.Land,
          this.facility.Count= this.Count
      },
    reset() {
      this.facilityID = this.facility.AnlageID
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
    ...mapGetters(['allFacilities']),
  },
}
</script>
