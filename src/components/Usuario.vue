<template>
  <div class="row forzar">
    <div class="centered-content">  
    <div class="col-1 separator">
      <div class="separator"></div>
    </div>
    <div class="col user-section" style="display: flex; align-items: center; justify-content: center;">
      <img class="profile-pic" src="@/assets/LogoHabitat.png" alt="Foto de perfil" />
      <div class="username">{{ nombre }} {{ apellido }}</div>
      <div class="dropdown">
        <button class="dropdown-btn" @click="toggleDropdown">&#x25BC;</button>
        <div v-show="isDropdownOpen" class="dropdown-menu">
          <!-- <a href="#">Editar perfil</a> -->
          <a @click="logout" href="/">Cerrar sesión</a>
        </div>
      </div>
    </div>    
    </div>
  </div>
</template>
  
  <script>

export default {
  name: "Usuario",
  data() {
    return {
      isDropdownOpen: false,
      nombre: JSON.parse(localStorage.getItem("nombreusuario")),
      apellido: JSON.parse(localStorage.getItem("apellidousuario")),
    };
  },
  mounted() {
    // Agrega el manejador de eventos cuando el componente se monta
    window.addEventListener("click", this.closeDropdownOnClickOutside);
  },
  beforeDestroy() {
    // Elimina el manejador de eventos cuando el componente se destruye
    window.removeEventListener("click", this.closeDropdownOnClickOutside);
  },
  methods: {
    toggleDropdown(event) {
      event.stopPropagation(); // Evita que el evento se propague a la ventana
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdownOnClickOutside(event) {
      const dropdownMenu = this.$el.querySelector(".dropdown-menu");
      const dropdownBtn = this.$el.querySelector(".dropdown-btn");

      if (
        dropdownMenu &&
        dropdownBtn &&
        !dropdownMenu.contains(event.target) &&
        !dropdownBtn.contains(event.target)
      ) {
        this.closeDropdown();
      }
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
    logout() {
      /* auth.isLoggedIn = false; */
      localStorage.removeItem("nombreusuario");
      localStorage.removeItem("apellidousuario");
      localStorage.removeItem("empresaSeleccionada");
      localStorage.removeItem("idusuario");
      localStorage.removeItem("copropietarios");
      localStorage.removeItem("selectedTicket");
      /* localStorage.removeItem("isLoggedIn");
      localStorage.setItem("isLoggedIn", false); // Establecer isLoggedIn a false en localStorage */
      this.$router.push("/login");
    },
    // ...
  },
  // ...
};
</script>
  
<style scoped>
.forzar {
  display: flex;
  align-items: center;
  padding: 0px 10px;
  height: 100%;
}

.centered-content {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px;
}

.separator {
  width: 1px;
  height: 40px;
  background-color: #dadada;
  /* Color de la línea vertical */
  margin: 2px 0px;
  padding: 0px 0;
}
.user-section {
  display: flex;
  align-items: center;
  padding: 5px 5px 5px 10px;
}

.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  margin-right: 10px;
  font-size: 16px;
  font-weight: 400;
}

.dropdown {
  position: relative;
}

.dropdown-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0px;
  margin-left: -1px;
  margin-bottom: 1px;
  font-size: 18px;
  outline: none;
  color: #555;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  width: 100px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.dropdown-menu a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #333;
  text-align: center;
}

.dropdown-menu a:hover {
  background-color: #f0f0f0;
  text-decoration: underline;
}
</style>
  