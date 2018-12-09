<template>
  <div id="ordering3">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="Ordering.vue">

        <div class="tabs3">
          <button v-on:click="toSides3()">{{uiLabels.sides}}</button>
          <button v-on:click="toBeverage3()">{{uiLabels.beverage}}</button>
        </div>

        <div style="text-align:left">
          <button class="LanguageButtonO" v-on:click="switchLang()"><img :src="require('../assets/' + uiLabels.flag)" height="30em"></button>
        </div>
        <br>
        <br>
<div class="breadPage" id="sidesPage3">
  <Ingredient
  ref="ingredient"
  v-show="state3 === 'sides3'"
  v-if="item.category===5"
  v-for="item in ingredients"
  v-on:increment="addToOrder(item)"
  :item="item"
  :lang="lang"
  :key="item.ingredient_id">
</Ingredient>
</div>
<div class="buttonPanelBread" id="buttonPanelSides3">
<button id="nextButton" v-show="sides3" v-on:click='toBeverage3()'>{{uiLabels.next}}</button>
</div>

<div class="Page" id="beveragePage3">
  <Ingredient
  ref="ingredient"
  v-show="state3 === 'beverage3'"
  v-if="item.category===6"
  v-for="item in ingredients"
  v-on:increment="addToOrder(item)"
  :item="item"
  :lang="lang"
  :key="item.ingredient_id">
</Ingredient>
</div>
<div class="buttonPanel" id="buttonPanelBeverage3">
<button id="previousButton" v-show="beverage3" v-on:click="toSides3()">{{uiLabels.previous}}</button>
</div>

<div class="receipt">
  <div class="row">
    <div class="column aa"><h3>{{ uiLabels.sides }}</h3></div>
    <div class="column aa"><h3>{{ uiLabels.beverage }}</h3></div>
    <div class="column cc" style="text-align:left">
      <ul style="list-style-type:none">
        <li>{{ Sides3.map(item => item["ingredient_"+lang]).join(", ") }}</li>
      </ul>
    </div>
    <div class="column dd" style="text-align:left">
      <ul style="list-style-type:none">
        <li>{{ Beverage3.map(item => item["ingredient_"+lang]).join(", ") }}</li>
      </ul>
      <h3 class="totalText" style="text-align:right"><u>{{uiLabels.total}}: {{ price }} kr</u></h3>
    </div>
  </div>

  <h3 class="totalText" style="text-align:right"><u>{{uiLabels.total}}: {{ price }} kr</u></h3>

  <div style="text-align:right">
    <button class="cancelButton" v-on:click="cancelOrder()"><i class="fa fa-trash"></i>{{ uiLabels.cancelOrder }}</button>
    <a href="#/home"><button class="orderButtonO" v-on:click="sendOrderHome()">{{ uiLabels.placeOrder }}</button></a>
  </div>

</div>
</div>
</template>
<script>

import Ingredient from '@/components/Ingredient.vue'
import OrderItem from '@/components/OrderItem.vue'
import sharedVueStuff from '@/components/sharedVueStuff.js'
import ordering from '@/views/Ordering.vue'


export default {
  name: 'Ordering3',
  components: {
    Ingredient,
    OrderItem
  },
  mixins: [sharedVueStuff,ordering],
  data: function() { //Not that data is a function!
    return {
            start:true,
            sidesOrder3:false,
            beverageOrder3:false,
            state3:"sides3",
            sides3:true,
            beverage3:false
    }
  },
  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
  },
  methods:{
  toSides3: function(){
    this.state3="sides3";
    this.sides3=true;
    this.beverage3=false;

    var SidesPage3 = document.getElementById("sidesPage3");
    var BeveragePage3 = document.getElementById("beveragePage3");

    SidesPage3.style.display = "grid";
    BeveragePage3.style.display = "none";

    var buttonPanelSides3 = document.getElementById("buttonPanelSides3");
    var buttonPanelBeverage3 = document.getElementById("buttonPanelBeverage3");

    buttonPanelSides3.style.display = "grid";
    buttonPanelBeverage3.style.display = "none";
  },
  toBeverage3: function(){
    this.state3="beverage3";
    this.sides3=false;
    this.beverage3=true;

    var SidesPage3 = document.getElementById("sidesPage3");
    var BeveragePage3 = document.getElementById("beveragePage3");

    SidesPage3.style.display = "none";
    BeveragePage3.style.display = "grid";

    var buttonPanelSides3 = document.getElementById("buttonPanelSides3");
    var buttonPanelBeverage3 = document.getElementById("buttonPanelBeverage3");

    buttonPanelSides3.style.display = "none";
    buttonPanelBeverage3.style.display = "grid";
  }
}}
</script>
<style>

#ordering3 {
  height: 100%;
  min-width: 100px;
  min-height: 100px;
}
@media screen and (min-width: 300px) {
  #ordering3 {
    width:20em;
    margin-left:3%;
    margin-right:3%;
  }
  .tabs3{
    width:20em;
  }
  .tabs3 button {
    width: 20em;
    font-size: 0.5em;
  }
}
@media screen and (min-width: 700px) {
  #ordering2 {
    width:40em;
    margin:auto;
  }
  .tabs3{
    width:40em;
  }
  .tabs3 button {
    width: 16.6em;
    font-size: 1.2em;
  }
}

.tabs3 {
  overflow: hidden;
  position: fixed;
  top: 1;
  padding-top: 2.5em;
  background-color: black;
  height: 6em;
}
.tabs3 button {
  float: left;
  display: block;
  background-color: grey;
  border: 0.1em solid black;
  text-align: center;
  padding: 0.7em 0.5em;
  /* padding:  14px 16px; */
  text-decoration: none;
}
.tabs3 button:hover {
  background-color:#ddd;
}

</style>
