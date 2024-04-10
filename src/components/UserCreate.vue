<template>
    <div class="card card-body mt-4" style="max-width: 400px;">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label>Name</label>
          <input v-model="form.name" class="form-control" required />
        </div>  
        <div class="form-group mt-3">
          <label>Email</label>
          <input v-model="form.email" class="form-control" type="email" required/>
        </div>
        <div class="form-group mt-3">
          <label>Numero</label>
          <input v-model="form.numero" class="form-control" type="number" required />
        </div>  
        <button type="submit" class="btn btn-success mt-3">
          Crear Usuario
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import { createUser } from "../../controllers/user.controller"
  import { reactive } from 'vue'
  
  export default {
    setup() {
      const form = reactive({ name: '', email: '', numero: ''})
  
      const onSubmit = async () => {
        await createUser({ ...form })
        form.name = ''
        form.email = ''
        form.numero = ''
      }
  
      return { form, onSubmit }
    }
  }
  </script>
  
  <style>
.form-group label{
  color: black;
}
  </style>