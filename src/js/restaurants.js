import {api} from "boot/axios";
import {ref} from "vue";
import {useQuasar} from 'quasar'

export async function getRestaurantsForCarousel() {

  function getSociety(id_restaurants) {
    return api.get('societies/' + id_restaurants + '/restau/partial')
      .then((response) => {
        if (typeof response.data[Object.keys(response.data)].societyName !== 'undefined') {
          return response.data[Object.keys(response.data)].societyName
        }
      })
  }

  async function getRestaurants() {
    let jsonForCarousel = [
      {
        type: "",
        indexNbx: 0,
        restauData: [{
          title: "",
          indexNbx: 0,
          icon: "",
          link: "",
          picture: "",
          description: "",
        },]
      }
    ]

    jsonForCarousel.shift();

    return api.get('/restaurants')
      .then(async (response) => {
        let count = Object.keys(response.data).length;
        for (let i = 0; i < count; i++) {

          const restaurantName = await getSociety(response.data[i].id)

          if (typeof restaurantName !== 'undefined') {
            let existType = -1;
            for (let y = 0; y < jsonForCarousel.length; y++) {
              if (response.data[i].type === jsonForCarousel[y].type) {
                existType = y;
                break;
              }
            }

            if (existType != -1) {
              jsonForCarousel[existType].restauData.push({
                title: restaurantName,
                indexNbx: existType,
                link: "#/details",
                picture: "https://135.125.103.44/s/iXMADLHMgxkjpjE/preview",
              });
            } else {
              jsonForCarousel.push({
                type: response.data[i].type,
                indexNbx: i,
                restauData: [{
                  title: restaurantName,
                  indexNbx: i,
                  link: "#/details",
                  picture: "https://135.125.103.44/s/iXMADLHMgxkjpjE/preview",
                },]
              })
            }
          }
        }
        return jsonForCarousel
      }).catch((e) => {
        console.log(e)
      })
  }


  return await getRestaurants()
}
