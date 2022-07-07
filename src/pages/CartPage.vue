<template>
  <q-page>
    <div class="row bg-white q-mt-sm">
      <div class="col-lg-7 col-md-5 col-sm-12 col-xs-12">
        <div class="q-pa-md">
          <q-list separator bordered class="rounded-borders"
                  v-for="element in elements"
                  :key="element.indexNbx">

            <q-item>
              <q-item-label class="text-weight-bolder text-center" header>
                Informations
              </q-item-label>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label class="text-grey-10">
                  Name Restaurant
                </q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-grey-10">
                  {{ this.getNameRestaurant(element.idRestau)}}
                </q-item-label>
              </q-item-section>
            </q-item>


            <q-item>
              <q-item-section>
                <q-item-label class="text-grey-10">
                  Delivery Address
                </q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-grey-10">
                  {{ element.deliveryAddress }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label class="text-grey-10">
                  Time Delivery
                </q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-grey-10">
                  {{ element.timeDelivery }}
                </q-item-label>
              </q-item-section>
            </q-item>


            <q-item>
              <q-item-section>
                <q-item-label class="text-grey-10">
                  Price
                </q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-grey-10">
                  {{ element.price}}
                </q-item-label>
              </q-item-section>
            </q-item>



            <q-item>
              <q-item-label class="text-weight-bolder text-center" header>
                Articles
              </q-item-label>
            </q-item>


            <q-item v-for="article in element.articles"
                    :key="article.indexNbx"
                    v-ripple>
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

            <q-item>
              <q-item-section>
                <div class="q-mt-md text-left">
                  <q-btn label="Delete" color="red" @Click="deleteCommandes(element.id)"/>
                </div>
              </q-item-section>

              <q-item-section>
                <div class="q-mt-md text-right">
                  <q-btn label="Validate" color="primary"/>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>

      <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
      </div>

    </div>
  </q-page>
</template>

<script>
import { Cookies } from "quasar";
import { api } from "boot/axios";

export default {
  name: "CartPage",

  data()
  {
    return{
      elements: [],
      nameRestaurant: null,
    }
  },

  methods:{
    async getNameRestaurant(id)
    {
      await api.get("societies/"+ id +"/restau/partial")
        .then((response) =>
        {
          this.nameRestaurant = response.data[0].societyName;
        })
        .catch((e) => {
          console.log(e);
          console.log("Nop!")
        });
    },

    async deleteCommandes(idCmd)
    {
      api.delete("commandes/"+idCmd).then(() => {
        console.log("Perfect Delete!");
        location.reload();
      })
        .catch((e) => {
          console.log(e);
          console.log("Nop!")
        });
    }
  },



  async created()
  {
    this.elements = await api.get("commandes/user/" + Cookies.get('current_id'))
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        console.log(e);
        console.log("Nop!")
      });
  }
};
</script>

<style scoped>

</style>
