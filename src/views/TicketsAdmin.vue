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
                                                <option value="En proceso">En proceso</option>
                                                <option value="Demorado">Demorado</option>
                                                <option value="Cerrado">Cerrado</option>
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
                                <div class="col">
                                    <label for="prioridad">Prioridad:</label>
                                    <input type="text" class="form-control text-center" id="Prioridad"
                                        placeholder="prioridad en ticket"
                                        style="border-radius: 10px; border-color: gray; height: 28px;"
                                        v-model="TicketMod.prioridad" readonly />
                                </div>
                                <div class="col" style="padding: 0px;">
                                    <label for="categoria">Asignar a:</label>
                                    <select class="custom-select" id="categoria" style="background-color: #ffffff;"
                                        v-model="TicketMod.categoria">
                                        <option disabled selected>SELECCIONE UNA OPCIÓN</option>
                                        <option value="Atención al cliente">Atención al cliente</option>
                                        <option value="Tesorería">Tesorería</option>
                                        <option value="Mantenimiento">Mantenimiento</option>
                                        <option value="Recompensas">Recompensas</option>
                                        <option value="Sugerencias">Sugerencias</option>
                                        <option value="Inconformidades">Inconformidades</option>
                                        <option value="Otros">Otros</option>
                                    </select>
                                </div>
                                <div class="col">
                                    <label for="execution-time">Tiempo para ejecutar la tarea:</label>
                                    <select class="custom-select" id="execution-time" v-model="TicketMod.executionTime">
                                        <option disabled selected>SELECCIONE UNA OPCIÓN</option>
                                        <option value="1 minuto">1 minuto</option>
                                        <option value="2 minutos">2 minutos</option>
                                        <option value="5 minutos">5 minutos</option>
                                        <option value="10 minutos">10 minutos</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row" style="margin: 10px 0px;">
                                <div class="col">
                                    <label v-if="TicketMod.estado === 'Demorado'" for="motivoDemora">Motivo de
                                        Demora:</label>
                                    <div v-if="TicketMod.estado === 'Demorado'">
                                        <select class="custom-select" id="motivoDemora"
                                            v-model="TicketMod.motivoDemora">
                                            <option disabled selected>SELECCIONE UNA OPCIÓN</option>
                                            <option value="Injustificado">Injustificado</option>
                                            <option value="Falta de Recursos">Falta de Recursos</option>
                                        </select>
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
                                        style="resize: none; border-radius: 10px" v-model="TicketMod.descripcion">
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
                                        <p style="margin: 0px; font-weight: 300;">{{
                                            calculateResponseTimeMinutes() }} minutos</p>
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
                            <div class="row">
                                <div class="col">
                                    <button class="detalle-btn" @click="toggleDetail">
                                        Cerrar</button>
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
import { reactive } from 'vue'
import { db } from '../firebase.js'; 
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { ref } from 'vue';

export default {
    name: "TicketsAdmin",
    components: {
        Logo,
        Usuario,
        MenuCliente,
        Busqueda, 
        Empresa,
        ImagenLateral,
    },
    data() {
        return {
            selectedTicket: JSON.parse(localStorage.getItem('selectedTicket')) || {},
            asignaciones: [],
            serverMessage: null,
            isLoading: false,
            TicketMod: {
                id: null,
                estado: this.selectedTicket ? this.selectedTicket.estado : null,
                usuario: null,
                prioridad: this.selectedTicket ? this.selectedTicket.prioridad : null,
                categoria: this.selectedTicket ? this.selectedTicket.categoria : null,
                descripcion: "",
                responsable: `${JSON.parse(localStorage.getItem("nombreusuario"))} ${JSON.parse(localStorage.getItem("apellidousuario"))}`,
                AdminUnidadHab: this.selectedTicket ? this.selectedTicket.unidad : null,
                detalleAdmin: this.selectedTicket ? this.selectedTicket.foto : null,
                executionTime: this.selectedTicket ? (this.selectedTicket.executionTime) : null,
                motivoDemora: this.selectedTicket ? this.selectedTicket.motivoDemora : ""
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
                const now = new Date();
                // desfase horario en milisegundos
                const offset = now.getTimezoneOffset() * 60000;
                // Ajusta la fecha y hora a la zona horaria local
                const localDate = new Date(now - offset);

                const ticketData = {
                    id: this.TicketMod.id,
                    estado: this.TicketMod.estado,
                    categoria: this.TicketMod.categoria,
                    descripcion: this.TicketMod.descripcion,
                    responsable: this.TicketMod.responsable,
                    fecha: localDate.toISOString(),
                    executionTime: this.TicketMod.executionTime,
                    motivoDemora: this.TicketMod.estado === 'Demorado' ? this.TicketMod.motivoDemora : null
                };

                console.log('Datos enviados al servidor:', ticketData);
                const ticketRef = doc(db, 'tickets', this.TicketMod.id);
                await updateDoc(ticketRef, ticketData);
                this.serverMessage = 'Ticket actualizado con éxito'; // Mensaje de éxito personalizado
                console.log(this.serverMessage);
            } catch (error) {
                console.error('Error al actualizar el ticket:', error.message);
                this.serverMessage = 'Error al actualizar el ticket: ' + error.message; // Mensaje de error personalizado
            } finally {
                this.isLoading = false; // Detener la animación de carga
            }
        },
        toggleDetail() {
            this.showDetail = !this.showDetail;
        },
        updateCategoria() {
            const asignacionSeleccionada = this.asignaciones.find(asignacion => asignacion.id === this.TicketMod.usuario);
            if (asignacionSeleccionada) {
                this.TicketMod.categoria = asignacionSeleccionada.nombre;
            }
        },
        calculateResponseTimeMinutes() {
            const ticket = this.selectedTicket;
            if (!ticket.fechaCreacionCompleta) return 0;

            // Convertir las fechas a milisegundos desde la época Unix
            const creationDate = new Date(ticket.fechaCreacionCompleta).getTime();

            // Obtener la fecha y hora actuales y restarle 5 horas
            const currentDate = new Date();
            currentDate.setHours(currentDate.getHours() - 5);
            const adjustedCurrentDate = currentDate.getTime();

            const timeDifference = adjustedCurrentDate - creationDate;
            const timeDifferenceMinutes = Math.floor(timeDifference / (1000 * 60)); // Convertir a minutos

            return timeDifferenceMinutes;
        },
    },
    mounted() {
        this.TicketMod.AdminUnidadHab = this.selectedTicket.unidad;
        this.TicketMod.prioridad = this.selectedTicket.prioridad;
        this.TicketMod.estado = this.selectedTicket.estatus;
        this.TicketMod.categoria = this.selectedTicket.categoria;
        this.TicketMod.executionTime = (this.selectedTicket.executionTime) || null;
        this.TicketMod.motivoDemora = this.selectedTicket.motivoDemora || "";
    }
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
