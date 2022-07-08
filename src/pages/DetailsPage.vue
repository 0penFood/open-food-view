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
            <q-carousel-slide :name="1" img-src="https://th.bing.com/th/id/R.782c60d92143e17372fff49eee2903b8?rik=JxVqsKKxnNVC3g&riu=http%3a%2f%2fkooltronic.com%2fimages%2fimage-not-found.png&ehk=DBnfbTFEgvgoCZXl30O3ks9T%2bPGsLLbIu%2bktdioJjsA%3d&risl=&pid=ImgRaw&r=0"/>
            <q-carousel-slide :name="2" img-src="https://cdn.xxl.thumbs.canstockphoto.com/server-message-error-404-on-a-black-background-3d-rendering-computer-generated-text-about-the-drawings_csp81442638.jpg"/>
            <q-carousel-slide :name="3" img-src="https://th.bing.com/th/id/OIP.6Fw3I4GTendpiVGQKVoxbAAAAA?pid=ImgDet&rs=1"/>
            <q-carousel-slide :name="4" img-src="https://th.bing.com/th/id/R.f6945000d1927530311c28bc9e831a22?rik=hXt3NjtmlDQCkQ&riu=http%3a%2f%2f1.bp.blogspot.com%2f-PUVo2mk7fjM%2fTjAWtxjXriI%2fAAAAAAAABP4%2f6Jr7S-angaE%2fs1600%2f404-desktop-not-found-wallpaper.jpg&ehk=q1bg%2b8mMmuSWU5t60TG7HrAOEwQD7zV0lfimj69Dl%2fU%3d&risl=&pid=ImgRaw&r=0"/>
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
                  <card-comps :name-menu="menu.name" :idMenu="menu.id" :price="menu.price" :details="menu.details" :idRestau="id"/>
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

