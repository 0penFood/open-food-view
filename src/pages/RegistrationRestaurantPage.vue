<template>

  <q-page class="bg-login window-height window-width row justify-center items-center">
    <div>

      <q-card square bordered class="q-pa-lg shadow-1">
        <div class="text-h3"> Register Restaurant</div>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >

          <q-input
            filled
            v-model="name"
            label="Name of society"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            filled
            v-model="type"
            label="Type of society"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />




          <q-input
            filled
            v-model="authentificationSociety"
            label="Your SIRET"
            hint="SIRET"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            filled
            v-model="sepa"
            label="SEPA"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            filled
            v-model="adresse"
            label="Adresse"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            filled
            v-model="city"
            label="City"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            filled
            v-model="country"
            label="Country"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />


          <q-toggle v-model="accept" label="I accept the license and terms" />

          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card>


    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  name: "RegistrationRestaurantPage",

  setup () {
    const $q = useQuasar()

    const authentificationSociety = ref(null)
    const name = ref(null)
    const restaurantType = ref(null)
    const sepa = ref(null)
    const city = ref(null)
    const adresse = ref(null)

    const accept = ref(false)

    return {
      authentificationSociety,
      name,
      restaurantType,
      sepa,
      city,
      adresse,
      accept,

      onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },

      clickTypeRestaurant(){
        console.log("Je suis ici");
      },

      onReset () {
        authentificationSociety.value = null
        name.value = null
        restaurantType.value = null
        sepa.value = null
        city.value = null
        adresse.value = null

        accept.value = false
      }
    }
  }
}
</script>
