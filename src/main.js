import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import MegalogDashboard from "./components/Dashboard";
import Invoices from "./components/Invoices";
import Loads from "./components/Loads";
import Facilities from "./components/Facilities";
import Users from "./components/Users";

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  {path: '/dashboard', component: MegalogDashboard, name: 'Dashboard'},
  {path: '/invoices', component: Invoices, name: "Rechnungen"},
  {path: '/loads', component: Loads, name: 'Loads'},
  {path: '/facilities', component: Facilities, name: "Anlagen"},
  {path: '/users', component: Users, name: "Nutzer"},
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
