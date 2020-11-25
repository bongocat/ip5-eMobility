<template>
    <v-card style="padding: 20px">
        <v-card-title>
            <h1>Rechnung generieren</h1>
        </v-card-title>
        <v-form
                ref="form"
                v-model="valid"
                lazy-validation
        >
            <v-text-field
                    v-model="name"
                    :counter="10"
                    :label = invoice.ID
                    required
            ></v-text-field>

            <v-text-field
                    v-model="invoiceNumber"
                    label="E-mail"
                    required
            ></v-text-field>
            <v-card-actions>
                <v-btn
                        color="error"
                        class="mr-4"
                        @click="reset"
                >
                    Reset Form
                </v-btn>
                <v-btn
                        color="warning"
                        class="mr-4"
                        @click="generateInvoice"
                >
                    Rechnung generieren
                </v-btn>
                <v-btn
                        color="error"
                        class="mr-4"
                        @click="generateInvoice"
                >
                    Rechnung generieren
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>

    export default {
        name: "GenerateInvoice",
        props: {
            invoice: Object
        },
        data(){
            return{
                name: '',
                invoiceNumber: 0
            }
        },
        methods: {
            reset () {
                this.$refs.form.reset()
            },
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
