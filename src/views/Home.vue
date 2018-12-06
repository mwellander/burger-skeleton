<template>
  <div id="home">
    <link rel="stylesheet" href="Ordering.vue">
    <div style="text-align:left">
      <button class="LanguageButtonO" v-on:click="switchLang()"><img :src="require('../assets/' + uiLabels.flag)" height="30em"></button>
    </div>
    <div class="buttonHome" style="text-align:center">
      <div class="createBurgerButton">
        <a href=""><button>{{uiLabels.createBurger}}</button></a>
      </div>
      <a href="#/favouriteburger"><button>{{uiLabels.favouriteBurger}}</button></a>
      <button>{{uiLabels.sidesDrink}}</button>
    </div>

    <div class="receipt">
      <div class="row">
        <div class="column aa aaa"><h3>{{ uiLabels.yourOrder }}</h3></div>
        <!-- <div class="column aa"><h3>{{ uiLabels.sideOrder }}</h3></div> -->
        <div class="column cc" style="text-align:left">
          <p>Hej</p>

          <!-- <ul style="list-style-type:none">
            <li v-show="breadOrder">{{uiLabels.bread}}: {{ Bread.map(item => item["ingredient_"+lang]).join(", ") }}</li>
            <li v-show="burgerOrder">{{uiLabels.burger}}: {{ Burger.map(item => item["ingredient_"+lang]).join(", ") }}</li>
            <li v-show="dressingOrder">{{uiLabels.dressing}}: {{ Dressing.map(item => item["ingredient_"+lang]).join(", ") }}</li>
            <li v-show="toppingsOrder">{{uiLabels.toppings}}: {{ Toppings.map(item => item["ingredient_"+lang]).join(", ") }}</li>
          </ul> -->
        </div>
        <h3 class="totalText" style="text-align:right"><u>{{uiLabels.total}}: {{ price }} kr</u></h3>
      </div>

      <div style="text-align:right">
        <button class="cancelButton"><i class="fa fa-trash"></i>{{ uiLabels.cancelOrder }}</button>
        <button class="orderButtonO" v-on:click="placeOrder()">{{ uiLabels.pay }}</button>
      </div>
    </div>

  </div>
</template>

<script>
  import Ingredient from '@/components/Ingredient.vue'
  import OrderItem from '@/components/OrderItem.vue'
  import sharedVueStuff from '@/components/sharedVueStuff.js'

  export default {
    name: 'Home' ,
    components: {
      Ingredient,
      OrderItem
  },
  mixins: [sharedVueStuff],
  methods: {

  }

}
</script>

<style scoped>
  #home {
    margin: auto;
    width: 40em;
    background-color: black;
  }
  .aaa {
    width: 100%;
  }
  .buttonHome {
    color: black;
  }
  .buttonHome button {
    width: 16em;
    margin: 3%;
    background-color: #4CAF50;
    border: 0.1em solid black;
    color: black;
    padding: 4%;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 2em;
    cursor: pointer;
    border-radius: 1.5em;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  }
  .createBurgerButton {
    margin-top: 7%;
  }
  .buttonHome button:hover {
    background-color:#ddd;
  }
</style>
