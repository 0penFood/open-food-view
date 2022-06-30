<template>
  <div v-for="data in datascarousels"
       :key="data.indexNbx">
    <div class="text-h3">{{data.type}}</div>
    <Carousel :itemsToShow="3" :wrapAround="true">

      <Slide v-for="dataZoom in data.restauData"
             :key="dataZoom.indexNbx"
             :name="dataZoom.indexNbx"
             :url="dataZoom.picture"
             class="q-pa-sm">
        <div class="full-height full-width flex flex-center" style="background-color: rgba(0, 0, 0, 0.68) !important;">
          <div class="custom-caption">
            <div class="text-h4 font-size12 main_line animation_2">{{ dataZoom.title }}</div><br><br><br>
            <div class="text-h5 animation_1">{{ dataZoom.description }}</div><br><br><br>
            <div class="animation_2">
              <q-btn size="md" :style="'background:#ff851b; color: white'" label="ORDER" :href="dataZoom.link"/>
            </div>
          </div>
        </div>
      </Slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>

    </Carousel>
  </div>
</template>

<script>
import { defineComponent, toRaw } from 'vue'
import { Carousel, Pagination, Slide, Navigation } from 'vue3-carousel';
import {getRestaurantsForCarousel} from '../js/restaurants'

import 'vue3-carousel/dist/carousel.css';

const datasCarousel=[
  {
    type: 'Italian',
    indexNbx: 3,
    restauData : [
      {
      title: 'Idiot',
      indexNbx: 3,
      icon: 'school',
      link: 'https://quasar.dev',
      picture: '~assets/openfood_logo.svg',
      description: 'school',
      },
      {
        title: 'Idiot2',
        indexNbx: 3,
        icon: 'school',
        link: 'https://quasar.dev',
        picture: '~assets/openfood_logo.svg',
        description: 'school',
      },
      {
        title: 'Idiot3',
        indexNbx: 3,
        icon: 'school',
        link: 'https://quasar.dev',
        picture: '~assets/openfood_logo.svg',
        description: 'school',
      },
    ],
  },
  {
    type: 'Chinese',
    indexNbx: 3,
    restauData : [
      {
        title: 'Idiot',
        indexNbx: 3,
        icon: 'school',
        link: 'https://quasar.dev',
        picture: '~assets/openfood_logo.svg',
        description: 'school',
      },
      {
        title: 'Idiot2',
        indexNbx: 3,
        icon: 'school',
        link: 'https://quasar.dev',
        picture: '~assets/openfood_logo.svg',
        description: 'school',
      },
      {
        title: 'Idiot3',
        indexNbx: 3,
        icon: 'school',
        link: 'https://quasar.dev',
        picture: '~assets/openfood_logo.svg',
        description: 'school',
      },
    ],
  }
]

let valRtnDt = []


export default defineComponent({
  name: 'CarrouselComps',

  components: {
    Carousel,
    Slide,
    // eslint-disable-next-line vue/no-unused-components
    Pagination,
    Navigation,
  },


  data()
  {
    return{
      carousel: 1,
      valRtnDt: [],
      datascarousels: []
    }
  },

  created() {
    this.valRtnDt = getRestaurantsForCarousel();

    this.datascarousels = toRaw(this.valRtnDt)


    console.log(this.datascarousels)
  },

});
</script>

<style scoped>
.carousel__slide > .carousel__item {
  transform: scale(1);
  opacity: 0.5;
  transition: 0.5s;
}
.carousel__slide--visible > .carousel__item {
  opacity: 1;
  transform: rotateY(0);
}
.carousel__slide--next > .carousel__item {
  transform: scale(0.9) translate(-10px);
}
.carousel__slide--prev > .carousel__item {
  transform: scale(0.9) translate(10px);
}
.carousel__slide--active > .carousel__item {
  transform: scale(1.1);
}

.bg-image {
  background-image: url("~assets/openfood_logo.svg");
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
