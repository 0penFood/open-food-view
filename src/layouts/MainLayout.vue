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
          <a href="#/profile" class="q-pa-sm" style="margin-bottom: auto; margin-top: auto">Profile</a>
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
import { Cookies } from "quasar";
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
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
