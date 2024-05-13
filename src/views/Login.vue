<template>
    <div class="container-fluid vh-100">
        <div class="row">
            <div class="col login-form">
                <div class="row logo" style="margin-top: -20px;">
                    <img src="@/assets/LogoHabitat.png" alt="Logo SG" class="logo-img" />
                </div>
                <div class="row">
                    <label for="nombreUrb" class="form-label">Buscar Urbanización:</label>
                    <div class="input-busqueda">
                        <input type="text" v-model="busqueda" placeholder="Ingrese el nombre"
                            class="form-control mb-4 text-center" style="border-color: #333; width: 50%;" />
                    </div>
                </div>
                <div>
                    <div class="row clientes" style="max-width: 520px;">
                        <div class="col-md-3 card empresa"
                            v-bind:class="{ selected: item.nombre === empresaSeleccionada }"
                            v-for="(item, i) in conjuntos.filter(item => item.nombre.toLowerCase().includes(busqueda.toLowerCase()))"
                            :key="i">
                            <button class="empresa-btn" @click="seleccionarEmpresa(item.nombre)">
                                <img :src="item.imagen" :alt="item.nombre" height="100" />
                            </button>
                            <p class="text-center mt-2" style="text-transform: capitalize;">{{ item.nombre }}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 class="row4">BIENVENIDO</h2>
                    <div class="row input-login">
                        <form @submit.prevent="login">
                            <div class="input-group">
                                <img src="@/assets/usuario.svg" alt="Email Icon" class="icon" />
                                <input type="text" v-model="username" placeholder="USUARIO"
                                    class="custom-placeholder" />
                            </div>
                            <div class="input-group">
                                <img src="@/assets/pass.svg" alt="Password Icon" class="icon" />
                                <input type="password" v-model="password" placeholder="CONTRASEÑA"
                                    class="custom-placeholder" />
                            </div>
                            <button type="submit">INGRESAR</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col message-container vh-100">
                <div class="message-box">
                    <div class="message">
                        <h3>{{ messages[currentMessageIndex].title }}</h3>
                        <p>{{ messages[currentMessageIndex].content }}</p>
                    </div>
                    <div class="slider-buttons">
                        <!-- slider buttons -->
                        <span v-for="(message, index) in messages" :key="index" class="slider-button"
                            :class="{ active: index === currentMessageIndex }" @click="changeMessage(index)"></span>
                    </div>
                </div>
                <img src="@/assets/personaje.svg" alt="Personaje" class="personaje-img" />
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "login",
    data() {
        return {
            username: "1712439486",
            password: "94869690",
            nombreusuario: null,
            empresaSeleccionada: null,
            busqueda: "",
            messages: [
                {
                    title: "SOPORTE DE TICKETS HABITAT",
                    content:
                        "Nuestro sistema de tickets agiliza el flujo de trabajo, prioriza eficientemente las incidencias y garantiza una rápida resolución.",
                },
                {
                    title: "SOPORTE DE TICKETS HABITAT",
                    content:
                        "Mantente al tanto de todas tus incidencias con notificaciones en tiempo real.",
                },
            ],
            currentMessageIndex: 0, // Índice del mensaje actual
            conjuntos: [],
        };
    },
    mounted() {
        /* fetch('https://pagos.starguest.ec:7083/listainmuebles') */
        fetch('https://crud-back-mlk9.onrender.com/listainmuebles')
            .then(response => response.json())
            .then(data => {
                this.conjuntos = data;
            });

    },
    methods: {
        login() {
            if (!this.empresaSeleccionada) {
                alert('Por favor, seleccione una empresa antes de iniciar sesión.');
                return;
            }
            fetch(
                "https://sp.pluslogistics.com.ec:7090/logincnd/" +
                this.username +
                "/" +
                this.password
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    localStorage.setItem("nombreusuario", JSON.stringify(data.nombres));
                    localStorage.setItem("apellidousuario", JSON.stringify(data.apellidos));
                    localStorage.setItem("idusuario", JSON.stringify(data.id));
                    if (data.identificacion == "Usuario no existe.") {
                        alert("Credenciales incorrectas");
                    }
                    else {
                        this.$router.push("/reportes");
                    }
                });
        },
        changeMessage(index) {
            // Método para cambiar el mensaje
            this.currentMessageIndex = index;
        },
        /* seleccionarEmpresa(value) {
            console.log(value, "Empresa seleccionada");
            console.log(this.conjuntos);
        }, */
        seleccionarEmpresa(nombre) {
            this.empresaSeleccionada = nombre;
            const empresa = this.conjuntos.find(item => item.nombre === nombre);
            if (empresa) {
                localStorage.setItem('empresaSeleccionada', JSON.stringify(empresa));
                /* fetch(`https://pagos.starguest.ec:7083/listacopropietarios/${empresa.id}`) */
                fetch(`https://crud-back-mlk9.onrender.com/listacopropietarios/${empresa.id}`)
                    .then(response => response.json())
                    .then(data => {
                        this.copropietarios = data;
                        localStorage.setItem('copropietarios', JSON.stringify(data));
                    });
            }
            console.log(nombre, "Empresa seleccionada");
        }
    },
};
</script>

<style>
/* .login-form {
} */
.empresa-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
}

.empresa-btn:hover {
    background-color: white;
    border-top: 2px solid #810d78;
    border-radius: 10px;
}

.empresa {
    box-shadow: 0px 6px 10px 3px rgba(0, 0, 0, 0.4);
    display: flex;
    padding: 0px 0px !important;
    margin-bottom: 50px;
    width: 100px !important;
    height: 100px !important;
    margin-right: 30px;
    border-radius: 10px !important;
    border: 2px solid transparent;
    /* Agrega un borde transparente */
}

.card.selected {
    border-color: #810d78;
    border-width: 5px;
    /* Cambia el color del borde cuando la tarjeta está seleccionada */
}

.login-form {
    flex: 1;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px;
    height: 100vh;
}

.login-form h2 {
    margin-bottom: 10px;
    margin-top: 20px;
    font-size: 25px;
}

.input-group {
    position: relative;
}

.input-group i {
    position: absolute;
    top: 30%;
    left: 0px;
    transform: translateY(-50%);
    color: #333;
    font-size: 24px;
    /* tamaño del ícono */
}

.input-group input {
    width: 200px;
    padding: 10px;
    padding-left: 40px;
    /* Añade un padding a la izquierda para hacer espacio para el icono */
    border: none;
    border-bottom: 1px solid #333;
    margin-bottom: 20px;
    outline: none;
}

.icon {
    position: absolute;
    top: 30%;
    left: 0px;
    transform: translateY(-50%);
    width: 24px;
    /* Ajusta el tamaño de la imagen según sea necesario */
    height: 24px;
}

.custom-placeholder::placeholder {
    color: #bdbdbd;
    /* Cambia el color del texto del placeholder */
}

.input-login button {
    padding: 15px 70px;
    background-color: #43415e;
    color: white;
    border: none;
    cursor: pointer;
    margin-top: 20px;
    font-family: "Oswald", sans-serif;
    font-weight: 500;
    margin-top: 20px;
    border-radius: 7px;
}

button:hover {
    background-color: #810d78;
}

.logo-img {
    width: 100% !important;
    padding: 2%;
    height: 120px;
}

.logo {
    margin-bottom: 20px;
}

.message-container {
    flex: 1;
    background-color: #f2f2f2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px;
    min-height: 100vh;
    position: relative;
}

.message-box {
    position: absolute;
    top: 20px;
    right: 40px;
    background-color: rgba(255, 255, 255, 0.8);
    /* Color del fondo con transparencia */
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    /* Sombra suave */
    margin-top: 3%;
    width: 48%;
}

.slider-buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: -10px;
}

.slider-button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #f2f2f2;
    margin: 0 5px;
    cursor: pointer;
    border: 1px solid #93459f;
}

.slider-button.active {
    background-color: #939397;
}

.personaje-img {
    width: 400px;
    margin-top: 20%;
}

.message-box h3 {
    margin-top: -10px;
    margin-bottom: 20px;
    margin-left: 0%;
    font-weight: 600;
    font-style: normal;
    font-size: 19px;
}

p {
    margin-top: 20px;
    font-size: 15px;
    text-align: justify;
}

.clientes>div img {
    width: 100px;
    border-radius: 6px;
}

.input-busqueda {
    display: flex;
    justify-content: center;
}
</style>
