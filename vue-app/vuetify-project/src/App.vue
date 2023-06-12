<template>
  <v-app>
    <div class="background-container">
    <AppBar />



    <v-main>
      <v-container class="py-10">
        <router-view />
      </v-container>
    </v-main>
    </div>
  </v-app>
</template>

<script lang="ts" setup>
import AppBar from "@/components/AppBar.vue";
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

onMounted(() => {
  authStore.reloadUser();
});
</script>
<style>
.background-container {
  background-image: url('@/assets/back3.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}
</style>
