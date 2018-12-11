<template>
  <div id="home">
    <link rel="stylesheet" href="Ordering.vue">
    <div style="text-align:left">
      <button class="LanguageButtonO" v-on:click="switchLang()"><img :src="require('../assets/' + uiLabels.flag)" height="30em"></button>
    </div>
    <div class="buttonHome" style="text-align:center">
      <div class="createBurgerButton">
        <a href="#/customburger"><button>{{uiLabels.createBurger}}</button></a>
      </div>
      <a href="#/favouriteburger"><button>{{uiLabels.favouriteBurger}}</button></a>
      <a href="#/sidesandbeverage"><button>{{uiLabels.sidesDrink}}</button></a>
    </div>

    <div class="receipt">
      <div class="row">
        <div class="column aa aaa"><h3>{{ uiLabels.yourOrder }}</h3></div>
        <!-- <div class="column aa"><h3>{{ uiLabels.sideOrder }}</h3></div> -->
        <div class="column cc" style="text-align:left">
          <ul style="list-style-type:none">
            <p>{{noBurger}}</p>
            <li v-bind:key="(noB,path)" v-for="(noB,path) in noBurger"> {{uiLabels.burger}} {{ noB }}</li>
          </ul>

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
  import ordering from '@/views/Ordering.vue'
  import store from '@/store.js'

  export default {
    name: 'Home' ,
    components: {
      Ingredient,
      OrderItem,
      ordering
  },
  mixins: [sharedVueStuff,ordering,store],
  data: function(){
    return{
      burgers:store.getters.getChosenIngredients4,
      noBurger:store.getters.getNoBurger,
    }
  },
  methods: {

  }
}
</script>

<style scoped>
  @media screen and (min-width: 300px) {
    #home {
      /* margin: auto; */
      width: 20em;
      background-color: black;
    }
  }
  @media screen and (min-width: 700px) {
     #home {
        width:40em;
        margin: auto;
        padding:0.8em;
     }
   }
     .aaa {
       width: 100%;
     }
     .buttonHome {
       color: black;
     }
     .buttonHome button {
       width: 100%;
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
