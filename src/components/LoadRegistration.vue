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
                Neue Load erfassen
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
                            <v-text-field label="AnlageID" v-model=AnlageID></v-text-field>
                        </v-col>
                      <v-col>
                        <v-text-field label="Anlagenname" v-model=Anlage></v-text-field>
                      </v-col>
                        <v-col>
                            <v-text-field label="Verwalter" v-model=Vermieter></v-text-field>
                        </v-col>
                      <v-col>
                        <v-text-field label="Mieter" v-model=Mieter></v-text-field>
                      </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn
                        color="success"
                        text
                        @click="createNewLoadFromForm"
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
        name: "LoadRegistration",
        data() {
            return {
                dialog: false,
                AnlageID: "",
                Anlage: "",
                Vermieter: "",
                Mieter: "",
                ['Rechnung an']: "",
            }
        },
        methods: {
            ...mapMutations({
                addNewLoad: "addNewLoad"
            }),

            createNewLoadFromForm() {
                this.dialog = false

                const newLoad = {
                    AnlageID: this.LoadID,
                    Anlage: this.Anlage,
                    Vermieter: this.Vermieter,
                    Mieter: this.Mieter,
                    ['Rechnung an']: this.Vermieter,
                }
                this.addNewLoad(newLoad)
            },
            reset() {
                this.$refs.form.reset()
            },
        },

        computed: {
            ...mapGetters(['allLoads']),
            LoadID() {
                return this.allLoads().length + 1
            },
        }
    }

</script>

<style scoped>

</style>
