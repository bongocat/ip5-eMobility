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
        <v-icon small>
          mdi-pencil
        </v-icon>
      </v-btn>
    </template>
    <v-card style="padding: 20px">
      <v-card-title>
        <h1 class="headline">Load anpassen</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col>
              <v-text-field label="Load ID" v-model=loadID></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Anlagenname" v-model=anlageName></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Verwalter" v-model=anlageVermieter></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Mieter" v-model=anlageMieter></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Rechnung an" v-model=rechnungAn></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
            color="success"
            text
            @click="saveLoadChanges"
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
  name: "LoadEdit",
  props: {
    load: Object
  },
  data() {
    return {
      dialog: false,
      loadID: this.load.LoadID,
      anlageName: this.load.Anlage,
      anlageVermieter: this.load.Vermieter,
      anlageMieter: this.load.Mieter,
      rechnungAn: this.load['Rechnung an'],
      anlageID: this.load.AnlageID
    }
  },
  methods: {
    ...mapMutations({
      addNewLoad: "addNewLoad"
    }),
    saveLoadChanges() {
      this.dialog = false
      this.load.LoadID = this.loadID,
      this.load.AnlageID = this.anlageID,
      this.load.Anlage = this.anlageName,
      this.load.Vermieter = this.anlageVermieter,
      this.load.Mieter = this.anlageMieter,
      this.load['Rechnung an'] =  this.rechnungAn
    },
    reset() {
      this.loadNummer = this.load.LoadID
          this.anlageID = this.load.AnlageID,
          this.anlageName = this.load.Anlage,
          this.anlageVermieter = this.load.Vermieter,
          this.anlageMieter = this.load.Mieter,
          this.rechnungAn = this.load['Rechnung an']
    },
  },
  computed: {
    ...mapGetters({
      allLoads: 'allLoads',
    }),
    loadNummer() {
      return this.allLoads.length + 1
    },
  },
}
</script>
