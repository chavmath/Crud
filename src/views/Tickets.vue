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
            <div class="col-8 ticket" style="padding: 10px;">
                <div class="row" style="margin-left: 10px;">CREACIÓN DE TICKET</div>
                <div class="row">
                    <div class="col">
                        <form @submit.prevent="onSubmit">
                            <div class="card p-3">
                                <div class="form-group row">
                                    <div class="col">
                                        <label for="prioridad">Prioridad:</label>
                                        <select class="custom-select" id="prioridad" style="background-color: #ffffff;"
                                            v-model="form.prioridad" :disabled="disablePriority">
                                            <option disabled selected>SELECCIONE UNA OPCIÓN</option>
                                            <option value="Baja">Baja</option>
                                            <option value="Media">Media</option>
                                            <option value="Alta">Alta</option>
                                            <!-- <option value="Normal">Normal</option>
                                            <option value="Urgente">Urgente</option> -->
                                        </select>
                                    </div>
                                    <div class="col">
                                        <label for="categoria">Categoría:</label>
                                        <select class="custom-select" id="categoria" style="background-color: #ffffff;"
                                            v-model="form.categoria" :disabled="disablePriority">
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
                                    <!-- <div class="col">
                                        <label for="tipo">Tipo:</label>
                                        <select class="custom-select" id="tipo" style="background-color: #ffffff;"
                                            v-model="TicketCreado.tipo" @change="checkPriorityOptions">
                                            <option disabled selected>SELECCIONE UNA OPCIÓN</option>
                                            <option value="tipo1">Atención al cliente</option>
                                            <option value="tipo2">Queja</option>
                                            <option value="tipo3">Sugerencia</option>
                                        </select>
                                    </div> -->
                                    <div class="col">
                                        <label for="residente">Residente:</label>
                                        <select class="custom-select" id="residente" style="background-color: #ffffff;"
                                            v-model="form.usuario" :disabled="disablePriority">
                                            <option disabled value="">SELECCIONE UNA OPCIÓN</option>
                                            <option v-for="copropietario in copropietarios" :value="copropietario.id"
                                                :key="copropietario.id">{{ copropietario.nombre }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col" style="text-align: left; max-width: 33%;">
                                        <label for="resumen">Unidad Habitacional:</label>
                                        <select class="custom-select" id="residente"
                                            style="background-color: #ffffff; max-width: 100%;" v-model="form.unidad"
                                            :disabled="disablePriority">
                                            <option disabled value="">SELECCIONE UNA OPCIÓN</option>
                                            <option v-for="unidad in unidades" :value="unidad.split('_')[1]"
                                                :key="unidad.split('_')[1]">{{ unidad.split('_')[1] }}</option>
                                        </select>
                                    </div>
                                    <div class="col-5" style="margin-left: 0px;">
                                        <label
                                            style="text-align: left; display: block; margin: 10px 0px 10px 15px;">Evidencia:</label>
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="foto"
                                                placeholder="JPG / PDF" accept=".jpg, .png, .pdf"
                                                @change="handleFileUpload" />
                                            <label class="custom-file-label" for="foto">{{ fileName }}</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="observaciones">Observaciones:</label>
                                    <textarea class="form-control" id="Observacion" rows="5"
                                        style="resize: none; border-radius: 10px" v-model="form.descripcion">
                                    </textarea>
                                </div>
                                <button type="submit" class="send-btn">
                                    <span v-if="!isLoading">Enviar</span>
                                    <!-- Mostrar "Actualizar" si la solicitud no está en curso -->
                                    <span v-if="isLoading">Cargando...</span>
                                    <!-- Mostrar "Cargando..." si la solicitud está en curso -->
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal" v-if="serverMessage" style="display: block;">
                    <div class="modal-content">
                        <span class="close" @click="serverMessage = null">&times;</span>
                        <p style="text-align: center; font-size: 20px;">{{ serverMessage }}</p>
                        <!-- Mostrar el mensaje del servidor -->
                        <router-link to="/tickets">
                            <button type="button" class="send-btn" @click="closeModal">Regresar</button>
                            <!-- Botón para regresar a ListaTickets -->
                        </router-link>
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
import ImagenLateral from "@/components/ImagenLateral.vue"; // Importa el componente ImagenLateral
import axios from 'axios';
import { createTicket } from "../../controllers/user.controller"
import { reactive } from 'vue'
import { db } from '../firebase.js'; // Asegúrate de que la ruta al archivo firebase.js sea correcta
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { ref } from 'vue';

export default {
    name: "Tickets",
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
            disablePriority: false,
            copropietarios: JSON.parse(localStorage.getItem('copropietarios')) || [],
            unidades: [],
            serverMessage: null,
            isLoading: false,
            fileName: 'Seleccione un archivo (PDF/PNG)', // Agregar esto
            TicketCreado: {
                usuario: null,
                /* responsable: "VILLACRÉS EDISON JAVIER", */
                prioridad: null,
                categoria: null,
                // tipo: null,
                unidad: null,
                foto: "",
                descripcion: "",
                inmueble: JSON.parse(localStorage.getItem('empresaSeleccionada')).nombre,
            },
        };
    },
    setup() {
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000; // Obtén el desfase horario en milisegundos
        const localDate = new Date(now - offset); // Ajusta la fecha a la zona horaria local

        const form = reactive({
            id: '',
            usuario: '',
            prioridad: '',
            categoria: '',
            unidad: '',
            descripcion: '', //observacion
            //foto: '',
            inmueble: JSON.parse(localStorage.getItem('empresaSeleccionada')).nombre,
            estado: 'Abierto',
            fecha: localDate.toISOString(), // Convierte la fecha local a una cadena de texto
            fechacreacion: localDate.toISOString(),
            nombresolicitud: '',
            actividad: '',
            responsable: '',
        });

        const copropietarios = JSON.parse(localStorage.getItem('copropietarios')) || [];
        let isLoading = ref(false); // Variable reactiva para controlar la animación de carga
        let serverMessage = ref(''); // Variable reactiva para almacenar el mensaje del servidor

        const onSubmit = async () => {
            isLoading.value = true; // Iniciar la animación de carga
            try {
                // Busca el nombre del residente usando el id
                const residente = copropietarios.find(copropietario => copropietario.id === form.usuario);
                if (residente) {
                    form.nombresolicitud = residente.nombre;
                }
                const metadataRef = doc(db, 'tickets', 'metadata'); // Referencia al documento 'metadata'
                let metadataDoc = await getDoc(metadataRef); // Obtiene el documento 'metadata'
                let ticketId;
                if (metadataDoc.exists()) { // Verifica si el documento 'metadata' existe
                    ticketId = metadataDoc.data().lastId; // Obtiene el último id utilizado
                } else {
                    ticketId = 0; // Inicializa lastId con 0 si el documento 'metadata' no existe
                }
                form.id = (++ticketId).toString(); // Incrementa el contador de tickets, lo convierte a cadena y lo usa como id
                await updateDoc(metadataRef, { lastId: ticketId }); // Actualiza el último id en el documento 'metadata'
                await setDoc(doc(db, 'tickets', form.id), { ...form }); // Crea el ticket
                console.log('Ticket creado con éxito:', form);
                serverMessage.value = 'Ticket creado con éxito'; // Almacenar el mensaje del servidor
            } catch (error) {
                console.error('Error al enviar el ticket:', error.message);
                serverMessage.value = 'Error al enviar el ticket: ' + error.message; // Almacenar el mensaje del servidor
            } finally {
                isLoading.value = false; // Detener la animación de carga
                // Limpia el formulario
                form.usuario = '';
                form.prioridad = '';
                form.categoria = '';
                form.unidad = '';
                form.descripcion = '';
                //form.foto = '';
                form.inmueble = '';
                form.estado = '';
                form.fecha = '';
                form.fechacreacion = '';
                form.nombresolicitud = '';
                //form.actividad = '';
                //form.responsable = '';
            }
        };

        return { form, onSubmit, isLoading, serverMessage };
    },
    methods: {
        /* async guardarTicket() {
            try {
                if (!this.TicketCreado.prioridad || !this.TicketCreado.categoria || !this.TicketCreado.unidad_habitacional || !this.TicketCreado.usuario) {
                    alert('Por favor, complete todos los campos');
                    return;
                }
                this.isLoading = true;
                const formData = new FormData();
                formData.append('usuario', this.TicketCreado.usuario);
                formData.append('prioridad', this.TicketCreado.prioridad);
                formData.append('categoria', this.TicketCreado.categoria);
                formData.append('unidad_habitacional', this.TicketCreado.unidad_habitacional);
                formData.append('descripcion', this.TicketCreado.descripcion);
                formData.append('foto', this.selectedFile);
                formData.append('inmueble', this.TicketCreado.inmueble);

                console.log('Datos enviados al servidor:', this.TicketCreado);

                //const response = await axios.post('https://pagos.starguest.ec:7083/regticket', formData);
                this.serverMessage = response.data.mensaje; // Almacenar el mensaje del servidor

                console.log('Respuesta del servidor:', response.data);
            } catch (error) {
                console.error('Error al enviar el ticket:', error.message);
            } finally {
                this.isLoading = false; // Detener la animación de carga
            }
        }, */
        /* guardarTicket() {
            console.log(this.TicketCreado);
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
            this.TicketCreado.foto = event.target.files[0];
            this.updateFileName(event); // Actualizar el nombre del archivo
            // console.log(this.selectedFile.name); // Acceder al archivo seleccionado
        },
        updateFileName(event) {
            if (event.target.files.length > 0) {
                this.fileName = event.target.files[0].name;
            }
        },
        /* checkPriorityOptions() {
            if (this.TicketCreado.tipo === 'tipo2' || this.TicketCreado.tipo === 'tipo3') {
                this.TicketCreado.prioridad = null;
                this.disablePriority = true;
            } else {
                this.disablePriority = false;
            }
        } */
        closeModal() {
            this.serverMessage = null;
        },
    },
    watch: {
        'form.usuario': function (newVal, oldVal) {
            if (newVal !== oldVal) {
                /* fetch(`https://pagos.starguest.ec:7083/listaunidades/${newVal}`) */
                fetch(`https://crud-back-mlk9.onrender.com/listaunidades/${newVal}`)
                    .then(response => response.json())
                    .then(data => {
                        this.unidades = data.departamentos;
                    });
            }
        }
    },
};
</script>
<style scoped>
.card {
    width: 70%;
    margin-top: 10px;
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.4);
    padding: 0px 20px;
    margin-left: -10px;
}

.custom-select {
    border-radius: 10px;
    border-style: solid;
    margin-left: 10px;
    text-align: center;
    cursor: pointer;
}

textarea.form-control {
    /* Establecer el color del borde */
    border-color: #333;
    /* Puedes ajustar el color según tu preferencia */
    text-align: left;
}

.custom-file {
    position: relative;
    display: inline-block;
    width: 90%;
    height: calc(1.5em + .75rem + 2px);
    margin-bottom: 0;
}

.custom-file-input {
    position: relative;
    z-index: 2;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
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
    height: 47px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

input#foto.custom-file-input {
    padding: 0;
    height: 0px;
    cursor: pointer;
}

input#file-upload-button {
    cursor: pointer;
    padding: 0px;
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

.send-btn:hover {
    background-color: #810d78;
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
