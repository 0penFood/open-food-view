<template>
  <q-page padding>
    <div class="row">
      <q-card class="add-card margin-card">
        <div class="q-pa-md q-gutter-md row justify-center">
          <div
            v-ripple.center
            class="relative-position container bg-grey-3 text-black inline flex flex-center"
            @click="addMenu = true"
          >
            <q-icon name="add" size="xl"></q-icon>
          </div>
        </div>
      </q-card>
      <menu-card-comps
        v-for="menus in menusArray"
        :key="menus.key"
        class="margin-card"
        :menu-name="menus.name"
        :menu-id="menus.mainId"
      ></menu-card-comps>
    </div>

    <q-dialog v-model="addMenu">
      <q-card>
        <q-form @submit="onSubmit">
          <q-card-section class="column items-center">
            <q-input
              rounded
              filled
              type="text"
              v-model="newMenuName"
              label="New menu name"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val.length > 0) || 'Please entrer a name',
              ]"
            />
            <q-input
              rounded
              filled
              v-model="newMenuDesc"
              autogrow
              lazy-rules
              label="New menu description"
            />
            <q-input
              class="q-mt-lg"
              rounded
              filled
              v-model="newMenuPrice"
              type="number"
              suffix="€"
              label="New menu price"
              lazy-rules
            />
            <q-input
              class="q-mt-lg"
              rounded
              filled
              v-model="newMenuTime"
              type="number"
              label="Estimate preparation time"
              lazy-rules
            />
            <p class="q-mt-lg" style="font-size: 2em">Article</p>
            <q-input
              rounded
              filled
              v-model="articleName"
              type="text"
              label="Article name"
              lazy-rules
            />
            <q-input
              class="q-mt-lg"
              rounded
              filled
              v-model="articleTime"
              type="number"
              label="Article time preparation"
              lazy-rules
            />
            <q-input
              class="q-mt-lg"
              rounded
              filled
              v-model="articlePrice"
              type="number"
              label="Article price"
              lazy-rules
            />
            <q-input
              class="q-mt-lg"
              rounded
              filled
              v-model="articleQuantity"
              type="number"
              label="Article quantity"
              lazy-rules
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="Submit" type="submit" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import MenuCardComps from "components/MenuCardComps.vue";
import { Cookies } from "quasar";
import { defineComponent, ref } from "vue";
import { api } from "boot/axios";

export default defineComponent({
  name: "menuRestau",
  components: {
    MenuCardComps,
  },

  data() {
    return {
      menusArray: [],
      newMenuName: "",
      newMenuDesc: "",
      newMenuPrice: 0,
      newMenuTime: 0,
      articleName: "",
      articleTime: 0,
      articlePrice: 0,
      articleQuantity: 0,
    };
  },

  methods: {
    async onSubmit() {
      let newMenuData = {
        name: this.newMenuName,
        details: this.newMenuDesc,
        price: this.newMenuPrice,
        timePreparedDef: this.newMenuTime,
      };

      let articleData = {
        name: this.articleName,
        timePreparedDef: this.articleTime,
        price: this.articlePrice,
        quantity: this.articleQuantity,
      };

      await api
        .post("restaurants/" + Cookies.get("restau_id") + "/menus", newMenuData)
        .then(async (response) => {
          await api
            .post("restaurants/menu/" + response.data.id, articleData)
            .then(() => {
              location.reload();
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
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
            this.menusArray.push({
              key: i + j,
              mainId: response.data[i].menus[j].id,
              name: response.data[i].menus[j].name,
            });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },

  setup() {
    return {
      addMenu: ref(false),
    };
  },
});
</script>

<style scoped>
.margin-card {
  margin: 5px;
}

.add-card {
  width: 100%;
  max-width: 250px;
  height: 150px;
}
.container {
  border-radius: 50%;
  cursor: pointer;
  width: 100px;
  height: 100px;
}
</style>
