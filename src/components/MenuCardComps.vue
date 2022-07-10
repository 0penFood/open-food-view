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
        <q-btn flat round color="blue" icon="" />
        <q-btn
          flat
          round
          color="green"
          icon="library_books"
          @click="printMenu = true"
        />
      </q-card-actions>
    </q-card-section>
  </q-card>
  <div>
    <q-dialog v-model="printMenu">
      <q-card>
        <q-card-section class="column items-center">
          <q-input
            filled
            v-model="menusArray[0].name"
            label="Menu name"
            readonly
          />
          <q-input
            filled
            v-model="menusArray[0].details"
            label="Menu details"
            readonly
          />
          <q-input
            filled
            v-model="menusArray[0].price"
            label="Menu price"
            readonly
          />
          <q-input
            filled
            v-model="menusArray[0].preparationTime"
            label="Menu preparation"
            readonly
          />
          <p style="font-size: 3em; margin-top: 10%">Articles</p>
          <div v-for="art in menusArray[0].article" :key="art">
            <p style="font-size: 2em">{{ art.name }}</p>
            <q-input
              filled
              v-model="art.price"
              label="Article price"
              readonly
            />
            <q-input
              filled
              v-model="art.quantity"
              label="Article quantity"
              readonly
            />
            <q-input
              filled
              v-model="art.timePreparedDef"
              label="Article preparation"
              readonly
            />
          </div>
        </q-card-section>
        <q-card-actions align="right"> </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { api } from "src/boot/axios";
import { defineComponent, ref } from "vue";
import { Cookies } from "quasar";

export default defineComponent({
  name: "menu-card-comps",
  inheritAttrs: false,
  props: ["menuName", "menuId"],

  data() {
    return {
      menusArray: [],
    };
  },

  methods: {
    async deleteMenu(idMenu) {
      await api.delete("restaurants/" + idMenu + "/articles").then(async () => {
        await api.delete("restaurants/menu/" + idMenu).then((reponse) => {
          location.reload();
        });
      });
    },
  },

  async mounted() {
    const restauID = Cookies.get("restau_id");

    this.menus = await api
      .get("restaurants/" + restauID)
      .then(async (response) => {
        for (let i = 0; i < response.data.length; i++) {
          for (let j = 0; j < response.data[i].menus.length; j++) {
            if (response.data[i].menus[j].id === this.menuId) {
              const articlesList = await api
                .get("restaurants/menu/" + this.menuId)
                .then(async (res) => {
                  return res.data[0].articles;
                });
              this.menusArray.push({
                name: response.data[i].menus[j].name,
                details: response.data[i].menus[j].details,
                price: response.data[i].menus[j].price,
                preparationTime: response.data[i].menus[j].timePreparedDef,
                article: articlesList,
              });
            }
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });

    console.log(this.menusArray);
  },

  setup() {
    return {
      printMenu: ref(null),
    };
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
