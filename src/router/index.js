import { createRouter, createWebHistory } from "vue-router";
import Inicio from "../views/Inicio.vue";
import Login from "../views/Login.vue";
import Reportes from "@/views/Reportes.vue";
import Tickets from "@/views/Tickets.vue";
import TicketsAdmin from "@/views/TicketsAdmin.vue";
import ListaTickets from "@/views/ListaTickets.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    /* {
      path: "/inicio",
      name: "inicio",
      component: Inicio,
      meta: {
        requiresAuth: true,
      },
    }, */
    {
      path: "/reportes",
      name: "reportes",
      component: Reportes,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/tickets",
      name: "tickets",
      component: Tickets,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/modTicket/:id",
      name: "modTicket",
      component: TicketsAdmin,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/listaTickets",
      name: "listaTickets",
      component: ListaTickets,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
 const auth = localStorage.getItem("nombreusuario");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (auth) {
      next();
    } else {
      if(to.name !== 'login'){
        next({ name: 'login' });
      } else{
        next();
      }
    }
} else {
  next();
}
});

export default router;
