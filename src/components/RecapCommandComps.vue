<template>

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
          {{ element.nameRestau }}
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
          {{ element.price}} €
        </q-item-label>
      </q-item-section>
    </q-item>



    <q-item v-if="this.typeRecap == 'active'">
      <q-item-section>
        <q-item-label class="text-grey-10">
          State
        </q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-grey-10">
          {{ element.stateName }}
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

    <q-item v-if="this.typeRecap == 'check'">
      <q-item-section>
        <q-input rounded standout label="Address" v-model="address"/>
      </q-item-section>

      <q-item-section>
        <q-input rounded standout label="City" v-model="city"/>
      </q-item-section>

      <q-item-section>
        <q-input rounded standout label="Country" v-model="country"/>
      </q-item-section>
    </q-item>

    <q-item v-if="this.typeRecap == 'check'">
      <q-item-section>
        <div class="q-mt-md text-left">
          <q-btn label="Delete" color="red" @Click="deleteCommandes(element.id)"/>
        </div>
      </q-item-section>

      <q-item-section>
        <div class="q-mt-md text-right">
          <q-btn label="Validate" color="primary" @Click="validateCommande(element.id)" />
        </div>
      </q-item-section>
    </q-item>
  </q-list>

</template>


<script>
import { Cookies } from "quasar";
import { api } from "boot/axios";
import { defineComponent } from "vue";

export default defineComponent ({
  name: "RecapCommandComps",
  props: ['typeRecap'],

  data()
  {
    return{
      elements: [],
      address: "",
      city: "",
      country: ""
    }
  },

  methods:{
    async getNameRestaurant(id)
    {
      return await api.get("societies/"+ id +"/restau/partial")
        .then((response) =>
        {
          return response.data[0].societyName;
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
    },


    async validateCommande(idCmd)
    {
      const address = this.address + ' ; ' + this.city + ' ; ' + this.country;
      api.patch("commandes/"+idCmd , { state : 1, deliveryAddress: address}).then(() => {
        console.log("Perfect update");
        location.reload();
      })
        .catch((e) => {
          console.log(e);
          console.log("Nop!")
        });
    },
  },



  async created()
  {
    let dataRtn = [{}];
    dataRtn = await api.get("commandes/user/" + Cookies.get('current_id'))
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        console.log(e);
        console.log("Nop!")
      });


    let size = Object.keys(dataRtn).length
    for (var i = 0; i < size; i++)
    {
      switch (this.typeRecap){
        //Check if commande is start
        case "check":
          if(dataRtn[i].state != 0)
          {
            delete(dataRtn[i]);
          }
          else {
            dataRtn[i]["nameRestau"] = await this.getNameRestaurant(dataRtn[i].idRestau);
          }
          break;

        // Check if commande is active
        case "active":
          if(dataRtn[i].state == [0,99,-1])
          {
            delete(dataRtn[i]);
          }
          else {
            dataRtn[i]["nameRestau"] = await this.getNameRestaurant(dataRtn[i].idRestau);
          }
          break;

        // Check if commande is finish
        case "finish":
          if(dataRtn[i].state != [99,-1])
          {
            delete(dataRtn[i]);
          }
          else {
            dataRtn[i]["nameRestau"] = await this.getNameRestaurant(dataRtn[i].idRestau);
          }
          break;
      }


      if(dataRtn[i] != undefined)
      {
        switch (dataRtn[i].state)
        {
          case 1:
            dataRtn[i].stateName = "Pending";
            break;
          case 2:
            dataRtn[i].stateName = "Accepted by Restaurant";
            break;
          case 3:
            dataRtn[i].stateName = "Accepted by Delivery";
            break;
          case 4:
            dataRtn[i].stateName = "Finish and give to Delivery man";
            break;
          case 99:
            dataRtn[i].stateName = "Delivery";
            break;
        }
      }
    }
    this.elements = dataRtn;
  }
});
</script>
