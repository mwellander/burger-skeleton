<template>
  <div id="ordering">

    <div class="navbar">
    <a href="#bread">{{ uiLabels.bread }}</a>
    <a href="#burger">{{ uiLabels.burger }}</a>
    <a href="#dressing">{{ uiLabels.dressing }}</a>
    <a href="#gronsaker">{{ uiLabels.vegetables }}</a>
    <a href="#drinks">{{ uiLabels.drink }}</a>
    <a href="#sides">{{ uiLabels.sides }}</a>
    </div>


    <div class="LanguageButton">
      <button v-on:click="switchLang()">{{ uiLabels.language }}</button>
    </div>

    <img class="example-panel"src="@/assets/exampleImage.jpg">
    <br>
    <br>
    <h1>{{ uiLabels.ingredients }}</h1>

    <Ingredient
      ref="ingredient"
      v-for="item in ingredients"
      v-on:increment="addToOrder(item)"
      :item="item"
      :lang="lang"
      :key="item.ingredient_id">
    </Ingredient>

    <div class="receipt">
      <div class="row">
        <div class="column" style="background-color:#aaa;">
          <h3>{{ uiLabels.order }}</h3>
          {{ chosenIngredients.map(item => item["ingredient_"+lang]).join(', ') }}
          <!-- <ul>
            <li v-for="items in orderArray">
              Burger: {{items}}
            </li>
          </ul> -->
        </div>
        <div class="column" style="background-color:#bbb;">
          <h3>{{ uiLabels.sideOrder }}</h3>
          <p>Hej hej</p>
        </div>
      </div>

      <h3 style="text-align:right">Totalt: {{ price }} kr</h3>
      <div style="text-align:right">
        <button class="cancelButton" v-on:click="cancelOrder()">{{ uiLabels.cancelOrder }}</button>
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
      chosenIngredients: [],
      price: 0,
      orderNumber: "",
      //orderArray: chosenIngredients.map(item => item["ingredient_"+lang])
    }
    //orderArray: chosenIngredients.map(item => item["ingredient_"+lang])
  },
  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
  },
  methods: {
    cancelOrder: function () {
      //Här ska beställningen avbrytas
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
    height: 13em;
}
.receipt {
  position: fixed;
   left: center;
   bottom: 0;
   width: 40em;
   background-color: white;
   color: black;
   text-align: center;
   padding: 0.8em;
   border: 0.1em solid black;
}

.LanguageButton{
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 0;
  width: 100%;
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
