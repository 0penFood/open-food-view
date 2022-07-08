<template>
  <q-card class="my-card">
    <q-card-section horizontal>
      <q-img class="col" src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-bottom text-center text-white translucid-dark-bg">
          {{ menuName }}
        </div>
      </q-img>

      <q-card-actions vertical class="justify-around">
        <q-btn
          flat
          round
          color="red"
          icon="delete"
          @click="deleteMenu(menuId)"
        />
        <q-btn flat round color="blue" icon="edit" />
        <q-btn flat round color="green" icon="library_books" />
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script>
import { api } from "src/boot/axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "menu-card-comps",
  props: ["menuName", "menuId"],

  methods: {
    async deleteMenu(idMenu) {
      await api.delete("restaurants/menu/" + idMenu).then((reponse) => {
        location.reload();
      });
    },
  },
});
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 250px;
  height: 150px;
}

.translucid-dark-bg {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
