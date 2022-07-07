<template>
  <span class="border" />
  <div class="card col-lg-4 col-md-4 col-sm-12 col-xs-12">
    <img src='https://img.freepik.com/photos-gratuite/pates-penne-sauce-tomate-au-poulet-tomates-table-bois_2829-19739.jpg?t=st=1656657684~exp=1656658284~hmac=df29d8b91e5bb4ca5967c2ec6c7532d29580e08f0d008680d00da7f82be05fc2&w=996' alt="debut_img">
    <div class="details">
      <p><strong> {{ nameMenu }} </strong> </p>
      <small> {{ details }} </small>
      <p style="color: gray;"> PRICE : </p>
      <div class="prices">
        <span> {{ price }} € </span>
      </div>
      <q-list separator bordered class="rounded-borders">
        <q-item v-for="article in articles"
                :key="article.indexNbx"
                v-ripple>
          <q-item-section>
            <q-avatar v-if="article.pathPicture != null">
              <img :src="article.pathPicture" alt="img_debug"/>
            </q-avatar>
            <q-avatar v-else>
              <img src="https://img.freepik.com/photos-gratuite/plat-gnocchi-cuisine-alpine-italienne-sud-allemande-autrichienne_661608-208.jpg?w=996" alt="img_debug"/>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-grey-10">
              {{article.name}}
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-grey-10">
              {{article.quantity}}
            </q-item-label>
          </q-item-section>

        </q-item>
      </q-list>

    </div>
    <q-btn class="q-mt-md" color="orange-9" icon="shopping_cart" label="Add" @Click="addToCart();" type="button"/>
  </div>

</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { Cookies } from "quasar";
import { useRouter } from "vue-router";

const router = useRouter();

export default defineComponent({
  name: 'CardComps',
  props: ['nameMenu', 'id', 'price', 'details'],

  data()
  {
    return{
      articles: [],
      isConnected: Cookies.has('auth_token'),
    }
  },

  async created()
  {
    this.articles = await api.get("/restaurants/menu/"+this.id)
      .then(async (response) => {
        return response.data[0].articles;
      }).catch((e) => {
        console.log(e)
      });
  },


  methods:{
    addToCart(){
      if(this.isConnected)
      {
        console.log("Je suis connecter");
      }
      else{
        console.log("Je suis deconnecter");

        router.push({ path: '#/login' });
      }
    }
  }
});


</script>

<style scoped>
.card {
  background-color: white;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 30px;
  margin: 10px;
  position: relative;
}
small {
  color: gray;
}
img {
  width: 100%;
  height: 300px;
  margin-bottom: 10px;
}
.details {
  border-top: 1px solid #ccc;
}
.details strong {
  font-size: 1.1em;
}
.details p {
  width: 60%;
}
.prices span {
  font-weight: bold;
  font-size: 1.5em;
}
strike {
  color: gray;
}
button {
  cursor: pointer;
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 50%;
}
</style>
