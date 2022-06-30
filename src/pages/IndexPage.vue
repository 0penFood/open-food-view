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
import { Cookies } from "quasar";

export default defineComponent({
  name: 'IndexPage',

  setup()
  {
    if(Cookies.get('auth_token') === null)
    {
      const router = useRouter()
      router.push({ path: '/login' })
    }
  }
})
</script>
