<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/invoices" class="nav-link">Rechnungen</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/loads" class="nav-link">Loads</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/facilities" class="nav-link">Anlagen</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/users" class="nav-link">Nutzer</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navigation"
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
