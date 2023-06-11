import Homepage from "@/router/pages/Homepage.vue";
import Login from "@/router/pages/Login.vue";
import Register from "@/router/pages/Register.vue"
import Ticket from "@/router/pages/Ticket.vue"
import MyTickets from "@/router/pages/MyTickets.vue"
import AboutMe from "@/router/pages/AboutMe.vue"
import MyUsers from "@/router/pages/MyUsers.vue"
import updateUser from "@/router/pages/updateUser.vue"

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Station from "@/router/pages/Station.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: Homepage, name: "homepage" },
  { path: "/login", component: Login, name: "login", meta: { requiresAuth : false }, },
  { path: "/register", component: Register, name: "register", meta: { requiresAuth : false }, },
  { path: "/bye-ticket", component: Ticket, name: "bye-ticket", meta: { requiresAuth : true , requiresRole:['passenger','worker']}, },
  { path: "/my-tickets", component: MyTickets, name: "my-tickets", meta: { requiresAuth : true , requiresRole: 'passenger'}, },
  { path: "/about-me", component: AboutMe, name: "about-me", meta: { requiresAuth : true }, },
  { path: "/users", component: MyUsers, name: "users", meta: { requiresAuth : true ,requiresRole: 'admin'}, },
  { path: "/user-update/:userId", component: updateUser, name: "user-update", meta: { requiresAuth : true ,requiresRole: 'admin'}, },
  { path: "/station", component: Station, name: "station", meta: { requiresAuth : false }, },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresRole = to.meta.requiresRole;
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.user;
  const userRole = authStore.user ? authStore.user.role : null
  if (requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else if (requiresRole && (!isAuthenticated || userRole !== requiresRole)) {
    next({ name: "homepage" });
  } else {
    next();
  }
});


export default router;
