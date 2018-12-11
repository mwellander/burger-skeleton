import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: io(),
    chosenIngredients4:[],
    noBurger:[],
    no:0,
    changeIngredients:["hej"],
    changeKey:0,
    totalPrice:0
  },
  getters: {
    getSocket: state => state.socket,
    getChosenIngredients4: state => state.chosenIngredients4,
    getNoBurger: state => state.noBurger,
    getNo: state => state.no,
    getChangeIngredients: state => state.changeIngredients,
    getPrice: state => state.totalPrice
  },
  mutations: {
    addToOrder4(state,item){
      state.chosenIngredients4.push(item)
    },
    addNoBurger(state,path){
      state.no+=1,
      state.noBurger.push({noB:state.no,path:path,ingredients:state.chosenIngredients4}),
      state.chosenIngredients4=[]
    },
    changeOrder(state,ingredients){
      state.changeIngredients=ingredients
      // state.changeKey=key
    },
    emptyChangeIngrediens(state){
      state.changeIngredients=[]
    },
    changePrice(state,price){
      state.totalPrice+=price
    }
  },
  actions: {

  }
})
