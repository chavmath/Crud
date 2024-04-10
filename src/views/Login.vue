<template>
    <div class="login-form">
      <h2>Iniciar sesión</h2>
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Contraseña" />
      <button @click="login">Iniciar sesión</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
  
  export default {
    setup() {
      const email = ref('');
      const password = ref('');
      const router = useRouter();
      const auth = getAuth();
  
      const login = async () => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
          // Signed in 
          const user = userCredential.user;
          // ...
          router.push('/');
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(`Error: ${errorCode} - ${errorMessage}`);
        }
      };
  
      return {
        email,
        password,
        login
      };
    }
  };
  </script>
  
  <style scoped>
  .login-form {
    /* Aquí puedes agregar tus estilos */
  }
  </style>
  