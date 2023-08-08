import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { globalStore } from 'stores/globalStore'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: import.meta.env.VITE_API_BACK  });

export default boot(({ app,router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$url = import.meta.env.VITE_API_BACK
  app.config.globalProperties.$store = globalStore()
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  const token = localStorage.getItem('tokenElec')
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    api.post('me').then((response) => {
      console.log(response.data)
      globalStore().user = response.data
      globalStore().isLoggedIn = true
      response.data.permisos.forEach((r: { id: number }) => {
        if (r.id === 1)  globalStore().boolusuario = true
        if (r.id === 2)  globalStore().booledituser = true
        if (r.id === 3)  globalStore().boolpuntos = true
        if (r.id === 4)  globalStore().boolgeneral = true
        if (r.id === 5)  globalStore().boolmtto = true
        if (r.id === 6)  globalStore().booldistrito = true
        if (r.id === 7)  globalStore().booldenuncia = true
        if (r.id === 8)  globalStore().boolreporte = true
        if (r.id === 9) globalStore().boolcronograma = true
        if (r.id === 10) globalStore().booltecnico = true
        if (r.id === 11) globalStore().booljunta = true
        if (r.id === 12) globalStore().boolgestionar = true
        if (r.id === 13) globalStore().boolreclamo = true
        if (r.id === 14) globalStore().boolalmacen = true
        if (r.id === 15) globalStore().booldependencia = true
        if (r.id === 16) globalStore().boolreporte2 = true
        if (r.id === 17) globalStore().boolveracta = true
        if (r.id === 18) globalStore().boolregacta = true
        if (r.id === 19) globalStore().booleditacta = true
      })
    }).catch(() => {
      app.config.globalProperties.$api.defaults.headers.common.Authorization = ''
      globalStore().user = {}
      localStorage.removeItem('tokenElec')
      globalStore().isLoggedIn = false
      globalStore().boolusuario = false
      globalStore().booledituser = false
      globalStore().boolpuntos = false
      globalStore().boolgeneral = false
      globalStore().boolmtto = false
      globalStore().booldistrito = false
      globalStore().booldenuncia = false
      globalStore().boolreporte = false
      globalStore().boolcronograma = false
      globalStore().booltecnico = false
      globalStore().booljunta = false
      globalStore().boolgestionar = false
      globalStore().boolreclamo = false
      globalStore().boolalmacen = false
      globalStore().booldependencia = false
      globalStore().boolreporte2 = false
      globalStore().boolveracta = false
      globalStore().boolregacta = false
      globalStore().booleditacta = false
    })
  } else {
    console.log('no token')
    console.log(router)
    // router.push('/login')
    router.push('/login')
    router.replace({ path: '/login' })
    globalStore().user = {}
    globalStore().isLoggedIn = false
    globalStore().boolusuario = false
    globalStore().booledituser = false
    globalStore().boolpuntos = false
    globalStore().boolgeneral = false
    globalStore().boolmtto = false
    globalStore().booldistrito = false
    globalStore().booldenuncia = false
    globalStore().boolreporte = false
    globalStore().boolcronograma = false
    globalStore().booltecnico = false
    globalStore().booljunta = false
    globalStore().boolgestionar = false
    globalStore().boolreclamo = false
    globalStore().boolalmacen = false
    globalStore().booldependencia = false
    globalStore().boolreporte2 = false
    globalStore().boolveracta = false
    globalStore().boolregacta = false
    globalStore().booleditacta = false
    localStorage.removeItem('tokenElec')
    globalStore().isLoggedIn = false
  }
});

export { api };
