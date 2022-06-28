<template>

  <q-page class="window-height window-width row justify-center items-center">
    <q-card square bordered class="q-pa-lg shadow-1">
      <div class="q-pa-sm text-center">Informations</div>

      <div class="row">
        <div class="q-pa-sm">
          First Name:
        </div>
        <div class="q-pa-sm">

        </div>
        <div class="q-pa-sm">
          Last Name:
        </div>
        <div class="q-pa-sm">

        </div>
      </div>

      <div class="row">
        <div class="q-pa-sm">
          Email:
        </div>
        <div class="q-pa-sm">

        </div>
        <div class="q-pa-sm">
          Phone:
        </div>
        <div class="q-pa-sm">

        </div>
      </div>
    </q-card>

  </q-page>
</template>

<script>
import { api } from "boot/axios";
import { Cookies } from "quasar";

export default {
  name: "ProfilPage",

  setup (){
    api.get('/users/', )
      .then((response) => {
        console.log("Test");
      })
      .catch(() => {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem'
        })
      })
  }
};
</script>

<style scoped>

</style>
