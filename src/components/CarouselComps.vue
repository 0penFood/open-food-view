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
        <div class="full-height full-width flex flex-center" :style="'background-image: url('+dataZoom.picture+'); background-size : cover; !important;'">
          <div class="custom-caption">
            <div class="text-h4 font-size12 main_line animation_2" style="color: white">{{ dataZoom.title }}</div><br><br><br>
            <div class="text-h5 animation_1">{{ dataZoom.description }}</div><br><br><br>
            <div class="animation_2">
              <q-btn size="md" :style="'background:#ff851b; color: white'" label="ORDER" @click="$router.replace(dataZoom.link)"/>
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
import { defineComponent } from 'vue'
import { Carousel, Pagination, Slide, Navigation } from 'vue3-carousel';
import {getRestaurantsForCarousel} from '../js/restaurants'

import 'vue3-carousel/dist/carousel.css';

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
      datascarousels: []
    }
  },
  async mounted() {
    this.datascarousels = await getRestaurantsForCarousel()
  }
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
