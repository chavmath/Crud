<template>
  <div class="card card-body mt-4">
    <h3>Edit users</h3>
    <form @submit.prevent="update">
      <div class="form-group">
        <label>Name</label>
        <input v-model="form.name" class="form-control" required />
      </div>

      <div class="form-group mt-3">
        <label>Email</label>
        <input v-model="form.email" class="form-control" type="email" required />
      </div>

      <div class="form-group mt-3">
        <label>Numero</label>
        <input v-model="form.numero" class="form-control" type="number" required />
      </div>
      <td>
      <button type="submit" class="btn btn-primary mt-3">Update</button>
      <router-link :to="`/`">
        <button class="btn btn-danger btn-sm" style="margin-top: 17px; height: 38px; font-size: 16px; margin-left: 5px; border-radius: 5px;">
          Cancelar
        </button>
      </router-link>
    </td>
    </form>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getUser, updateUser } from "../../controllers/user.controller";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userId = computed(() => route.params.id);

    const form = reactive({ name: "", email: "" });
    onMounted(async () => {
      const user = await getUser(userId.value);
      console.log(user, userId.value);
      form.name = user.name;
      form.email = user.email;
      form.numero = user.numero;
    });

    const update = async () => {
      await updateUser(userId.value, { ...form });
      router.push("/");
      form.name = "";
      form.email = "";
      form.numero = "";
    };
    return { form, update };
  },
};
</script>
<style>
.form-group label {
  color: black;
}

h3 {
  color: black;
}
</style>
