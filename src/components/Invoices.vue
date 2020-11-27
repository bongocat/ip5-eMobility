<!--<template>-->
<!--  <div class="container-lg">-->
<!--    <h1 id = invoices>Rechnungen</h1>-->
<!--    <div class = dataTable>-->
<!--      <v-data-table-->
<!--          :headers="columnNames"-->
<!--          :items="Invoices"-->
<!--          class="elevation-1">-->
<!--        <template v-slot:item.actions="{item}">-->
<!--          <v-btn @click="toCSV(item)">-->
<!--            <v-icon>mdi-file-download</v-icon>-->
<!--          </v-btn>-->
<!--        </template>-->
<!--      </v-data-table>-->
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
<!--    </div>-->
<!--  </div>-->

<!--</template>-->

<template>
  <div class="container-lg">
    <h1 id = invoices>Rechnungen</h1>
    <div class = dataTable>
      <v-data-table
          :headers="columnNames"
          :items="Invoices"
          class="elevation-1">
        <template v-slot:item.actions="{item}">
          <v-btn @click="toCSV(item)">
            <v-icon>mdi-file-download</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <v-card max-width="300">
        <v-list dense>
          <v-subheader>Rechnungsvorlagen</v-subheader>
          <v-list-item-group
              v-model="selectedItem"
              color="primary"
          >
            <v-list-item
                v-for="(vorlagen, i) in vorlagen"
                :key="i"
            >
              <v-list-item-content>
                <v-list-item-title v-text="vorlagen.text"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon v-text="vorlagen.icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
  </div>

</template>

<script>

import { mapGetters } from "vuex";

export default {
  name: "Invoices",
  data() {
    return {
      showModal: false,
      selected: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      vorlagen: [
        { text: 'Installation', icon: 'mdi-folder-open' },
        { text: 'Strom', icon: 'mdi-folder-open' },
        { text: 'Serviceabonnement', icon: 'mdi-folder-open' },
      ],
    };
  },
  methods: {
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
  computed: {
    columnNames() {
      var computedColumnnames  = []
      Object.keys(this.Invoices[0]).forEach(function (item) {
        computedColumnnames.push({text: item, value: item})
      })
      computedColumnnames.push({text: 'Actions', value: 'actions', sortable: false })
      return computedColumnnames
    },
    ...mapGetters({
      allInvoices: 'allInvoices',
    }),
  }
}

</script>

<style scoped>

h1, h5 {
  vertical-align: center;
  clear:both !important;
}

div.dataTable {
  max-width: 1800px;
}

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
  max-width: 800px;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 25px;
  padding: 20px;
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
