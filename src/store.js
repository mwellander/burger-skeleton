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
    changeIngredients:[],
    changeKey:0,
    totalPrice:0,
    price:0,
    orderInLine:0,
    uiLabels: {},
    lang:"en"
  },
  getters: {
    getSocket: state => state.socket,
    getChosenIngredients4: state => state.chosenIngredients4,
    getNoBurger: state => state.noBurger,
    getNo: state => state.no,
    getChangeIngredients: state => state.changeIngredients,
    getPrice: state => state.totalPrice,
    getChangeKey: state => state.changeKey,
    orderInLine: state => state.orderInLine,
    lang: state => state.lang
  },
  mutations: {
    orderInLine(state) {
      state.orderInLine += 1
    },
    addToOrder4(state,item){
      state.chosenIngredients4 = item
    },
    addPrice(state,price){
      state.price=price
    },
    addNoBurger(state,path){
      state.no+=1,
      state.noBurger.push({noB:state.no,path:path,price:state.price,ingredients:state.chosenIngredients4}),
      state.chosenIngredients4=[],
      state.price=0
    },
    changeOrder(state,key){
      state.changeIngredients=key.ingredients
      state.changeKey=key.index
    },
    emptyChangeIngrediens(state){
      state.changeIngredients=[]
    },
    saveChange(state,ingredients){
      state.noBurger[state.changeKey].ingredients=ingredients
    },
    deleteBurger(state,index){
      state.noBurger.splice([index],1)
    },
    changePrice(state,price){
      state.totalPrice+=price
    },
    cancelOrder(state){
      state.noBurger=[],
      state.totalPrice=0,
      state.no=0
    },
    savePrice(state,price){
      state.noBurger[state.changeKey].price=price
    },
    startOver(state){
      state.no=0
    },
    setUiLabels: function (store, labels) {
      store.uiLabels = labels;
    },
    switchLang: function (store, lang) {
      store.lang = lang;
    }
  },
  actions: {

  }
})
