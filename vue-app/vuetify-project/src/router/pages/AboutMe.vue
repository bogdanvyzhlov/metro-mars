<template>
  <div class="my-about-container">
    <h2 class="text-center">About me</h2>
    <v-card v-if="user" class="pa-4">
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <strong>Full name:</strong> {{ user.fullName }}
          </v-col>
          <v-col cols="6">
            <strong>Email:</strong> {{ user.email }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <strong>Role:</strong> {{ user.role }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-alert v-else type="info" outlined>No user found</v-alert>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const user = computed(() => authStore.user);

</script>

<style>
.my-about-container{
  width: 100%;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}
</style>

