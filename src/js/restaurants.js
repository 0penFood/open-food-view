import {api} from "boot/axios";
import {ref} from "vue";
import {useQuasar} from 'quasar'

export function getRestaurantsForCarousel() {
  const $q = useQuasar()
  let jsonForCarousel = [
    {
      type : "",
      indexNbx: 0,
      restauData : {
        title: "",
        indexNbx: 0,
        icon: "",
        link: "",
        picture: "",
        description: "",
      }
    }
  ]

  jsonForCarousel.pop()

  async function getSociety(id_restaurants) {
    return await api.get('societies/'+id_restaurants+'/restau/partial')
      .then((response) => {
        return response.data[Object.keys(response.data)].societyName
      })
  }

  async function getRestaurants(){
    api.get('/restaurants')
      .then(async(response) => {
        let count = Object.keys(response.data).length;
        for(let i=0; i < count; i++){
          const restaurantName = await getSociety(response.data[i].id)
          jsonForCarousel.push({
            type : response.data[i].type,
            indexNbx: i,
            restauData : {
              title: restaurantName,
              indexNbx: i,
              link: "#",
            }
          })
        }
      }).catch((e) => {
        console.log(e)
      })
  }
  getRestaurants()

  return jsonForCarousel;
}
