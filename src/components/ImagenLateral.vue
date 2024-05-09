<template>
  <div class="col logo">
    <img src="@/assets/Edificio.jpg" alt="Logo" class="logo-img" />
  </div>
</template>

<script>
export default {
  name: 'LogoContainer',
};
</script>

<style scoped>
  /* Estilos para el contenedor del logo */
  .logo {
    margin: 0px;
    width: 100%;
    height: 100%;
  }
  
  /* Estilos para el logo */
  .logo-img {
    width: 100%; 
    height: 100%;   
    object-fit: cover; /* Asegura que la imagen cubra todo el espacio disponible sin distorsionarse */
    padding: 0px;
  }
</style>
