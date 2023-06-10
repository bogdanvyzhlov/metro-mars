import Homepage from "@/router/pages/Homepage.vue";
import Login from "@/router/pages/Login.vue";
import Register from "@/router/pages/Register.vue"
import Ticket from "@/router/pages/Ticket.vue"
import MyTickets from "@/router/pages/MyTickets.vue"
import AboutMe from "@/router/pages/AboutMe.vue"

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes: RouteRecordRaw[] = [
  { path: "/", component: Homepage, name: "homepage" },
  { path: "/login", component: Login, name: "login", meta: { requiresAuth : false }, },
  { path: "/register", component: Register, name: "register", meta: { requiresAuth : false }, },
  { path: "/bye-ticket", component: Ticket, name: "bye-ticket", meta: { requiresAuth : true }, },
  { path: "/my-tickets", component: MyTickets, name: "my-tickets", meta: { requiresAuth : true }, },
  { path: "/about-me", component: AboutMe, name: "about-me", meta: { requiresAuth : true }, },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.user;

  if (requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else {
    next();
  }
});


export default router;
