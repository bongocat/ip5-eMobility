<template>
  <v-dialog
      v-model="dialog">
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
        <h1 class="headline">{{ formTitle }}</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col>
              <v-text-field label="Vorname" v-model=userFirstName></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Nachname" v-model=userLastName></v-text-field>
            </v-col>
            <v-col>
              <v-select
                  v-model="userFormOfAddress"
                  :items='["Herr", "Frau"]'
                  label="Anrede"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                  v-model="userType"
                  :items='["Verwaltung", "Mieter"]'
                  label="Nutzer Typ"
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field label="Strasse" v-model=userStreet></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Hausnummer" v-model=userHouseNumber></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Postleitzahl" v-model=userZIPCode></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Ort" v-model=userLocation></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Land" v-model=userCountry></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Firma" v-model="userCompany"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Kommentar" v-model="userComment"></v-text-field>
            </v-col>
            <v-col>
              <v-checkbox
                  v-model="userActive"
                  label="Aktiv"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
            color="success"
            text
            @click="saveEditedUser"
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
  name: "UserEdit",
  props: {
    user: Object
  },
  data() {
    return {
      editedIndex: -1,
      dialog: false,
      userFirstName: this.user.Vorname,
      userLastName: this.user.Nachname,
      userFormOfAddress: this.user.Anrede,
      userType: this.user.NutzerTyp,
      userCompany: this.user.Firma,
      userStreet: this.user.Strasse,
      userHouseNumber: this.user.Hausnummer,
      userZIPCode: this.user.PLZ,
      userLocation: this.user.Ort,
      userCountry: this.user.Land,
      userActive: this.user.Aktiv,
      userComment: this.user.Kommentar,
    }
  },
  methods: {
    ...mapMutations({
      addNewUser: "addNewUser"
    }),
    saveEditedUser() {
      this.dialog = false

        this.user.NutzerID = this.userID,
            this.user.Vorname =  this.userFirstName,
          this.user.Nachname =  this.userLastName,
          this.user.NutzerTyp =  this.userType,
          this.user.Firma = this.userCompany,
          this.user.Anrede =  this.userFormOfAddress,
          this.user.Strasse =  this.userStreet,
          this.user.Hausnummer = this.userHouseNumber,
          this.user.PLZ = this.userZIPCode,
          this.user.Ort = this.userLocation,
          this.user.Land = this.userCountry,
          this.user.Mietet = "",
          this.user.Vermietet =  "",
          this.user.Aktiv =  this.userActive,
          this.user.Kommentar = this.userComment
    },
    reset() {
          this.userFirstName = this.user.Vorname,
          this.userLastName=  this.user.Nachname,
          this.userFormOfAddress= this.user.Anrede,
          this.userType=  this.user.NutzerTyp,
          this.userCompany= this.user.Firma,
          this.userStreet= this.user.Strasse,
          this.userHouseNumber =  this.user.Hausnummer,
          this.userZIPCode= this.user.PLZ,
          this.userLocation= this.user.Ort,
          this.userCountry = this.user.Land,
          this.userActive= this.user.Aktiv,
          this.userComment= this.user.Kommentar
    },
  },
  computed: {
    ...mapGetters(['allUsers']),
    userID() {
      return this.allUsers.length + 1
    },
    formTitle () {
      return 'Nutzer bearbeiten'
    },
  }
}
</script>
