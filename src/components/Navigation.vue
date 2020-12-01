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
<!--<template>-->
<!--  <div>-->
<!--    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">-->
<!--      <div class="collapse navbar-collapse" id="navbarNavDropdown">-->
<!--        <ul class="navbar-nav">-->
<!--          <li class="nav-item">-->
<!--            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <router-link to="/invoices" class="nav-link">Rechnungen</router-link>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <router-link to="/loads" class="nav-link">Loads</router-link>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <router-link to="/facilities" class="nav-link">Anlagen</router-link>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <router-link to="/users" class="nav-link">Nutzer</router-link>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
<!--    </nav>-->
<!--  </div>-->
<!--</template>-->

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
