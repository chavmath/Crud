<template>
    <div class="row px-2 forzar">
        <div class="col-3" style="width: 120px;">
            <div class="card p-3 iconoEmpresa" style="margin: auto;">
                <img :src="logo" :alt="nombre" class="empresa-img" />
            </div>
        </div>
        <div class="col" style="padding: 0px 0px;">
            <div class="row info" style="margin: 0px;">
                <div class="col-3" style="padding: 0px; margin-right: 5px; display: grid; align-items: center;">
                    <p style="text-align: center; font-size: 13px; margin-bottom: 0px; text-transform: capitalize;">{{ nombre }}</p>
                    <p style="text-align: center; font-size: 14px; font-weight: 300; margin-bottom: 0px;">Conjunto Habitacional</p>
                </div>
                <div class="col-1 separator" style="padding: 0px; width: 1px;">
                    <div class="separator"></div>
                </div>
                <div class="col-4" style="padding: 0px; display: grid; align-items: center;">
                    <p style="text-align: center; font-size: 13px; margin-bottom: 0px;">{{ administrador }}</p>
                    <p style="text-align: center; font-size: 14px;  font-weight: 300; margin-bottom: 0px;">Administrador de Conjunto
                    </p>
                </div>
                <div class="col-1 separator" style="padding: 0px; width: 1px;">
                    <div class="separator"></div>
                </div>
                <div class="col-4" style="padding: 0px; display: grid; align-items: center;">
                    <p style="text-align: center; font-size: 13px; margin-bottom: 0px;">{{ contacto }}</p>
                    <p style="text-align: center; font-size: 14px;  font-weight: 300; margin-bottom: 0px;">Contacto de Administrador
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        logo: {
            type: String,
            default: () => {
                const empresa = JSON.parse(localStorage.getItem('empresaSeleccionada'));
                return empresa ? empresa.imagen : "https://img.freepik.com/free-vector/logo-real-estate-home-solutions-that-is-home-solution_527952-33.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1713139200&semt=ais";
            }
        },
        nombre: {
            type: String,
            default: () => {
                const empresa = JSON.parse(localStorage.getItem('empresaSeleccionada'));
                return empresa ? empresa.nombre : "REAL ESTATE";
            }
        },
        administrador: {
            type: String,
            default: () => {
                const empresa = JSON.parse(localStorage.getItem('empresaSeleccionada'));
                return empresa ? empresa.administrador : "Juan Pérez";
            }
        },
        contacto: {
            type: String,
            default: () => {
                const empresa = JSON.parse(localStorage.getItem('empresaSeleccionada'));
                return empresa ? empresa.contacto : "55 1234 5678";
            }
        }
    }
}

</script>

<style>
.empresa-img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
}

.card.iconoEmpresa {
    align-items: center;
    max-height: 100%;
    max-width: 100%;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.4);
    display: flex;
    padding: 0px 10px;
}

.card.p-3.iconoEmpresa {
    padding: 0px !important;
    display: flex;
    align-items: center;
}

.separator {
    width: 1px;
    height: 40px;
    background-color: #a51699;
    /* Color de la línea vertical */
    margin: 2px 0px;
    padding: 0px 0;
    align-self: center;
}

.forzar {
    display: flex;
    align-items: center;
    padding: 0px 10px;
    height: 100%;
}

.centered-content {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
}
</style>