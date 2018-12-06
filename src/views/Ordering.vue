<template>
  <div id="ordering">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!--  <div class="navbar">
    <a href="#burger">{{ uiLabels.burger }}</a>
    <a href="#toppings">{{ uiLabels.toppings }}</a>
    <a href="#dressing">{{ uiLabels.dressing }}</a>
    <a href="#bread">{{ uiLabels.bread }}</a>
    <a href="#sides">{{ uiLabels.sides }}</a>
    <a href="#beverage">{{ uiLabels.beverage }}</a>
  </div> -->
  <button class="startButton" id="startButton" v-show="!started" v-on:click="startOrder()">Start Order</button>

  <div class="tabs" v-show="started">
    <button v-on:click="toBread()">{{uiLabels.bread}}</button>
    <button v-on:click="toBurger()">{{uiLabels.burger}}</button>
    <button v-on:click="toDressing()">{{uiLabels.dressing}}</button>
    <button v-on:click="toToppings()">{{uiLabels.toppings}}</button>
    <button v-on:click="toSides()">{{uiLabels.sides}}</button>
    <button v-on:click="toBeverage()">{{uiLabels.beverage}}</button>
  </div>

  <div style="text-align:left">
    <button class="LanguageButtonO" v-on:click="switchLang()"><img :src="require('../assets/' + uiLabels.flag)" height="30em"></button>
  </div>

  <!-- <img class="example-panel" src="@/assets/exampleImage.jpg"> -->
  <br>
  <!-- <br> -->
  <h1 v-show="started">{{ uiLabels.ingredients }}</h1>

<div class="fixedStuff">
  <div class="breadPage" id="breadPage">
    <Ingredient
    ref="ingredient"
    v-show="state === 'bread'"
    v-if="item.category===4"
    v-for="item in ingredients"
    v-on:increment="addToOrder(item)"
    :item="item"
    :lang="lang"
    :key="item.ingredient_id">
  </Ingredient>
  </div>
  <div id="buttonPanelBread">
  <button id="nextButton" v-show="bread" v-on:click='toBurger()'>{{uiLabels.next}}</button>
  </div>

<div class="burgerPage" id="burgerPage">
  <Ingredient
  ref="ingredient"
  v-show="state === 'burger'"
  v-if="item.category===1"
  v-for="item in ingredients"
  v-on:increment="addToOrder(item)"
  :item="item"
  :lang="lang"
  :key="item.ingredient_id">
</Ingredient>
</div>
<div id="buttonPanelBurger">
<button id="previousButton" v-show="burger" v-on:click="toBread()">{{uiLabels.previous}}</button>
<button id="nextButton" v-show="burger" v-on:click='toDressing()'>{{uiLabels.next}}</button>
</div>


<div class="dressingPage" id="dressingPage">
  <Ingredient
  ref="ingredient"
  v-show="state === 'dressing'"
  v-if="item.category===3"
  v-for="item in ingredients"
  v-on:increment="addToOrder(item)"
  :item="item"
  :lang="lang"
  :key="item.ingredient_id">
</Ingredient>
</div>
<div id="buttonPanelDressing">
<button id="previousButton" v-show="dressing" v-on:click="toBurger()">{{uiLabels.previous}}</button>
<button id="nextButton" v-show="dressing" v-on:click='toToppings()'>{{uiLabels.next}}</button>
</div>


<div class="toppingPage" id="toppingPage">
  <Ingredient
  ref="ingredient"
  v-show="state === 'toppings'"
  v-if="item.category===2"
  v-for="item in ingredients"
  v-on:increment="addToOrder(item)"
  :item="item"
  :lang="lang"
  :key="item.ingredient_id">
</Ingredient>
</div>
<div id="buttonPanelToppings">
<button id="previousButton" v-show="toppings" v-on:click="toDressing()">{{uiLabels.previous}}</button>
<button id="nextButton" v-show="toppings" v-on:click='toSides()'>{{uiLabels.next}}</button>
</div>


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
<div id="buttonPanelSides">
<button id="previousButton" v-show="sides" v-on:click="toToppings()">{{uiLabels.previous}}</button>
<button id="nextButton" v-show="sides" v-on:click='toBeverage()'>{{uiLabels.next}}</button>
</div>

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
<div id="buttonPanelBeverage">
<button id="previousButton" v-show="beverage" v-on:click="toSides()">{{uiLabels.previous}}</button>
</div>
</div>

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

<div class="receipt" v-show="started">
  <div class="row">
    <div class="column aa"><h3>{{ uiLabels.order }}</h3></div>
    <div class="column aa"><h3>{{ uiLabels.sideOrder }}</h3></div>
    <div class="column cc" style="text-align:left">
      <ul style="list-style-type:none">
        <li v-show="breadOrder">{{uiLabels.bread}}: {{ Bread.map(item => item["ingredient_"+lang]).join(", ") }}</li>
        <li v-show="burgerOrder">{{uiLabels.burger}}: {{ Burger.map(item => item["ingredient_"+lang]).join(", ") }}</li>
        <li v-show="dressingOrder">{{uiLabels.dressing}}: {{ Dressing.map(item => item["ingredient_"+lang]).join(", ") }}</li>
        <li v-show="toppingsOrder">{{uiLabels.toppings}}: {{ Toppings.map(item => item["ingredient_"+lang]).join(", ") }}</li>
      </ul>
    </div>
    <div class="column dd" style="text-align:left">
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
    <a href="#/home"><button class="orderButtonO" v-on:click="sendOrderHome()">{{ uiLabels.placeOrder }}</button></a>
  </div>
</div>
  <!-- <h3>{{ uiLabels.ordersInQueue }}</h3>
  <div>
  <OrderItem
  v-for="(order, key) in orders"
  v-if="order.status !== 'done'"
  :order-id="key"
  :order="order"
  :ui-labels="uiLabels"
  :lang="lang"
  :key="key">
</OrderItem>
</div> -->
</div>
</template>
<script>

//import the components that are used in the template, the name that you
//use for importing will be used in the template above and also below in
//components
import Ingredient from '@/components/Ingredient.vue'
import OrderItem from '@/components/OrderItem.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

/* instead of defining a Vue instance, export default allows the only
necessary Vue instance (found in main.js) to import your data and methods */
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
      Burger: [],
      Toppings: [],
      Dressing: [],
      Bread: [],
      Sides: [],
      Beverage: [],
      ReadyBurger: [],
      burgerOrder:false,
      toppingsOrder:false,
      dressingOrder:false,
      breadOrder:false,
      sidesOrder:false,
      beverageOrder:false,
      price: 0,
      orderNumber: "",
      state:"start",
      start:true,
      burger:false,
      toppings:false,
      dressing:false,
      bread:false,
      sides:false,
      beverages:false,
      started:false,
      readyBurger:false,
      sides2:false,
      beverage2:false,
      nrBurgerOrder: 0
    }
    //orderArray: chosenIngredients.map(item => item["ingredient_"+lang])
  },
  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
  },
  methods: {
    sendOrderHome: function() {
      this.nrBurgerOrder++;
    },
    startOrder: function(){
      this.started=true;
      this.state="bread";
      this.bread=true;
    },
    cancelOrder: function () {
      this.chosenIngredients=[];
      this.chosenIngredientsBurger= [];
      this.chosenIngredientsSides= [];
      this.Burger= [];
      this.Toppings= [];
      this.Dressing= [];
      this.Bread= [];
      this.Sides= [];
      this.Beverage= [];
      this.ReadyBurger=[];
      this.burgerOrder=false;
      this.toppingsOrder=false;
      this.dressingOrder=false;
      this.breadOrder=false;
      this.sidesOrder=false;
      this.beverageOrder=false;
      this.readyBurgerOrder=false;
      this.price= 0;
      this.orderNumber= "";
      this.state="bread";
      this.burger=true;
      this.toppings=false;
      this.dressing=false;
      this.bread=false;
      this.sides=false;
      this.beverages=false;
      this.readyBurger=false;
    },
    toBurger: function(){
      this.state="burger";
      this.burger=true;
      this.toppings=false;
      this.dressing=false;
      this.bread=false;
      this.sides=false;
      this.beverage=false;

      var BreadPage = document.getElementById("breadPage");
      var BurgerPage = document.getElementById("burgerPage");
      var DressingPage = document.getElementById("dressingPage");
      var ToppingPage = document.getElementById("toppingPage");
      var SidesPage = document.getElementById("sidesPage");
      var BeveragePage = document.getElementById("beveragePage");

      BreadPage.style.display = "none";
      BurgerPage.style.display = "grid";
      DressingPage.style.display = "none";
      ToppingPage.style.display = "none";
      SidesPage.style.display = "none";
      BeveragePage.style.display = "none";

      var buttonPanelBread = document.getElementById("buttonPanelBread");
      var buttonPanelBurger = document.getElementById("buttonPanelBurger");
      var buttonPanelDressing = document.getElementById("buttonPanelDressing");
      var buttonPanelToppings = document.getElementById("buttonPanelToppings");
      var buttonPanelSides = document.getElementById("buttonPanelSides");
      var buttonPanelBeverage = document.getElementById("buttonPanelBeverage");

      buttonPanelBread.style.display = "none";
      buttonPanelBurger.style.display = "grid";
      buttonPanelDressing.style.display = "none";
      buttonPanelToppings.style.display = "none";
      buttonPanelSides.style.display = "none";
      buttonPanelBeverage.style.display = "none";

    },
    toToppings: function(){
      this.state="toppings";
      this.burger=false;
      this.toppings=true;
      this.dressing=false;
      this.bread=false;
      this.sides=false;
      this.beverage=false;

      var BreadPage = document.getElementById("breadPage");
      var BurgerPage = document.getElementById("burgerPage");
      var DressingPage = document.getElementById("dressingPage");
      var ToppingPage = document.getElementById("toppingPage");
      var SidesPage = document.getElementById("sidesPage");
      var BeveragePage = document.getElementById("beveragePage");

      BreadPage.style.display = "none";
      BurgerPage.style.display = "none";
      DressingPage.style.display = "none";
      ToppingPage.style.display = "grid";
      SidesPage.style.display = "none";
      BeveragePage.style.display = "none";

      var buttonPanelBread = document.getElementById("buttonPanelBread");
      var buttonPanelBurger = document.getElementById("buttonPanelBurger");
      var buttonPanelDressing = document.getElementById("buttonPanelDressing");
      var buttonPanelToppings = document.getElementById("buttonPanelToppings");
      var buttonPanelSides = document.getElementById("buttonPanelSides");
      var buttonPanelBeverage = document.getElementById("buttonPanelBeverage");

      buttonPanelBread.style.display = "none";
      buttonPanelBurger.style.display = "none";
      buttonPanelDressing.style.display = "none";
      buttonPanelToppings.style.display = "grid";
      buttonPanelSides.style.display = "none";
      buttonPanelBeverage.style.display = "none";
    },
    toDressing: function(){
      this.state="dressing";
      this.burger=false;
      this.toppings=false;
      this.dressing=true;
      this.bread=false;
      this.sides=false;
      this.beverage=false;

      var BreadPage = document.getElementById("breadPage");
      var BurgerPage = document.getElementById("burgerPage");
      var DressingPage = document.getElementById("dressingPage");
      var ToppingPage = document.getElementById("toppingPage");
      var SidesPage = document.getElementById("sidesPage");
      var BeveragePage = document.getElementById("beveragePage");

      BreadPage.style.display = "none";
      BurgerPage.style.display = "none";
      DressingPage.style.display = "grid";
      ToppingPage.style.display = "none";
      SidesPage.style.display = "none";
      BeveragePage.style.display = "none";

      var buttonPanelBread = document.getElementById("buttonPanelBread");
      var buttonPanelBurger = document.getElementById("buttonPanelBurger");
      var buttonPanelDressing = document.getElementById("buttonPanelDressing");
      var buttonPanelToppings = document.getElementById("buttonPanelToppings");
      var buttonPanelSides = document.getElementById("buttonPanelSides");
      var buttonPanelBeverage = document.getElementById("buttonPanelBeverage");

      buttonPanelBread.style.display = "none";
      buttonPanelBurger.style.display = "none";
      buttonPanelDressing.style.display = "grid";
      buttonPanelToppings.style.display = "none";
      buttonPanelSides.style.display = "none";
      buttonPanelBeverage.style.display = "none";
    },
    toBread: function(){
      this.state="bread";
      this.burger=false;
      this.toppings=false;
      this.dressing=false;
      this.bread=true;
      this.sides=false;
      this.beverage=false;

      var BreadPage = document.getElementById("breadPage");
      var BurgerPage = document.getElementById("burgerPage");
      var DressingPage = document.getElementById("dressingPage");
      var ToppingPage = document.getElementById("toppingPage");
      var SidesPage = document.getElementById("sidesPage");
      var BeveragePage = document.getElementById("beveragePage");

      BreadPage.style.display = "grid";
      BurgerPage.style.display = "none";
      DressingPage.style.display = "none";
      ToppingPage.style.display = "none";
      SidesPage.style.display = "none";
      BeveragePage.style.display = "none";

      var buttonPanelBread = document.getElementById("buttonPanelBread");
      var buttonPanelBurger = document.getElementById("buttonPanelBurger");
      var buttonPanelDressing = document.getElementById("buttonPanelDressing");
      var buttonPanelToppings = document.getElementById("buttonPanelToppings");
      var buttonPanelSides = document.getElementById("buttonPanelSides");
      var buttonPanelBeverage = document.getElementById("buttonPanelBeverage");

      buttonPanelBread.style.display = "grid";
      buttonPanelBurger.style.display = "none";
      buttonPanelDressing.style.display = "none";
      buttonPanelToppings.style.display = "none";
      buttonPanelSides.style.display = "none";
      buttonPanelBeverage.style.display = "none";
    },
    toSides: function(){
      this.state="sides";
      this.burger=false;
      this.toppings=false;
      this.dressing=false;
      this.bread=false;
      this.sides=true;
      this.beverage=false;

      var BreadPage = document.getElementById("breadPage");
      var BurgerPage = document.getElementById("burgerPage");
      var DressingPage = document.getElementById("dressingPage");
      var ToppingPage = document.getElementById("toppingPage");
      var SidesPage = document.getElementById("sidesPage");
      var BeveragePage = document.getElementById("beveragePage");

      BreadPage.style.display = "none";
      BurgerPage.style.display = "none";
      DressingPage.style.display = "none";
      ToppingPage.style.display = "none";
      SidesPage.style.display = "grid";
      BeveragePage.style.display = "none";

      var buttonPanelBread = document.getElementById("buttonPanelBread");
      var buttonPanelBurger = document.getElementById("buttonPanelBurger");
      var buttonPanelDressing = document.getElementById("buttonPanelDressing");
      var buttonPanelToppings = document.getElementById("buttonPanelToppings");
      var buttonPanelSides = document.getElementById("buttonPanelSides");
      var buttonPanelBeverage = document.getElementById("buttonPanelBeverage");

      buttonPanelBread.style.display = "none";
      buttonPanelBurger.style.display = "none";
      buttonPanelDressing.style.display = "none";
      buttonPanelToppings.style.display = "none";
      buttonPanelSides.style.display = "grid";
      buttonPanelBeverage.style.display = "none";
    },
    toBeverage: function(){
      this.state="beverage";
      this.burger=false;
      this.toppings=false;
      this.dressing=false;
      this.bread=false;
      this.sides=false;
      this.beverage=true;

      var BreadPage = document.getElementById("breadPage");
      var BurgerPage = document.getElementById("burgerPage");
      var DressingPage = document.getElementById("dressingPage");
      var ToppingPage = document.getElementById("toppingPage");
      var SidesPage = document.getElementById("sidesPage");
      var BeveragePage = document.getElementById("beveragePage");

      BreadPage.style.display = "none";
      BurgerPage.style.display = "none";
      DressingPage.style.display = "none";
      ToppingPage.style.display = "none";
      SidesPage.style.display = "none";
      BeveragePage.style.display = "grid";

      var buttonPanelBread = document.getElementById("buttonPanelBread");
      var buttonPanelBurger = document.getElementById("buttonPanelBurger");
      var buttonPanelDressing = document.getElementById("buttonPanelDressing");
      var buttonPanelToppings = document.getElementById("buttonPanelToppings");
      var buttonPanelSides = document.getElementById("buttonPanelSides");
      var buttonPanelBeverage = document.getElementById("buttonPanelBeverage");

      buttonPanelBread.style.display = "none";
      buttonPanelBurger.style.display = "none";
      buttonPanelDressing.style.display = "none";
      buttonPanelToppings.style.display = "none";
      buttonPanelSides.style.display = "none";
      buttonPanelBeverage.style.display = "grid";
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
      else if(item.category===7){
        this.ReadyBurger.push(item);
        this.readyBurgerOrder=true;
      }
      else{
        this.chosenIngredientsBurger.push(item);
        if(item.category===1){
          this.Burger.push(item);
          this.burgerOrder=true;
        }
        if(item.category===2){
          this.Toppings.push(item);
          this.toppingsOrder=true;
        }
        if(item.category===3){
          this.Dressing.push(item);
          this.dressingOrder=true;
        }
        if(item.category===4){
          this.Bread.push(item);
          this.breadOrder=true;
        }
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
      this.Burger= [];
      this.Toppings= [];
      this.Dressing= [];
      this.Bread= [];
      this.Sides= [];
      this.Beverage= [];
      this.ReadyBurger=[];
      this.readyBurgerOrder=false;
      this.burgerOrder=false;
      this.toppingsOrder=false;
      this.dressingOrder=false;
      this.breadOrder=false;
      this.sidesOrder=false;
      this.beverageOrder=false;
      this.price= 0;
      //this.orderNumber= "";
      //this.state="burger";
      this.burger=true;
      this.toppings=false;
      this.dressing=false;
      this.bread=false;
      this.sides=false;
      this.beverages=false;
      this.readyBurger=false;
    }
  },
}
</script>
<style>
/* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */
#ordering {
  height: 100%;
  min-width: 100px;
  min-height: 100px;
  margin: auto;
  width: 40em;
}
* {
  box-sizing: border-box;
}
.startButton{
  z-index: 100;
  margin-top:10em;
  margin-bottom:10em;
  margin-left: 20%;
  margin-right: 20%;
  width:60%;
  height:50%;

  background-color: #4CAF50;
  border: 0.1em solid black;
  color: black;
  padding: 1em 2em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 2em;
  /* margin: 4px 2px; */
  cursor: pointer;
  border-radius: 1em;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
.column {
  float: left;
  width: 50%;
  padding: 0em;
}
.aa {
  height:3em;
  overflow:hidden;
  background-color: white;
  border-bottom: 0.1em solid black;
}
/* .bb {
  height:3em;
  overflow:hidden;
  background-color: white;
  border-bottom: 0.1em solid black;
} */
.cc {
  overflow:scroll;
  height: 8em;
  background-color: white;
}
.dd {
  overflow:scroll;
  height: 6em;
  background-color: white;
  /* z-index: 1; */
}

/* .fixedStuff {
} */

#buttonPanelBread {
  z-index: 3;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  position: fixed;
  width: 40em;
  height: 3.5em;
  bottom: 16.3em;
}

#buttonPanelBurger {
  background-color: black;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  position: fixed;
  width: 40em;
  height: 3.5em;
  bottom: 16.3em;
}

#buttonPanelDressing {
  background-color: black;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  position: fixed;
  width: 40em;
  height: 3.5em;
  bottom: 16.3em;
}

#buttonPanelToppings {
  background-color: black;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  position: fixed;
  width: 40em;
  height: 3.5em;
  bottom: 16.3em;
}

#buttonPanelSides {
  background-color: black;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  position: fixed;
  width: 40em;
  height: 3.5em;
  bottom: 16.3em;
}

#buttonPanelBeverage {
  background-color: black;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  position: fixed;
  width: 40em;
  height: 3.5em;
  bottom: 16.3em;
}

#nextButton {
  grid-column: 3;
  background-color: #4CAF50;
  border: 0.1em solid black;
  color: black;
  padding: 1em 2em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1em;
  /* margin: 4px 2px; */
  cursor: pointer;
  border-radius: 1em;
}
#previousButton {
  grid-column: 1;
  background-color: #0000CD;
  border: 0.1em solid black;
  color: black;
  padding: 1em 2em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1em;
  /* margin: 4px 2px; */
  cursor: pointer;
  border-radius: 1em;
}
.receipt {
  bottom: 0;
  position: fixed;
  left: center;
  width: 40em;
  background-color: white;
  color: black;
  text-align: center;
  padding: 0.8em;
  border: 0.1em solid black;
}
.LanguageButtonO {
  background-color: black;
  border: 0.1em solid black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  position: fixed;
  top: 0;
  margin-top: 0.5em;
}
.orderButtonO {
  background-color: #4CAF50;
  border: 0.1em solid black;
  color: black;
  padding: 1em 2em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1em;
  /* margin: 4px 2px; */
  cursor: pointer;
  border-radius: 1em;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}
.cancelButton {
  background-color: #f44336;
  border: 0.1em solid black;
  color: black;
  padding: 1em 2em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1em;
  /* margin: 4px 2px; */
  cursor: pointer;
  border-radius: 1em;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}

.tabs {
  overflow: hidden;
  position: fixed;
  top: 1;
  padding-top: 2.5em;
  background-color: black;
  width: 40em;
  height: 6em;
}
.tabs button {
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
.tabs button:hover {
  background-color:#ddd;
}
/* .main {
  padding: 1px;
  margin-top: 3px;
  height: 15px; /* Used in this example to enable scrolling
} */
.example-panel {
  position: fixed;
  left:0;
  top:0;
  z-index: -200;
}
.ingredient {
  border: 1px solid #ccd;
   padding: 1em;
  /* background-image: url('~@/assets/exampleImage.jpg'); */
  background-color: black;
  color: white;
}
.totalText {
  position: absolute;
  bottom: 0;
  right: 0;
  /* padding: 4em; */
  margin-bottom: 5em;
  margin-right: 1em;
}

/* .FixedPage {
  background-color: green;
  position: fixed;

} */


.burgerPage {
  z-index: -100;
  overflow: scroll;
  position: absolute;
  bottom: 20em;
  top: 7em;
  width: 40em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column: 1 / span 3;
  grid-row: 1;
  text-align: center;
}
.toppingPage {
  z-index: -100;
  overflow: scroll;
  position: absolute;
  bottom: 20em;
  top: 7em;
  width: 40em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column: 1 / span 3;
  grid-row: 1;
  text-align: center;
}
.dressingPage {
  z-index: -100;
  overflow: scroll;
  position: absolute;
  bottom: 20em;
  top: 7em;
  width: 40em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column: 1 / span 3;
  grid-row: 1;
  text-align: center;
}
.breadPage {
  z-index: -1;
  overflow: scroll;
  position: absolute;
  bottom: 20em;
  top: 7em;
  width: 40em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column: 1 / span 3;
  grid-row: 1;
  text-align: center;
}
.sidesPage {
  z-index: -100;
  overflow: scroll;
  position: absolute;
  bottom: 20em;
  top: 7em;
  width: 40em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column: 1 / span 3;
  grid-row: 1;
  text-align: center;
}
.beveragePage {
  z-index: -100;
  overflow: scroll;
  position: absolute;
  bottom: 20em;
  top: 7em;
  width: 40em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column: 1 / span 3;
  grid-row: 1;
  text-align: center;
}
</style>
