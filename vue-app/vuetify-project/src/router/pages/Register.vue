<template>
  <v-container fluid class="register-container">
    <v-row justify="center" align="center" class="register-row">
      <v-col cols="12" sm="8" md="6">
        <div class="text-h5 mb-8 text-center">Register a New Account</div>
        <v-form @submit.prevent="register" class="register-form">
          <v-text-field v-model="state.fullName" label="Full Name" :rules="fullNameRules" outlined></v-text-field>
          <v-text-field v-model="state.email" label="Email" :rules="emailRules" outlined></v-text-field>
          <v-text-field v-model="state.password" label="Password" type="password" :rules="passwordRules" outlined></v-text-field>
          <div class="text-center">
          <v-btn type="submit" color="primary" class="register-button" >Register</v-btn>
          </div>
          <v-snackbar v-model="state.snackbar" :timeout="5000" :color="state.error ? 'error' : 'success'">
            {{ state.error ? 'Error: ' + state.error : 'Registration successful' }}
          </v-snackbar>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const state = reactive({
  fullName: '',
  email: '',
  password: '',
  snackbar: false,
  error: null,
});

const fullNameRules = computed(() => [
  (v: string) => !!v || 'Full Name is required',
]);

const emailRules = computed(() => [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
]);

const passwordRules = computed(() => [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 6 || 'Password must be at least 6 characters',
]);

const register = async () => {
  const { error } = await authStore.registerUser(state.fullName, state.email, state.password);

  if (error) {
    state.error = error;
    state.snackbar = true;
  } else {
    await router.push({ name: 'homepage' });
  }
};

</script>

<style scoped>
.register-container {
  height: 100vh;
  display: flex;
  align-items: center;
}

.register-row {
  justify-content: center;
}

.register-form {
  max-width: 400px;
  margin: 0 auto;
}

.register-button {
  margin-top: 20px;
}
</style>
