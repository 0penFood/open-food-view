<template>
    <Carousel :itemsToShow="3.95" :wrapAround="true">

    <Slide v-for="data in datascarousels"
           :key="data.indexNbx"
           :name="data.indexNbx"
           class="q-pa-sm">
      <div class="full-height full-width flex flex-center" style="background-color: rgba(0, 0, 0, 0.68) !important;">
        <div class="custom-caption">
          <div class="text-h2 main_line animation_2">{{ title }}</div><br><br><br>
          <div class="text-h4 animation_1">{{ description }}</div><br><br><br>
          <div class="animation_2">
            <q-btn size="md" :style="'background:#ff851b; color: white'" label="ORDER" :href="link"/>
          </div>
        </div>
      </div>
    </Slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>

  </Carousel>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Pagination, Slide, Navigation } from 'vue3-carousel'

export default defineComponent({
  name: 'CarouselComps',
  props: {
    title: {
      type: String,
      required: true
    },

    nameGl: {
      type: String,
      default: '#'
    },

    link: {
      type: String,
      default: '#'
    },

    picture: {
      type: String,
      default: ''
    },

    description :{
      type: String,
      default: ''
    }
  },

  components: {
    Carousel,
    Slide,
    // eslint-disable-next-line vue/no-unused-components
    Pagination,
    Navigation,
  },
})
</script>

<style scoped>

</style>
