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
        Neuen Nutzer erfassen
      </v-btn>
    </template>
    <v-card style="padding: 20px">
      <v-card-title>
        <h1 class="headline">Nutzer erfassen</h1>
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
            @click="createNewUserFromForm"
        >
          Nutzer erfassen
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
  name: "UserRegistration",
  data() {
    return {
      dialog: false,
      userFirstName: "",
      userLastName: "",
      userFormOfAddress: "",
      userType: "",
      userCompany: "",
      userStreet: "",
      userHouseNumber: "",
      userZIPCode: "",
      userLocation: "",
      userCountry: "",
      userActive: "",
      userComment: "",
    }
  },
  methods: {
    ...mapMutations({
      addNewUser: "addNewUser"
    }),
    createNewUserFromForm() {
      this.dialog = false

      const newUser = {
        NutzerID: this.userID,
        Vorname: this.userFirstName,
        Nachname: this.userLastName,
        NutzerTyp: this.userType,
        Firma: this.userCompany,
        Anrede: this.userFormOfAddress,
        Strasse: this.userStreet,
        Hausnummer: this.userHouseNumber,
        PLZ: this.userZIPCode,
        Ort: this.userLocation,
        Land: this.userCountry,
        Mietet: "",
        Vermietet: "",
        Aktiv: this.userActive,
        Kommentar: this.userComment,
      }
      this.addNewUser(newUser)
    },
    reset() {
      this.$refs.form.reset()
    },
  },
  computed: {
    ...mapGetters(['allUsers']),
    userID() {
      return this.allUsers.length + 1
    },
  }
}
</script>
