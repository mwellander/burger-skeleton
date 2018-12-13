<template>
  <div id="ordering2">
    <link rel="stylesheet" href="Ordering.vue">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div id="toChangeBackground2">
    <div class="tabs2">
      <button v-on:click="toReadyBurger()">{{uiLabels.readyBurger}}</button>
      <button v-on:click="toSides2()">{{uiLabels.sides}}</button>
      <button v-on:click="toBeverage2()">{{uiLabels.beverage}}</button>
    </div>
    <div style="text-align:left">
      <button class="LanguageButtonO" v-on:click="switchLang()"><img :src="require('../assets/' + uiLabels.flag)" height="30em"></button>
    </div>
    <br>
    <br>
    <div class="breadPage" id="readyBurgerPage">
      <Ingredient
      ref="ingredient"
      v-show="state2 === 'readyBurger'"
      v-if="item.category===7 && item.stock > 0"
      v-for="item in ingredients"
      v-on:increment="addToOrder2(item)"
      :item="item"
      :lang="uiLabels.lang"
      :key="item.ingredient_id">
    </Ingredient>
  </div>
  <div class="buttonPanelBread" id="buttonPanelReadyBurger">
  <button id="nextButton" v-show="readyBurger" v-on:click='toSides2()'>{{uiLabels.next}}</button>
</div>

  <div class="Page" id="sidesPage2">
    <Ingredient
    ref="ingredient"
    v-show="state2 === 'sides2'"
    v-if="item.category===5 && item.stock > 0"
    v-for="item in ingredients"
    v-on:increment="addToOrder2(item)"
    :item="item"
    :lang="uiLabels.lang"
    :key="item.ingredient_id">
  </Ingredient>
</div>
<div class="buttonPanel" id="buttonPanelSides2">
<button id="previousButton" v-show="sides2" v-on:click="toReadyBurger()">{{uiLabels.previous}}</button>
<button id="nextButton" v-show="sides2" v-on:click='toBeverage2()'>{{uiLabels.next}}</button>
</div>

<div class="Page" id="beveragePage2">
  <Ingredient
  ref="ingredient"
  v-show="state2 === 'beverage2'"
  v-if="item.category===6 && item.stock > 0"
  v-for="item in ingredients"
  v-on:increment="addToOrder2(item)"
  :item="item"
  :lang="uiLabels.lang"
  :key="item.ingredient_id">
</Ingredient>
</div>
<div class="buttonPanel" id="buttonPanelBeverage2">
<button id="previousButton" v-show="beverage2" v-on:click="toSides2()">{{uiLabels.previous}}</button>
</div>

<div class="receipt">
  <div class="row">
    <div class="column aa"><h3>{{ uiLabels.readyBurger }}</h3></div>
    <div class="column aa"><h3>{{ uiLabels.sideOrder }}</h3></div>
    <div class="column cc" style="text-align:left">
      <ul style="list-style-type:none">
        <li v-show="readyBurgerOrder">{{ ReadyBurger.map(item => item["ingredient_"+uiLabels.lang]).join(", ") }}</li>
      </ul>
    </div>
    <div class="column dd" style="text-align:left">
      <ul style="list-style-type:none">
        <li v-show="sidesOrder2">{{uiLabels.sides}}: {{ Sides2.map(item => item["ingredient_"+uiLabels.lang]).join(", ") }}</li>
        <li v-show="beverageOrder2">{{uiLabels.beverage}}: {{ Beverage2.map(item => item["ingredient_"+uiLabels.lang]).join(", ") }}</li>
      </ul>
      <h3 class="totalText" style="text-align:right"><u>{{uiLabels.total}}: {{ price }} kr</u></h3>
    </div>
  </div>

  <h3 class="totalText" style="text-align:right"><u>{{uiLabels.total}}: {{ price }} kr</u></h3>

  <div v-show="change" style="text-align:right">
  <a href="#/home"><button class="cancelButton" v-on:click="cancelChanges()"><i class="fa fa-trash"></i>{{ uiLabels.cancelChange }}</button></a>
  <a href="#/home"><button class="orderButtonO" v-on:click="saveChanges2()">{{ uiLabels.saveChange }}</button></a>
  </div>
  <div v-show="!change" style="text-align:right">
                   <button class="cancelButton" v-on:click="cancelAlert2()"><i class="fa fa-trash"></i>{{ uiLabels.cancelOrder }}</button>
  <a href="#/home"><button class="orderButtonO" v-on:click="sendOrderHome2()">{{ uiLabels.placeOrder }}</button></a>
  </div>
</div>
</div>
<div class="alert" v-show="alert">
  <div class="confirmText">{{uiLabels.confirmMess}}</div>
<a href="#/home" class="confirmCancel" role="button" v-on:click="cancelOrder()">{{uiLabels.yes}}</a>
<button class="confirmNoCancel" v-on:click="cancelAlert2()">{{uiLabels.no}}</button>
</div>

</div>
</template>
<script>

import Ingredient from '@/components/Ingredient.vue'
import OrderItem from '@/components/OrderItem.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'
import ordering from '@/views/Ordering.vue'
import store from '@/store.js'

export default {
  name: 'Ordering2',
  components: {
    Ingredient,
    OrderItem
  },
  mixins: [sharedVueStuff,ordering,store],
 // include stuff that is used in both
  // the ordering system and the kitchen
  data: function() { //Not that data is a function!
    return {
            start:true,
            readyBurgerOrder:false,
            sidesOrder2:false,
            beverageOrder2:false,
            state2:"readyBurger",
            readyBurger:true,
            sides2:false,
            beverage2:false,
            chosenIngredients2:[],
            chosenIngredients5:[],
            chosenIngredientsBurger2: [],
            chosenIngredientsSides2: [],
            Sides2: [],
            Beverage2: [],
            ReadyBurger: [],
            path:"#/favouriteburger",
            alert: false,
            change:false
    }
    //orderArray: chosenIngredients.map(item => item["ingredient_"+lang])
  },
  mounted: function(){
    this.ifChange2();
  },
  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
  },
  methods: {
    sendOrderHome2: function() {
      store.commit('addToOrder4',this.chosenIngredients2);
      store.commit('savePrice',this.price);
      store.commit('addNoBurger', this.path);
      store.commit('emptyChangeIngrediens');
    },
    ifChange2: function(){
      this.chosenIngredients5=store.getters.getChangeIngredients;
      if(this.chosenIngredients5.length>0){
        this.change=true;
        for(var i=0;i<this.chosenIngredients5.length;i++){
          this.addToOrder2(this.chosenIngredients5[i]);
        }
      }
    },
    saveChanges2: function(){
      store.commit('saveChange',this.chosenIngredients2);
      store.commit('savePrice',this.price);
      store.commit('emptyChangeIngrediens');
    },
    addToOrder2: function(item){
      this.chosenIngredients2.push(item);
      if(item.category===5 || item.category===6){
        this.chosenIngredientsSides2.push(item);
        if(item.category===5){
          this.Sides2.push(item);
          this.sidesOrder2=true;
        }
        else{
          this.Beverage2.push(item);
          this.beverageOrder2=true;
        }
      }
      else if(item.category===7){
        this.ReadyBurger.push(item);
        this.readyBurgerOrder=true;
      }
      this.price += +item.selling_price;
    },
    startOrder2: function(){
      this.started2=true;
      this.state2="readyBurger";
      this.readyBurger=true;
    },
    toReadyBurger: function(){
      this.state2="readyBurger";
      this.readyBurger=true;
      this.sides2=false;
      this.beverage2=false;

      var ReadyBurgerPage = document.getElementById("readyBurgerPage");
      var SidesPage2 = document.getElementById("sidesPage2");
      var BeveragePage2 = document.getElementById("beveragePage2");

      ReadyBurgerPage.style.display = "grid";
      SidesPage2.style.display = "none";
      BeveragePage2.style.display = "none";

      var buttonPanelBurger = document.getElementById("buttonPanelReadyBurger");
      var buttonPanelSides = document.getElementById("buttonPanelSides2");
      var buttonPanelBeverage = document.getElementById("buttonPanelBeverage2");

      buttonPanelBurger.style.display = "grid";
      buttonPanelSides.style.display = "none";
      buttonPanelBeverage.style.display = "none";
    },
    toSides2: function(){
      this.state2="sides2";
      this.readyBurger=false;
      this.sides2=true;
      this.beverage2=false;

      var ReadyBurgerPage = document.getElementById("readyBurgerPage");
      var SidesPage2 = document.getElementById("sidesPage2");
      var BeveragePage2 = document.getElementById("beveragePage2");

      ReadyBurgerPage.style.display = "none";
      SidesPage2.style.display = "grid";
      BeveragePage2.style.display = "none";

      var buttonPanelBurger = document.getElementById("buttonPanelReadyBurger");
      var buttonPanelSides = document.getElementById("buttonPanelSides2");
      var buttonPanelBeverage = document.getElementById("buttonPanelBeverage2");

      buttonPanelBurger.style.display = "none";
      buttonPanelSides.style.display = "grid";
      buttonPanelBeverage.style.display = "none";
    },
    toBeverage2:function(){
      this.state2="beverage2";
      this.readyBurger=false;
      this.sides2=false;
      this.beverage2=true;

      var ReadyBurgerPage = document.getElementById("readyBurgerPage");
      var SidesPage2 = document.getElementById("sidesPage2");
      var BeveragePage2 = document.getElementById("beveragePage2");

      ReadyBurgerPage.style.display = "none";
      SidesPage2.style.display = "none";
      BeveragePage2.style.display = "grid";

      var buttonPanelBurger = document.getElementById("buttonPanelReadyBurger");
      var buttonPanelSides = document.getElementById("buttonPanelSides2");
      var buttonPanelBeverage = document.getElementById("buttonPanelBeverage2");

      buttonPanelBurger.style.display = "none";
      buttonPanelSides.style.display = "none";
      buttonPanelBeverage.style.display = "grid";
    },
    cancelAlert2: function() {
      var background = document.getElementById("toChangeBackground2");
      if (this.alert===false){
        this.alert=true;
        background.style.opacity = 0.5;
        background.style['pointer-events'] = "none";
      }
      else {
        this.alert=false;
        background.style.opacity = 1;
        background.style['pointer-events'] = "auto";
      }
    }
  }
}

</script>
<style>
/* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */
#ordering2 {
  height: 100%;
  min-width: 100px;
  min-height: 100px;
}
@media screen and (min-width: 300px) {
  #ordering2 {
    width:20em;
    margin-left:3%;
    margin-right:3%;
  }
  .tabs2{
    width:20em;
  }
  .tabs2 button {
    width: 13.3em;
    font-size: 0.5em;
  }
}
@media screen and (min-width: 700px) {
  #ordering2 {
    width:40em;
    margin:auto;
  }
  .tabs2{
    width:40em;
  }
  .tabs2 button {
    width: 11.1em;
    font-size: 1.2em;
  }
}
.tabs2 {
  overflow: hidden;
  position: fixed;
  top: 1;
  padding-top: 2.5em;
  background-color: black;
  height: 6em;
}
.tabs2 button {
  float: left;
  display: block;
  background-color: grey;
  border: 0.1em solid black;
  text-align: center;
  padding: 0.7em 0.5em;
  /* padding:  14px 16px; */
  text-decoration: none;
}
.tabs2 button:hover {
  background-color:#ddd;
}

#toChangeBackground2 {
  opacity: 1;
  pointer-events: auto;
}

#buttonPanelReadyBurger{
  width:40em;
  grid-template-columns: 20% 60% 20%;
  height: 3.5em;
  bottom: 16.3em;
  z-index: 3;
  display: grid;
  position: fixed;
}

</style>
