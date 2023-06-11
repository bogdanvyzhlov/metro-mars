<template>
  <v-container fluid class="edit-user-container">
    <v-row justify="center" align="center" class="edit-user-row">
      <v-col cols="12" sm="8" md="6">
        <div class="text-h5 mb-8 text-center">Edit User</div>
        <v-form @submit.prevent="updateUser" class="edit-user-form">
          <v-text-field v-model="state.fullName" label="Full Name" :rules="fullNameRules" outlined></v-text-field>
          <v-text-field v-model="state.email" label="Email" :rules="emailRules" outlined></v-text-field>
          <v-select v-model="state.role" :items="roles" label="Role" outlined></v-select>
          <div class="text-center">
            <v-btn type="submit" color="primary" class="edit-user-button">Update</v-btn>
          </div>
          <v-snackbar v-model="state.snackbar" :timeout="5000" :color="state.error ? 'error' : 'success'">
            {{ state.error ? 'Error: ' + state.error : 'Update successful' }}
          </v-snackbar>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { ref, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const state = reactive({
  fullName: '',
  email: '',
  role: '',
  snackbar: false,
  error: null,
});

const fullNameRules = ref([
  (v: string) => !!v || 'Full Name is required',
]);

const emailRules = ref([
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
]);

const roles = ['admin', 'worker', 'technician', 'passenger'];

const updateUser = async () => {
  await authStore.updateUser(state.fullName, state.email, state.role, route.params.userId);
  await router.push({ name: 'users' });
};

onMounted(async () => {
  try {
    const user = await authStore.getUser(route.params.userId);
    state.fullName = user.fullName;
    state.email = user.email;
    state.role = user.role;
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
});
</script>


<style scoped>
.edit-user-container {
  height: 100vh;
  display: flex;
  align-items: center;
}

.edit-user-row {
  justify-content: center;
}

.edit-user-form {
  max-width: 400px;
  margin: 0 auto;
}

.edit-user-button {
  margin-top: 20px;
}
</style>

