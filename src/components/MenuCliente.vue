<template>
  <div class="sidebar">
    <!-- <div class="sidebar-item">
      <router-link to="/inicio" class="sidebar-link" active-class="selected">
        <img src="@/assets/user.svg" alt="Usuarios" />
        <span>USUARIOS</span>
      </router-link>
    </div> -->
    <div class="sidebar-item">
      <router-link to="/reportes" class="sidebar-link" active-class="selected">
        <img src="@/assets/reporte.svg" alt="Reportes" />
        <span>REPORTES</span>
      </router-link>
    </div>
    <div class="sidebar-item">
      <router-link to="/tickets" class="sidebar-link" active-class="selected">
        <img src="@/assets/ticket.svg" alt="Tickets" />
        <span>CREAR TICKET</span>
      </router-link>
    </div>
    <div class="sidebar-item">
      <router-link to="/listaTickets" class="sidebar-link" active-class="selected" style="margin-top: 4px;">
        <img src="@/assets/ticket.svg" alt="<ListaTickets>" />
        <span>MOD. TICKETS</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style scoped>
/* Estilos para el contenedor del menú lateral */
.sidebar {
  width: 190px;
  height: 180px;
  background-color: #FFFFFF;
  /* Color del fondo con transparencia */
  padding: 30px;
  padding-right: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgb(165, 157, 157);
  margin-left: 10px;
  margin-top: 20px;
}

.sidebar-item {
  display: flex;
  align-items: left;
  margin-bottom: 15px;
}

.sidebar-link span {
  border-bottom: 2px solid transparent;
}

.sidebar-link.selected span {
  border-bottom-color: #a51699;
}

.sidebar-item img {
  width: 30px;
  margin-right: 15px;
  margin-bottom: 0px;
}

.sidebar-link {
  text-decoration: none;
  color: inherit;
  margin: 0 0;
}

.sidebar-link:hover {
  color: #8b1081;
}
</style>
