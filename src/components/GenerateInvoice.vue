<template>
  <v-dialog
      v-model="dialog"
      max-width="1200px"
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
            <v-row>
               <v-col>
                   <v-text-field v-model = "invoiceNumber"
                                 label="Rechnungsnummer"></v-text-field>
               </v-col>
                <v-col>
                    <v-overflow-btn style="width: 400px"
                                    v-model = "due"
                                    dense
                                    editable
                                    :items='[10 + " Tage", 20 + " Tage", 30 + " Tage"]'
                                    label="Zahlungsfrist"
                                    item-value="number"
                    ></v-overflow-btn>
                </v-col>
                <v-col>
                    <v-text-field v-model = "comment"
                                  label="Kommentar"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-switch
                            v-model = "meterReadingOld"
                            color= "success"
                            label = 'Zählerstand alt'
                    >
                    </v-switch>
                </v-col>
                <v-col>
                    <v-switch
                            v-model = "meterReadingNew"
                            color= "success"
                            label = 'Zählerstand neu'
                    >
                    </v-switch>
                </v-col>
                <v-col>
                    <v-switch
                            color ="success"
                            v-model = "meterDifference"
                            label = "Differenz"
                            :disabled = meterDifferenceEnabled
                    >
                    </v-switch>
                </v-col>
            </v-row>
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
  data() {
    return {
        due: 0,
        comment: "",
      dialog: false,
      name: '',
      invoiceNumber: 0,
        meterReadingOld: false,
        meterReadingNew: false,
        meterDifference: false,
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    toCSV: function (item) {

      item.Generiert = "Ja"
        item.RechnungsNr = this.invoiceNumber
        item.ZählerstandAlt = this.meterReadingOld
        item.ZählerstandNeu = this.meterReadingNew
        item.Kommentar = this.comment

      const outputData = [Object.keys(item), Object.values(item)];

      console.log(outputData);
      let csvContent = "data:text/csv;charset=utf-8,";

      outputData.forEach(function (outputData) {
        let row = outputData.join(",");
        csvContent += row + ";\r\n";
      });

      let encodedUri = encodeURI(csvContent);

        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "megalog_invoice.csv");
        document.body.appendChild(link);
        link.click();
    }
  },
    computed: {
        meterDifferenceEnabled(){
            return !(this.meterReadingOld && this.meterReadingNew)
        }
    },
  watch: {},

}
</script>
