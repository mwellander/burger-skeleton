<template>
  <div id="ordering2">
    <link rel="stylesheet" href="Ordering.vue">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="headOfPage" style="text-align:right">
    <button class="allergyButton" id="veganButton" v-on:click="veganButton()"><span id="vegan2">....</span> {{uiLabels.vegan}}</button>
    <button class="allergyButton" id="dairyButton" v-on:click="dairyButton()"><span id="milk2">....</span> {{uiLabels.dairy}}</button>
    <button class="allergyButton" id="glutenButton" v-on:click="glutenButton()"><span id="gluten2">....</span> {{uiLabels.gluten}}</button>
  </div>
    <div id="toChangeBackground2">
      <div class="tabs2">
        <button id="tabFavoriteBurger" v-on:click="toReadyBurger()">{{uiLabels.readyBurger}}</button>
        <button id="tabSides2" v-on:click="toSides2()">{{uiLabels.sides}}</button>
        <button id="tabBeverage2" v-on:click="toBeverage2()">{{uiLabels.beverage}}</button>
      </div>

      <div style="text-align:left">
        <button class="LanguageButtonO" v-on:click="switchLang()"><img :src="getFlag()" height="30em"></button>
      </div>
      <br>
      <div class="breadPage" id="readyBurgerPage">
        <Ingredient
        ref="ingredient"
        v-show="state2 === 'readyBurger'&&allergies(item)"
        v-if="item.category===7 && item.stock > 0"
        v-for="item in ingredients"
        v-on:increment="addToOrder2(item)"
        v-on:decrement="decreaseReadyBurger(item)"
        :item="item"
        :lang="lang"
        :key="item.ingredient_id">
      </Ingredient>
      <Ingredient
      ref="ingredient"
      v-show="state2 === 'readyBurger'&&allergies(item)"
      v-if="item.category===7 && item.stock <= 0"
      v-for="item in ingredients"
      v-on:increment="addToOrder2(item)"
      v-on:decrement="decreaseReadyBurger(item)"
      :item="item"
      :lang="lang"
      :key="item.ingredient_id">
    </Ingredient>
    </div>
    <div class="buttonPanelBread" id="buttonPanelReadyBurger">
      <button id="nextButton" v-show="readyBurger" v-on:click='toSides2()'>{{uiLabels.next}}</button>
    </div>

    <div class="Page" id="sidesPage2">
      <Ingredient
      ref="ingredient"
      v-show="state2 === 'sides2'&&allergies(item)"
      v-if="item.category===5 && item.stock > 0"
      v-for="item in ingredients"
      v-on:increment="addToOrder2(item)"
      v-on:decrement="decreaseSides2(item)"
      :item="item"
      :lang="lang"
      :key="item.ingredient_id">
      </Ingredient>
      <Ingredient
      ref="ingredient"
      v-show="state2 === 'sides2'&&allergies(item)"
      v-if="item.category===5 && item.stock <= 0"
      v-for="item in ingredients"
      v-on:increment="addToOrder2(item)"
      v-on:decrement="decreaseSides2(item)"
      :item="item"
      :lang="lang"
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
    v-show="state2 === 'beverage2'&&allergies(item)"
    v-if="item.category===6 && item.stock > 0"
    v-for="item in ingredients"
    v-on:increment="addToOrder2(item)"
    v-on:decrement="decreaseBeverage2(item)"
    :item="item"
    :lang="lang"
    :key="item.ingredient_id">
    </Ingredient>
    <Ingredient
    ref="ingredient"
    v-show="state2 === 'beverage2'&&allergies(item)"
    v-if="item.category===6 && item.stock <= 0"
    v-for="item in ingredients"
    v-on:increment="addToOrder2(item)"
    v-on:decrement="decreaseBeverage2(item)"
    :item="item"
    :lang="lang"
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
        <li v-show="readyBurgerOrder"><span v-bind:key="index" v-for="(item,index) in ReadyBurger">{{item["ingredient_"+ lang]}}
          <button class="deleteIngredient" v-on:click="deleteIngredient2(ReadyBurger,index,'readyBurger')"><i class="fa fa-trash"></i></button>
            <span v-show="index!==ReadyBurger.length-1">, </span>
        </span></li>
      </ul>
    </div>
    <div class="column dd" style="text-align:left">
      <div class="dd1" style="text-align:left">
        <ul style="list-style-type:none">
          <li v-show="sidesOrder2"><b>{{uiLabels.sides}}: </b>
            <span v-bind:key="index" v-for="(item,index) in Sides2">{{item["ingredient_"+ lang]}}
              <button class="deleteIngredient" v-on:click="deleteIngredient2(Sides2,index,'sides')"><i class="fa fa-trash"></i></button>
                <span v-show="index!==Sides2.length-1">, </span>
            </span></li>
          <li v-show="beverageOrder2"><b>{{uiLabels.beverage}}: </b>
            <span v-bind:key="index" v-for="(item,index) in Beverage2">{{item["ingredient_"+ lang]}}
              <button class="deleteIngredient" v-on:click="deleteIngredient2(Beverage2,index,'beverage')"><i class="fa fa-trash"></i></button>
                <span v-show="index!==Beverage2.length-1">, </span>
            </span></li>
        </ul>
      </div>
      <div class="dd2" style="text-align:left">
        <div class="totalText" style="text-align:right"><u>{{uiLabels.total}}: {{ price }} kr</u></div>
        <div v-show="change" style="text-align:right">
          <a href="#/home"><button class="cancelButton" v-on:click="cancelChanges()"><i class="fa fa-trash"></i>{{ uiLabels.cancelChange }}</button></a>
          <a><button class="orderButtonO" v-if="readyBurgerOrder==true||sidesOrder2==true||beverageOrder2==true" v-on:click="saveChanges2()">{{ uiLabels.saveChange }}</button></a>
          <a><button class="orderButtonO graknapp" v-if="readyBurgerOrder==false&&sidesOrder2==false&&beverageOrder2==false" v-on:click="saveChanges2()">{{ uiLabels.saveChange }}</button></a>
        </div>

        <div v-show="!change" style="text-align:right">
          <button class="cancelButton" v-on:click="cancelAlert2()"><i class="fa fa-trash"></i>{{ uiLabels.cancelOrder }}</button>
          <a><button class="orderButtonO" v-if="readyBurgerOrder==true||sidesOrder2==true||beverageOrder2==true" v-on:click="sendOrderHome2()">{{ uiLabels.placeOrder }}</button></a>
          <a><button class="orderButtonO graknapp" v-if="readyBurgerOrder==false&&sidesOrder2==false&&beverageOrder2==false" v-on:click="sendOrderHome2()">{{ uiLabels.placeOrder }}</button></a>
        </div>
      </div>
    </div>
  </div>

</div>
</div>

<div class="alert" v-show="alert">
  <div class="confirmText">{{uiLabels.confirmMess}}</div>
  <a href="#/home" class="confirmCancel" role="button" v-on:click="cancelOrder()">{{uiLabels.yes}}</a>
  <button class="confirmNoCancel" v-on:click="cancelAlert2()">{{uiLabels.no}}</button>
</div>

<div class="alert" v-show="nothingalert">
  <div class="confirmText">{{uiLabels.nothingInCart}}</div>
  <button class="confirmOK" v-on:click="nothingAlert()">{{uiLabels.ok}}</button>
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
            Sides2: [],
            Beverage2: [],
            ReadyBurger: [],
            path:"#/favouriteburger",
            alert: false,
            change:false,
            nothingalert: false,
    }
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
    deleteIngredient2: function(array,index,ingredient){
        for(var i=0;i<this.chosenIngredients2.length;i++){
          if(this.chosenIngredients2[i]===array[index]){
            this.chosenIngredients2.splice(i,1);
          }
        }
        this.price -=array[index].selling_price;
        array.splice(index,1);
        if(array.length===0){
          if(ingredient==="readyBurger"){
            this.readyBurgerOrder=false;
          }
          if(ingredient==="sides"){
            this.sidesOrder2=false;
          }
          if(ingredient==="beverage"){
            this.beverageOrder2=false;
          }
      }},
    decreaseReadyBurger: function(item){
      var g1 = this.chosenIngredients2.findIndex(function(chosenIngredients2){
        return chosenIngredients2.ingredient_id === item.ingredient_id;
      });
      if (g1 != -1 ){
        this.chosenIngredients2.splice(g1,1);
      }
      var g2 = this.ReadyBurger.findIndex(function(ReadyBurger){
        return ReadyBurger.ingredient_id === item.ingredient_id;
      });
      if (g2 != -1 ){
        this.ReadyBurger.splice(g2,1);
        this.price = this.price - item.selling_price;
        if (this.ReadyBurger.length === 0){
          this.readyBurgerOrder=false
        }
      }
    },
    decreaseSides2: function(item){
      var h1 = this.chosenIngredients2.findIndex(function(chosenIngredients2){
        return chosenIngredients2.ingredient_id === item.ingredient_id;
      });
      if (h1 != -1 ){
        this.chosenIngredients2.splice(h1,1);
      }
      var h3 = this.Sides2.findIndex(function(Sides2){
        return Sides2.ingredient_id === item.ingredient_id;
      });
      if (h3 != -1 ){
        this.Sides2.splice(h3,1);
        this.price = this.price - item.selling_price;
        if (this.Sides2.length === 0){
          this.sidesOrder2=false
        }
      }
    },
    decreaseBeverage2: function(item){
      var i1 = this.chosenIngredients2.findIndex(function(chosenIngredients2){
        return chosenIngredients2.ingredient_id === item.ingredient_id;
      });
      if (i1 != -1 ){
        this.chosenIngredients2.splice(i1,1);
      }
      var i3 = this.Beverage2.findIndex(function(Beverage2){
        return Beverage2.ingredient_id === item.ingredient_id;
      });
      if (i3 != -1 ){
        this.Beverage2.splice(i3,1);
        this.price = this.price - item.selling_price;
        if (this.Beverage2.length === 0){
          this.beverageOrder2=false
        }
      }
    },
    sendOrderHome2: function() {
      if (this.readyBurgerOrder === false && this.sidesOrder2 === false && this.beverageOrder2 === false) {
        this.nothingAlert();
      }
      else {
      store.commit('addToOrder4',this.chosenIngredients2);
      store.commit('addPrice',this.price);
      store.commit('addNoBurger', this.path);
      store.commit('emptyChangeIngrediens');
      window.location.replace("#/home");
      }
    },
    ifChange2: function(){
      this.price=0;
      this.chosenIngredients5=store.getters.getChangeIngredients;
      if(this.chosenIngredients5.length>0){
        this.change=true;
        for(var i=0;i<this.chosenIngredients5.length;i++){
          this.addToOrder2(this.chosenIngredients5[i]);
        }
      }
    },
    saveChanges2: function(){
      if (this.readyBurgerOrder === false && this.sidesOrder2 === false && this.beverageOrder2 === false) {
        this.nothingAlert();
      }
      else {
      store.commit('saveChange',this.chosenIngredients2);
      store.commit('savePrice',this.price);
      store.commit('emptyChangeIngrediens');
      window.location.replace("#/home");
    }
    },
    addToOrder2: function(item){
      this.chosenIngredients2.push(item);
      if(item.category===5 || item.category===6){
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

      var tabForFavoriteBurger = document.getElementById("tabFavoriteBurger");
      var tabForSides2 = document.getElementById("tabSides2");
      var tabForBeverage2 = document.getElementById("tabBeverage2");

      tabForFavoriteBurger.style.backgroundColor = "#D3D3D3";
      tabForSides2.style.backgroundColor = "grey";
      tabForBeverage2.style.backgroundColor = "grey";

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

      var tabForFavoriteBurger = document.getElementById("tabFavoriteBurger");
      var tabForSides2 = document.getElementById("tabSides2");
      var tabForBeverage2 = document.getElementById("tabBeverage2");

      tabForFavoriteBurger.style.backgroundColor = "grey";
      tabForSides2.style.backgroundColor = "#D3D3D3";
      tabForBeverage2.style.backgroundColor = "grey";
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

      var tabForFavoriteBurger = document.getElementById("tabFavoriteBurger");
      var tabForSides2 = document.getElementById("tabSides2");
      var tabForBeverage2 = document.getElementById("tabBeverage2");

      tabForFavoriteBurger.style.backgroundColor = "grey";
      tabForSides2.style.backgroundColor = "grey";
      tabForBeverage2.style.backgroundColor = "#D3D3D3";
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
    },
    nothingAlert() {
      var background = document.getElementById("toChangeBackground2");
      if (this.nothingalert===false){
        this.nothingalert=true;
        background.style.opacity = 0.5;
        background.style['pointer-events'] = "none";
      }
      else {
        this.nothingalert=false;
        background.style.opacity = 1;
        background.style['pointer-events'] = "auto";
      }
    }
  }
}

</script>
<style scoped>
/* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */
#ordering2 {
  height: 100%;
  min-width: 100px;
  min-height: 100px;
  font-family: "Helvetica", cursive, sans-serif;
}
@media screen and (min-width: 300px) {
  #ordering2 {
    width:22.4em;
  }
  .tabs2{
    width:22.4em;
  }
  .tabs2 button {
    width: 10.6em;
    font-size: 0.7em;
  }
  #buttonPanelReadyBurger{
    width:22.4em;
    bottom: 14.7em;
    grid-template-columns: 25% 50% 25%;
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
  #buttonPanelReadyBurger{
    width:40em;
    bottom: 16.3em;
    grid-template-columns: 20% 60% 20%;
  }
}
.tabs2 {
  overflow: hidden;
  position: fixed;
  top: 1;
  padding-top: 1.8em;
  background-color: black;
  height: 6em;
}
.tabs2 button {
  font-family: "Helvetica", cursive, sans-serif;
  float: left;
  display: block;
  background-color: grey;
  border: 0.1em solid black;
  text-align: center;
  padding: 0.7em 0.5em;
  text-decoration: none;
}
.tabs2 button:hover {
  background-color:#ddd;
  cursor:pointer;
}

#toChangeBackground2 {
  opacity: 1;
  pointer-events: auto;
}

#buttonPanelReadyBurger{
  font-family: "Helvetica", cursive, sans-serif;
  height: 3.5em;
  z-index: 3;
  display: grid;
  position: fixed;
}

#tabFavoriteBurger{
  background-color: #D3D3D3;
}

#tabSides2 {
  background-color: grey;
}

#tabBeverage2 {
  background-color: grey;
}

</style>
