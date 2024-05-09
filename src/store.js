import { createStore } from 'vuex'

export default createStore({
  state: {
    empresaSeleccionada: {
      icono: null,
      nombre: null,
      administrador: null,
      contacto: null
    }
  },
  mutations: {
    SET_EMPRESA(state, empresa) {
      state.empresaSeleccionada = empresa
    }
  }
})
