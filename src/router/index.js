import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Home from '@/views/Home.vue';
import Edit from '@/views/Edit.vue';
import Login from '@/views/Login.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: Edit,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
});

router.beforeEach((to, from, next) => {
  const auth = localStorage.getItem("user");
   if (to.matched.some((record) => record.meta.requiresAuth)) {
     if (auth) {
       next();
     } else {
       if(to.name !== 'Login'){
         next({ name: 'Login' });
       } else{
         next();
       }
     }
 } else {
   next();
 }
 });

export default router;
