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
                                    :items='[{text: "10 Tage", value: 10}, {text: "20 Tage", value: 20}, {text: "30 Tage", value: 30}]'
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
          <h1 class="subtitle-1">Rechnungsposition hinzufügen</h1>
          <v-row>
            <v-col>
              <v-text-field v-model = "extraPosDescription"
                            label="Beschreibung"></v-text-field>
            </v-col>
            <v-col>
            <v-text-field v-model = "extraPosCount"
                          label="Anzahl"
                          type="number"
                          min="0"
            ></v-text-field>
          </v-col>
            <v-col>
              <v-text-field v-model = "extraPosUnitPrice"
                            label="Preis Pro Einheit"
                            type="number"
                            step="0.01"
                            min="0.00"
                            suffix="CHF"
              >

              </v-text-field>
            </v-col>
            <v-col>
              <v-btn
                  color="success"
                  @click="newInvoicePosition"
                  fab
                  small
                  text
              >
                <v-icon small>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Beschreibung
                </th>
                <th class="text-left">
                  Anzahl
                </th>
                <th class="text-left">
                  Preis Pro Einheit
                </th>
                <th class="text-left">

              </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="item in invoicePositions"
                  :key="item.name"
              >
                <td>{{ item.extraPosDescription }}</td>
                <td>{{ item.extraPosCount }}</td>
                <td>{{ item.extraPosUnitPrice }}</td>
                <td>
                  <v-btn color="error"
                         text
                         @click="removeInvoicePosition(item)"
                         fab
                  small>
                    <v-icon small>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="success"
            text
            @click="dialog = false, exportToPDF(invoice)"
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

import { mapGetters}  from "vuex";
import { toPDF } from "../PDFGeneration/generatePDF"


export default {
  name: "GenerateInvoice",
  props: {
    invoice: Object
  },
  data() {
    return {
      extraPosDescription: "",
      extraPosCount: "",
      extraPosUnitPrice: "",
      invoicePositions: [],
        due: 10,
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
    newInvoicePosition(){
      this.invoicePositions.push({
        extraPosDescription: this.extraPosDescription,
        extraPosCount: this.extraPosCount,
        extraPosUnitPrice: this.extraPosUnitPrice
      })

      this.extraPosDescription = ""
      this.extraPosCount = ""
      this.extraPosUnitPrice = ""
    },
    removeInvoicePosition(position){
      this.invoicePositions.splice(this.invoicePositions.indexOf(position),1)
    },
    toCSV: function (item) {

        item.Generiert = "true"
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
    },
    exportToPDF: function (item) {
      item.Generiert = "true"
      item.RechnungsNr = this.invoiceNumber
      item.ZählerstandAlt = this.meterReadingOld
      item.ZählerstandNeu = this.meterReadingNew
      item.Kommentar = this.comment
      console.log(this.due)
      item['Zu Zahlen Bis'] = new Date(Date.now() + (this.due + 1) * 24*60*60*1000);
      console.log(item['Zu Zahlen Bis'].toString())
      toPDF(item,this.allUsers, this.allFacilities)
    }
  },
    computed: {
      ...mapGetters({
        upcomingInvoices: 'upcomingInvoices',
        paidInvoices: 'paidInvoices',
        openInvoices: 'openInvoices',
        allFacilities: 'allFacilities',
        allUsers: 'allUsers',
        allLoads: 'allLoads'
      }),
        meterDifferenceEnabled(){
            return !(this.meterReadingOld || this.meterReadingNew)
        }
    },
  watch: {},

}
</script>
