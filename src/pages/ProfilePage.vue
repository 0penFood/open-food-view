<template>

  <q-page class="window-height window-width row justify-center items-center">
    <q-card square bordered class="q-pa-lg shadow-1">
      <q-form
        @submit="onSubmit"
        class="q-gutter-md">
        <div class="q-pa-sm text-center">Informations User</div>

        <div class="row items-center text-center">

          <div class="q-pa-sm">
            First Name:
          </div>
          <div class="q-pa-sm">
            <q-input rounded standout label="First Name" v-model="firstname"/>
          </div>
          <div class="q-pa-sm">
            Last Name:
          </div>
          <div class="q-pa-sm">
            <q-input rounded standout label="Last Name" v-model="lastname"/>
          </div>
        </div>

        <div class="row items-center text-center">
          <div class="q-pa-sm">
            Email:
          </div>
          <div class="q-pa-sm">
            <q-input rounded standout label="Email" type="email" v-model="email"/>
          </div>

          <div class="q-pa-sm">
            Phone:
          </div>
          <div class="q-pa-sm">
            <q-input rounded standout label="Phone" v-model="phone"/>
          </div>
        </div>


        <div class="q-mt-md text-left">
          <q-btn label="Delete" color="red" @Click="deleteAccount();"/>
        </div>

        <div class="q-mt-md text-right">
          <q-btn label="Modificate" type="submit" color="primary"/>
        </div>
      </q-form>

      <q-form
        @submit="onSubmitSociety"
        class="q-gutter-md">
        <div class="q-pa-sm text-center">Informations Society</div>

        <div class="row items-center text-center">

          <div class="q-pa-sm">
            Name Society:
          </div>
          <div class="q-pa-sm">
            <q-input rounded standout label="Name Society" v-model="societyName"/>
          </div>
          <div class="q-pa-sm">
           SEPA:
          </div>
          <div class="q-pa-sm">
            <q-input rounded standout label="SEPA" v-model="sepa"/>
          </div>
        </div>

        <div class="row items-center text-center">
          <div class="q-pa-sm">
            Siret:
          </div>
          <div class="q-pa-sm">
            <q-input rounded standout label="Siret" v-model="siret"/>
          </div>
        </div>


        <div class="q-mt-md text-left">
          <q-btn label="Delete" color="red" @Click="deleteSociety();"/>
        </div>

        <div class="q-mt-md text-right">
          <q-btn label="Modificate" type="submit" color="primary"/>
        </div>
      </q-form>
    </q-card>

  </q-page>
</template>

<script>
import { api } from "boot/axios";
import { Cookies, useQuasar } from "quasar";
export default {
  name: "ProfilPage",
  data()
  {
    return{
      dataUser: [],

      firstname: "",
      lastname: "",
      phone: "",
      email: "",

      societyName: "",
      sepa: "",
      siret: "",
    }
  },
  async created()
  {
    const $q = useQuasar()
    let dataUser = await api.get('/users/readByID/' + Cookies.get('current_id'))
      .then((response) => {
        return response.data[0];
      })
      .catch(() => {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem'
        })
      });
    this.firstname =  dataUser.name.split('_')[0];
    this.lastname =   dataUser.name.split('_')[1];
    this.email =      dataUser.email;
    this.phone =      dataUser.phone;

    let dataSociety = await api.get('/users/' + Cookies.get('current_id') + "/USocieties")
      .then(async (response) => {

        return await api.get('/societies/' + response.data[ Object.keys(response.data)].society_id + "/full")
          .then((response) => {
            return response.data[1];
          })
          .catch(() => {
            $q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            })
          });
      })
      .catch(() => {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem'
        })
      });


    this.societyName = dataSociety.societyName;
    this.sepa = dataSociety.sepa;
    this.siret = dataSociety.societyAuth;
  },
  methods:{
    onSubmit()
    {
      let data =  {
        firstName: this.firstname,
        lastName: this.lastname,
        email: this.email,
        phone: this.phone,
      };
      api.patch('users/' +  Cookies.get('current_id'), data)
        .then(() => {
          console.log("Perfect!")
        })
        .catch((e) => {
          console.log(e);
          console.log("Nop!")
        });
    },

    async onSubmitSociety()
    {
      let data =  {
        societyName: this.societyName,
        sepa: this.sepa,
        societyAuth: this.siret,
      };

      let idSociety = await api.get('/users/' + Cookies.get('current_id') + "/USocieties")
        .then(async (response) =>
        {
          return response.data[Object.keys(response.data)].society_id;
        }).catch((e) => {
          console.log(e);
          console.log("Nop!")
        });

      api.patch('societies/' + idSociety, data)
        .then(() => {
          console.log("Perfect!")
        })
        .catch((e) => {
          console.log(e);
          console.log("Nop!")
        });
    },

    deleteAccount()
    {
      api.patch('users/del/' +  Cookies.get('current_id'))
        .then(() => {
          console.log("Perfect Delet!")
        })
        .catch((e) => {
          console.log(e);
          console.log("Nop!")
        });
    },

    async deleteSociety()
    {
      let idSociety = await api.get('/users/' + Cookies.get('current_id') + "/USocieties")
        .then(async (response) =>
        {
          return response.data[Object.keys(response.data)].society_id;
        }).catch((e) => {
          console.log(e);
          console.log("Nop!")
        });

      api.delete('societies/' + idSociety)
        .then(() => {
          console.log("Perfect Delet!")
        })
        .catch((e) => {
          console.log(e);
          console.log("Nop!")
        });
    }
  },
};
</script>
