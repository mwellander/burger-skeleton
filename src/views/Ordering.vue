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
  <!-- <button class="startButton" id="startButton" v-show="!started" v-on:click="startOrder()">Start Order</button> -->
  <div id="toChangeBackground">
    <div class="tabs">
      <button id="tabBread" v-on:click="toBread()">{{uiLabels.bread}}</button>
      <button id="tabBurger" v-on:click="toBurger()">{{uiLabels.burger}}</button>
      <button id="tabDressing" v-on:click="toDressing()">{{uiLabels.dressing}}</button>
      <button id="tabToppings" v-on:click="toToppings()">{{uiLabels.toppings}}</button>
      <button id="tabSides" v-on:click="toSides()">{{uiLabels.sides}}</button>
      <button id="tabBeverage" v-on:click="toBeverage()">{{uiLabels.beverage}}</button>
    </div>

  <div style="text-align:left">
    <button class="LanguageButtonO" v-on:click="switchLang()"><img :src="getFlag()" height="30em"></button>
  </div>

    <!-- <img class="example-panel" src="@/assets/exampleImage.jpg"> -->
    <br>
    <!-- <br> -->
    <h1 v-show="started">{{ uiLabels.ingredients }}</h1>

    <div class="breadPage" id="breadPage">
      <Ingredient
      ref="ingredient"
      v-show="state === 'bread'"
      v-if="item.category===4 && item.stock > 0"
      v-for="item in ingredients"
      v-on:increment="addToOrder(item)"
      v-on:decrement="decreaseBread(item)"
      :item="item"
      :lang="uiLabels.lang"
      :key="item.ingredient_id">
    </Ingredient>
  </div>
  <div id="buttonPanelBread">
    <button id="nextButton" v-show="bread" v-on:click='toBurger()'>{{uiLabels.next}}</button>
  </div>

  <div class="Page" id="burgerPage">
    <Ingredient
    ref="ingredient"
    v-show="state === 'burger'"
    v-if="item.category===1 && item.stock > 0"
    v-for="item in ingredients"
    v-on:increment="addToOrder(item)"
    v-on:decrement="decreaseBurger(item)"
    :item="item"
    :lang="uiLabels.lang"
    :key="item.ingredient_id">
  </Ingredient>
</div>
<div class="buttonPanel" id="buttonPanelBurger">
  <button id="previousButton" v-show="burger" v-on:click="toBread()">{{uiLabels.previous}}</button>
  <button id="nextButton" v-show="burger" v-on:click='toDressing()'>{{uiLabels.next}}</button>
</div>


<div class="Page" id="dressingPage">
  <Ingredient
  ref="ingredient"
  v-show="state === 'dressing'"
  v-if="item.category===3 && item.stock > 0"
  v-for="item in ingredients"
  v-on:increment="addToOrder(item)"
  v-on:decrement="decreaseDressing(item)"
  :item="item"
  :lang="uiLabels.lang"
  :key="item.ingredient_id">
</Ingredient>
</div>
<div class="buttonPanel" id="buttonPanelDressing">
  <button id="previousButton" v-show="dressing" v-on:click="toBurger()">{{uiLabels.previous}}</button>
  <button id="nextButton" v-show="dressing" v-on:click='toToppings()'>{{uiLabels.next}}</button>
</div>


<div class="Page" id="toppingPage">
  <Ingredient
  ref="ingredient"
  v-show="state === 'toppings'"
  v-if="item.category===2 && item.stock > 0"
  v-for="item in ingredients"
  v-on:increment="addToOrder(item)"
  v-on:decrement="decreaseToppings(item)"
  :item="item"
  :lang="uiLabels.lang"
  :key="item.ingredient_id">
</Ingredient>
</div>
<div class="buttonPanel" id="buttonPanelToppings">
  <button id="previousButton" v-show="toppings" v-on:click="toDressing()">{{uiLabels.previous}}</button>
  <button id="nextButton" v-show="toppings" v-on:click='toSides()'>{{uiLabels.next}}</button>
</div>


<div class="Page" id="sidesPage">
  <Ingredient
  ref="ingredient"
  v-show="state === 'sides'"
  v-if="item.category===5 && item.stock > 0"
  v-for="item in ingredients"
  v-on:increment="addToOrder(item)"
  v-on:decrement="decreaseSides(item)"
  :item="item"
  :lang="uiLabels.lang"
  :key="item.ingredient_id">
</Ingredient>
</div>
<div class="buttonPanel" id="buttonPanelSides">
  <button id="previousButton" v-show="sides" v-on:click="toToppings()">{{uiLabels.previous}}</button>
  <button id="nextButton" v-show="sides" v-on:click='toBeverage()'>{{uiLabels.next}}</button>
</div>

<div class="Page" id="beveragePage">
  <Ingredient
  ref="ingredient"
  v-show="state === 'beverage'"
  v-if="item.category===6 && item.stock > 0"
  v-for="item in ingredients"
  v-on:increment="addToOrder(item)"
  v-on:decrement="decreaseBeverage(item)"
  :item="item"
  :lang="uiLabels.lang"
  :key="item.ingredient_id">
</Ingredient>
</div>
<div class="buttonPanel" id="buttonPanelBeverage">
  <button id="previousButton" v-show="beverage" v-on:click="toSides()">{{uiLabels.previous}}</button>
</div>


  <div class="receipt">
    <div class="row">
      <div class="column aa" id="myBurger"><h3>{{ uiLabels.order }}</h3></div>
      <div class="column aa" id="sidesAndBeverage"><h3>{{ uiLabels.sideOrder }}</h3></div>
      <div class="column cc" style="text-align:left">
        <ul style="list-style-type:none">
          <li v-show="breadOrder">{{uiLabels.bread}}: {{ Bread.map(item => item["ingredient_"+uiLabels.lang]).join(", ") }}</li>
          <li v-show="burgerOrder">{{uiLabels.burger}}: {{ Burger.map(item => item["ingredient_"+uiLabels.lang]).join(", ") }}</li>
          <li v-show="dressingOrder">{{uiLabels.dressing}}: {{ Dressing.map(item => item["ingredient_"+uiLabels.lang]).join(", ") }}</li>
          <li v-show="toppingsOrder">{{uiLabels.toppings}}: {{ Toppings.map(item => item["ingredient_"+uiLabels.lang]).join(", ") }}</li>
        </ul>
      </div>
      <div class="column dd" style="text-align:left">
        <ul style="list-style-type:none">
          <li v-show="sidesOrder">{{uiLabels.sides}}: {{ Sides.map(item => item["ingredient_"+uiLabels.lang]).join(", ") }}</li>
          <li v-show="beverageOrder">{{uiLabels.beverage}}: {{ Beverage.map(item => item["ingredient_"+uiLabels.lang]).join(", ") }}</li>
        </ul>
        <!-- <h3 class="totalText" style="text-align:right"><u>{{uiLabels.total}}: {{ price }} kr</u></h3> -->
      </div>
    </div>
    <h3 class="totalText" style="text-align:right"><u>{{uiLabels.total}}: {{ price }} kr</u></h3>
    <div v-show="change" style="text-align:right">
      <a href="#/home"><button class="cancelButton" v-on:click="cancelChanges()"><i class="fa fa-trash"></i>{{ uiLabels.cancelChange }}</button></a>
       <button class="orderButtonO" v-on:click="saveChanges()">{{ uiLabels.saveChange }}</button>
    </div>
    <div v-show="!change" style="text-align:right">
      <button class="cancelButton" v-on:click="cancelAlert()"><i class="fa fa-trash"></i>{{ uiLabels.cancelOrder }}</button>
      <button class="orderButtonO" v-if="breadOrder==true && burgerOrder==true" v-on:click="sendOrderHome()">{{ uiLabels.placeOrder }}</button>
      <button class="orderButtonO graknapp" v-if="breadOrder==false || burgerOrder==false" v-on:click="sendOrderHome()">{{ uiLabels.placeOrder }}</button>
    </div>
  </div>

<div class="alert" v-show="alert">
  <div class="confirmText">{{uiLabels.confirmMess}}</div>
  <a href="#/home" class="confirmCancel" role="button" v-on:click="cancelOrder()">{{uiLabels.yes}}</a>
  <button class="confirmNoCancel" v-on:click="cancelAlert()">{{uiLabels.no}}</button>
</div>

<div class="alert" v-show="breadburgeralert">
  <div class="confirmText">{{uiLabels.missingBreadAndBurger}}</div>
  <button class="confirmOK" v-on:click="breadAndBurgerAlert()">{{uiLabels.ok}}</button>
</div>
<div class="alert" v-show="breadalert">
  <div class="confirmText">{{uiLabels.missingBread}}</div>
  <button class="confirmOK" v-on:click="breadAlert()">{{uiLabels.ok}}</button>
</div>
<div class="alert" v-show="burgeralert">
  <div class="confirmText">{{uiLabels.missingBurger}}</div>
  <button class="confirmOK" v-on:click="burgerAlert()">{{uiLabels.ok}}</button>
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
import store from '@/store.js'

/* instead of defining a Vue instance, export default allows the only
necessary Vue instance (found in main.js) to import your data and methods */
export default {
  name: 'Ordering',
  components: {
    Ingredient,
    OrderItem
  },
  mixins: [sharedVueStuff,store], // include stuff that is used in both
  // the ordering system and the kitchen
  data: function() { //Not that data is a function!
    return {
      chosenIngredients5:[],
      chosenIngredients:[],
      chosenIngredientsBurger: [],
      chosenIngredientsSides: [],
      Burger: [],
      Toppings: [],
      Dressing: [],
      Bread: [],
      Sides: [],
      Beverage: [],
      burgerOrder:false,
      toppingsOrder:false,
      dressingOrder:false,
      breadOrder:false,
      sidesOrder:false,
      beverageOrder:false,
      price: 0,
      orderNumber: "",
      state:"bread",
      start:true,
      burger:false,
      toppings:false,
      dressing:false,
      bread:true,
      sides:false,
      beverage:false,
      started:false,
      nrBurgerOrder: 0,
      path:"#/customburger",
      change:false,
      alert: false,
      breadburgeralert: false,
      breadalert: false,
      burgeralert: false,
    }
    //orderArray: chosenIngredients.map(item => item["ingredient_"+lang])
  },
  mounted: function(){
    this.ifChange();
  },
  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
  },
  methods: {
    getFlag: function () {
      return require('@/assets/' + this.flag[this.lang]);
    },
    decreaseBread: function(item){
      var a1 = this.chosenIngredients.findIndex(function(chosenIngredients){
        return chosenIngredients.ingredient_id === item.ingredient_id;
      });
      if (a1 != -1 ){
        this.chosenIngredients.splice(a1,1);
      }
      var a2 = this.Bread.findIndex(function(Bread){
        return Bread.ingredient_id === item.ingredient_id;
      });
      if (a2 != -1 ){
        this.Bread.splice(a2,1);
        this.price = this.price - item.selling_price;
        if (this.Bread.length === 0){
          this.breadOrder=false
        }
      }
    },
    decreaseBurger: function(item){
      var b1 = this.chosenIngredients.findIndex(function(chosenIngredients){
        return chosenIngredients.ingredient_id === item.ingredient_id;
      });
      if (b1 != -1 ){
        this.chosenIngredients.splice(b1,1);
      }
      var b2 = this.Burger.findIndex(function(Burger){
        return Burger.ingredient_id === item.ingredient_id;
      });
      if (b2 != -1 ){
        this.Burger.splice(b2,1);
        this.price = this.price - item.selling_price;
        if (this.Burger.length === 0){
          this.burgerOrder=false
        }
      }
    },
    decreaseDressing: function(item){
      var c1 = this.chosenIngredients.findIndex(function(chosenIngredients){
        return chosenIngredients.ingredient_id === item.ingredient_id;
      });
      if (c1 != -1 ){
        this.chosenIngredients.splice(c1,1);
      }
      var c2 = this.Dressing.findIndex(function(Dressing){
        return Dressing.ingredient_id === item.ingredient_id;
      });
      if (c2 != -1 ){
        this.Dressing.splice(c2,1);
        this.price = this.price - item.selling_price;
        if (this.Dressing.length === 0){
          this.dressingOrder=false
        }
      }
    },
    decreaseToppings: function(item){
      var d1 = this.chosenIngredients.findIndex(function(chosenIngredients){
        return chosenIngredients.ingredient_id === item.ingredient_id;
      });
      if (d1 != -1 ){
        this.chosenIngredients.splice(d1,1);
      }
      var d2 = this.Toppings.findIndex(function(Toppings){
        return Toppings.ingredient_id === item.ingredient_id;
      });
      if (d2 != -1 ){
        this.Toppings.splice(d2,1);
        this.price = this.price - item.selling_price;
        if (this.Toppings.length === 0){
          this.toppingsOrder=false
        }
      }
    },
    decreaseSides: function(item){
      var e1 = this.chosenIngredients.findIndex(function(chosenIngredients){
        return chosenIngredients.ingredient_id === item.ingredient_id;
      });
      if (e1 != -1 ){
        this.chosenIngredients.splice(e1,1);
      }
      var e2 = this.Sides.findIndex(function(Sides){
        return Sides.ingredient_id === item.ingredient_id;
      });
      if (e2 != -1 ){
        this.Sides.splice(e2,1);
        this.price = this.price - item.selling_price;
        if (this.Sides.length === 0){
          this.sidesOrder=false
        }
      }
    },
    decreaseBeverage: function(item){
      var f1 = this.chosenIngredients  .findIndex(function(chosenIngredients){
        return chosenIngredients.ingredient_id === item.ingredient_id;
      });
      if (f1 != -1 ){
        this.chosenIngredients.splice(f1,1);
      }
      var f2 = this.chosenIngredientsSides  .findIndex(function(chosenIngredientsSides){
        return chosenIngredientsSides.ingredient_id === item.ingredient_id;
      });
      if (f2 != -1 ){
        this.chosenIngredientsSides.splice(f2,1);
      }
      var f3 = this.Beverage.findIndex(function(Beverage){
        return Beverage.ingredient_id === item.ingredient_id;
      });
      if (f3 != -1 ){
        this.Beverage.splice(f3,1);
        this.price = this.price - item.selling_price;
        if (this.Beverage.length === 0){
          this.beverageOrder=false
        }
      }
    },
    ifChange: function(){
      this.chosenIngredients5=store.getters.getChangeIngredients;
      if(this.chosenIngredients5.length>0){
        this.change=true;
        for(var i=0;i<this.chosenIngredients5.length;i++){
          this.addToOrder(this.chosenIngredients5[i]);
        }
      }
    },
    sendOrderHome: function() {
      if(this.beverageOrder === true && this.sidesOrder === true
        && this.burgerOrder === false && this.breadOrder === false
        && this.dressingOrder === false && this.toppingsOrder === false) {
          store.commit('addToOrder4',this.chosenIngredients);
          store.commit('addPrice',this.price);
          store.commit('addNoBurger', this.path);
          store.commit('emptyChangeIngrediens');
          window.location.replace("#/home");
        }
        else if(this.beverageOrder === true && this.sidesOrder === false
          && this.burgerOrder === false && this.breadOrder === false
          && this.dressingOrder === false && this.toppingsOrder === false) {
            store.commit('addToOrder4',this.chosenIngredients);
            store.commit('addPrice',this.price);
            store.commit('addNoBurger', this.path);
            store.commit('emptyChangeIngrediens');
            window.location.replace("#/home");
          }
          else if(this.beverageOrder === false && this.sidesOrder === true
            && this.burgerOrder === false && this.breadOrder === false
            && this.dressingOrder === false && this.toppingsOrder === false) {
              store.commit('addToOrder4',this.chosenIngredients);
              store.commit('addPrice',this.price);
              store.commit('addNoBurger', this.path);
              store.commit('emptyChangeIngrediens');
              window.location.replace("#/home");
            }
            else if (this.burgerOrder === false && this.breadOrder === false) {
              this.breadAndBurgerAlert();
            }
            else if (this.burgerOrder === false) {
              this.burgerAlert();
            }
            else if (this.breadOrder === false) {
              this.breadAlert();
            }
            else {
              store.commit('addToOrder4',this.chosenIngredients);
              store.commit('addPrice',this.price);
              store.commit('addNoBurger', this.path);
              store.commit('emptyChangeIngrediens');
              window.location.replace("#/home");
            }
          },
          startOrder: function(){
            this.started=true;
            this.state="bread";
            this.bread=true;
            this.alert=false;
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
            this.Sides2=[];
            this.Beverage2=[];
            this.Sides3=[];
            this.Beverage3=[];
            this.burgerOrder=false;
            this.toppingsOrder=false;
            this.dressingOrder=false;
            this.breadOrder=false;
            this.sidesOrder=false;
            this.beverageOrder=false;
            this.readyBurgerOrder=false;
            this.sidesOrder2=false;
            this.beverageOrder2=false;
            this.sidesOrder3=false;
            this.beverageOrder3=false;
            this.price= 0;
            this.orderNumber= "";
            this.state="bread";
            this.state2="readyburger";
            this.state3="sides3";
            this.burger=true;
            this.toppings=false;
            this.dressing=false;
            this.bread=false;
            this.sides=false;
            this.beverage=false;
            this.readyBurger=true;
            this.sides2=false;
            this.beverage2=false;
            this.sides3=false;
            this.beverage3=false;
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

            var tabForBread = document.getElementById("tabBread");
            var tabForBurger = document.getElementById("tabBurger");
            var tabForDressing = document.getElementById("tabDressing");
            var tabForToppings = document.getElementById("tabToppings");
            var tabForSides = document.getElementById("tabSides");
            var tabForBeverage = document.getElementById("tabBeverage");

            tabForBread.style.backgroundColor = "grey";
            tabForBurger.style.backgroundColor = "#D3D3D3";
            tabForDressing.style.backgroundColor = "grey";
            tabForToppings.style.backgroundColor = "grey";
            tabForSides.style.backgroundColor = "grey";
            tabForBeverage.style.backgroundColor = "grey";

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

            var tabForBread = document.getElementById("tabBread");
            var tabForBurger = document.getElementById("tabBurger");
            var tabForDressing = document.getElementById("tabDressing");
            var tabForToppings = document.getElementById("tabToppings");
            var tabForSides = document.getElementById("tabSides");
            var tabForBeverage = document.getElementById("tabBeverage");

            tabForBread.style.backgroundColor = "grey";
            tabForBurger.style.backgroundColor = "grey";
            tabForDressing.style.backgroundColor = "grey";
            tabForToppings.style.backgroundColor = "#D3D3D3";
            tabForSides.style.backgroundColor = "grey";
            tabForBeverage.style.backgroundColor = "grey";
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

            var tabForBread = document.getElementById("tabBread");
            var tabForBurger = document.getElementById("tabBurger");
            var tabForDressing = document.getElementById("tabDressing");
            var tabForToppings = document.getElementById("tabToppings");
            var tabForSides = document.getElementById("tabSides");
            var tabForBeverage = document.getElementById("tabBeverage");

            tabForBread.style.backgroundColor = "grey";
            tabForBurger.style.backgroundColor = "grey";
            tabForDressing.style.backgroundColor = "#D3D3D3";
            tabForToppings.style.backgroundColor = "grey";
            tabForSides.style.backgroundColor = "grey";
            tabForBeverage.style.backgroundColor = "grey";
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

            var tabForBread = document.getElementById("tabBread");
            var tabForBurger = document.getElementById("tabBurger");
            var tabForDressing = document.getElementById("tabDressing");
            var tabForToppings = document.getElementById("tabToppings");
            var tabForSides = document.getElementById("tabSides");
            var tabForBeverage = document.getElementById("tabBeverage");

            tabForBread.style.backgroundColor = "#D3D3D3";
            tabForBurger.style.backgroundColor = "grey";
            tabForDressing.style.backgroundColor = "grey";
            tabForToppings.style.backgroundColor = "grey";
            tabForSides.style.backgroundColor = "grey";
            tabForBeverage.style.backgroundColor = "grey";
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

            var tabForBread = document.getElementById("tabBread");
            var tabForBurger = document.getElementById("tabBurger");
            var tabForDressing = document.getElementById("tabDressing");
            var tabForToppings = document.getElementById("tabToppings");
            var tabForSides = document.getElementById("tabSides");
            var tabForBeverage = document.getElementById("tabBeverage");

            tabForBread.style.backgroundColor = "grey";
            tabForBurger.style.backgroundColor = "grey";
            tabForDressing.style.backgroundColor = "grey";
            tabForToppings.style.backgroundColor = "grey";
            tabForSides.style.backgroundColor = "#D3D3D3";
            tabForBeverage.style.backgroundColor = "grey";
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

            var tabForBread = document.getElementById("tabBread");
            var tabForBurger = document.getElementById("tabBurger");
            var tabForDressing = document.getElementById("tabDressing");
            var tabForToppings = document.getElementById("tabToppings");
            var tabForSides = document.getElementById("tabSides");
            var tabForBeverage = document.getElementById("tabBeverage");

            tabForBread.style.backgroundColor = "grey";
            tabForBurger.style.backgroundColor = "grey";
            tabForDressing.style.backgroundColor = "grey";
            tabForToppings.style.backgroundColor = "grey";
            tabForSides.style.backgroundColor = "grey";
            tabForBeverage.style.backgroundColor = "#D3D3D3";
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
          saveChanges: function(){
            if(this.beverageOrder === true && this.sidesOrder === true
              && this.burgerOrder === false && this.breadOrder === false
              && this.dressingOrder === false && this.toppingsOrder === false) {
                store.commit('saveChange',this.chosenIngredients);
                store.commit('savePrice',this.price);
                store.commit('emptyChangeIngrediens');
                window.location.replace("#/home");
              }
              else if(this.beverageOrder === true && this.sidesOrder === false
                && this.burgerOrder === false && this.breadOrder === false
                && this.dressingOrder === false && this.toppingsOrder === false) {
                  store.commit('saveChange',this.chosenIngredients);
                  store.commit('savePrice',this.price);
                  store.commit('emptyChangeIngrediens');
                  window.location.replace("#/home");
                }
                else if(this.beverageOrder === false && this.sidesOrder === true
                  && this.burgerOrder === false && this.breadOrder === false
                  && this.dressingOrder === false && this.toppingsOrder === false) {
                    store.commit('saveChange',this.chosenIngredients);
                    store.commit('savePrice',this.price);
                    store.commit('emptyChangeIngrediens');
                    window.location.replace("#/home");
                  }
                  else if (this.burgerOrder === false && this.breadOrder === false) {
                    this.breadAndBurgerAlert();
                  }
                  else if (this.burgerOrder === false) {
                    this.burgerAlert();
                  }
                  else if (this.breadOrder === false) {
                    this.breadAlert();
                  }
                  else {
                    store.commit('saveChange',this.chosenIngredients);
                    store.commit('savePrice',this.price);
                    store.commit('emptyChangeIngrediens');
                    window.location.replace("#/home");
                  }
                },
                cancelChanges: function(){
                  store.commit('emptyChangeIngrediens');
                },
                cancelAlert: function() {
                  var background = document.getElementById("toChangeBackground");
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
                },
                breadAndBurgerAlert: function() {
                  var background = document.getElementById("toChangeBackground");
                  if (this.breadburgeralert===false){
                    this.breadburgeralert=true;
                    background.style.opacity = 0.5;
                    background.style['pointer-events'] = "none";
                  }
                  else {
                    this.breadburgeralert=false;
                    background.style.opacity = 1;
                    background.style['pointer-events'] = "auto";
                    this.toBread();
                  }
                },
                breadAlert: function() {
                  var background = document.getElementById("toChangeBackground");
                  if (this.breadalert===false){
                    this.breadalert=true;
                    background.style.opacity = 0.5;
                    background.style['pointer-events'] = "none";
                  }
                  else {
                    this.breadalert=false;
                    background.style.opacity = 1;
                    background.style['pointer-events'] = "auto";
                    this.toBread();
                  }
                },
                burgerAlert: function() {
                  var background = document.getElementById("toChangeBackground");
                  if (this.burgeralert===false){
                    this.burgeralert=true;
                    background.style.opacity = 0.5;
                    background.style['pointer-events'] = "none";
                  }
                  else {
                    this.burgeralert=false;
                    background.style.opacity = 1;
                    background.style['pointer-events'] = "auto";
                    this.toBurger();
                  }
                }
              }}
              </script>
              <style>
              /* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */
              #ordering {
                height: 100%;
                min-width: 100px;
                min-height: 100px;
              }
              @media screen and (min-width: 300px) {
                #ordering{
                  width:20em;
                  margin-left:3%;
                  margin-right:3%;
                }
                .receipt {
                  width: 20em;
                }
                .tabs{
                  width:20em;
                }
                .tabs button {
                  width: 6.66em;
                  font-size: 0.5em;
                }
                .Page{
                  bottom: 18.5em;
                  top: 4.5em;
                  width: 20em;
                }

                .breadPage{
                  bottom: 18.5em;
                  top: 4.5em;
                  width: 20em;
                }
                #buttonPanelBread{
                  width:20em;
                  grid-template-columns: 30% 40% 30%;
                  height: 3.5em;
                  bottom: 14.7em;
                }
                .buttonPanel{
                  width:20em;
                  grid-template-columns: 30% 40% 30%;
                  height: 3.5em;
                  bottom: 14.7em;
                }
                #previousButton{
                  padding: 1em 1em;
                }
                .ingredient{
                  font-size:0.5em;
                  padding: 0.2em;
                }
                #myBurger{
                  font-size:0.7em;
                }
                #sidesAndBeverage{
                  font-size:0.7em;
                }
                .orderButtonO{
                  font-size:0.7em;
                }
                .cancelButton{
                  font-size:0.7em;
                }
                .totalText{
                  font-size:0.7em;
                  margin-bottom: 6em;
                }
                .column{
                  font-size: 0.6em;
                }
                .cc{
                  height: 13em;
                }
                .dd{
                  height: 10em;
                }
              }
              @media screen and (min-width: 700px) {
                #ordering{
                  width:40em;
                  margin: auto;
                }
                .tabs{
                  width:40em;
                }
                .tabs button {
                  width: 5.55em;
                  font-size: 1.2em;
                }
                .receipt {
                  width:40em;
                }
                .Page {
                  bottom:20em;
                  top: 7em;
                  width: 40em;
                }
                .breadPage {
                  bottom:20em;
                  top: 7em;
                  width: 40em;
                }
                #buttonPanelBread{
                  width:40em;
                  grid-template-columns: 20% 60% 20%;
                  height: 3.5em;
                  bottom: 16.3em;
                }
                .buttonPanel{
                  width:40em;
                  grid-template-columns: 20% 60% 20%;
                  height: 3.5em;
                  bottom: 16.3em;
                }
                .previousButton{
                  padding: 1em 2em;
                }
                .ingredient{
                  font-size:1em;
                  padding: 1em;
                }
                #myBurger{
                  font-size:1em;
                }
                #sidesAndBeverage{
                  font-size:1em;
                }
                .orderButtonO{
                  font-size:1em;
                }
                .cancelButton{
                  font-size:1em;
                }
                .totalText{
                  font-size:1em;
                  margin-bottom: 5em;
                }
                .column{
                  font-size: 1em;
                }
                .cc{
                  height: 8em;
                }
                .dd{
                  height: 6em;
                }
              }
              * {
                box-sizing: border-box;
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
                background-color: white;
                text-align:left;
              }
              .dd {
                overflow:scroll;
                background-color: white;
                text-align:left;
                /* z-index: 1; */
              }

              #buttonPanelBread {
                z-index: 3;
                display: grid;
                position: fixed;
              }
              .buttonPanel {
                background-color: black;
                display: grid;
                position: fixed;
              }
              /* #buttonPanelBurger {
              background-color: black;
              display: grid;
              grid-template-columns: 20% 60% 20%;
              position: fixed;
              width: 40em;
              height: 3.5em;
              bottom: 16.3em;
              } */
              /*
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
        } */
        /* #buttonPanelReadyBurger {
        z-index: 3;
        display: grid;
        grid-template-columns: 20% 60% 20%;
        position: fixed;
        width: 40em;
        height: 3.5em;
        bottom: 16.3em;
      }
      #buttonPanelSides2 {
      background-color: black;
      display: grid;
      grid-template-columns: 20% 60% 20%;
      position: fixed;
      width: 40em;
      height: 3.5em;
      bottom: 16.3em;
    }
    #buttonPanelBeverage2 {
    background-color: black;
    display: grid;
    grid-template-columns: 20% 60% 20%;
    position: fixed;
    width: 40em;
    height: 3.5em;
    bottom: 16.3em;
  }
  #buttonPanelSides3 {
  z-index: 3;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  position: fixed;
  width: 40em;
  height: 3.5em;
  bottom: 16.3em;
}
#buttonPanelBeverage3 {
background-color: black;
display: grid;
grid-template-columns: 20% 60% 20%;
position: fixed;
width: 40em;
height: 3.5em;
bottom: 16.3em;
} */

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
  height:3em;
}
.orderButtonO {
  background-color: #4CAF50;
  border: 0.1em solid black;
  color: black;
  padding: 1em 2em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  /* margin: 4px 2px; */
  cursor: pointer;
  border-radius: 1em;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}
.graknapp {
  background-color: gray;
}
.cancelButton {
  background-color: #f44336;
  border: 0.1em solid black;
  color: black;
  padding: 1em 2em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
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
}
.tabs button:hover {
  background-color:#ddd;
}

#tabBread{
  background-color: #D3D3D3;
}

#tabBurger {
  background-color: grey;
}

#tabDressing {
  background-color: grey;
}

#tabToppings {
  background-color: grey;
}

#tabSides {
  background-color: grey;
}

#tabBeverage {
  background-color: grey;
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
  /* background-image: url('~@/assets/exampleImage.jpg'); */
  background-color: black;
  color: white;
}
.totalText {
  position: absolute;
  bottom: 0;
  right: 0;
  /* padding: 4em; */
  margin-right: 1em;
}

.Page{
  overflow: scroll;
  position: absolute;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column: 1 / span 3;
  grid-row: 1;
  text-align: center;
}
/* .burgerPage {
overflow: scroll;
position: absolute;
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-column: 1 / span 3;
grid-row: 1;
text-align: center;
}
.toppingPage {
overflow: scroll;
position: absolute;
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-column: 1 / span 3;
grid-row: 1;
text-align: center;
}
.dressingPage {
overflow: scroll;
position: absolute;
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-column: 1 / span 3;
grid-row: 1;
text-align: center;
} */
.breadPage {
  z-index: 10;
  overflow: scroll;
  position: absolute;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column: 1 / span 3;
  grid-row: 1;
  text-align: center;
}
/* .sidesPage {
overflow: scroll;
position: absolute;
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-column: 1 / span 3;
grid-row: 1;
text-align: center;
}
.beveragePage {
overflow: scroll;
position: absolute;
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-column: 1 / span 3;
grid-row: 1;
text-align: center;
} */
/* .readyBurgerPage {
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
.sidesPage2 {
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
.beveragePage2 {
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
.sidesPage3 {
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
.beveragePage3 {
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
} */

#toChangeBackground {
  opacity: 1;
  pointer-events: auto;
}

.alert {
  z-index: 100;
  position: relative;
  background-color: grey;
  width: 25em;
  display: grid;
  grid-template-columns: 25% 50% 25%;
  height: 15em;
  margin: auto;
  padding: 1em 2em;
  border: 0.5em solid black;
  text-align: center;
}

.confirmText {
  font-family: "Comic Sans MS", cursive, sans-serif;
  font-size: 2em;
  grid-column: 1/ span 3;
  grid-row: 1;
}

.confirmCancel {
  font-family: "Comic Sans MS", cursive, sans-serif;
  font-size: 1em;
  grid-column: 3;
  grid-row: 2;
  background-color: #6495ED;
  border: 0.1em solid black;
  color: black;
  padding: 1em 1em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  border-radius: 1em;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  vertical-align: middle;
  margin: auto;
}
.confirmNoCancel {
  font-family: "Comic Sans MS", cursive, sans-serif;
  font-size: 1em;
  grid-column: 1;
  grid-row: 2;
  background-color: #ADD8E6;
  border: 0.1em solid black;
  color: black;
  padding: 1em 1em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  border-radius: 1em;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  margin: auto;
}
.confirmOK {
  font-family: "Comic Sans MS", cursive, sans-serif;
  font-size: 1em;
  grid-column:2;
  grid-row: 2;
  background-color: #ADD8E6;
  border: 0.1em solid black;
  color: black;
  padding: 1em 1em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  border-radius: 1em;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  margin: auto;
}

</style>
