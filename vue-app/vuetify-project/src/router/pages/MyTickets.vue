<template>
  <v-table >
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
  </v-table>
  <div v-if="tickets.length === 0">
    <p>Билеты не найдены.</p>
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

    const totalItems = ref(0); // Общее количество элементов


    const formatDate = (date: string) => {
      // Реализуйте свою логику форматирования даты здесь
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



</style>




