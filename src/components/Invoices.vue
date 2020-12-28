<template>
  <v-main>
    <v-container fluid>
      <v-card style="margin-top: 20px" :elevation="5">
        <v-card-title>
          <h3>Rechnungen</h3>
          <v-badge :content="this.allInvoices.length" :value="this.allInvoices.length" color="success" inline/>
        </v-card-title>
        <v-card-text>
          <InvoiceExceptional></InvoiceExceptional>
          <v-data-table
              dense
              :headers="columnNames"
              :items="allInvoices"
              class="elevation-1"
              :items-per-page="15"
          style="margin-top: 20px">
            <template v-slot:item.actions="{item}">
              <v-btn
                  text
                  color="success"
                  @click="exportToPDF(item)"
              >
                <v-icon>mdi-download</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
<!--      <v-card max-width="300">-->
<!--        <v-list dense>-->
<!--          <v-subheader>Rechnungsvorlagen</v-subheader>-->
<!--          <v-list-item-group-->
<!--              v-model="selectedItem"-->
<!--              color="primary"-->
<!--          >-->
<!--            <v-list-item-->
<!--                v-for="(vorlagen, i) in vorlagen"-->
<!--                :key="i"-->
<!--            >-->
<!--              <v-list-item-content>-->
<!--                <v-list-item-title v-text="vorlagen.text"></v-list-item-title>-->
<!--              </v-list-item-content>-->
<!--              <v-list-item-icon>-->
<!--                <v-icon v-text="vorlagen.icon"></v-icon>-->
<!--              </v-list-item-icon>-->
<!--            </v-list-item>-->
<!--          </v-list-item-group>-->
<!--        </v-list>-->
<!--      </v-card>-->
    </v-container>
  </v-main>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import InvoiceExceptional from "../components/InvoiceExceptional";
import {invoiceFromDatabase} from "@/PDFGeneration/generatePDF";

export default {
  name: "Invoices",
  components: {InvoiceExceptional},
  data() {
    return {
      selected: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      dialog: false,
      dialogDelete: false,
      vorlagen: [
        {text: 'Installation', icon: 'mdi-folder-open'},
        {text: 'Strom', icon: 'mdi-folder-open'},
        {text: 'Serviceabonnement', icon: 'mdi-folder-open'},
      ],
    };
  },
  methods: {
    exportToPDF: function (item) {
      invoiceFromDatabase(item)
    }
  },
  computed: {
    columnNames() {
      var computedColumnnames = []
      Object.keys(this.allInvoices[0]).forEach(function (item) {
        computedColumnnames.push({text: item, value: item})
      })
      computedColumnnames.push({text: 'Actions', value: 'actions', sortable: false})
      return computedColumnnames
    },
    ...mapGetters({
      allInvoices: 'allInvoices',
    }),
    ...mapActions(['fetchInvoices', 'fetchLoadTypes']),
  },
  created() {
    this.fetchLoadTypes()
    this.fetchLoads()
    this.fetchUsers()
    this.fetchFacilities()
    this.fetchInvoices()
  }
}
</script>

<style scoped>
h1, h5 {
  vertical-align: center;
  clear: both
}
</style>
