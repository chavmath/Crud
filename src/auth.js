import { reactive } from 'vue';

// Creamos un objeto reativo para almacenar el estado de autenticación
const auth = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true', // Inicializar con el valor almacenado
  // Otras propiedades y métodos
};

export default auth;
