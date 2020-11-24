<template>
  <div>
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";

export default {
  name: 'App',

  components: {
    Navigation,
  },

  data: () => ({
    //
  }),
};
</script>
