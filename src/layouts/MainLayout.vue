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
          <div v-if="!isConnected">
            <a href="#/login">Log In</a>
          </div>
          <div v-else style="">
            <a href="#">Profile</a>
            <p> | </p>
            <a>Disconnect</a>
          </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Naviguation
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
import { Cookies } from "quasar";
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Restaurants',
    caption: 'restaurants',
    icon: 'code',
    link: 'https://quasar.dev'
  },
  {
    title: 'Favory',
    caption: 'favory',
    icon: 'code',
    link: 'https://quasar.dev'
  },
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
    title: 'Add Deliver Man',
    caption: 'Go to website Deliver',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Add Restaurants',
    caption: 'Go to website Restaurants',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
]

export default defineComponent({
  name: 'MainLayout',



data: function () {
  return {
    isConnected: Cookies.has('auth_token'),
  }
},

  updated() {
    this.isConnected = Cookies.has('auth_token');
  },


  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
