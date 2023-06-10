<template>
  <v-app-bar flat color="primary" dark>
    <v-container class="fill-height d-flex align-center">
      <v-btn variant="flat" :to="{ name: 'homepage' }" class="mr-3">Home Page</v-btn>

      <v-spacer></v-spacer>

      <v-btn variant="flat" :to="{ name: 'bye-ticket' }" class="mr-2">Buy Ticket</v-btn>
      <v-btn variant="flat" :to="{ name: '' }" class="mr-2">Metro Map</v-btn>
      <v-btn variant="flat" :to="{ name: '' }" >Time Table</v-btn>
      <v-spacer></v-spacer>
      <LoggedUser></LoggedUser>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import LoggedUser from "@/components/LoggedUser.vue";
</script>

<style scoped>
.v-btn {
  font-weight: bold;
  text-transform: uppercase;
}

.v-btn:hover {
  background-color: #e0e0e0;
}
</style>


