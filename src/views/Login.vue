<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg" style="width: 18rem;">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Iniciar sesión</h2>
        <input v-model="email" type="email" class="form-control mb-3" placeholder="Email" />
        <input v-model="password" type="password" class="form-control mb-3" placeholder="Contraseña" />
        <button @click="login" class="btn btn-primary w-100">Iniciar sesión</button>
      </div>
    </div>
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
        // Guardar el estado de autenticación en el local storage
        localStorage.setItem('user', JSON.stringify(userCredential.user));
        router.push('/');
        // ...
        router.push('/');
      } catch (error) {
        const errorCode = error.code;
        if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found' || errorCode === 'auth/invalid-email') {
          alert('Las credenciales proporcionadas son incorrectas. Por favor, inténtalo de nuevo.');
        } else {
          alert(`Error: ${errorCode}`);
        }
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
