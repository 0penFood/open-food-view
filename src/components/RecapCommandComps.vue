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
          ID Commande
        </q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-grey-10">
          {{ element.id }}
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
      <q-item-section>
        <q-item-label class="text-grey-10">
          State
        </q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-grey-10">
          {{ element.state}}
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
        <div class="q-mt-md text-left">
          <q-btn label="Decline" color="red" @Click="deleteCommandes(element.id)"/>
        </div>
      </q-item-section>

      <q-item-section v-if="element.state == '1'">
        <div class="q-mt-md text-right">
          <q-btn label="Validate" color="primary" @Click="validateCommandes(element.id)"/>
        </div>
      </q-item-section>

      <q-item-section v-if="element.state == '2' || element.state == '3'">
        <div class="q-mt-md text-right">
          <q-btn label="Finish and Send" color="primary" @Click="finishCommandes(element.id)"/>
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
    }
  },
  methods:{
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
    async validateCommandes(idCmd)
    {
      api.patch("commandes/"+idCmd, { state : 2 })
        .then(() => {
        console.log("Perfect Update!");
        location.reload();
      })
        .catch((e) =>
        {
          console.log(e);
          console.log("Nop!")
        });
    },

    async finishCommandes(idCmd)
    {
      api.patch("commandes/"+idCmd, { state : 4 })
        .then(() => {
          console.log("Perfect Update!");
          location.reload();
        })
        .catch((e) =>
        {
          console.log(e);
          console.log("Nop!")
        });
    }
  },



  async created()
  {
    let dataRtn = [{}];

    let idRestaurant = await api.get('/users/' + Cookies.get('current_id') + "/USocieties")
      .then(async (response) =>
      {
        return await api.get('/societies/' + response.data[ Object.keys(response.data)].society_id + "/full")
          .then((response) => {
            return response.data[1].idRestaurant;
          })
          .catch(() => {
            $q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            })
          });
      }).catch((e) => {
        console.log(e);
        console.log("Nop!")
      });

    dataRtn = await api.get("commandes/restaurant/" + idRestaurant)
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        console.log(e);
        console.log("Nop!")
      });
    for (var i = 0; i < Object.keys(dataRtn).length; i++)
    {
      switch (this.typeRecap){
        //Check if commande is start
        case "check":
          if(dataRtn[i].state != 1)
          {
            //dataRtn.splice(i);
          }
          break;
        // Check if commande is active
        case "active":
          if(dataRtn[i].state == [0,99,-1])
          {
            dataRtn.splice(i);
          }
          break;
        // Check if commande is finish
        case "finish":
          if(dataRtn[i].state != [99,-1])
          {
            dataRtn.splice(i);
          }
          break;
        default:
          break;
      };

      switch (dataRtn[i].state)
      {
        case 1:
          dataRtn[i].state = "Pending";
          break;

        case 2:
          dataRtn[i].state = "Accepted by Restaurant";
          break;

        case 3:
          dataRtn[i].state = "Accepted by Delivery";
          break;

        case 4:
          dataRtn[i].state = "Finish and give to Delivery man";
          break;

        case 5:
          dataRtn[i].state = "Delivery";
          break;

      }
    }
    this.elements = dataRtn;
  }
});
</script>
