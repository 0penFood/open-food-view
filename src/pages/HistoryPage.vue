<template>
  <q-page>
    <p class="q-header text-center text-h2"> History </p>
    <div class="row bg-white q-mt-sm">
      <div class="col-lg-7 col-md-5 col-sm-12 col-xs-12">
        <div class="q-pa-md">
          <RecapCommandComps type-recap="finish"></RecapCommandComps>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import RecapCommandComps from "components/RecapCommandComps.vue";
import { Cookies } from "quasar";
export default {
  name: "HistoryPage",
  components: {
    RecapCommandComps
  },
  data(){
    return{
      isConnected: Cookies.has('auth_token'),
    }
  },
  created()
  {
    if(!this.isConnected) location.replace("#/login");
  },
};
</script>

<style scoped>
</style>
