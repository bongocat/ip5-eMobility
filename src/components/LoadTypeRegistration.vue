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
        Neuen Loadtyp erfassen
      </v-btn>
    </template>
    <v-card style="padding: 20px">
      <v-card-title>
        <h1 class="headline">Load erfassen</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
            <v-col>
              <v-text-field label="Name" v-model=loadTypeName></v-text-field>
            </v-col>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
            color="success"
            text
            @click="createNewLoadFromForm"
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
import {mapMutations} from 'vuex'
import {mapGetters} from 'vuex'

export default {
  name: "LoadTypeRegistration",
  data() {
    return {
      dialog: false,
      loadTypeName: "",
    }
  },
  methods: {
    ...mapMutations({
      addNewLoad: "addNewLoad"
    }),
    createNewLoadFromForm() {
      this.dialog = false
    },
    reset() {
      this.$refs.form.reset()
    },
  },
  computed: {
    ...mapGetters({
      allLoads: 'allLoads',
    }),
  },
}
</script>
