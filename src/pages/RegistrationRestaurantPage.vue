<template>

  <q-page>
    <div class="q-pa-md" style="max-width: 400px">

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

        <q-btn-dropdown
          color="primary"
          label="Restaurant Type"
          filled
          v-model="restaurantType"
          lazy-rules>
          <!-- dropdown content -->
          <q-list link>
            <q-item v-for="n in 2" :key="`1.${n}`" @click="clickTypeRestaurant()">
              <q-item-main>
                <q-item-tile label>Italian</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-btn-dropdown>


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

        <q-btn-dropdown
          color="primary"
          label="Country">
          <!-- dropdown content -->
          <q-list link>
            <q-item v-for="n in 2" :key="`1.${n}`" @click="clickTypeRestaurant()">
              <q-item-main>
                <q-item-tile label>France</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-btn-dropdown>


        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>

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
