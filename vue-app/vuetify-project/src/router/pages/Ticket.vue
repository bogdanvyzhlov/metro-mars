<template>
  <v-container class="purchase-ticket">
    <h2 class="title">Buy a ticket</h2>
    <v-form @submit.prevent="buyTicket" class="ticket-form">
      <v-radio-group v-model="state.selectedExpires" row>
        <v-radio label="One day" value="1 day"></v-radio>
        <v-radio label="One week" value="1 week"></v-radio>
        <v-radio label="One month" value="1 month"></v-radio>
      </v-radio-group>

      <v-btn type="submit" class="buy-button">Buy</v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTicketStore } from '@/stores/ticket';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';

const authStore = useAuthStore();
const ticketStore = useTicketStore();
const router = useRouter();

const state = reactive({
  selectedExpires: '' as string | '',
});

const buyTicket = async () => {
  try {
    if (authStore.user) {
      await ticketStore.addTicket(expirationDate(state.selectedExpires).toLocaleDateString(), authStore.user._id);

      await router.push({ name: 'my-tickets' });
      state.selectedExpires='';

    } else {
      console.error('User is undefined');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const expirationDate = (selectedExpires: string): Date => {
  const currentDate = new Date();
  const expirationDate = new Date();

  if (selectedExpires === '1 day') {
    expirationDate.setDate(currentDate.getDate() + 1);
  } else if (selectedExpires === '1 week') {
    expirationDate.setDate(currentDate.getDate() + 7);
  } else if (selectedExpires === '1 month') {
    expirationDate.setMonth(currentDate.getMonth() + 1);
  }

  return expirationDate;
};
</script>

<style scoped>
.purchase-ticket {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f7f7f7;
}

.title {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

.ticket-form {
  margin-bottom: 20px;
}

.v-radio-group {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.v-radio {
  margin-right: 10px;
}

.buy-button {
  background-color: #4c5caf;
  color: #fff;
  border-radius: 5px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
}

.buy-button:hover {
  background-color: #456ea0;
}
</style>


