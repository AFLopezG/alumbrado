import { defineStore } from 'pinia'

export const globalStore = defineStore('global', {
  state: () => ({
    counter: 0,
    user: {},
    eventNumber: 0,
    isLoggedIn: !!localStorage.getItem('tokenElec'),

    boolusuario: false,
    booledituser: false,
    boolpuntos: false,
    boolgeneral: false,
    boolmtto: false,
    booldistrito: false,
    booldenuncia: false,
    boolreporte: false,
    boolcronograma: false,
    booltecnico: false,
    booljunta: false,
    boolgestionar: false,
    boolreclamo: false,
    boolalmacen: false,
    booldependencia: false,
    boolreporte2: false,
    boolveracta: false,
    boolregacta: false,
    booleditacta: false,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment () {
      this.counter++
    }
  }
})
