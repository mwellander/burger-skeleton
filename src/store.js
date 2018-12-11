import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: io(),
    chosenIngredients4:[],
    hej:"hej",
    noBurger:[]
  },
  getters: {
    getSocket: state => state.socket,
    getChosenIngredients4: state => state.chosenIngredients4,
    getHej: state => state.hej,
    getNoBurger: state => state.noBurger,
    getNo: state => state.no
  },
  mutations: {
    addToOrder4(state,item){
      state.chosenIngredients4.push(item)
    },
    addNoBurger(state,path){
      state.no+=1,
      state.noBurger.push({noB:state.no, path:path})
    },
  },
  actions: {

  }
})
