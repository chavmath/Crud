<template>
    <div class="card mt-4" style="width: 800px;">
      <table class="table m-0">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Numero</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="{ id, name, email, numero } in users" :key="id">
            <td>{{ name }}</td>
            <td>{{ email }}</td>
            <td>{{ numero }}</td>
            <td>
              <router-link :to="`/edit/${id}`">
                <button class="btn btn-primary btn-sm me-2">
                  Edit
                </button>
              </router-link>
              <button class="btn btn-danger btn-sm" @click="deleteUser(id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { useLoadUsers, deleteUser } from '../../controllers/user.controller'
  
  export default {
    setup() {
      const users = useLoadUsers()
      console.log(users)
      return { users, deleteUser }
    }
  }
  </script>
  