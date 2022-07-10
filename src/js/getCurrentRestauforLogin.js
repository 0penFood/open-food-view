import { api } from "boot/axios";

export async function getRestauForLogin(id_user) {
  async function getSociety(id_user) {
    return await api
      .get("users/" + id_user + "/USocieties")
      .then((response) => {
        if (
          typeof response.data[Object.keys(response.data)].society_id !==
          "undefined"
        ) {
          return response.data[Object.keys(response.data)].society_id;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function getRestauID(id_user) {
    const society_id = await getSociety(id_user);
    return await api
      .get("societies/" + society_id + "/partial")
      .then((response) => {
        if (
          typeof response.data[Object.keys(response.data)].idRestaurant !==
          "undefined"
        ) {
          return response.data[Object.keys(response.data)].idRestaurant;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return await getRestauID(id_user);
}
