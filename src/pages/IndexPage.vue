<template>
  <q-page>
    <q-carousel
      animated
      v-model="carousel"
      arrows
      swipeable
      navigation
      infinite
      autoplay
      control-color="white"
      transition-prev="slide-right"
      transition-next="slide-left"
      height="639px"
    >
      <q-carousel-slide
        v-for="data in datascarousels"
        :key="data.indexNbx"
        :name="data.indexNbx" >

        <div class="full-height full-width flex flex-center" style="background-color: rgba(0, 0, 0, 0.68) !important;">
          <div class="custom-caption">
            <div class="text-h2 main_line animation_2">{{ data.title }}</div><br><br><br>
            <div class="text-h4 animation_1">{{ data.description }}</div><br><br><br>
            <div class="animation_2">
              <q-btn size="md" :style="'background:#ff851b; color: white'" label="ORDER" :href="data.link"/>
            </div>
          </div>
        </div>
      </q-carousel-slide>

    </q-carousel>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

const datasCarousel=[
  {
    title: 'Docs',
    indexNbx: 1,
    icon: 'school',
    link: 'https://quasar.dev',
    picture: '~assets/openfood_logo.svg',
    description: 'school',
  },
  {
    title: 'Doc5s',
    indexNbx: 2,
    icon: 'school',
    link: 'https://quasar.dev',
    picture: '~assets/openfood_logo.svg',
    description: 'school',
  },
  {
    title: 'Idiot',
    indexNbx: 3,
    icon: 'school',
    link: 'https://quasar.dev',
    picture: '~assets/openfood_logo.svg',
    description: 'school',
  },
]

export default defineComponent({
  name: 'IndexPage',

  setup () {
    return {
      datascarousels: datasCarousel,
    }
  },

  data()
  {
    return {
      carousel: 1
    }
  }
})


</script>
