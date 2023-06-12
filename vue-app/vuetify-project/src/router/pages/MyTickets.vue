<template>
  <div class="my-tickets-container">
    <h2 class="text-center">My Tickets</h2>
  <table class="tickets-table" >
    <thead>
    <tr>
      <th class="text-left">
        Ticket ID
      </th>
      <th class="text-left">
        Expires
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in tickets" :key="item._id">
      <td>{{ item._id}}</td>
      <td>{{ item.expires }}</td>
    </tr>
    </tbody>
  </table>
  <div v-if="tickets.length === 0">
    <p>Not found</p>
  </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref} from 'vue';
import { useTicketStore } from '@/stores/ticket';
import {Ticket} from "@/model/Ticket";

export default defineComponent({
  name: 'MyTickets',
  setup() {
    const ticketStore = useTicketStore();
    const tickets = ref<Ticket[]>(ticketStore.tickets);
    const loading = ref(false);

    const totalItems = ref(0);


    const formatDate = (date: string) => {

      return new Date(date).toLocaleDateString();
    };

    const fetchTickets = async () => {
      try {
        loading.value = true;
        await ticketStore.fetchTickets();
        tickets.value = ticketStore.tickets;

      } catch (error) {
        console.error('Failed to fetch tickets:', error);
      } finally {
        loading.value = false;
      }
    };



    fetchTickets();








    return {
      tickets,


      totalItems,

      loading,
      formatDate,

    };
  },
});
</script>

<style>
.my-tickets-container {

  width: 100%;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}
.tickets-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th,
td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

</style>




