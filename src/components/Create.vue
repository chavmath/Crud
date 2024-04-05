<template>
  <div>
    <h1>Crear nuevo elemento</h1>
    <form @submit.prevent="create">
      <input v-model="newItem" placeholder="Nuevo elemento">
      <button type="submit">Crear</button>
    </form>
  </div>
</template>

<script>
import db from '../firebase'
import { collection, addDoc } from "firebase/firestore"; 

export default {
  data() {
    return {
      newItem: ''
    }
  },
  methods: {
    async create() {
      try {
        const docRef = await addDoc(collection(db, "items"), {
          item: this.newItem
        });
        console.log("Document written with ID: ", docRef.id);
        this.newItem = ''
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }
}
</script>
