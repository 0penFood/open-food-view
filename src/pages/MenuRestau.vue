<template>
  <q-page padding>
    <div class="row" v-for="menus in menusArray" :key="menus.id">
      <menu-card-comps
        class="margin-card"
        :menu-name="menus.name"
      ></menu-card-comps>
    </div>
  </q-page>
</template>

<script>
import MenuCardComps from "components/MenuCardComps.vue";
import { Cookies } from "quasar";
import { defineComponent } from "vue";
import { api } from "boot/axios";

export default defineComponent({
  name: "menuRestau",
  components: {
    MenuCardComps,
  },

  data() {
    return {
      menusArray: [],
    };
  },

  async mounted() {
    const restauID = Cookies.get("restau_id");

    this.menus = await api
      .get("restaurants/" + restauID)
      .then(async (response) => {
        for (let i = 0; i < response.data.length; i++) {
          for (let j = 0; j < response.data[i].menus.length; j++) {
            this.menusArray.push({
              id: i + j,
              name: response.data[i].menus[j].name,
            });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
});
</script>

<style scoped>
.margin-card {
  margin: 5px;
}
</style>
