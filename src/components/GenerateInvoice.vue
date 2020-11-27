<template>
        <v-dialog
                v-model="dialog"
                width="600px"

        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        x-small
                        color="success"
                        dark
                        v-bind="attrs"
                        v-on="on"
                >
                    Rechnung generieren
                </v-btn>
            </template>
            <v-card style="padding: 20px">
                <v-card-title>
                    <h1 class="headline">Rechnung generieren</h1>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field  label="Rechnungsnummer"></v-text-field>
                                <v-overflow-btn style="width: 400px"
                                                dense
                                                editable
                                                :items='[10 + " Tage", 20 + " Tage", 30 + " Tage"]'
                                                label="Zahlungsfrist"
                                                item-value="number"
                                ></v-overflow-btn>
                        <v-text-field  label="Kommentar"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="success"
                            text
                            @click="dialog = false, toCSV(invoice)"
                    >
                        Generieren
                    </v-btn>
                    <v-btn
                            color="error"
                            text
                            @click="dialog = false"
                    >
                        Schliessen
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
</template>

<script>

    export default {
        name: "GenerateInvoice",
        props: {
            invoice: Object
        },
        data(){
            return{
                dialog: false,
                name: '',
                invoiceNumber: 0
            }
        },
        methods: {
            reset () {
                this.$refs.form.reset()
            },
            toCSV: function(item) {

              const outputData = [Object.keys(item), Object.values(item)];

              console.log(outputData);
              let csvContent = "data:text/csv;charset=utf-8,";

              outputData.forEach(function(outputData) {
                let row = outputData.join(",");
                csvContent += row + ";\r\n";
              });

              let encodedUri = encodeURI(csvContent);
              window.open(encodedUri);
            }
        },
        watch: {
        }
    }

</script>

<style scoped>

    .modal-overlay{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 98;
        background-color: rgba(3, 12, 3, 0.11);
    }

    .modalPresentation{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99;
        width: 100%;
        max-width: 400px;
        background-color: rgba(150, 190, 13, 0.85);
    }

    .fade-enter-active, .fade-leave-active{
        transition: opacity 0.5s;
    }

    .fade-enter, .fade-leave-to{
        opacity: 0;
    }

    .slide-enter-active, .slide-leave-active{
        transition: opacity 0.5s;
    }

    .slide-enter, .slide-leave-to{
        opacity: 0;
        transform: translateY(-50%) translateX(100vw);
    }
</style>
