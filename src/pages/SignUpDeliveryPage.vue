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
import { Cookies } from 'quasar'
import { api } from "boot/axios";
export default {
  name: "RegistrationRestaurantPage",
  setup () {
    const $q = useQuasar()
    const authentificationSociety = ref(null)
    const name = ref(null)
    const restaurantType = ref(null)
    const sepa = ref(null)
    const city = ref(null)
    const country = ref(null)
    const adresse = ref(null)
    const accept = ref(false)
    return {
      authentificationSociety,
      name,
      restaurantType,
      sepa,
      city,
      country,
      adresse,
      accept,
      onSubmit () {
        if (accept.value === true) {

          api.post('/societies', {
            societyAuth: authentificationSociety.value,
            societyName: name.value,
            sepa: sepa.value,
            area: country.value + ";" + city.value + ";" + adresse.value,
          })
            .then((idsocietyDb) => {
              api.post('/users/society', {
                fk_user: Cookies.get('current_id'),
                fk_society: idsocietyDb.data.id,
              })
                .then(() => {
                  console.log("Success");
                  router.push({ path: '/' })
                })
                .catch(() => {
                  console.log("Error");
                })
            })
            .catch(() => {
              console.log("Error");
            })
        }
        else {
          console.log("Error");
        }
      },
      onReset () {
        authentificationSociety.value = null
        name.value = null
        restaurantType.value = null
        sepa.value = null
        city.value = null
        type.value = null
        country.value = null
        adresse.value = null
        accept.value = false
      }
    }
  }
}
</script>
