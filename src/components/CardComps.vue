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
    <q-btn class="q-mt-md" color="orange-9" icon="shopping_cart" label="Add" @Click="addToCart(price);" type="button"/>
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
  props: ['nameMenu', 'idMenu', 'idRestau', 'price', 'details'],

  data()
  {
    return{
      articles: [],
      isConnected: Cookies.has('auth_token'),
    }
  },

  async created()
  {
    this.articles = await api.get("/restaurants/menu/"+this.idMenu)
      .then(async (response) => {
        return response.data[0].articles;
      }).catch((e) => {
        console.log(e)
      });
  },


  methods:{
    addToCart(price){
      if(this.isConnected)
      {
        let dataCommandes={
          idUser: Cookies.get('current_id'),
          idRestau: this.idRestau,
          timeDelivery: this.deliveryTime(false),
          state: 0,
          price: price,
          deliveryAddress: "?",
        }


        api.get("commandes/user/active/" + Cookies.get('current_id'))
          .then(async (response) => {
            let idCommand = "";

            for(let i = 0; i < Object.keys(response.data).length; i++)
            {
              if(response.data[i].state == 0 && response.data[i].idRestau == this.idRestau)
              {
                idCommand = response.data[i].id;
                dataCommandes.price = response.data[i].price + price;
                break;
              }
            }

            for (const article of this.articles) {

              if(idCommand == "")
              {
                await api.post("commandes", dataCommandes)
                  .then((response) => {
                    idCommand = response.data.id;
                    console.log("Perfect, I create commande with the restaurants!");
                  })
                  .catch((e) => {
                    console.log(e);
                    console.log("Nop!")
                  });
              }
              else{

                await api.patch("commandes/" + idCommand, dataCommandes)
                  .then(() => {
                    console.log("Perfect, I update price commande with the restaurants!");
                  })
                  .catch((e) => {
                    console.log(e);
                    console.log("Nop!")
                  });
              }

              let dataArticle={
                name : article.name,
                quantity : article.quantity,
                commandesID: idCommand,
              };

              await api.post("commandes/"+ idCommand + "/article", dataArticle)
                .then((response) => {
                  console.log(response.data);
                  console.log("Perfect, I add article to command already with restaurants");
                })
                .catch((e) => {
                  console.log(e);
                  console.log("Nop!")
                });
            }
          })
          .catch((e) => {
            console.log(e);
            console.log("Nop!")
          });

      }
      else{
        location.replace("#/login");
      }
    },

    deliveryTime(fast) {
      const current = new Date();
      const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
      let time;
      if(fast)
      {
        let newTime = current.getMinutes() + 15;
        if(newTime > 60)
        {
          let newMinute = newTime - 60;
          if(newMinute < 10)
          {
            time = (current.getHours() + 1) + ":0" + newMinute;
          }
          else
          {
            time = (current.getHours() + 1) + ":" + newMinute;
          }
        }
        else
        {
          time = current.getHours() + ":" + newTime;
        }
      }
      else
      {
        let newTime = current.getMinutes() + 35;
        if(newTime > 60)
        {
          let newMinute = newTime - 60;
          if(newMinute < 10)
          {
            time = (current.getHours() + 1) + ":0" + newMinute;
          }
          else
          {
            time = (current.getHours() + 1) + ":" + newMinute;
          }
        }
        else
        {
          time = current.getHours() + ":" + newTime;
        }
      }

      return date +' '+ time;
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
