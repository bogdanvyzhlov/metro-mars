<template>
  <div v-if="authStore.user != null">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-avatar color="info" v-bind="props" style="cursor: pointer;">
          <v-icon icon="mdi-account-circle"></v-icon>
        </v-avatar>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>Logged in as <strong>{{ authStore.user.fullName }}</strong></v-list-item-title>
        </v-list-item>
        <v-list-item v-if="authStore.user.role === 'admin'">
          <v-btn variant="plain" :to="{name:'users'}">Update users</v-btn>
        </v-list-item>
        <v-list-item v-if="authStore.user.role === 'admin'">
          <v-btn variant="plain" :to="{name:'statistics'}">Statistics</v-btn>
        </v-list-item>
        <v-list-item v-if="authStore.user.role === 'passenger'">
          <v-btn variant="plain" :to="{name:'my-tickets'}">My tickets</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn variant="plain" :to="{name:'about-me'}">About me</v-btn>
        </v-list-item>
        <v-list-item v-if="authStore.user.role === 'technician'">
          <v-btn variant="plain" :to="{name:'my-stations'}">My Stations</v-btn>
        </v-list-item>

        <v-list-item @click="handleLogout">
          <v-list-item-title>
            <v-icon icon="mdi-logout"></v-icon>
            Logout
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push({ name: 'homepage' });
};
</script>

