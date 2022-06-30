<template>

  <q-page class="window-height window-width row justify-center items-center">
    <q-card square bordered class="q-pa-lg shadow-1">
      <div class="q-pa-sm text-center">Informations</div>

      <div class="row items-center text-center">
        <div class="q-pa-sm">
          First Name:
        </div>
        <div class="q-pa-sm">
          <q-input v-model="inp_Fname" rounded standout label="First Name"/>
        </div>
        <div class="q-pa-sm">
          Last Name:
        </div>
        <div class="q-pa-sm">
          <q-input v-model="inp_Lname" rounded standout label="Last Name"/>
        </div>
      </div>

      <div class="row items-center text-center">
        <div class="q-pa-sm">
          Email:
        </div>
        <div class="q-pa-sm">
          <q-input v-model="inp_email" rounded standout label="Email" type="email">
            {{inp_email}}
          </q-input>
        </div>

        <div class="q-pa-sm">
          Phone:
        </div>
        <div class="q-pa-sm">
          <q-input v-model="inp_phone" rounded standout label="Phone"/>
        </div>
      </div>
    </q-card>

  </q-page>
</template>

<script>
import { api } from "boot/axios";
import { Cookies, useQuasar } from "quasar";
import { ref } from "vue";

export default {
  name: "ProfilPage",


  setup (){
    const $q = useQuasar()
    const inp_phone = ref(null)
    const inp_email = ref(null)
    const inp_Lname = ref(null)
    const inp_Fname = ref(null)

    return{

      inp_email,
      getDataUser()
      {
        api.get('/users/readByID/'+Cookies.get('current_id'))
          .then((response) => {
            inp_email.value = response.data[0].email;

          })
          .catch(() => {
            $q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            })
          });
      },
    }
  }
};
</script>

<style scoped>

</style>
