<template>
  <q-page class="bg_login window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">OpenFood</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-input
              filled
              type="firstName"
              v-model="firstname"
              label="Your firstname"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type your firstname']"
            />

            <q-input
              filled
              type="lastName"
              v-model="lastname"
              label="Your lastname"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type your lastname']"
            />

            <q-input
              filled
              type="email"
              v-model="email"
              label="Your email *"
              hint="xxx@xxx.xxx"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type your email']"
            />

            <q-input
              filled
              type="password"
              v-model="password"
              label="Your password *"
              lazy-rules
              :rules="[ val => val !== null && val.length > 0 || 'Please type your password',]"
            />

            <q-input
              filled
              type="phone"
              v-model="phone"
              label="Your phone *"
              lazy-rules
              :rules="[ val => val !== null && val.length > 0 || 'Please type your phone',]"
            />
            <div>
              <q-btn label="Submit" type="submit" color="primary"/>
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>

import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "boot/axios";
import { Cookies } from 'quasar';
import { hashPassword } from '../js/hash';

export default {
  name: "SignUpPage",

  setup () {
    const $q = useQuasar()
    const email = ref(null)
    const password = ref(null)
    const firstname = ref(null)
    const lastname = ref(null)
    const phone = ref(null)
    const router = useRouter()

    return {
      firstname,
      lastname,
      email,
      password,
      phone,

      onSubmit () {
        api.post('/users/restaurant', {
          firstName: firstname.value,
          lastName: lastname.value,
          email: email.value,
          password: hashPassword(password.value),
          phone: phone.value,
        })
          .then(() => {
            console.log("Account Create");
            api.post('/auth/login', { email: email.value, password: hashPassword(password.value)})
              .then((response) => {
                Cookies.set('auth_token', response.data["access_token"])
                Cookies.set('current_id', response.data["id"])
                router.push({ path: '/signup/restaurants'})
              })
              .catch(() => {
                console.log("Loading Error");
            })
          })
          .catch(() => {
            console.log("Email already used");
          })
      },

      onReset () {
        email.value = null
        password.value = null
        firstname.value = null
        lastname.value = null
        phone.value = null
      },

      triggerPositive(color, position, message)
      {
        $q.notify({
          color: color,
          position: position,
          message: message,
        });
      }
    }
  }
};
</script>

<style scoped>
</style>
