<template>
  <div class="container-fluid vh-100 d-flex flex-column">
    <div class="row top-bar">
      <div class="col-1">
        <Logo />
      </div>
      <div class="col-5">
        <Empresa />
      </div>
      <div class="col">
        <Busqueda />
      </div>
      <div class="col-2">
        <Usuario />
      </div>
    </div>
    <div class="row section flex-grow-1" style="padding: 0px;">
      <div class="col-2 menu-cliente" style="padding: 10px;">
        <MenuCliente />
      </div>
      <div class="col" style="padding: 10px;">
        <form @submit.prevent="guardarUsuario">
          <div class="card p-3 crear-usuario" style="margin-bottom: 20px;">
            <h2 style="margin-bottom: 10px; margin-top: 10px; font-weight: 400; font-size: 25px; position: relative;">
              Crear Usuario</h2>
            <div class="form-group row">
              <div class="row">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" ref="nombreInput" placeholder="NOMBRE" style="border-radius: 10px;"
                  v-model="UsuarioCreado.nombre" @focus="hidePlaceholderNombre" @blur="showPlaceholderNombre" />
              </div>
              <div class="row">
                <label for="apellido">Apellido:</label>
                <input type="text" id="apellido" ref="apellidoInput" placeholder="APELLIDO" style="border-radius: 10px;"
                  v-model="UsuarioCreado.apellido" @focus="hidePlaceholderApellido" @blur="showPlaceholderApellido" />
              </div>
              <div class="row">
                <label for="identificacion">Identificación:</label>
                <input type="text" id="identificacion" ref="identificacionInput" placeholder="IDENTIFICACION"
                  style="border-radius: 10px;" v-model="UsuarioCreado.identificacion"
                  @focus="hidePlaceholderIdentificacion" @blur="showPlaceholderIdentificacion" />
              </div>
              <div class="row">
                <label for="nContacto">Número de contacto:</label>
                <input type="text" id="nContacto" ref="nContactoInput" placeholder="Nº CONTACTO"
                  style="border-radius: 10px;" v-model="UsuarioCreado.nContacto" @focus="hidePlaceholderNcontacto"
                  @blur="showPlaceholderNcontacto" />
              </div>
              <div class="row">
                <label for="rol">Tipo de rol:</label>
                <select class="rol" id="rol" style="background-color: #ffffff; border-radius: 10px;"
                  v-model="UsuarioCreado.rol">
                  <option disabled selected>SELECCIONE UNA OPCIÓN</option>
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>
            </div>
            <button type="submit" class="save-btn">Guardar</button>
          </div>
        </form>
      </div>
      <div class="col" style="padding: 10px;">
        <form @submit.prevent="guardarUsuario">
          <div class="card p-3 editar-usuario" style="margin-bottom: 20px;">
            <h2 style="margin-bottom: 10px; margin-top: 10px; font-weight: 400; font-size: 25px; position: relative;">
              Editar Usuario</h2>
            <div class="form-group row">
              <div class="row">
                <div class="col search-box">
                  <div class="centered-content">
                    <input type="text" placeholder="BUSCAR POR APELLIDO / IDENTIFICACIÓN" ref="searchInput"
                      @focus="hidePlaceholder" @blur="showPlaceholder" />
                  </div>
                </div>
              </div>
              <div class="row">
                <label for="editNombre">Nombre:</label>
                <input type="text" id="editNombre" ref="editNombreInput" placeholder="NOMBRE"
                  style="border-radius: 10px;" v-model="EditarUsuario.nombre" @focus="hidePlaceholderEditarNombre"
                  @blur="showPlaceholderEditarNombre" />
              </div>
              <div class="row">
                <label for="editApellido">Apellido:</label>
                <input type="text" id="editApellido" ref="editApellidoInput" placeholder="APELLIDO"
                  style="border-radius: 10px;" v-model="EditarUsuario.apellido" @focus="hidePlaceholderEditarApellido"
                  @blur="showPlaceholderEditarApellido" />
              </div>
              <div class="row">
                <label for="editIdentificacion">Identificación:</label>
                <input type="text" id="editIdentificacion" ref="editIdentificacionInput" placeholder="IDENTIFICACION"
                  style="border-radius: 10px;" v-model="EditarUsuario.identificacion"
                  @focus="hidePlaceholderEditarIdentificacion" @blur="showPlaceholderEditarIdentificacion" />
              </div>
              <div class="row">
                <label for="editNContacto">Número de contacto:</label>
                <input type="text" id="editNContacto" ref="editNContactoInput" placeholder="Nº CONTACTO"
                  style="border-radius: 10px;" v-model="EditarUsuario.nContacto" @focus="hidePlaceholderEditarNcontacto"
                  @blur="showPlaceholderEditarNcontacto" />
              </div>
              <div class="row">
                <label for="editRol">Tipo de rol:</label>
                <select class="editRol" id="editRol" style="background-color: #ffffff; border-radius: 10px;"
                  v-model="EditarUsuario.rol">
                  <option disabled selected>SELECCIONE UNA OPCIÓN</option>
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <button type="submit" class="save-btn">Guardar</button>
              </div>
              <div class="col-6">
                <button type="submit" class="eliminar-btn">Eliminar</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="col-2" style="padding: 0px;">
        <ImagenLateral />
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue"; // Importa el componente Logo
import Usuario from "@/components/Usuario.vue"; // Importa el componente Usuario
import MenuCliente from "@/components/MenuCliente.vue"; // Importa el componente MenuCliente
import Busqueda from "@/components/Busqueda.vue"; // Importa el componente Busqueda
import ImagenLateral from "@/components/ImagenLateral.vue"; // Importa el componente ImagenLateral
import Empresa from "@/components/Empresa.vue";

export default {
  name: "inicio",
  components: {
    Logo, // Registra el componente Logo
    Usuario, // Registra el componente Usuario
    MenuCliente, // Registra el componente MenuCliente
    Busqueda, // Registra el componente Busqueda
    ImagenLateral, // Registra el componente ImagenLateral
    Empresa,
  },
  data() {
    return {
      isDropdownOpen: false,
      UsuarioCreado: {
        nombre: "",
        apellido: "",
        rol: "",
        identificacion: "",
        nContacto: "",
      },
      EditarUsuario: {
        nombre: "",
        apellido: "",
        rol: "",
        identificacion: "",
        nContacto: "",
      },
    };
  },
  methods: {
    guardarUsuario() {
      console.log(this.UsuarioCreado);
      /*     console.log(this.UsuarioCreado.nombre);
      console.log(this.UsuarioCreado.apellido);
      console.log(this.UsuarioCreado.rol); */
    },
    hidePlaceholderNombre() {
      this.$refs.nombreInput.placeholder = "";
    },
    showPlaceholderNombre() {
      this.$refs.nombreInput.placeholder = "NOMBRE";
    },
    hidePlaceholderApellido() {
      this.$refs.apellidoInput.placeholder = "";
    },
    showPlaceholderApellido() {
      this.$refs.apellidoInput.placeholder = "APELLIDO";
    },
    hidePlaceholderIdentificacion() {
      this.$refs.identificacionInput.placeholder = "";
    },
    showPlaceholderIdentificacion() {
      this.$refs.identificacionInput.placeholder = "IDENTIFICACION";
    },
    hidePlaceholderNcontacto() {
      this.$refs.nContactoInput.placeholder = "";
    },
    showPlaceholderNcontacto() {
      this.$refs.nContactoInput.placeholder = "Nº CONTACTO";
    },
    hidePlaceholder() {
      this.$refs.searchInput.placeholder = "";
    },
    showPlaceholder() {
      this.$refs.searchInput.placeholder = "BUSCAR POR APELLIDO / IDENTIFICACIÓN";
    },
    hidePlaceholderEditarNombre() {
      this.$refs.editNombreInput.placeholder = "";
    },
    showPlaceholderEditarNombre() {
      this.$refs.editNombreInput.placeholder = "NOMBRE";
    },
    hidePlaceholderEditarApellido() {
      this.$refs.editApellidoInput.placeholder = "";
    },
    showPlaceholderEditarApellido() {
      this.$refs.editApellidoInput.placeholder = "APELLIDO";
    },
    hidePlaceholderEditarIdentificacion() {
      this.$refs.editIdentificacionInput.placeholder = "";
    },
    showPlaceholderEditarIdentificacion() {
      this.$refs.editIdentificacionInput.placeholder = "IDENTIFICACION";
    },
    hidePlaceholderEditarNcontacto() {
      this.$refs.editNContactoInput.placeholder = "";
    },
    showPlaceholderEditarNcontacto() {
      this.$refs.editNContactoInput.placeholder = "Nº CONTACTO";
    },
  },
};
</script>

<style>
.rol {
  text-align: center;
  cursor: pointer;
}

.editRol {
  text-align: center;
  cursor: pointer;
}

.crear-usuario {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.4);
  max-width: 90%;
  margin-top: 20px;
}

.editar-usuario {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.4);
  max-width: 90%;
  margin-top: 20px;
}

.top-bar {
  background-color: #ffffff;
  padding: 5px 0px 10px 0px;
  font-family: "Oswald", sans-serif;
  font-weight: 500;
  font-size: 13px;
}

.section {
  background-color: #f2f2f2;
  margin-top: 0px;
  padding: 10px 0px;
}

.container-fluid {
  background-color: #f2f2f2;
}

.menu-cliente {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 10px;
  width: 100%;
}

.form-group label {
  display: flex;
  margin-bottom: 10px;
  position: relative;
  text-align: left;
  margin: 10px 0px 10px 10px;
}

.form-group input {
  width: calc(100% - 0px);
  /* Establece el ancho del input o select tomando en cuenta el padding */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: "Oswald", sans-serif;
  margin-left: 20px;
  border-color: #333;
}

.form-group select {
  width: calc(100% - 0px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: "Oswald", sans-serif;
  margin-left: 20px;
  border-color: #333;
}

.save-btn {
  background-color: #43415e;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  width: calc(100% - 20px);
  /* Establece el ancho del botón tomando en cuenta el padding */
  max-width: 200px;
  align-self: center;
}

.save-btn:hover {
  background-color: #810d78;
}

.search-box {
  flex: 1;
  padding: 5px;
  position: relative;
  left: 0px;
  text-align: right;
  margin-top: 0px;
  height: 100%;
}

.centered-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.search-box input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #f1f1f1;
  outline: none;
  box-sizing: border-box;
  /* Incluye el padding y el borde en el ancho total del input */
  text-align: center;
  font-family: "Oswald", sans-serif;
  font-weight: 500;
  font-size: 13px;
  margin-left: 40px;
}

.eliminar-btn {
  background-color: #43415e;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  width: calc(100% - 20px);
  /* Establece el ancho del botón tomando en cuenta el padding */
  max-width: 200px;
  align-self: center;
}

.eliminar-btn:hover {
  background-color: #aa3636;
}
</style>
