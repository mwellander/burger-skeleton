import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: io(),
    chosenIngredients4:[],
    hej:"hej"
  },
  getters: {
    getSocket: state => state.socket,
    getChosenIngredients4: state => state.chosenIngredients4,
    getHej: state => state.hej
  },
  mutations: {
    addToOrder2(state,item){
      state.chosenIngredients4.push(item)
    }
  },
  actions: {

  }
})
