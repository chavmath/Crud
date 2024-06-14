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
 const auth = localStorage.getItem("nombreusuario");// Obtiene el elemento "nombreusuario" del localStorage, que representa el estado de autenticación
  if (to.matched.some((record) => record.meta.requiresAuth)) { // Verifica si alguna de las rutas coincidentes requiere autenticación
    if (auth) {  // Si el usuario está autenticado
      next(); // Permite el acceso a la ruta
    } else {
      if(to.name !== 'login'){ // Si el usuario no está autenticado y la ruta no es la de login
        next({ name: 'login' }); // Redirige al usuario a la página de login
      } else{
        next(); // Si la ruta es la de login, permite el acceso a la ruta
      }
    }
} else {
  next(); // Si la ruta no requiere autenticación, permite el acceso a la ruta
}
});

export default router;
