<template>
  <q-page>
    <p class="q-header text-center text-h2"> Partner Page </p>

    <q-form class="q-gutter-md">
      <q-input v-model="emailPartners">
        <q-btn label="Add Partner"  color="primary" @Click="addPartner()"/>
      </q-input>
    </q-form>
    <div class="row bg-white q-mt-sm">

      <!-- ################## Who has Partner  ################## -->
      <div class="col-lg-7 col-md-5 col-sm-12 col-xs-12">
        <div class="q-pa-md">

          <q-list>
            <q-item>
              <q-item-label class="text-weight-bolder text-center" header>
                Sponsor
              </q-item-label>
            </q-item>

            <q-item v-for="sponsor in sponsors"
                    :key="sponsor.indexNbx">
              <q-item-section>
                <q-item-label class="text-grey-10">
                  {{ sponsor }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>



      <!-- ################## Who has Sponsor  ################## -->
      <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
        <div class="q-pa-md">
          <q-list>

          </q-list>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { api } from "boot/axios";
import { Cookies } from "quasar";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PartnerPage",

  data() {
    return{
      sponsors : [],
      emailPartners: "",
    }
  },


  methods:{
    async addPartner()
    {
      let dataPartner = {
        sponsorUser: Cookies.get('current_id'),
        partnerUser: 0,
        isValid: true,
      }

      await api.get("users/readByEmail/" + this.emailPartners)
        .then(async (response) =>
        {
          dataPartner.partnerUser = response.data[0].idUser;
        }).catch((e) => {
          console.log(e)
        });


      await api.post("partnerships/users", dataPartner)
        .then(async (response) => {
          console.log("OK");
        }).catch((e) => {
          console.log(e)
        });

      await this.loadData();
    },


    async loadData()
    {
      this.sponsors = [];
      let dataRtn = [{}];
      dataRtn = await api.get("partnerships/"+ Cookies.get('current_id') + "/user/sponsor")
        .then(async (response) => {
          return await response.data;
        }).catch((e) => {
          console.log(e)
        });

      for(let i=0; i< Object.keys(dataRtn).length; i++)
      {
        await api.get("users/readByID/" + dataRtn[i].partnerUser)
          .then((response) =>
          {
            this.sponsors.push(response.data[0].email);
            console.log(this.sponsors)
          }).catch((e) => {
            console.log(e)
          });
      }
    }
  },

  async created()
  {
    await this.loadData();
  }
});
</script>

<style scoped>

</style>
