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
                <form @submit.prevent="buscar">
                    <div class="row">
                        <div class="col-2">
                            <label for="fechaInicial">Fecha inicial:</label>
                            <input type="date" v-model="Busqueda.fechaInicial" class="form-control"
                                placeholder="Fecha inicial">
                        </div>
                        <div class="col-2">
                            <label for="fechaFinal">Fecha final:</label>
                            <input type="date" v-model="Busqueda.fechaFinal" class="form-control"
                                placeholder="Fecha final">
                        </div>
                        <div class="col-2">
                            <button type="submit" class="save-btn" @click="buscar"
                                style="margin-top: 30px;">Buscar</button>
                        </div>
                        <div class="col-2" style="padding: 0px; text-align: left; width: 150px;">
                            <button type="button" class="btn btn-primary export-pdf-btn" @click="exportarPDF">
                                <i class="bi bi-file-pdf"></i> Exportar a PDF
                            </button>
                        </div>
                        <div class="col-2" style="padding: 0px; text-align: left;">
                            <button type="button" class="btn btn-primary export-excel-btn" @click="exportarExcel">
                                <i class="bi bi-file-excel"></i> Exportar a Excel
                            </button>
                        </div>
                    </div>
                </form>
                <div class="row">
                    <h2 style="text-align: left; font-size: 25px; margin: 10px 0px 20px;">Filtrar Información</h2>
                </div>
                <div class="row">
                    <div class="col-2">
                        <label for="nombre">Tick/Resi/fech:</label>
                        <input type="text" v-model="Busqueda.nombre" class="form-control" placeholder="...">
                    </div>
                    <div class="col-2 select-container">
                        <label for="estatus">Estado:</label>
                        <select v-model="Busqueda.estatus" class="form-control" style="appearance: auto;">
                            <option disabled selected>SELECCIONE UNA OPCIÓN</option>
                            <option value="ABIERTO">Abierto</option>
                            <option value="CERRADO">Cerrado</option>
                            <option value="DEMORADO">Demorado</option>
                            <option value="DUPLICADO">Duplicado</option>
                        </select>
                    </div>
                    <div class="col-2 select-container" style="width: 200px;">
                        <label for="categoria">Categoría:</label>
                        <select v-model="Busqueda.categoria" class="form-control" style="appearance: auto;">
                            <option value="ATENCIÓN AL CLIENTE">Atención al cliente</option>
                            <option value="TESORERÍA">Tesorería</option>
                            <option value="MANTENIMIENTO">Mantenimiento</option>
                            <option value="RECOMPENSAS">Recompensas</option>
                            <option value="SUGERENCIAS">Sugerencias</option>
                            <option value="INCONFORMIDADES">Inconformidades</option>
                            <option value="OTROS">Otros</option>
                        </select>
                    </div>
                    <div class="col-2">
                        <div class="centered-content">
                            <button type="button" class="save-btn" @click="limpiarFiltros"
                                style="margin: 30px 0px 0px 0px; padding: 10px 5px;">Limpiar Filtros</button>
                        </div>
                    </div>
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
                                <td>{{ data.ticket }}</td>
                                <td>{{ data.estatus }}</td>
                                <td>{{ data.prioridad }}</td>
                                <td>{{ data.nombres }}</td>
                                <td>{{ data.unidadHab }}</td>
                                <td>{{ data.fechaCreacion }}</td>
                                <td>{{ data.fechaActualizacion }}</td>
                                <td>{{ data.categoria }}</td>
                                <!-- <td>{{ data.telefono }}</td> -->
                                <!-- <td style="max-width: 150px;">{{ data.observacion }}</td> -->
                                <td>{{ data.observacion }}</td>
                                <td>
                                    <img :src="data.evidencia" alt="No se mandó evidencia"
                                        style="width: 100px; max-height: 50px;">
                                </td>
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
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import axios from "axios";

export default {
    name: "Reportes",
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
                fechaFinal: this.getCurrentDate(), // Inicializa con la fecha actual
                categoria: '',
                nombre: '',
                estatus: '',
            },
            Titulos: ['Ticket', 'Estado', 'Prioridad', 'Residente', 'Unidad Hab.', 'Fecha Creación', 'Fecha Actualización', 'Categoria',/*  'Teléfono', */ 'Observación', 'Evidencia'],
            reportData: []
        };
    },
    computed: {
        filteredData() {
            return this.reportData.filter(data =>
                (this.Busqueda.nombre === '' || (data.ticket && data.ticket.toString().includes(this.Busqueda.nombre))
                    || (data.fechaCreacion && data.fechaCreacion.includes(this.Busqueda.nombre)) ||
                    (data.nombres && data.nombres.toLowerCase().includes(this.Busqueda.nombre.toLowerCase()))) &&
                (this.Busqueda.estatus === '' || data.estatus === this.Busqueda.estatus) &&
                (this.Busqueda.categoria === '' || data.categoria === this.Busqueda.categoria)
            );
        }
    },
    methods: {
        async buscar() {
            const fechaInicial = this.Busqueda.fechaInicial;
            const fechaFinal = this.Busqueda.fechaFinal;
            const response = await axios.get(`https://pagos.starguest.ec:7083/listaticketweb/${fechaInicial}/${fechaFinal}`);

            if (response.data.length === 0) {
                this.ticketEncontrado = false; // No se encontraron tickets
                this.reportData = [];
            } else {
                this.ticketEncontrado = true; // Se encontraron tickets
                this.reportData = response.data.map(item => ({
                    ticket: item.id,
                    estatus: item.estado,
                    prioridad: item.prioridad,
                    nombres: item.nombresolicitud,
                    unidadHab: item.unidad,
                    fechaCreacion: item.fechacreacion ? item.fechacreacion.split('T')[0] : null,
                    fechaActualizacion: item.fecha ? item.fecha.split('T')[0] : null,
                    categoria: item.categoria,
                    observacion: item.observacion,
                    evidencia: item.url,
                }));
            }
        },
        cerrarModal() {
            this.ticketEncontrado = null;
        },
        limpiarFiltros() {
            // Limpia los filtros de nombre y prioridad
            this.Busqueda.nombre = '';
            this.Busqueda.estatus = '';
            this.Busqueda.categoria = '';
        },
        exportarPDF() {
            const doc = new jsPDF({
                orientation: 'landscape', // Orientación horizontal
                unit: 'pt', // Unidades en puntos
                marginLeft: 0, // Margen izquierdo a cero
                marginRight: 0 // Margen derecho a cero
            });

            const title = "Reporte Tickets Registrados";
            const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;

            // Centrar el título horizontalmente
            const pageWidth = doc.internal.pageSize.getWidth();
            const x = (pageWidth - titleWidth) / 2;

            // Ajustar la posición vertical del título
            const y = 30; // Puedes ajustar este valor según sea necesario

            doc.text(title, x, y); // Configurar el título de la tabla
            const data = this.filteredData.map(obj => {
                const capitalizeFirstLetter = (str) => {
                    return str.replace(/\b(\w)([^\s]*)/g, function (match, firstChar, restChars) {
                        return firstChar.toUpperCase() + restChars;
                    });
                };
                // Capitalizar cada elemento de la fila
                return [
                    obj.ticket.toUpperCase(),
                    obj.estatus.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()), // Capitalizar solo la primera letra de cada palabra
                    obj.prioridad.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()), // Capitalizar solo la primera letra de cada palabra
                    capitalizeFirstLetter(obj.nombres.toLowerCase()), // Capitalizar solo la primera letra de cada palabra, manteniendo las tildes
                    capitalizeFirstLetter(obj.unidadHab.toLowerCase()), // Capitalizar solo la primera letra de cada palabra, manteniendo las tildes
                    obj.fechaCreacion.toUpperCase(),
                    obj.fechaActualizacion.toUpperCase(),
                    capitalizeFirstLetter(obj.categoria.toLowerCase()), // Capitalizar solo la primera letra de cada palabra, manteniendo las tildes
                    capitalizeFirstLetter(obj.observacion.toLowerCase()), // Capitalizar solo la primera letra de cada palabra, manteniendo las tildes
                    obj.evidencia
                ];
            });
            const headers = this.Titulos;

            const columnWidths = [40, 60, 60, 70, 50, 70, 70, 90, 100, '*']; // La primera columna tendrá un ancho fijo de 40 puntos y el resto ocupará el ancho restante

            // Generar la tabla con los anchos definidos para cada columna
            doc.autoTable({
                head: [headers],
                body: data,
                columnStyles: {
                    0: { cellWidth: columnWidths[0] }, // Aplicar el ancho definido para la primera columna
                    1: { cellWidth: columnWidths[1] }, // El ancho de la segunda columna se calculará automáticamente
                    2: { cellWidth: columnWidths[2] }, // El ancho de la tercera columna se calculará automáticamente
                    3: { cellWidth: columnWidths[3] }, // El ancho de la cuarta columna se calculará automáticamente
                    4: { cellWidth: columnWidths[4] }, // El ancho de la quinta columna se calculará automáticamente
                    5: { cellWidth: columnWidths[5] }, // El ancho de la sexta columna se calculará automáticamente
                    6: { cellWidth: columnWidths[6] }, // El ancho de la séptima columna se calculará automáticamente
                    7: { cellWidth: columnWidths[7] }, // El ancho de la octava columna se calculará automáticamente
                    8: { cellWidth: columnWidths[8] }, // El ancho de la novena columna se calculará automáticamente
                    9: { cellWidth: columnWidths[9] }, // El ancho de la décima columna se calculará automáticamente
                },
                headStyles: {
                    fillColor: [129, 13, 120], // Color de fondo de los headers (negro)
                    textColor: [255, 255, 255], // Color de texto de los headers (blanco)
                    fontStyle: 'bold', // Negrita
                    halign: 'center' // Centrar el texto horizontalmente
                }
            });
            doc.save("reporte.pdf");
        },

        exportarExcel() {
            const data = this.filteredData.map(({ id, ...rest }) => rest); // Excluir el ID
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Reporte");
            XLSX.writeFile(wb, "reporte.xlsx");
        },
        getCurrentDate() {
            const now = new Date();
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

.select-arrow {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(10px);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #000;
    pointer-events: none;
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