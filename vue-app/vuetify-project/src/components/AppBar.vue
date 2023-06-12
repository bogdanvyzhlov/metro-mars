<template>
  <v-app-bar flat color="primary" dark>
    <v-container class="fill-height d-flex align-center">
      <v-btn variant="flat" :to="{ name: 'homepage' }" class="mr-3">Home Page</v-btn>

      <v-spacer></v-spacer>

      <v-btn variant="flat" :to="{ name: 'bye-ticket' }" class="mr-2">Buy Ticket</v-btn>
      <v-btn variant="flat" :to="{ name: 'map' }" class="mr-2">Metro Map</v-btn>
      <v-btn variant="flat" :to="{ name: '' }" >Time Table</v-btn>
      <v-spacer></v-spacer>

      <LoggedUser></LoggedUser>
      <v-btn v-if="!isAuthenticated" variant="flat" :to="{ name: 'login' }" >Login</v-btn>

    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import LoggedUser from "@/components/LoggedUser.vue";
import {computed} from "vue";
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const isAuthenticated = computed(() => !!authStore.user);
</script>

<style scoped>


.v-btn:hover {
  background-color: #e0e0e0;
}
</style>


