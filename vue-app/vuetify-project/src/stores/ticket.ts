import { defineStore } from "pinia";
import { ref } from "vue";
import { Ticket } from "@/model/Ticket";
import { axiosInstance } from "@/code/api";
import { useRouter } from "vue-router";
import {useAuthStore} from "@/stores/auth";

export const useTicketStore = defineStore("ticket", () => {
  const tickets = ref<Ticket[]>([]);
  const router = useRouter();
  const authStore= useAuthStore();

  async function fetchTickets() {
    try {
      if (authStore.user) { // Add null check
        const response = await axiosInstance.get("/tickets", {
          params: {
            user_id: authStore.user._id,
          },
        });
        tickets.value = response.data;
      }
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    }
  }


  async function addTicket(expires: string, user_id: string) {
    try {
      const response = await axiosInstance.post("/tickets", {
        expires,
        user_id
      });
      const createdTicket = response.data;
      tickets.value.push(createdTicket);
      router.push("/tickets"); // перенаправление на страницу с билетами
    } catch (error) {
      console.error("Failed to add ticket:", error);
    }
  }

  async function removeTicket(ticketId: string) {
    try {
      await axiosInstance.delete(`/tickets/${ticketId}`);
      const index = tickets.value.findIndex((ticket) => ticket._id === ticketId);
      if (index !== -1) {
        tickets.value.splice(index, 1);
      }
    } catch (error) {
      console.error("Failed to remove ticket:", error);
    }
  }

  return { tickets, fetchTickets, addTicket, removeTicket };
});

