<template>
  <div id="ordering">

    <!-- <div class="navbar">
    <a href="#burger">{{ uiLabels.burger }}</a>
    <a href="#toppings">{{ uiLabels.toppings }}</a>
    <a href="#dressing">{{ uiLabels.dressing }}</a>
    <a href="#bread">{{ uiLabels.bread }}</a>
    <a href="#sides">{{ uiLabels.sides }}</a>
    <a href="#beverage">{{ uiLabels.beverage }}</a>
    </div> -->

    <div class="tabs">
      <button class="tabButton" v-on:click="toBurger()">{{uiLabels.burger}}</button>
      <button class="tabButton" v-on:click="toToppings()">{{uiLabels.toppings}}</button>
      <button class="tabButton" v-on:click="toDressing()">{{uiLabels.dressing}}</button>
      <button class="tabButton" v-on:click="toBread()">{{uiLabels.bread}}</button>
      <button class="tabButton" v-on:click="toSides()">{{uiLabels.sides}}</button>
      <button class="tabButton" v-on:click="toBeverage()">{{uiLabels.beverage}}</button>
    </div>

    <div class="LanguageButton">
      <button v-on:click="switchLang()">{{ uiLabels.language }}</button>
    </div>

    <img class="example-panel" src="@/assets/exampleImage.jpg">
    <br>
    <br>
    <h1>{{ uiLabels.ingredients }}</h1>

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

    <div class="receipt">
      <h1>{{ uiLabels.order }}</h1>
      {{ chosenIngredients.map(item => item["ingredient_"+lang]).join(', ') }}, {{ price }} kr
      <button v-on:click="placeOrder()">{{ uiLabels.placeOrder }}</button>

      <h1>{{ uiLabels.ordersInQueue }}</h1>
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
      </div>
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
      chosenIngredients: [],
      price: 0,
      orderNumber: "",
      state:"burger",
      burger:true,
      toppings:false,
      dressing:false,
      bread:false,
      sides:false,
      beverages:false
    }
  },
  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
  },
  methods: {
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
      this.chosenIngredients.push(item);
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
  margin:auto;
  width: 40em;
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
  position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   background-color: white;
   color: black;
   text-align: center;
}

.LanguageButton{
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 0;
  width: 100%;
}

.navbar {
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
