<template>
  <v-container fluid class="login-container">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-h5 mb-8 text-center">Login to Application</div>
        <v-form @submit.prevent="login" class="login-form">
          <v-text-field v-model="state.email" label="Username" :rules="usernameRules" outlined></v-text-field>
          <v-text-field v-model="state.password" label="Password" type="password" :rules="passwordRules" outlined></v-text-field>
          <div class="text-center">
          <v-btn type="submit" color="primary" class="login-button">Login</v-btn>

          </div>
          <div class="text-h7  text-center "  >Or</div>
          <div class="text-center">
            <v-btn type="submit" color="primary" class="login-button" :to="{name:'register'}">Click to register</v-btn>

          </div>
          <v-snackbar v-model="state.snackbar" :timeout="5000" :color="state.error ? 'error' : 'success'">
            {{ state.error ? 'Error: ' + state.error : 'Login successful' }}
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
  email: '',
  password: '',
  snackbar: false,
  error: null,
});

const usernameRules = computed(() => [
  (v: string) => !!v || 'Username is required',
]);

const passwordRules = computed(() => [
  (v: string) => !!v || 'Password is required',
  // doesn't make sense to check password length during login. it is just an example
  (v: string) => v.length >= 6 || 'Password must be at least 6 characters',
]);

const login = async () => {
  const { error } = await authStore.login(state.email, state.password);

  if (error) {
    state.error = error;
    state.snackbar = true;
  } else {
    router.push({ name: 'homepage' });
  }
};

</script>
<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  max-width: 400px;
  margin: 0 auto;
}

.login-button {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
