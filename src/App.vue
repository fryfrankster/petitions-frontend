<template>
  <div id="app">
    <v-app>
      <Navbar></Navbar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>

import Navbar from "./components/Navbar";
export default {
  name: 'App',
  components: {Navbar},
  data: () => ({
    //
  }),
};
</script>
