<template>
  <q-page>
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

export default {
  name: "HistoryPage",
  components: {
    RecapCommandComps
  },
};
</script>

<style scoped>

</style>
