<template>
  <div id="ordering2">
    <link rel="stylesheet" href="Ordering.vue">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="tabs2">
      <button v-on:click="toReadyBurger()">{{uiLabels.readyBurger}}</button>
      <button v-on:click="toSides2()">{{uiLabels.sides}}</button>
      <button v-on:click="toBeverage2()">{{uiLabels.beverage}}</button>
    </div>
    <!-- <div style="text-align:left">
      <button class="LanguageButton" v-on:click="switchLang()"><img :src="require('../assets/' + uiLabels.flag)" height="30em"></button>
    </div>
    <br> -->
    <br>
    <h1>{{ uiLabels.ingredients }}</h1>
    <div class="readyBurgerPage" id="readyBurgerPage">
      <Ingredient
      ref="ingredient"
      v-show="state === 'readyBurger'"
      v-if="item.category===7"
      v-for="item in ingredients"
      v-on:increment="addToOrder(item)"
      :item="item"
      :lang="lang"
      :key="item.ingredient_id">
    </Ingredient>
  </div>
  <button id="nextButton" v-show="readyBurger" v-on:click='toSides2()'>{{uiLabels.next}}</button>

  <div class="sidesPage2" id="sidesPage">
    <Ingredient
    ref="ingredient"
    v-show="state === 'sides'"
    v-if="item.category===5"
    v-for="item in ingredients"
    v-on:increment="addToOrder(item)"
    :item="item"
    :lang="lang"
    :key="item.ingredient_id">
  </Ingredient>
</div>
<button id="previousButton" v-show="sides2" v-on:click="toReadyBurger()">{{uiLabels.previous}}</button>
<button id="nextButton" v-show="sides2" v-on:click='toBeverage2()'>{{uiLabels.next}}</button>

<div class="beveragePage2" id="beveragePage">
  <Ingredient
  ref="ingredient"
  v-show="state === 'beverage'"
  v-if="item.category===6"
  v-for="item in ingredients"
  v-on:increment="addToOrder(item)"
  :item="item"
  :lang="lang"
  :key="item.ingredient_id">
</Ingredient>
</div>
<button id="previousButton" v-show="beverage2" v-on:click="toSides2()">{{uiLabels.previous}}</button>

<!-- <div class="receipt">
  <div class="row">
    <div class="column aa"><h3>{{ uiLabels.order }}</h3></div>
    <div class="column bb"><h3>{{ uiLabels.sideOrder }}</h3></div>
    <div class="column cc" style="text-align:left">
      <ul style="list-style-type:none">
        <li v-show="readyBurgerOrder">{{uiLabels.readyBurger}}: {{ ReadyBurger.map(item => item["ingredient_"+lang]).join(", ") }}</li>
      </ul>
    </div>
    <div class="column dd" style="text-align:left">
      <ul style="list-style-type:none">
        <li v-show="sidesOrder2">{{uiLabels.sides}}: {{ Sides2.map(item => item["ingredient_"+lang]).join(", ") }}</li>
        <li v-show="beverageOrder2">{{uiLabels.beverage}}: {{ Beverage2.map(item => item["ingredient_"+lang]).join(", ") }}</li>
      </ul>
      <!-- <h3 class="totalText" style="text-align:right"><u>{{uiLabels.total}}: {{ price }} kr</u></h3> -->
    <!-- </div>
  </div>

  <h3 class="totalText" style="text-align:right"><u>{{uiLabels.total}}: {{ price }} kr</u></h3>

  <div style="text-align:right">
    <button class="cancelButton" v-on:click="cancelOrder()"><i class="fa fa-trash"></i>{{ uiLabels.cancelOrder }}</button>
    <button class="orderButton" v-on:click="placeOrder()">{{ uiLabels.placeOrder }}</button>
  </div>

</div>  -->
</div>
</template>
<script>

import Ingredient from '@/components/Ingredient.vue'
import OrderItem from '@/components/OrderItem.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Ordering2',
  components: {
    Ingredient,
    OrderItem
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
  // the ordering system and the kitchen
  data: function() { //Not that data is a function!
    return {
      chosenIngredients2:[],
      chosenIngredientsBurger2: [],
      chosenIngredientsSides2: [],
      Sides2: [],
      Beverage2: [],
      ReadyBurger: [],
      readyBurgerOrder:false,
      sidesOrder2:false,
      beverageOrder2:false,
      price: 0,
      orderNumber: "",
      state:"readyBurger",
      readyBurger:true,
      sides2:false,
      beverage2:false
    }
    //orderArray: chosenIngredients.map(item => item["ingredient_"+lang])
  },
  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
  },
  methods: {
    startOrder2: function(){
      this.started2=true;
      this.state="readyBurger";
      this.readyBurger=true;
    },
    toReadyBurger: function(){
      this.state="readyBurger";
      this.readyBurger=true;
      this.sides2=false;
      this.beverage2=true;

      var ReadyBurgerPage = document.getElementById("readyBurgerPage");
      var SidesPage2 = document.getElementById("sidesPage2");
      var BeveragePage2 = document.getElementById("beveragePage2");

      ReadyBurgerPage.style.display = "grid";
      SidesPage2.style.display = "none";
      BeveragePage2.style.display = "none";
    },
    toSides2: function(){
      this.state="beverage2";
      this.readyBurger=false;
      this.sides2=true;
      this.beverage2=false;

      var ReadyBurgerPage = document.getElementById("readyBurgerPage");
      var SidesPage2 = document.getElementById("sidesPage2");
      var BeveragePage2 = document.getElementById("beveragePage2");

      ReadyBurgerPage.style.display = "none";
      SidesPage2.style.display = "grid";
      BeveragePage2.style.display = "none";
    },
    toBeverage2:function(){
      this.state="beverage2";
      this.readyBurger=false;
      this.sides2=false;
      this.beverage2=true;

      var ReadyBurgerPage = document.getElementById("readyBurgerPage");
      var SidesPage2 = document.getElementById("sidesPage2");
      var BeveragePage2 = document.getElementById("beveragePage2");

      ReadyBurgerPage.style.display = "none";
      SidesPage2.style.display = "none";
      BeveragePage2.style.display = "grid";
    }
  },
}

</script>
<style>
/* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */
#ordering2 {
  margin: auto;
  width: 40em;
}

.tabs2 {
  overflow: hidden;
  position: fixed;
  top: 1;
  padding-top: 2.5em;
  background-color: black;
  width: 40em;
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
  font-size: 1.2em;
  width: 11.1em;
}
.tabs2 button:hover {
  background-color:#ddd;
}

</style>
