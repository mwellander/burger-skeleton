<template>
  <div id="ordering">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- <div class="navbar">
    <a href="#burger">{{ uiLabels.burger }}</a>
    <a href="#toppings">{{ uiLabels.toppings }}</a>
    <a href="#dressing">{{ uiLabels.dressing }}</a>
    <a href="#bread">{{ uiLabels.bread }}</a>
    <a href="#sides">{{ uiLabels.sides }}</a>
    <a href="#beverage">{{ uiLabels.beverage }}</a>
    </div> -->
<button class="startButton" v-show="!started" v-on:click="startOrder()">Start Order</button>

    <div class="tabs" v-show="started">
      <button class="tabButton" v-on:click="toBurger()">{{uiLabels.burger}}</button>
      <button class="tabButton" v-on:click="toToppings()">{{uiLabels.toppings}}</button>
      <button class="tabButton" v-on:click="toDressing()">{{uiLabels.dressing}}</button>
      <button class="tabButton" v-on:click="toBread()">{{uiLabels.bread}}</button>
      <button class="tabButton" v-on:click="toSides()">{{uiLabels.sides}}</button>
      <button class="tabButton" v-on:click="toBeverage()">{{uiLabels.beverage}}</button>
    </div>

    <div style="text-align:left">
      <!-- <button class="LanguageButton" v-on:click="switchLang()">{{ uiLabels.language }}</button> -->
      <button class="LanguageButton" v-on:click="switchLang()"><img :src="require('../assets/' + uiLabels.flag)" height="30em"></button>
    </div>

    <img class="example-panel" src="@/assets/exampleImage.jpg">
    <br>
    <br>
    <h1 v-show="started">{{ uiLabels.ingredients }}</h1>

    <button id="nextButton" v-show="burger" v-on:click='toToppings()'>{{uiLabels.next}}</button>
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

    <button id="previousButton" v-show="toppings" v-on:click="toBurger()">{{uiLabels.previous}}</button>
    <button id="nextButton" v-show="toppings" v-on:click='toDressing()'>{{uiLabels.next}}</button>
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

    <button id="previousButton" v-show="dressing" v-on:click="toToppings()">{{uiLabels.previous}}</button>
    <button v-show="dressing" v-on:click='toBread()'>{{uiLabels.next}}</button>
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

        <button class="previousButton" v-show="bread" v-on:click="toDressing()">{{uiLabels.previous}}</button>
        <button v-show="bread" v-on:click='toSides()'>{{uiLabels.next}}</button>
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

          <button class="previousButton" v-show="sides" v-on:click="toBread()">{{uiLabels.previous}}</button>
          <button v-show="sides" v-on:click='toBeverage()'>{{uiLabels.next}}</button>
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
          <button class="previousButton" v-show="beverage" v-on:click="toSides()">{{uiLabels.previous}}</button>
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

    <div class="receipt" v-show="started">
      <div class="row">
        <div class="column a"><h3>{{ uiLabels.order }}</h3></div>
        <div class="column b"><h3>{{ uiLabels.sideOrder }}</h3></div>
        <div class="column c">
          <p v-show="burgerOrder">{{uiLabels.burger}}: {{ Burger.map(item => item["ingredient_"+lang]).join(", ") }}</p>
          <p v-show="toppingsOrder">{{uiLabels.toppings}}: {{ Toppings.map(item => item["ingredient_"+lang]).join(", ") }}</p>
          <p v-show="dressingOrder">{{uiLabels.dressing}}: {{ Dressing.map(item => item["ingredient_"+lang]).join(", ") }}</p>
          <p v-show="breadOrder">{{uiLabels.bread}}: {{ Bread.map(item => item["ingredient_"+lang]).join(", ") }}</p>
        </div>
        <div class="column d">
          <p v-show="sidesOrder">{{uiLabels.sides}}: {{ Sides.map(item => item["ingredient_"+lang]).join(", ") }}</p>
          <p v-show="beverageOrder">{{uiLabels.beverage}}: {{ Beverage.map(item => item["ingredient_"+lang]).join(", ") }}</p>
        </div>
      </div>

      <h3 style="text-align:right">{{uiLabels.total}}: {{ price }} kr</h3>
      <div style="text-align:right">
        <button class="cancelButton" v-on:click="cancelOrder()"><i class="fa fa-trash"></i>{{ uiLabels.cancelOrder }}</button>
        <button class="orderButton" v-on:click="placeOrder()">{{ uiLabels.placeOrder }}</button>
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
      state:"start",
      start:true,
      burger:false,
      toppings:false,
      dressing:false,
      bread:false,
      sides:false,
      beverages:false,
      started:false
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
      this.started=true;
      this.state="burger";
    },
    cancelOrder: function () {
      this.chosenIngredientsBurger= [];
      this.chosenIngredientsSides= [];
      this.Burger= [];
      this.Toppings= [];
      this.Dressing= [];
      this.Bread= [];
      this.Sides= [];
      this.Beverage= [];
      this.burgerOrder=false;
      this.toppingsOrder=false;
      this.dressingOrder=false;
      this.breadOrder=false;
      this.sidesOrder=false;
      this.beverageOrder=false;
      this.price= 0;
      this.orderNumber= "";
      this.state="burger";
      this.burger=true;
      this.toppings=false;
      this.dressing=false;
      this.bread=false;
      this.sides=false;
      this.beverages=false;
    },
    toBurger: function(){
      this.state="burger";
      this.burger=true;
      this.toppings=false;
      this.dressing=false;
      this.bread=false;
      this.sides=false;
      this.beverage=false;
    },
    toToppings: function(){
      this.state="toppings";
      this.burger=false;
      this.toppings=true;
      this.dressing=false;
      this.bread=false;
      this.sides=false;
      this.beverage=false;
    },
    toDressing: function(){
      this.state="dressing";
      this.burger=false;
      this.toppings=false;
      this.dressing=true;
      this.bread=false;
      this.sides=false;
      this.beverage=false;
    },
    toBread: function(){
      this.state="bread";
      this.burger=false;
      this.toppings=false;
      this.dressing=false;
      this.bread=true;
      this.sides=false;
      this.beverage=false;
    },
    toSides: function(){
      this.state="sides";
      this.burger=false;
      this.toppings=false;
      this.dressing=false;
      this.bread=false;
      this.sides=true;
      this.beverage=false;
    },
    toBeverage: function(){
      this.state="beverage";
      this.burger=false;
      this.toppings=false;
      this.dressing=false;
      this.bread=false;
      this.sides=false;
      this.beverage=true;
    },
    addToOrder: function (item) {
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
    }
  }
}
</script>
<style scoped>
/* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */
#ordering {
  margin: auto;
  width: 40em;
}
* {
    box-sizing: border-box;
}
.startButton{
  margin-top:20em;
  margin-bottom:10em;
  margin-left: 20%;
  margin-right: 20%;
  width:60%;
  height:50%;
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
.a{
  height:3em;
  overflow:hidden;
  background-color: grey;
}
.b{
  height:3em;
  overflow:hidden;
  background-color: grey;
}
.c{
  overflow:scroll;
  height: 10em;
  background-color:#bbb;
}
.d{
  overflow:scroll;
  height: 10em;
  background-color:#bbb;
}
.nextButton {
  position:relative;
  background-color:green;
  padding: 1px solid black;
}
.previousButton{
  position:relative;
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

.LanguageButton{
  background-color: black;
  border: 0.1em solid black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  position: fixed;
  top: 0;
}
.orderButton {
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
/* .navbar {
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 1;
  width: 100%;
}

.navbar a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}
.navbar a:hover {
  background: #ddd;
  color: black;
} */
.tabs {
  overflow: hidden;
  position: fixed;
  top: 1;
  padding-top: 50px;
  background-color: black;
  width: 40em;
  height: 7em;
}
.tabs{
  overflow:hidden;
  position:fixed;
}
.tabs button{
  float: left;
  display: block;
  background-color: grey;
  border: 1px solid black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 18px;
}
.tabs button:hover{
  background-color:#ddd;
}

.main {
  padding: 16px;
  margin-top: 30px;
  height: 1500px; /* Used in this example to enable scrolling */
}
.example-panel {
  position: fixed;
  left:0;
  top:0;
  z-index: -2;

}
.ingredient {
  border: 1px solid #ccd;
  padding: 1em;
  background-image: url('~@/assets/exampleImage.jpg');
  color: white;
}
</style>
