<template>
  <div class="col forzar">
    <img src="@/assets/LogoHabitat.png" alt="Logo" class="logo" />
  </div>
  <!-- <div class="logo-containers bg-danger row">
      <img src="@/assets/logoSG.svg" alt="Logo" class="logo" />
    </div> -->
</template>

<script>
export default {
  name: 'LogoContainer',
};
</script>

<style scoped>
/* Estilos para el logo */
.logo {
  width: 100px;
  height: 100px;
  margin: auto;
}

.forzar {
  display: flex;
  align-items: center;
  padding: 0px 10px;
}
</style>