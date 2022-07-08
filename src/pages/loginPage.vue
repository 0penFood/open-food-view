<template>
  <q-page
    class="bg_login window-height window-width row justify-center items-center"
  >
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">OpenFood</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              type="email"
              v-model="email"
              label="Your email *"
              hint="xxx@xxx.xxx"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type your email',
              ]"
            />

            <q-input
              filled
              type="password"
              v-model="password"
              label="Your password *"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val.length > 0) ||
                  'Please type your password',
              ]"
            />
            <div>
              <a href="#/signup" style="color: orange">Sign Up</a>
            </div>

            <div>
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
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
import { api } from "boot/axios";
import { Cookies } from "quasar";
import { useRouter } from "vue-router";
import { getRestauForLogin } from "../js/getCurrentRestauforLogin";

export default {
  setup() {
    const $q = useQuasar();
    const email = ref(null);
    const password = ref(null);
    const router = useRouter();

    return {
      email,
      password,

      onSubmit() {
        api
          .post("/auth/login", { email: email.value, password: password.value })
          .then(async (response) => {
            Cookies.set("auth_token", response.data["access_token"]);
            Cookies.set("current_id", response.data["id"]);
            Cookies.set(
              "restau_id",
              await getRestauForLogin(response.data["id"])
            );
            router.push({ path: "/" });
          })
          .catch(() => {
            $q.notify({
              color: "negative",
              position: "top",
              message: "Loading failed",
              icon: "report_problem",
            });
          });
      },

      onReset() {
        email.value = null;
        password.value = null;
      },
    };
  },
};
</script>

<style scoped></style>
