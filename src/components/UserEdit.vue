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
        <h1 class="headline">Nutzer bearbeiten</h1>
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
import {mapMutations, mapActions, mapGetters} from 'vuex'

export default {
  name: "UserEdit",
  props: {
    user: Object
  },
  data() {
    return {
      editedIndex: -1,
      dialog: false,

      userID: this.user.userID,
      name: this.user.name,
      familyName: this.user.familyName,
      userTypeID: this.user.userTypeID,
      company: this.user.company,
      salutation: this.user.salutation,
      street: this.user.street,
      streetNumber: this.user.streetNumber,
      areaCode: this.user.areaCode,
      city: this.user.city,
      country: this.user.country,
      active: this.user.active,
      comment: this.user.comment,

      phone: this.user.phone,
      mobile: this.user.mobile,
      email: this.user.email,

      shippingStreet: this.user.shippingStreet,
      shippingStreetNumber: this.user.shippingStreetNumber,
      shippingAreaCode: this.user.shippingAreaCode,
      shippingCity: this.user.shippingCity,
      shippingCountry: this.user.shippingCountry,

      invoiceToShippingAdress: this.invoiceToShippingAdress,
    }
  },
  methods: {
    ...mapMutations({
      addNewUser: "addNewUser"
    }),
    ...mapActions(['editUser']),

    saveEditedUser() {
      this.dialog = false

          const updatedUser = {
            userID: this.user.userID,
            userTypeID: this.userTypeID,
            name: this.name,
            familyName: this.familyName,
            company :this.company,
            salutation :  this.salutation,
            street:  this.street,
            streetNumber :  this.streetNumber,
            areaCode : this.areaCode,
            city :  this.city,
            country :  this.country,
            active :  this.active,
            comment :  this.comment,
            phone : this.phone,
            email : this.email,
            mobile : this.mobile,
            shippingStreetNumber:  this.shippingStreetNumber,
            shippingCountry :  this.shippingCountry,
            shippingAreaCode : this.shippingAreaCode,
            shippingStreet :  this.shippingStreet,
            shippingCity : this.shippingCity,
            invoiceToShippingAdress:  this.invoiceToShippingAdress
          }
      this.editUser(updatedUser)
    },
  },
  computed: {
    ...mapGetters({
      upcomingInvoices: 'upcomingInvoices',
      paidInvoices: 'paidInvoices',
      openInvoices: 'openInvoices',
      sentInvoices: 'sentInvoices',
      allFacilities: 'allFacilities',
      allUsers: 'allUsers',
      allLoads: 'allLoads',
      allLoadTypes: 'allLoadTypes',
      allInvoicePositions: 'allInvoicePositions',
      allInvoices: 'allInvoices',
      allInvoiceTypes: 'allInvoiceTypes'
    }),
  },
    created() {
      this.fetchInvoicePositions()
      this.fetchUsers()
      this.fetchFacilities()
      this.fetchLoadTypes()
      this.fetchInvoices()
      this.fetchInvoiceTypes()
      this.fetchLoads()
    },
}
</script>
