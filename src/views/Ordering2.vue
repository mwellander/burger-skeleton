<template>
  <div id="ordering2">
    <link rel="ordering" href="Ordering.vue">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<div class="tabs2" v-show="started2">
  <button v-on:click="toReadyBurger()">{{uiLabels.readyBurger}}</button>
  <button v-on:click="toSides2()">{{uiLabels.sides}}</button>
  <button v-on:click="toBeverage2()">{{uiLabels.beverage}}</button>
</div>
<div style="text-align:left">
  <!-- <button class="LanguageButton" v-on:click="switchLang()">{{ uiLabels.language }}</button>   -->
  <button class="LanguageButton" v-on:click="switchLang()"><img :src="require('../assets/' + uiLabels.flag)" height="30em"></button>
</div>
<br>
<!-- <br> -->
<h1 v-show="started">{{ uiLabels.ingredients }}</h1>
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

<div class="sidesPage" id="sidesPage">
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

<div class="beveragePage" id="beveragePage">
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

<div class="receipt" v-show="started">
  <div class="row">
    <div class="column a"><h3>{{ uiLabels.order }}</h3></div>
    <div class="column b"><h3>{{ uiLabels.sideOrder }}</h3></div>
    <div class="column c" style="text-align:left">
      <ul style="list-style-type:none">
        <li v-show="breadOrder">{{uiLabels.bread}}: {{ Bread.map(item => item["ingredient_"+lang]).join(", ") }}</li>
        <li v-show="burgerOrder">{{uiLabels.burger}}: {{ Burger.map(item => item["ingredient_"+lang]).join(", ") }}</li>
        <li v-show="dressingOrder">{{uiLabels.dressing}}: {{ Dressing.map(item => item["ingredient_"+lang]).join(", ") }}</li>
        <li v-show="toppingsOrder">{{uiLabels.toppings}}: {{ Toppings.map(item => item["ingredient_"+lang]).join(", ") }}</li>
      </ul>
    </div>
    <div class="column d" style="text-align:left">
      <ul style="list-style-type:none">
        <li v-show="sidesOrder">{{uiLabels.sides}}: {{ Sides.map(item => item["ingredient_"+lang]).join(", ") }}</li>
        <li v-show="beverageOrder">{{uiLabels.beverage}}: {{ Beverage.map(item => item["ingredient_"+lang]).join(", ") }}</li>
      </ul>
      <!-- <h3 class="totalText" style="text-align:right"><u>{{uiLabels.total}}: {{ price }} kr</u></h3> -->
    </div>
  </div>

  <h3 class="totalText" style="text-align:right"><u>{{uiLabels.total}}: {{ price }} kr</u></h3>

  <div style="text-align:right">
    <button class="cancelButton" v-on:click="cancelOrder()"><i class="fa fa-trash"></i>{{ uiLabels.cancelOrder }}</button>
    <button class="orderButton" v-on:click="placeOrder()">{{ uiLabels.placeOrder }}</button>
  </div>

</div>
</div>
</template>
<script>

import Ingredient from '@/components/Ingredient.vue'
import OrderItem from '@/components/OrderItem.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Ordering',
  components: {
    Ingredient,
    OrderItem
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
  // the ordering system and the kitchen
  data: function() { //Not that data is a function!
    return {
      chosenIngredients:[],
      chosenIngredientsBurger: [],
      chosenIngredientsSides: [],
      Sides: [],
      Beverage: [],
      ReadyBurger: [],
      readyBurgerOrder:false,
      sidesOrder:false,
      beverageOrder:false,
      price: 0,
      orderNumber: "",
      state:"start",
      readyBurger:false,
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
    startOrder: function(){
      this.state="readyburger";
      this.readyBurger=true;
    },
    cancelOrder: function () {
      this.chosenIngredientsBurger= [];
      this.chosenIngredientsSides= [];
      this.ReadyBurger= [];
      this.Sides= [];
      this.Beverage= [];
      this.readyBurgerOrder=false;
      this.sidesOrder=false;
      this.beverageOrder=false;
      this.price= 0;
      this.orderNumber= "";
      this.state="readyBurger";
      this.readyBurger=true;
      this.sides=false;
      this.beverages=false;
    },
    addToOrder: function (item) {
      this.chosenIngredients.push(item);
      if(item.category===5 || item.category===6){
        this.chosenIngredientsSides.push(item);
        if(item.category===5){
          this.Sides.push(item);
          this.sidesOrder=true;
        }
        else{
          this.Beverage.push(item);
          this.beverageOrder=true;
        }
      }
      else{
        this.chosenIngredientsBurger.push(item);
          this.ReadyBurger.push(item);
          this.readyBurgerOrder=true;
      }
      this.price += +item.selling_price;
    },
    placeOrder: function () {
      var i,
      //Wrap the order in an object
      order = {
        ingredients: this.chosenIngredients,
        price: this.price
      };
      // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
      this.$store.state.socket.emit('order', {order: order});
      //set all counters to 0. Notice the use of $refs
      for (i = 0; i < this.$refs.ingredient.length; i += 1) {
        this.$refs.ingredient[i].resetCounter();
      }
      this.price = 0;
      this.chosenIngredients = [];
      this.chosenIngredientsBurger= [];
      this.chosenIngredientsSides= [];
      this.ReadyBurger= [];
      this.Sides= [];
      this.Beverage= [];
      this.readyBurgerOrder=false;
      this.sidesOrder=false;
      this.beverageOrder=false;
      this.price= 0;
      this.readyBurger=true;
      this.sides=false;
      this.beverages=false;
    },
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
  width: 5.55em;
}
.tabs2 button:hover {
  background-color:#ddd;
}

</style>
