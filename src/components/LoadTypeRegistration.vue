<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          x-small
          color="success"
          dark
          v-bind="attrs"
          v-on="on"
          style="margin-left: 10px"
      >
        Neuen Loadtyp erfassen
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
              <v-text-field label="Name" v-model=designation></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Preis Serviceabo Aktiv" v-model=standardPriceWhenActive
                            type="number"
                            step="0.01"
                            min="0.00"
                            suffix="CHF"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Preis Serviceabo Inaktiv" v-model=standardPriceWhenInactive
                            type="number"
                            step="0.01"
                            min="0.00"
                            suffix="CHF"></v-text-field>
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
            @click="createNewLoadTypeFromForm"
        >
          Loadtyp erfassen
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
import {mapMutations, mapActions} from 'vuex'
import {mapGetters} from 'vuex'

export default {
  name: "LoadTypeRegistration",
  data() {
    return {
      dialog: false,
      loadTypeID: "",
      designation: "",
      standardPriceWhenActive: "",
      standardPriceWhenInactive: "1.0",
      active: 1,
      comment: ""
    }
  },
  methods: {
    ...mapMutations({
      addNewLoad: "addNewLoad"
    }),
    ...mapActions(['fetchLoadTypes', 'addNewLoad', 'addNewLoadType']),
    createNewLoadTypeFromForm() {
      this.dialog = false

      const newLoadType = {
        designation: this.designation,
        standardPriceWhenActive: this.standardPriceWhenActive,
        standardPriceWhenInactive: this.standardPriceWhenInactive,
        active: this.active,
        comment: this.comment,
      }

      this.addNewLoadType(newLoadType)

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
}

</script>
