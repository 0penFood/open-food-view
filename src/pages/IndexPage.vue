<template>
  <q-page padding class="bg-image">
    <carousel-comps></carousel-comps>
  </q-page>
</template>
<script>
import CarouselComps from "components/CarouselComps.vue"
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    CarouselComps
  },
})
</script>

<style scoped>

</style>
