<template>
  <div>
    <button @click="logout">Cerrar sesión</button>
    <UserCreate />
    <UserList />
  </div>
</template>

<script>
import UserCreate from '@/components/UserCreate.vue';
import UserList from '@/components/UserList.vue';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default {
  name: 'Home',
  components: { UserCreate, UserList },
  setup() {
    const auth = getAuth();

    const logout = async () => {
  console.log(auth.currentUser); // Imprime el usuario actual
  try {
    await signOut(auth);
    // El usuario ha cerrado sesión
  } catch (error) {
    console.error(`Error al cerrar sesión: ${error}`);
  }
};

    return {
      logout
    };
  }
};
</script>
