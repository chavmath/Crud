<template>
  <div class="col search-box">
    <div class="centered-content">
      <div class="input-container">
        <input type="text" placeholder="BÚSQUEDA POR # DE TICKET" ref="searchInput" @focus="hidePlaceholder"
          @blur="showPlaceholder" @keyup.enter="buscarPorId" style="margin: 0px; width: 300px;" />
        <button class="search-button" @click="buscarPorId">Buscar</button>
      </div>
      <!-- Modal -->
      <div v-if="ticketEncontrado !== null" class="modal">
        <div class="card">
          <h2 style="display: flex; justify-content: center;">Información del Ticket</h2>
          <template v-if="ticketEncontrado !== 'not found'">
            <table>
              <tr>
                <td>ID del Ticket:</td>
                <td>{{ ticketEncontrado.id }}</td>
              </tr>
              <tr>
                <td>Estatus:</td>
                <td>{{ ticketEncontrado.estado }}</td>
              </tr>
              <tr>
                <td>Categoría:</td>
                <td>{{ ticketEncontrado.categoria }}</td>
              </tr>
              <tr>
                <td>Fecha de Creación:</td>
                <td>{{ formatDate(ticketEncontrado.fechacreacion) }}</td>
              </tr>
              <tr>
                <td>Fecha de Actualización:</td>
                <td>{{ formatDate(ticketEncontrado.fecha) }}</td>
              </tr>
              <tr>
                <td>Nombre del solicitante:</td>
                <td>{{ ticketEncontrado.nombresolicitud }}</td>
              </tr>
              <tr>
                <td>Unidad habitacional:</td>
                <td>{{ ticketEncontrado.unidad }}</td>
              </tr>
            </table>
          </template>
          <template v-else>
            <p style="text-align: center;">El número de ticket no se encontró.</p>
          </template>
          <!-- Botón para cerrar el modal -->
          <button @click="cerrarModal" style="margin-top: 20px;" class="save-btn">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      ticketEncontrado: null,
    };
  },
  methods: {
    hidePlaceholder() {
      this.$refs.searchInput.placeholder = "";
    },
    showPlaceholder() {
      this.$refs.searchInput.placeholder = "BÚSQUEDA POR # DE TICKET";
    },
    async buscarPorId() {
      const idTicket = this.$refs.searchInput.value;
      try {
        // Ajusta las fechas según tus necesidades
        const fechaInicial = "2023-04-01"; // Fecha antigua
        const fechaFinal = new Date().toISOString().split("T")[0]; // Fecha actual

        const response = await axios.get(
          `https://pagos.starguest.ec:7083/listaticketweb/${fechaInicial}/${fechaFinal}`
        );

        // Filtra los resultados para mostrar solo el ticket con el ID buscado
        this.ticketEncontrado = response.data.find(
          (ticket) => ticket.id === idTicket
        );
        if (!this.ticketEncontrado) {
          this.ticketEncontrado = 'not found';
        }
      } catch (error) {
        console.error("Error al buscar el ticket:", error);
        // Maneja el error según tus necesidades
      }
    },
    cerrarModal() {
      this.ticketEncontrado = null;
    },
    formatDate(dateString) {
      const [datePart, timePart] = dateString.split("T");
      const [year, month, day] = datePart.split("-");
      const [hour, minute] = timePart.split(":");

      return `${day}/${month}/${year}, ${hour}:${minute}`;
    }
  },
};
</script>



<style scoped>
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
  justify-content: flex-end;
  height: 100%;
}

.search-box input {
  width: 70%;
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
}

/* Estilos para el modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.modal p {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid #ddd;
  font-size: 16px;
}

th,
td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.save-btn {
  margin-top: 0px;
  max-width: 140px;
  font-size: 16px;
}

.input-container {
  position: relative;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #f1f1f1;
  outline: none;
  box-sizing: border-box;
  font-family: "Oswald", sans-serif;
  font-weight: 500;
  font-size: 13px;
}

button.search-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  background-color: #43415e;
  border: none;
  color: #fff;
  cursor: pointer;
  border-radius: 0 5px 5px 0;
}

button.search-button:hover {
  background-color: #810d78;
}
</style>