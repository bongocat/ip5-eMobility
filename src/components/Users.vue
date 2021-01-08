<template>
  <v-main>
    <v-container fluid>
      <v-card style="margin-top: 20px" :elevation="5">
        <v-card-title>
          <h3>Nutzer</h3>
          <v-badge :content="allUsers.length" :value="allUsers.length" color="success" inline/>
        </v-card-title>
        <v-card-text>
          <UserRegistration></UserRegistration>
          <v-data-table
              dense
              style="margin-top: 20px"
              :headers="userHeaders"
              :items="fillObjectKeys"
              class="elevation-1"
              :items-per-page="5"
              :item-class="itemRowBackground"
          >
            <template v-slot:item.actions="{item}">
              <UserEdit :user = "item" ></UserEdit>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import UserEdit from "./UserEdit";
import UserRegistration from "./UserRegistration";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Users",
  components: {UserRegistration, UserEdit},
  data() {
    return {
      showModal: false,
      selected: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      edit: false,
      userHeaders: [
        {text: 'Vorname', value: 'name'},
        {text: 'Nachname', value: 'familyName'},
        {text: 'Nutzertyp', value: 'userTypeFull'},
        {text: 'Firma', value: 'company'},
        {text: 'Strasse', value: 'street'},
        {text: 'Hausnummer', value: 'company'},
        {text: 'PLZ', value: 'areaCode' },
        {text: 'Land', value: 'country'},
        {text: 'Stadt', value: 'city'},
        {text: 'Festnetz', value: 'phone'},
        {text: 'Mobil', value: 'mobile'},
        {text: 'EMail', value: 'email'},
        {text: 'Rechnungsaddresse: Strasse', value: 'shippingStreet'},
        {text: "Hausnummer", value: 'shippingStreetNumber'},
        {text: 'PLZ', value: 'shippingAreaCode'},
        {text: 'Ort', value: 'shippingCity'},
        {text: 'Land', value: 'shippingCountry'},
        {text: 'Kommentar', value: 'comment', class: 'tableComment', width: "25%"},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
    };
  },
  methods: {
    ...mapActions(['fetchInvoices', 'fetchLoadTypes', 'fetchUsers', 'fetchInvoices', 'fetchFacilities', 'fetchLoads']),
    itemRowBackground: function (item) {
      return item.comment.length > 100 ? 'style-1' : 'style-2'
    },
  },
  computed: {
    ...mapGetters([
        'allUsers',
        'allFacilities',
    ]),
    fillObjectKeys: function(){

      var fullUsers = this.allUsers
      var fullUserType = {}

      fullUsers.forEach(function (item, index) {

        if (item.userType === 2){
          fullUserType = {userTypeFull: "Mieter"}
        }
        else {
          fullUserType = {userTypeFull: "Vermieter"}
        }

        Object.assign(item, fullUserType)
      });

      return fullUsers
    }
  },
  created() {
    this.fetchUsers();
  }
}
</script>

<style>

h1, h5 {
  vertical-align: center;
  clear:both;
}

.style-1 .text-start {
  overflow-y: auto;
  overflow-x: auto;
  text-overflow-ellipsis: true;
  white-space: nowrap;
  max-width: 300px;
  height: 300px;
}

.style-2 {
}

</style>
