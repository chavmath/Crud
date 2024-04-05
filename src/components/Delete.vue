<template>
  <div>
    <h1>Eliminar elemento</h1>
    <button @click="delete">Eliminar</button>
  </div>
</template>

<script>
import { doc, deleteDoc } from "firebase/firestore"; 
import db from '../firebase'

export default {
  methods: {
    async delete() {
      const docRef = doc(db, "items", this.$route.params.id);
      await deleteDoc(docRef);
    }
  }
}
</script>
