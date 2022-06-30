<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div style="display: flex">
            <a href="/">
              <img
                alt="Openfood logo"
                src="~assets/openfood_logo.svg"
                style="width: 50px; height: 50px"
              >
            </a>
            <a href="/" style="margin-bottom: auto; margin-top: auto">
              OpenFood
            </a>
          </div>
        </q-toolbar-title>
          <div v-if="!isConnected" style="display: flex;">
            <a href="#/signup" class="q-pa-sm">Sign up</a>
            <p class="q-pa-sm" style="margin-bottom: auto; margin-top: auto"> | </p>
            <a href="#/login" class="q-pa-sm">Log In</a>
          </div>
          <div v-else style="display: flex;">
            <a href="#" class="q-pa-sm" style="margin-bottom: auto; margin-top: auto">Profile</a>
            <p class="q-pa-sm" style="margin-bottom: auto; margin-top: auto"> | </p>
            <a href="#" @click="disconnect();" class="q-pa-sm" style="margin-bottom: auto; margin-top: auto">Disconnect</a>
          </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import {Cookies, useQuasar } from "quasar";
import EssentialLink from 'components/EssentialLink.vue'
import {useRouter} from "vue-router";

const linksList = [
  {
    title: 'Orders',
    caption: 'orders',
    icon: 'code',
    link: 'https://quasar.dev'
  },
  {
    title: 'History',
    caption: 'history',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'PaternShip',
    caption: 'paternShip',
    icon: 'record_voice_over',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Help',
    caption: 'chat help',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Add Restaurant',
    caption: 'Go to website Restaurant',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Pass command with User',
    caption: 'Go to website User',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
]

export default defineComponent({
  name: 'MainLayout',

data: function () {
  return {
    isConnected: Cookies.has('auth_token'),
  }
},

methods: {
  disconnect() {
    try {
      Cookies.remove('auth_token')
      this.triggerPositive();
    } catch (e) {
    }
  },
},
  updated() {
    this.isConnected = Cookies.has('auth_token');
  },

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const $q = useQuasar();
    const router = useRouter()

    return {
      triggerPositive () {
        $q.notify({
          progress: true,
          message: 'You have been successfully disconnected... You will be soon redirected to the home page.',
          color: 'primary',
          multiLine: true,
          icon: 'info',
          position: "center",
          actions: [
            { label: 'Reconnect', color: 'yellow', handler: () => { router.push({path: '/login'})} }
          ]
        })
        setTimeout(() => {
          router.push({ path: '/' });
        }, 2000)
      },
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
