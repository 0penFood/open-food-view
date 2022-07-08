<template>
  <q-page>
    <div class="row bg-white q-mt-sm">
      <div class="col-lg-7 col-md-5 col-sm-12 col-xs-12">
        <div class="q-pa-md">
          <RecapCommandComps type-recap="check"></RecapCommandComps>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import RecapCommandComps from "components/RecapCommandComps.vue";
import { Cookies } from "quasar";

export default {
  name: "CartPage",

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
