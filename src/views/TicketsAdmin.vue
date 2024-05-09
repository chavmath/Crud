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
            <div class="col ticket" style="padding: 10px; position: relative;">
                <div class="row">
                    <div class="col">
                        <div class="card p-3 information">
                            <div class="row">
                                <div class="col-2 asignados" style="align-self: center;">
                                    <h2>NO ASIGNADOS</h2>
                                    <p style="font-size: 13px;">TICKETS</p>
                                </div>
                                <div class="col-1 separator-ticket" style="width: 1px;">
                                    <div class="separator"></div>
                                </div>
                                <div class="col">
                                    <div class="row">
                                        <h2 class="subrayado">
                                            DATOS PERSONALES</h2>
                                    </div>
                                    <div class="row">
                                        <div class="col asignados-datos">
                                            <h2>{{ selectedTicket.nombre }}</h2>
                                            <p>NOMBRES</p>
                                        </div>
                                        <div class="col-1 separator-ticket" style="width: 1px;">
                                            <div class="separator"></div>
                                        </div>
                                        <div class="col asignados-datos">
                                            <h2>1722949383</h2>
                                            <p>DOCUMENTO</p>
                                        </div>
                                        <div class="col-1 separator-ticket" style="width: 1px;">
                                            <div class="separator"></div>
                                        </div>
                                        <div class="col asignados-datos">
                                            <h2>1234567890</h2>
                                            <p>TELÉFONO</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-1 separator-ticket" style="width: 1px;">
                                    <div class="separator"></div>
                                </div>
                                <div class="col-2 asignados" style="align-self: center;">
                                    <button class="send-btn" @click="toggleDetail"
                                        style="background-color: #ffffff; border: 1px solid #a51699; color: black; font-size: 15px; padding: 10px 0px;">
                                        {{ showDetail ? 'CERRAR DETALLE' : 'VER DETALLE' }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" style="margin: 20px 0px 0px 0px;">
                    <div class="col" style="padding: 0px;">
                        <div class="card p-3 ticket-creado">
                            <div class="row">
                                <h2
                                    style="font-size: 18px; margin-top: -10px; text-decoration: underline; text-decoration-color: #a51699;">
                                    INFORMACION DEL TICKET</h2>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="row">
                                        <div class="col asignados" style="align-self: center;">
                                            <h2 style="font-weight: 400;">{{ selectedTicket.fechaCreacion }}</h2>
                                            <p style="font-weight: 600;">FECHA DE REQUERIMIENTO</p>
                                        </div>
                                        <div class="col-1 separator-ticket" style="width: 1px;">
                                            <div class="separator"></div>
                                        </div>
                                        <div class="col asignados" style="align-self: center;">
                                            <h2>ESTADO DE REQUERIMIENTOS</h2>
                                            <select class="estado-requerimiento" id="estado" v-model="TicketMod.estado"
                                                style="width: 100px; cursor: pointer;">
                                                <option selected>Abierto</option>
                                                <option value="Demorado">Demorado</option>
                                                <option value="Cerrado">Cerrado</option>
                                                <option value="Duplicado">Duplicado</option>
                                            </select>
                                        </div>
                                        <div class="col-1 separator-ticket" style="width: 1px;">
                                            <div class="separator"></div>
                                        </div>
                                        <div class="col asignados" style="align-self: center;">
                                            <h2 style="font-weight: 400;">{{ selectedTicket.id }}</h2>
                                            <p style="font-weight: 600;">NÚMERO DE TICKET</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row" style="margin-top: 15px;">
                                <!-- <div class="col" style="padding: 0px;">
                                    <label for="prioridad">Prioridad:</label>
                                    <select class="custom-select" id="prioridad" v-model="TicketMod.prioridad">
                                        <option disabled selected>SELECCIONE UNA OPCIÓN</option>
                                        <option value="Baja">Baja</option>
                                        <option value="Media">Media</option>
                                        <option value="Alta">Alta</option>
                                        <option value="Normal">Normal</option>
                                        <option value="Urgente">Urgente</option>
                                    </select>
                                </div> -->
                                <div class="col">
                                    <label for="prioridad">Prioridad:</label>
                                    <input type="text" class="form-control text-center" id="Prioridad"
                                        placeholder="prioridad en ticket"
                                        style="border-radius: 10px; border-color: gray; height: 28px;"
                                        v-model="TicketMod.prioridad" readonly />
                                </div>
                                <div class="col" style="padding: 0px;">
                                    <label for="asignar">Asignar a:</label>
                                    <select class="custom-select" id="asignar" v-model="TicketMod.usuario"
                                        @change="updateCategoria">
                                        <option disabled selected value="">SELECCIONE UNA OPCIÓN</option>
                                        <option v-for="asignacion in asignaciones" :key="asignacion.id"
                                            :value="asignacion.id">
                                            {{ asignacion.nombre }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col" style="padding: 0px;">
                                    <label for="actividad">Actividad:</label>
                                    <select class="custom-select" id="actividad" v-model="TicketMod.actividad">
                                        <option disabled selected>SELECCIONE UNA OPCIÓN</option>
                                        <!-- Iterar sobre las actividades y generar las opciones -->
                                        <option v-for="actividad in actividades" :key="actividad.id"
                                            :value="actividad.Actividad.toLowerCase().replace(' ', '')">{{
                                                actividad.Actividad }}</option>
                                    </select>
                                </div>
                                <div class="col">
                                    <label for="resumen">Unidad Habitacional:</label>
                                    <input type="text" class="form-control text-center" id="Resumen"
                                        placeholder="unidad asignada en ticket"
                                        style="border-radius: 10px; border-color: gray; height: 28px;"
                                        v-model="TicketMod.AdminUnidadHab" readonly />
                                </div>
                            </div>
                            <div class="row" style="margin: 10px 0px;">
                                <div class="col">
                                    <div class="row">
                                        <div class="col">
                                            <label>Evidencia:</label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col d-flex justify-content-center align-items-center">
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input" id="evidencia"
                                                    placeholder="JPG / PDF" accept=".jpg, .png, .pdf"
                                                    @change="handleFileUpload" />
                                                <label class="custom-file-label" for="evidencia">{{ fileName
                                                    }}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <label for="responsable">Responsable:</label>
                                    <input type="text" class="form-control text-center" id="Responsable"
                                        placeholder="Responsable" style="border-radius: 10px; border-color: black;"
                                        v-bind:value="nombre + ' ' + apellido" readonly />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col" style="text-align: left;">
                                    <label for="observaciones" style="margin-left: 10px;">Observación:</label>
                                    <textarea class="form-control" id="Observacion" rows="5"
                                        style="resize: none; border-radius: 10px" v-model="TicketMod.observacion">
                                            </textarea>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <button class="send-btn" @click="guardarTicket" style="margin-top: 20px;">
                                        <span v-if="!isLoading">Actualizar</span>
                                        <!-- Mostrar "Actualizar" si la solicitud no está en curso -->
                                        <span v-if="isLoading">Cargando...</span>
                                        <!-- Mostrar "Cargando..." si la solicitud está en curso -->
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal" v-if="serverMessage" style="display: block;">
                    <div class="modal-content">
                        <span class="close" @click="serverMessage = null">&times;</span>
                        <p style="text-align: center; font-size: 20px;">{{ serverMessage }}</p>
                        <!-- Mostrar el mensaje del servidor -->
                        <router-link to="/ListaTickets">
                            <button type="button" class="send-btn">Regresar a ListaTickets</button>
                            <!-- Botón para regresar a ListaTickets -->
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding: 0px;">
                <div v-if="showDetail" class="row">
                    <div class="col" style="margin-left: 5px;">
                        <div class="card p-3 detalle">
                            <div class="row info-detalle" style="margin-bottom: 10px;">
                                <div class="col">
                                    <div class="row">
                                        <p style="margin: 0px; font-weight: 300;">24 hrs</p>
                                    </div>
                                    <div class="row">
                                        <p style="margin: 0px; font-size: 12px; font-weight: 500;">TIEMPO DE RESPUESTA
                                        </p>
                                    </div>
                                </div>
                                <div class="col-1 separator-detalle">
                                    <div class="separator"></div>
                                </div>
                                <div class="col">
                                    <div class="row">
                                        <p style="margin: 0px; font-weight: 300;">Pablo</p>
                                    </div>
                                    <div class="row">
                                        <p style="margin: 0px; font-size: 12px; font-weight: 500;">SOLICITADO POR</p>
                                    </div>
                                </div>
                                <div class="col-1 separator-detalle">
                                    <div class="separator"></div>
                                </div>
                                <div class="col">
                                    <div class="row">
                                        <p style="margin: 0px; font-weight: 300;">Corte de césped</p>
                                    </div>
                                    <div class="row">
                                        <p style="margin: 0px; font-size: 12px; font-weight: 500;">SERVICIO</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row" style="flex: 1;">
                                <div class="col" style="display: flex; flex-direction: column; align-items: center;">
                                    <label for="Detalle" style="display: flex; margin-bottom: 5px;">Imágen enviada en el
                                        ticket:</label>
                                    <img :src="selectedTicket.foto" alt="No se envió evidencia"
                                        style="margin: 20px; max-width: 200px; flex: 1;">
                                    <!--  <textarea class="form-control" id="Detalle" rows="5"
                                        style="resize: none; border-radius: 10px" v-model="TicketMod.detalleAdmin">
                                    </textarea> -->
                                    <!-- <h2 style="font-weight: 400; font-size: 20px; margin-top: 20px;">{{ selectedTicket.foto }}</h2> -->
                                    <!-- <img src="https://pagos.starguest.ec:7083/evidenciaticket/78872024429133658.jpg" alt="Descripción de la imagen" style="margin-top: 20px;"> -->
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <button class="detalle-btn" @click="toggleDetail">
                                        Cerrar</button>
                                    <!-- <button class="send-btn" @click="guardarTicket"
                                        style="margin-top: 20px;">Actualizar</button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
import Empresa from "@/components/Empresa.vue"; // Importa el componente Empresa
import ImagenLateral from "@/components/ImagenLateral.vue";
import axios from 'axios';

export default {
    name: "TicketsAdmin",
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
            selectedFile: "",
            fileName: 'Seleccione un archivo (PDF/PNG)', // Agregar esto
            selectedTicket: JSON.parse(localStorage.getItem('selectedTicket')) || {},
            actividades: [],
            asignaciones: [],
            serverMessage: null,
            isLoading: false,
            TicketMod: {
                id: null,
                estado: "Abierto",
                usuario: null,
                prioridad: this.selectedTicket ? this.selectedTicket.prioridad : null,
                /* categoria: "", */
                campo: "",
                actividad: "",
                /* observacion: "", */
                evidencia: "",
                responsable: `${JSON.parse(localStorage.getItem("idusuario"))}`,
                AdminUnidadHab: this.selectedTicket ? this.selectedTicket.unidad : null,
                detalleAdmin: this.selectedTicket ? this.selectedTicket.foto : null,
            },
            showDetail: false,
            nombre: JSON.parse(localStorage.getItem("nombreusuario")),
            apellido: JSON.parse(localStorage.getItem("apellidousuario")),
        };
    },
    methods: {
        async guardarTicket() {
            try {
                this.isLoading = true;
                this.TicketMod.id = this.selectedTicket.id;
                const formData = new FormData();
                formData.append('id', this.TicketMod.id);
                formData.append('estado', this.TicketMod.estado);
                formData.append('usuario', this.TicketMod.usuario);
                formData.append('campo', this.TicketMod.campo);
                formData.append('actividad', this.TicketMod.actividad);
                /* formData.append('observacion', this.TicketMod.observacion); */
                formData.append('responsable', this.TicketMod.responsable);
                formData.append('evidencia', this.selectedFile);

                console.log('Datos enviados al servidor:', this.TicketMod);
                const response = await axios.post('https://pagos.starguest.ec:7083/actualizaticket', formData);
                this.serverMessage = response.data.mensaje; // Almacenar el mensaje del servidor
                console.log('Respuesta del servidor:', response.data);
            } catch (error) {
                console.error('Error al enviar el ticket:', error.message);
            } finally {
                this.isLoading = false; // Detener la animación de carga
            }
        },

        /* guardarTicket() {
            console.log(this.TicketMod);
            console.log(this.selectedFile);
        }, */
        handleFileOptionSelect(event) {
            const fileInput = this.$el.querySelector("input[type='file']");
            if (event.target.value === "Seleccionar archivo") {
                fileInput.click(); // Abrir el diálogo de selección de archivo
            }
        },
        handleFileUpload(event) {
            // selección del archivo
            this.selectedFile = event.target.files[0];
            this.TicketMod.evidencia = event.target.files[0];
            this.updateFileName(event); // Actualizar el nombre del archivo
            // console.log(this.selectedFile.name); // Acceder al archivo seleccionado
        },
        updateFileName(event) {
            if (event.target.files.length > 0) {
                this.fileName = event.target.files[0].name;
            }
        },
        toggleDetail() {
            this.showDetail = !this.showDetail;
        },
        updateCategoria() {
            const asignacionSeleccionada = this.asignaciones.find(asignacion => asignacion.id === this.TicketMod.usuario);
            if (asignacionSeleccionada) {
                this.TicketMod.campo = asignacionSeleccionada.nombre;
            }
        }
    },
    mounted() {
        fetch('https://pagos.starguest.ec:7083/listaactividades')
            .then(response => response.json())
            .then(data => {
                // Asignar los datos obtenidos a la variable actividades
                this.actividades = data;
            })
            .catch(error => console.error('Error al obtener las actividades:', error));

        fetch('https://pagos.starguest.ec:7083/listacopropietarios')
            .then((response) => response.json())
            .then((data) => {
                this.responsable = data
            })

        fetch('https://pagos.starguest.ec:7083/listaasignacion')
            .then(response => response.json())
            .then(data => {
                // Asignar los datos obtenidos a la variable actividades
                this.asignaciones = data;
            })
            .catch(error => console.error('Error al obtener las asignaciones:', error));
        this.TicketMod.AdminUnidadHab = this.selectedTicket.unidad;
        this.TicketMod.prioridad = this.selectedTicket.prioridad;
    },
};
</script>
<style scoped>
.card.information {
    width: 100%;
    margin-top: 20px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.4);
    padding: 0px 20px;
    margin-left: 0px;
}

.separator-ticket {
    width: 1px;
    height: 60px;
    background-color: #a51699;
    /* Color de la línea vertical */
    margin: 2px 0px;
    padding: 0px 0;
    align-self: center;
}

.separator-detalle {
    width: 1px;
    height: 40px;
    background-color: #a51699;
    /* Color de la línea vertical */
    margin: 2px 0px;
    padding: 0px 0;
    align-self: center;
}

.asignados h2 {
    text-align: center;
    margin-top: 10px;
    font-size: 15px;
}

.asignados p {
    text-align: center;
    font-size: 12px;
}

.asignados-datos h2 {
    text-align: center;
    margin-top: 10px;
    font-size: 17px;
    font-weight: 300;
}

.asignados-datos p {
    text-align: center;
    font-size: 14px;
    font-weight: 500;
}

.card.ticket-creado {
    width: 100%;
    margin-top: 20px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.4);
    padding: 0px 20px;
    margin-left: 0px;
    margin-bottom: 30px;
}

.card.detalle {
    width: 450px;
    margin-top: 30px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.4);
}

.custom-select {
    border-radius: 10px;
    border-style: solid;
    margin-left: 10px;
    text-align: center;
    cursor: pointer;
    width: 170px;
}

.estado-requerimiento {
    border-radius: 10px;
    border-style: solid;
    margin-left: 10px;
    text-align: center;
}

textarea.form-control {
    /* Establecer el color del borde */
    border-color: #333;
    /* Puedes ajustar el color según tu preferencia */
    text-align: left;
}

.custom-file {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.custom-file-input {
    position: relative;
    z-index: 2;
    margin: 0;
    opacity: 0;
}

.custom-file-label {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
    padding: 0px 10px 0px;
    font-weight: 400;
    font-size: 14.8px;
    line-height: 1.5;
    color: #495057;
    background-color: #ffffff;
    border: 1px solid #333;
    border-radius: 10px;
    margin: 0px;
    height: 38px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

input#evidencia.custom-file-input {
    padding: 0;
    height: 0px;
    cursor: pointer;
}

.send-btn {
    background-color: #43415e;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    max-width: 200px;
    font-size: 17px;
    align-self: center;
}

.detalle-btn {
    background-color: #43415e;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    max-width: 150px;
    font-size: 17px;
    align-self: center;
}

.send-btn:hover {
    background-color: #810d78;
}

.detalle-btn:hover {
    background-color: #810d78;
}

.info-detalle p {
    font-size: 15px;
    text-align: center;
}

.subrayado {
    text-decoration: underline;
    text-decoration-color: #a51699;
    font-size: 18px;

}

/* El modal (fondo) */
.modal {
    display: none;
    /* Hidden by default */
    position: fixed;
    /* Stay in place */
    z-index: 1;
    /* Sit on top */
    left: 0;
    top: 0;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgb(0, 0, 0);
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4);
    /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 20%;
    /* Could be more or less, depending on screen size */
    text-align: center;
}

/* The Close Button */
.close {
    color: #aaa;
    position: absolute;
    /* Posiciona el botón de manera absoluta */
    top: 0px;
    /* Posiciona el botón 10px desde la parte superior */
    right: 20px;
    /* Posiciona el botón 10px desde la parte derecha */
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>
