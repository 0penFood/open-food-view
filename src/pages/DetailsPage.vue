<template>
  <div>
    <div class="row bg-white q-mt-sm">
      <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
        <div class="q-pa-md">

          <q-carousel
            swipeable
            animated
            v-model="slide"
            thumbnails
            infinite
          >
            <q-carousel-slide :name="1" img-src="https://img.freepik.com/photos-gratuite/pates-penne-sauce-tomate-au-poulet-tomates-table-bois_2829-19739.jpg?t=st=1656657684~exp=1656658284~hmac=df29d8b91e5bb4ca5967c2ec6c7532d29580e08f0d008680d00da7f82be05fc2&w=996"/>
            <q-carousel-slide :name="2" img-src="https://img.freepik.com/photos-gratuite/pizza-pizza-remplie-tomates-salami-olives_140725-1200.jpg?t=st=1656657708~exp=1656658308~hmac=497ca03af71a86909a6bf385582919b673579556d300403fe5486b3dd14231c1&w=740"/>
            <q-carousel-slide :name="3" img-src="https://img.freepik.com/photos-gratuite/salade-fraiche-dinde-aux-oeufs-aux-legumes_1220-5193.jpg?t=st=1656657757~exp=1656658357~hmac=ce0d5bfe270ba39775d207424d2b49b7cc5d54eb11d8a601e15029c0d284d9e3&w=996"/>
            <q-carousel-slide :name="4" img-src="https://img.freepik.com/photos-gratuite/plat-gnocchi-cuisine-alpine-italienne-sud-allemande-autrichienne_661608-208.jpg?w=996"/>
          </q-carousel>


        </div>
      </div>
      <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
        <!--<q-scroll-area :style="{'height':(win_height-200)+'px'}">-->
        <div class="row">
          <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12" :class="$q.platform.is.desktop ? '' : 'q-px-md'">
            <div class="text-subtitle1 text-grey-10 q-mt-sm q-pt-xs">{{ nameSociety }}
            </div>
            <div>
              <q-chip size="10px" class="text-weight-bold q-px-xs" square color="green-7" text-color="white"
                      icon-right="star">
                4.4
              </q-chip>
              <span class="text-caption text-weight-bold text-grey-6">6 Ratings & 2 Reviews</span>
            </div>
            <div class="q-mt-sm text-weight-bold">
              Offers
              <ul class="q-pl-sm text-caption" style="list-style-type: none">
                <li class="q-mt-xs"><span class="text-weight-bold">Bank Offer</span> 5% Unlimited Cashback on Axis Bank
                  Credit
                  Card <a class="text-primary text-weight-bolder">T&C</a></li>
                <li class="q-mt-xs"><span class="text-weight-bold">Bank Offer</span> 5% Unlimited Cashback on Axis Bank
                  Credit
                  Card <a class="text-primary text-weight-bolder">T&C</a></li>
                <li class="q-mt-xs"><span class="text-weight-bold">Bank Offer</span> OfferExtra 5% off* <a
                  class="text-primary text-weight-bolder">T&C</a></li>
              </ul>
            </div>
            <div class="q-mt-sm">
              <div class="text-subtitle1 text-green-8 text-weight-bold">OPEN</div>
              <div class="text-caption q-mt-sm text-grey-8 text-weight-bold">Delivery by:
                <span class="text-black">{{deliveryTime(false)}}</span>
              </div>
              <div class="text-caption text-subtitle2 text-grey-8 text-weight-bold">Fastest delivery: <span
                class="text-black">{{deliveryTime(true)}}</span></div>
            </div>
          </div>

        </div>

      </div>
    </div>
    <div class="row q-mt-sm">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <q-tabs
          v-model="tab"
          dense
          align="left"
          class="bg-primary text-white shadow-2"
          :breakpoint="0"
        >
          <q-tab name="Menus" label="Menus"/>
        </q-tabs>

        <q-tab-panels style="border: 1px solid lightgrey" v-model="tab">
          <q-tab-panel name="Menus">
            <div class="row">
              <div v-for="menu in menus"
               :key="menu.indexNbx">
                  <card-comps :name-menu="menu.name" :id="menu.id" :price="menu.price" :details="menu.details"/>
              </div>
            </div>

          </q-tab-panel>


        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "boot/axios";
import CardComps from "components/CardComps.vue";

let dataRestaurant;

export default {
  name: "DetailsPage.vue",
  props: ['id'],

  components: {
    CardComps
  },

  data() {
    return {
      slide: 1,
      tab: 'Menus',
      rating_point: 4.3,
      rat_5: 5,
      rat_4: 4,
      rat_3: 3,
      rat_2: 2,
      rat_1: 1,
      nameSociety: "",
      menus: [],
    }
  },

  async created()
  {
    this.nameSociety = await api.get('societies/' + this.id + '/restau/partial')
    .then((response) => {
      if (typeof response.data[Object.keys(response.data)].societyName !== 'undefined') {
        return response.data[Object.keys(response.data)].societyName
      }
    })

    const pathRoute = '/restaurants/'+this.id;


    this.dataRestaurant;

    this.menus = await api.get(pathRoute)
      .then(async (response) => {
        return await response.data[0].menus;
      }).catch((e) => {
        console.log(e)
      });

  },


  methods: {
    deliveryTime(fast) {
      const current = new Date();
      const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
      let time;
      if(fast)
      {
        let newTime = current.getMinutes() + 15;
        if(newTime > 60)
        {
          let newMinute = newTime - 60;
          if(newMinute < 10)
          {
            time = (current.getHours() + 1) + ":0" + newMinute;
          }
          else
          {
            time = (current.getHours() + 1) + ":" + newMinute;
          }
        }
        else
        {
          time = current.getHours() + ":" + newTime;
        }
      }
      else
      {
        let newTime = current.getMinutes() + 35;
        if(newTime > 60)
        {
          let newMinute = newTime - 60;
          if(newMinute < 10)
          {
            time = (current.getHours() + 1) + ":0" + newMinute;
          }
          else
          {
            time = (current.getHours() + 1) + ":" + newMinute;
          }
        }
        else
        {
          time = current.getHours() + ":" + newTime;
        }
      }

      return date +' '+ time;
    }
  },

  computed: {
    win_width() {
      return this.$q.screen.width - 59;
    },
    win_height() {
      return this.$q.screen.height - 0;
    }
  }
}
</script>


<style scoped>
small {
  color: gray;
}
img {
  width: 100%;
  height: 300px;
  margin-bottom: 10px;
}
.details strong {
  font-size: 1.1em;
}
.details p {
  width: 60%;
}
.prices span {
  font-weight: bold;
  font-size: 1.5em;
}
strike {
  color: gray;
}
button {
  cursor: pointer;
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 50%;
}
</style>

