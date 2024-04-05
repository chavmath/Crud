<template>
  <div>
    <h1>Inicio</h1>
    <div v-for="item in items" :key="item.id">
      {{ item.data().name }}
    </div>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import db from '../firebase'

export default {
  data() {
    return {
      items: []
    }
  },
  async created() {
    const querySnapshot = await getDocs(collection(db, "items"));
    querySnapshot.forEach((doc) => {
      this.items.push(doc);
    });
  }
}
</script>
