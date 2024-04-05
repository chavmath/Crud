<template>
  <div>
    <h1>Actualizar elemento</h1>
    <form @submit.prevent="update">
      <input v-model="item.name" placeholder="Nombre del elemento">
      <button type="submit">Actualizar</button>
    </form>
  </div>
</template>

<script>
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import db from '../firebase'

export default {
  data() {
    return {
      item: {}
    }
  },
  async created() {
    const docRef = doc(db, "items", this.$route.params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.item = docSnap.data();
    } else {
      console.log("No such document!");
    }
  },
  methods: {
    async update() {
      const docRef = doc(db, "items", this.$route.params.id);

      await updateDoc(docRef, {
        name: this.item.name
      });
    }
  }
}
</script>
