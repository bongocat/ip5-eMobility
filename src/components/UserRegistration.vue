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
              <v-text-field label="Vorname" v-model=name></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Nachname" v-model=familyName></v-text-field>
            </v-col>
            <v-col>
              <v-select
                  v-model="salutation"
                  :items='["Herr", "Frau"]'
                  label="Anrede"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                  v-model="userTypeID"
                  :items='[{text: "Vermieter", value: 1}, {text: "Mieter", value: 2}]'
                  label="Nutzer Typ"
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field label="Strasse" v-model=street></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Hausnummer" v-model=streetNumber></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Handynummer" v-model="mobile"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Postleitzahl" v-model=areaCode></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Ort" v-model=city></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Land" v-model=country></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Telefonnummer" v-model="phone"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="E-Mail" v-model="email"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Firma" v-model="company"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Kommentar" v-model="comment"></v-text-field>
            </v-col>
            <v-col>
              <v-checkbox
                  v-model="active"
                  label="Aktiv"
                  color="success"
              ></v-checkbox>
            </v-col>
            <v-col>
                <v-switch v-model="invoiceToShippingAdress"
                          label="Abweichende Rechnungsadresse"
                          color="success"
                >
                </v-switch>
            </v-col>
          </v-row>
          <v-row v-if=invoiceToShippingAdress>
            <v-col>
              <v-text-field label="Strasse" v-model=shippingStreet></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Hausnummer" v-model=shippingStreetNumber></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Postleitzahl" v-model=shippingAreaCode></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Ort" v-model=shippingCity></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Land" v-model=shippingCountry></v-text-field>
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
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "UserRegistration",
  data() {
    return {
      editedIndex: -1,
      dialog: false,
      name: "",
      familyName: "",
      salutation: "",
      userTypeID: "",
      company: "",
      street: "",
      streetNumber: "",
      areaCode: "",
      city: "",
      country: "",
      active: "",
      comment: "",
      shippingStreet: "",
      shippingStreetNumber:"",
      shippingAreaCode: "",
      shippingCity: "",
      shippingCountry: "",
      phone: "",
      mobile: "",
      email: "",
      invoiceToShippingAdress: 1,
    }
  },
  methods: {
    ...mapActions(['addNewUser', 'fetchUsers']),
    createNewUserFromForm() {
      this.dialog = false

      const newUser = {

        name: this.name,
        familyName: this.familyName,
        userTypeID: this.userTypeID,
        company: this.company,
        salutation: this.salutation,
        street: this.street,
        streetNumber: this.streetNumber,
        areaCode: this.areaCode,
        city: this.city,
        country: this.country,
        active: this.active,
        comment: this.comment,

        phone: this.phone,
        mobile: this.mobile,
        email: this.email,

        shippingStreet: this.shippingStreet,
        shippingStreetNumber: this.shippingStreetNumber,
        shippingAreaCode: this.shippingAreaCode,
        shippingCity: this.shippingCity,
        shippingCountry: this.shippingCountry,

        invoiceToShippingAdress: this.invoiceToShippingAdress,
      }
      this.addNewUser(newUser)
      this.fetchUsers()
    },
    reset() {
      this.$refs.form.reset()
    },
  },
  computed: {
    ...mapGetters(['allUsers']),
  }
}
</script>
