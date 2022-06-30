<template>
  <q-page class="flex flex-center">
    <img
      alt="Openfood logo"
      src="~assets/openfood_logo.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'IndexPage',

  setup(){
    const router = useRouter()
    router.push({ path: '/login' })
  }
})
</script>
