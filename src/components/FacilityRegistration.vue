<template>
    <v-dialog
            v-model="dialog"

    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                    x-small
                    color="success"
                    dark
                    v-bind="attrs"
                    v-on="on"
            >
                Neue Anlage erfassen
            </v-btn>
        </template>
        <v-card style="padding: 20px">
            <v-card-title>
                <h1 class="headline">Anlage erfassen</h1>
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
                        @click="createNewFacilityFromForm"
                >
                    Anlage erfassen
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
        name: "FacilityRegistration",
        data() {
            return {
                dialog: false,
                Anlage: "",
                Immobilienverwaltung: "",
                Strasse: "",
                Hausnummer: "",
                PLZ: "",
                Land: "",
                Count: 0,
            }
        },
        methods: {
            ...mapMutations({
                addNewFacility: "addNewFacility"
            }),
            createNewFacilityFromForm() {
                this.dialog = false

                const newFacility = {
                    AnlageID: this.facilityID,
                    Anlage: this.Anlage,
                    Immobilienverwaltung: this.Immobilienverwaltung,
                    Strasse: this.Strasse,
                    Hausnummer: this.Hausnummer,
                    PLZ: this.PLZ,
                    Land: this.Land,
                    Count: this.Count,
                }
                this.addNewFacility(newFacility)
            },
            reset() {
                this.$refs.form.reset()
            },
        },

        computed: {
            ...mapGetters(['allFacilities']),
            facilityID() {
                return this.allFacilities.length + 1
            },
        }
    }

</script>

<style scoped>

</style>