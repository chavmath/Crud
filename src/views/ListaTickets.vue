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
            <div class="col-8 reportes" style="padding: 10px;">
                <div class="row">
                    <div class="col">
                        <h2 style="text-align: center; font-size: 25px; margin: 10px 0px 20px;">Buscar Ticket:</h2>
                        <form @submit.prevent="guardarBusqueda">
                            <div class="row">
                                <div class="col-4">
                                    <label for="fechaInicial">Fecha inicial:</label>
                                    <input type="date" v-model="Busqueda.fechaInicial" class="form-control"
                                        placeholder="Fecha inicial">
                                </div>
                                <div class="col-4">
                                    <label for="fechaFinal">Fecha final:</label>
                                    <input type="date" v-model="Busqueda.fechaFinal" class="form-control"
                                        placeholder="Fecha final">
                                </div>
                                <!-- <div class="col-2 select-container">
                            <label for="categoria">Categoría:</label>
                            <select v-model="Busqueda.categoria" class="form-control categoria">
                                <option value="Atención al cliente">Atención al cliente</option>
                                <option value="Tesorería">Tesorería</option>
                                <option value="Mantenimieto">Mantenimieto</option>
                                <option value="Recompensas">Recompensas</option>
                                <option value="Sugerencias">Sugerencias</option>
                                <option value="Inconformidades">Inconformidades</option>
                                <option value="Otros">Otros</option>
                            </select>
                            <span class="select-arrow"></span>
                        </div> -->
                                <div class="col-4">
                                    <button type="submit" class="save-btn" @click="guardarBusqueda"
                                        style="margin-top: 30px;">Buscar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-1 separator" style="padding: 0px; width: 1px;">
                        <div class="separator"></div>
                    </div>
                    <div class="col">
                        <h2 style="text-align: center; font-size: 25px; margin: 10px 0px 20px;">Filtrar Ticket:</h2>
                        <div class="row">
                            <div class="col-4">
                                <label for="nombre">Tick/Resi/fech:</label>
                                <input type="text" v-model="Busqueda.nombre" class="form-control" placeholder="...">
                            </div>
                            <div class="col-4 select-container">
                                <label for="estatus">Estatus:</label>
                                <select v-model="Busqueda.estatus" class="form-control" style="appearance: auto;">
                                    <option disabled selected>SELECCIONE UNA OPCIÓN</option>
                                    <option value="Abierto">Abierto</option>
                                    <!-- <option value="CERRADO">Cerrado</option> -->
                                    <option value="En proceso">En proceso</option>
                                </select>
                            </div>
                            <div class="col-4">
                                <div class="centered-content">
                                    <button type="button" class="save-btn" @click="limpiarFiltros"
                                        style="margin: 30px 0px 0px 0px; padding: 10px 5px;">Limpiar Filtros</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                </div>
                <div class="row report-container">
                    <table class="report-tables borde table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" v-for="titulo in Titulos" :key="titulo">{{ titulo }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="data in filteredData" :key="data.id">
                                <td>
                                    <router-link :to="`/modTicket/${data.id}`"
                                        @click="guardarTicketSeleccionado(data)">{{ data.id }}</router-link>
                                </td>
                                <td>{{ data.estatus }}</td>
                                <td>{{ data.prioridad }}</td>
                                <td>{{ data.nombre }}</td>
                                <td>{{ data.unidad }}</td>
                                <td>{{ data.categoria }}</td>
                                <td>{{ data.observacion }}</td>
                                <td>{{ data.fechaCreacion }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-2" style="padding: 0px;">
                <ImagenLateral />
            </div>
        </div>
        <div v-if="!reportData.length && ticketEncontrado === false" class="modal">
            <div class="card">
                <h2 style="display: flex; justify-content: center;">No se encontró ningún ticket dentro de las fechas
                    seleccionadas</h2>
                <button @click="cerrarModal" style="margin-top: 0px;" class="save-btn">Cerrar</button>
            </div>
        </div>
    </div>
</template>

<script>
import Logo from "@/components/Logo.vue"; // Importa el componente Logo
import Usuario from "@/components/Usuario.vue"; // Importa el componente Usuario
import MenuCliente from "@/components/MenuCliente.vue"; // Importa el componente MenuCliente
import Busqueda from "@/components/Busqueda.vue"; // Importa el componente Busqueda
import Empresa from "@/components/Empresa.vue";
import ImagenLateral from "@/components/ImagenLateral.vue";
import axios from 'axios';


export default {
    name: "ListaTickets",
    components: {
        Logo, // Registra el componente Logo
        Usuario, // Registra el componente Usuario
        MenuCliente, // Registra el componente MenuCliente
        Busqueda, // Registra el componente Busqueda
        Empresa,
        ImagenLateral,
    },
    data() {
        return {
            ticketEncontrado: null,
            Busqueda: {
                fechaInicial: this.getCurrentDate(), // Inicializa con la fecha actual
                fechaFinal: this.addOneDay(), // Inicializa con la fecha actual
                categoria: '',
                nombre: '',
                id: '',
                estatus: '',
            },
            ticketSeleccionado: {
                id: '',
                estatus: '',
                observacion: '',
                categoria: '',
                fechaCreacion: '',
                unidad: '',
                nombre: ''
            },
            Titulos: ['Ticket', 'Estado', 'Prioridad', 'Residente', 'Unidad Hab.', 'Categoría', 'Observación', 'Fecha Creación'],
            reportData: []
        };
    },
    computed: {
        filteredData() {
            return this.reportData.filter(data =>
                (this.Busqueda.nombre === '' || (data.id && data.id.toString().includes(this.Busqueda.nombre)) || (data.fechaCreacion && data.fechaCreacion.includes(this.Busqueda.nombre))
                    || (data.categoria && data.categoria.toLowerCase().includes(this.Busqueda.nombre.toLowerCase())) ||
                    (data.nombre && data.nombre.toLowerCase().includes(this.Busqueda.nombre.toLowerCase()))) &&
                (this.Busqueda.estatus === '' || data.estatus === this.Busqueda.estatus)
            );
        }
    },
    methods: {
        async guardarBusqueda() {
            const fechaInicial = this.Busqueda.fechaInicial;
            const fechaFinal = this.Busqueda.fechaFinal;
            const response = await axios.get(`https://crud-back-mlk9.onrender.com/listaticketweb/${fechaInicial}/${fechaFinal}`);
            /* const response = await axios.get(`https://pagos.starguest.ec:7083/listaticketweb/${fechaInicial}/${fechaFinal}`); */

            if (response.data.length === 0 || !response.data.some(ticket => ticket.estado === "Abierto" || ticket.estado === "En proceso")) {
                this.ticketEncontrado = false; // No se encontraron tickets o no hay tickets en estado "ABIERTO" o "DEMORADO"
                this.reportData = [];
            } else {
                this.ticketEncontrado = true; // Se encontraron tickets
                this.reportData = response.data
                    .filter(ticket => ticket.estado === "Abierto" || ticket.estado === "En proceso")
                    .map(item => ({
                        id: item.id,
                        estatus: item.estado,
                        prioridad: item.prioridad,
                        observacion: item.descripcion,
                        categoria: item.categoria,
                        fechaCreacion: item.fechacreacion.split('T')[0],
                        unidad: item.unidad,
                        nombre: item.nombresolicitud,
                        foto: item.url
                    }));
            }
        },
        cerrarModal() {
            this.ticketEncontrado = null;
        },
        guardarTicketSeleccionado(ticket) {
            localStorage.setItem('selectedTicket', JSON.stringify(ticket));
        },
        limpiarFiltros() {
            // Limpia los filtros de nombre y prioridad
            this.Busqueda.nombre = '';
            this.Busqueda.estatus = '';
        },
        getCurrentDate() {
            const now = new Date();
            const year = now.getFullYear();
            let month = (now.getMonth() + 1).toString();
            month = month.length === 1 ? '0' + month : month;
            let day = now.getDate().toString();
            day = day.length === 1 ? '0' + day : day;
            return `${year}-${month}-${day}`;
        },
        addOneDay() {
            const now = new Date();
            now.setDate(now.getDate() + 1);
            const year = now.getFullYear();
            let month = (now.getMonth() + 1).toString();
            month = month.length === 1 ? '0' + month : month;
            let day = now.getDate().toString();
            day = day.length === 1 ? '0' + day : day;
            return `${year}-${month}-${day}`;
        }
    },
};
</script>

<style scoped>
.reportes {
    position: relative;
}

.report-container {
    flex: 1;
    margin: 20px 0px;
    padding: 20px;
    border-radius: 15px;
    background-color: #ffffff;
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.4);
    /* Sombra */
    max-width: 100%;
}

.report-table {
    width: 100%;
    border-collapse: collapse;
}

.report-table th,
.report-table td {
    padding: 10px;
    border-bottom: 1px solid #dddddd;
    text-align: center;
    /*outline: auto;*/
    font-weight: 400;
}

table.borde td {
    border-right: 1px solid #dedede;
    border-left: 1px solid #dedede;

}

table.borde th {
    border-bottom: 1px solid #dedede;

}

.form-control {
    text-align: center;
    border-color: #333;
    cursor: pointer;
    max-height: 38px !important;
}

.select-container {
    position: relative;
}

label {
    font-weight: 500;
    margin-bottom: 10px;
}

.save-btn {
    margin-top: 0px;
    max-width: 140px;
}

.centered-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.export-pdf-btn {
    margin-top: 30px;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    background-color: #43415e;
    color: white;
    cursor: pointer;
    height: 45px;
}

.export-pdf-btn:hover {
    background-color: #910f0f;
}

.export-pdf-btn i {
    margin-right: 5px;
}

.export-excel-btn {
    margin-top: 30px;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    background-color: #43415e;
    color: white;
    cursor: pointer;
    height: 45px;
}

.export-excel-btn:hover {
    background-color: #0b6d13;
}

.export-excel-btn i {
    margin-right: 5px;
}

.separator {
    width: 1px;
    height: 120px;
    background-color: #a51699;
    /* Color de la línea vertical */
    margin: 2px 0px;
    padding: 0px 0;
    align-self: center;
}

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
    max-width: 350px;
}
</style>