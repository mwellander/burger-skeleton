<template>
  <div id="ordering3">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="Ordering.vue">
    <div class="headOfPage" style="text-align:right">
    <button class="allergyButton" id="veganButton" v-on:click="veganButton()"><span id="vegan2">....</span> {{uiLabels.vegan}}</button>
    <button class="allergyButton" id="dairyButton" v-on:click="dairyButton()"><span id="milk2">....</span> {{uiLabels.dairy}}</button>
    <button class="allergyButton" id="glutenButton" v-on:click="glutenButton()"><span id="gluten2">....</span> {{uiLabels.gluten}}</button>
  </div>
    <div id="toChangeBackground3">
      <div class="tabs3">
        <button id="tabSides3" v-on:click="toSides3()">{{uiLabels.sides}}</button>
        <button id="tabBeverage3" v-on:click="toBeverage3()">{{uiLabels.beverage}}</button>
      </div>
      <div style="text-align:left">
        <button class="LanguageButtonO" v-on:click="switchLang()"><img :src="getFlag()" height="30em"></button>
      </div>
      <br>
<div class="breadPage" id="sidesPage3">
<Ingredient
ref="ingredient"
v-show="state3 === 'sides3'&&allergies(item)"
v-if="item.category===5 && item.stock > 0"
v-for="item in ingredients"
v-on:increment="addToOrder3(item)"
v-on:decrement="decreaseSides3(item)"
:item="item"
:lang="lang"
:key="item.ingredient_id">
</Ingredient>
<Ingredient
ref="ingredient"
v-show="state3 === 'sides3'&&allergies(item)"
v-if="item.category===5 && item.stock <= 0"
v-for="item in ingredients"
v-on:increment="addToOrder3(item)"
v-on:decrement="decreaseSides3(item)"
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
  v-show="state3 === 'beverage3'&&allergies(item)"
  v-if="item.category===6 && item.stock > 0"
  v-for="item in ingredients"
  v-on:increment="addToOrder3(item)"
  v-on:decrement="decreaseBeverage3(item)"
  :item="item"
  :lang="lang"
  :key="item.ingredient_id">
</Ingredient>
<Ingredient
ref="ingredient"
v-show="state3 === 'beverage3'&&allergies(item)"
v-if="item.category===6 && item.stock <= 0"
v-for="item in ingredients"
v-on:increment="addToOrder3(item)"
v-on:decrement="decreaseBeverage3(item)"
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
        <li><span v-bind:key="index" v-for="(item,index) in Sides3">{{item["ingredient_"+ lang]}}
          <button class="deleteIngredient" v-on:click="deleteIngredient3(Sides3,index,'sides')"><i class="fa fa-trash"></i></button>
            <span v-show="index!==Sides3.length-1">, </span>
        </span></li>
      </ul>
      </div>
      <div class="column dd" style="text-align:left">
        <div class="dd1" style="text-align:left">
          <ul style="list-style-type:none">
            <li><span v-bind:key="index" v-for="(item,index) in Beverage3">{{item["ingredient_"+ lang]}}
              <button class="deleteIngredient" v-on:click="deleteIngredient3(Beverage3,index,'beverage')"><i class="fa fa-trash"></i></button>
                <span v-show="index!==Beverage3.length-1">, </span>
            </span></li>
          </ul>
        </div>
        <div class="dd2" style="text-align:left">
          <div class="totalText" style="text-align:right"><u>{{uiLabels.total}}: {{ price }} kr</u></div>
          <div v-show="change" style="text-align:right">
            <a href="#/home"><button class="cancelButton" v-on:click="cancelChanges()"><i class="fa fa-trash"></i>{{ uiLabels.cancelChange }}</button></a>
            <button class="orderButtonO" v-if="sidesOrder3==true || beverageOrder3==true" v-on:click="saveChanges3()">{{ uiLabels.saveChange }}</button>
            <button class="orderButtonO graknapp" v-if="sidesOrder3==false && beverageOrder3==false" v-on:click="saveChanges3()">{{ uiLabels.saveChange }}</button>
          </div>
          <div v-show="!change" style="text-align:right">
            <button class="cancelButton" v-on:click="cancelAlert3()"><i class="fa fa-trash"></i>{{ uiLabels.cancelOrder }}</button>
            <button class="orderButtonO" v-if="sidesOrder3==true || beverageOrder3==true" v-on:click="sendOrderHome3()">{{ uiLabels.placeOrder }}</button>
            <button class="orderButtonO graknapp" v-if="sidesOrder3==false && beverageOrder3==false" v-on:click="sendOrderHome3()">{{ uiLabels.placeOrder }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  </div>
<div class="alert" v-show="alert">
  <div class="confirmText">{{uiLabels.confirmMess}}</div>
  <a href="#/home" class="confirmCancel" role="button" v-on:click="cancelOrder()">{{uiLabels.yes}}</a>
  <button class="confirmNoCancel" v-on:click="cancelAlert3()">{{uiLabels.no}}</button>
</div>

<div class="alert" v-show="nothingalert2">
  <div class="confirmText">{{uiLabels.nothingInCart}}</div>
  <button class="confirmOK" v-on:click="nothingAlert2()">{{uiLabels.ok}}</button>
</div>
</div>
</template>
<script>

import Ingredient from '@/components/Ingredient.vue'
import OrderItem from '@/components/OrderItem.vue'
import sharedVueStuff from '@/components/sharedVueStuff.js'
import ordering from '@/views/Ordering.vue'
import store from '@/store.js'


export default {
  name: 'Ordering3',
  components: {
    Ingredient,
    OrderItem
  },
  mixins: [sharedVueStuff,ordering,store],
  data: function() { //Not that data is a function!
    return {
      start:true,
      sidesOrder3:false,
      beverageOrder3:false,
      state3:"sides3",
      sides3:true,
      beverage3:false,
      chosenIngredients5:[],
      chosenIngredients3:[],
      chosenIngredientsSides3: [],
      Sides3: [],
      Beverage3: [],
      path:"#/sidesandbeverage",
      alert: false,
      change:false,
      nothingalert2: false,
    }
  },
  mounted: function(){
    this.ifChange3();
  },
  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
  },
  methods:{
    deleteIngredient3: function(array,index,ingredient){
      for(var i=0;i<this.chosenIngredients3.length;i++){
        if(this.chosenIngredients3[i]===array[index]){
          this.chosenIngredients3.splice(i,1);
        }
      }
      this.price -=array[index].selling_price;
      array.splice(index,1);
      if(array.length===0){
        if(ingredient==="sides"){
          this.sidesOrder3=false;
        }
        if(ingredient==="beverage"){
          this.beverageOrder3=false;
        }
      }
    },
    decreaseSides3: function(item){
      var j1 = this.chosenIngredients3.findIndex(function(chosenIngredients3){
        return chosenIngredients3.ingredient_id === item.ingredient_id;
      });
      if (j1 != -1 ){
        this.chosenIngredients3.splice(j1,1);
      }
      var j3 = this.Sides3.findIndex(function(Sides3){
        return Sides3.ingredient_id === item.ingredient_id;
      });
      if (j3 != -1 ){
        this.Sides3.splice(j3,1);
        this.price = this.price - item.selling_price;
        if (this.Sides3.length === 0){
          this.sidesOrder3=false
        }
      }
    },
    decreaseBeverage3: function(item){
      var k1 = this.chosenIngredients3.findIndex(function(chosenIngredients3){
        return chosenIngredients3.ingredient_id === item.ingredient_id;
      });
      if (k1 != -1 ){
        this.chosenIngredients3.splice(k1,1);
      }
      var k3 = this.Beverage3.findIndex(function(Beverage3){
        return Beverage3.ingredient_id === item.ingredient_id;
      });
      if (k3 != -1 ){
        this.Beverage3.splice(k3,1);
        this.price = this.price - item.selling_price;
        if (this.Beverage3.length === 0){
          this.beverageOrder3=false
        }
      }
    },
    sendOrderHome3: function() {
      if (this.sidesOrder3===false && this.beverageOrder3 === false) {
        this.nothingAlert2();
      }
      else {
      store.commit('addToOrder4',this.chosenIngredients3);
      store.commit('addPrice',this.price);
      store.commit('addNoBurger', this.path);
      store.commit('emptyChangeIngrediens');
      window.location.replace("#/home");
    }
    },
    ifChange3: function(){
      this.price=0;
      this.chosenIngredients5=store.getters.getChangeIngredients;
      if(this.chosenIngredients5.length>0){
        this.change=true;
        for(var i=0;i<this.chosenIngredients5.length;i++){
          this.addToOrder3(this.chosenIngredients5[i]);
        }
      }
    },
    saveChanges3: function(){
      if (this.sidesOrder3===false && this.beverageOrder3 === false) {
        this.nothingAlert2();
      }
      else {
      store.commit('saveChange',this.chosenIngredients3);
      store.commit('emptyChangeIngrediens');
      window.location.replace("#/home");
    }
    },
    addToOrder3: function(item){
      this.chosenIngredients3.push(item);
      if(item.category===5 || item.category===6){
        this.chosenIngredientsSides3.push(item);
        if(item.category===5){
          this.Sides3.push(item);
          this.sidesOrder3=true;
        }
        else{
          this.Beverage3.push(item);
          this.beverageOrder3=true;
        }
      }
      this.price += +item.selling_price;
    },
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

      var tabForSides3 = document.getElementById("tabSides3");
      var tabForBeverage3 = document.getElementById("tabBeverage3");

      tabForSides3.style.backgroundColor = "#D3D3D3";
      tabForBeverage3.style.backgroundColor = "grey";
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

      var tabForSides3 = document.getElementById("tabSides3");
      var tabForBeverage3 = document.getElementById("tabBeverage3");

      tabForSides3.style.backgroundColor = "grey";
      tabForBeverage3.style.backgroundColor = "#D3D3D3";
    },
    cancelAlert3: function() {
      var background = document.getElementById("toChangeBackground3");
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
    nothingAlert2: function() {
      var background = document.getElementById("toChangeBackground2");
      if (this.nothingalert2===false){
        this.nothingalert2=true;
        background.style.opacity = 0.5;
        background.style['pointer-events'] = "none";
      }
      else {
        this.nothingalert2=false;
        background.style.opacity = 1;
        background.style['pointer-events'] = "auto";
      }
    }
  }
}
</script>
<style>

  #ordering3 {
    height: 100%;
    min-width: 100px;
    min-height: 100px;
    font-family: "Helvetica", cursive, sans-serif;
  }
  @media screen and (min-width: 300px) {
    #ordering3 {
      width:22.4em;
    }
    .tabs3{
      width:22.4em;
    }
    .tabs3 button {
      width: 16em;
      font-size: 0.7em;
    }
    #buttonPanelSides3{
      width:22.4em;
      bottom: 14.7em;
      grid-template-columns: 24% 50% 25%;
    }
  }
  @media screen and (min-width: 700px) {
    #ordering3 {
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
    #buttonPanelSides3{
      width:40em;
      bottom: 16.3em;
      grid-template-columns: 20% 60% 20%;
    }
  }

  .tabs3 {
    overflow: hidden;
    position: fixed;
    top: 1;
    padding-top: 1.8em;
    background-color: black;
    height: 6em;
  }
  .tabs3 button {
    font-family: "Helvetica", cursive, sans-serif;
    float: left;
    display: block;
    background-color: grey;
    border: 0.1em solid black;
    text-align: center;
    padding: 0.7em 0.5em;
    text-decoration: none;
  }
  .tabs3 button:hover {
    background-color:#ddd;
    cursor:pointer;
  }
  #toChangeBackground3 {
    opacity: 1;
    pointer-events: auto;
  }
#buttonPanelSides3{
    height: 3.5em;
    z-index: 3;
    display: grid;
    position: fixed;
  }
#tabSides3{
  background-color: #D3D3D3;
}
#tabBeverage3 {
  background-color: grey;
}
</style>
