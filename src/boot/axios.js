import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { Cookies } from "quasar";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
let api ="";
if(!Cookies.has('auth_token'))
{
  api = axios.create({ baseURL: 'http://135.125.103.44:8081/'});
}
else
{
  api = axios.create({ baseURL: 'http://135.125.103.44:8081/' , headers: {authorization: `Bearer `+Cookies.get('auth_token') }})
}


export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
