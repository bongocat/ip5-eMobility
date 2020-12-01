<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3" style="color: #96BF0D">
        megalog
      </h1>
    </v-card-title>

    <v-tabs
            v-model="tab"
            background-color="transparent"
            color="megalogPrimary"
            grow
    >
      <v-tab
              v-for="item in items"
              :key="item"
              :to = "item.link"
      >
        {{item.name}}
      </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      tab: null,
      items: [{name: 'Dashboard', link: '/dashboard'},
        {name: 'Rechnungen', link: '/invoices'},
        {name: 'Loads', link: '/loads'},
        {name: 'Anlagen', link: '/facilities'},
        {name: 'Nutzer', link: '/users'},
      ],
    }
  }
}
</script>

<style>
.nav-item {
  font-size: 30px;
}

.navbar .navbar-nav .nav-item:hover .nav-link {
  color: #96be0d;
}

.navbar .navbar-nav .nav-item.active .nav-link {
  color: #96be0d;
}
</style>
