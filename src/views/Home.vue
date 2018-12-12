<template>
  <div id="home">
    <div id="toChangeBackground4">
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
            <li v-bind:key="(key.noB)" v-for="(key,index) in noBurger">
              {{uiLabels.burger}} {{ key.noB }}
              <a :href="key.path">
                <button v-on:click="changeOrder(key,index)" class="changeButton">{{uiLabels.change}}
                    </button></a>
                  <button v-on:click="deleteBurger(index)" class="deleteButton">{{uiLabels.erase}}
                </button>
              {{key.price}}:-</li>
          </ul>

          <!-- <ul style="list-style-type:none">
            <li v-show="breadOrder">{{uiLabels.bread}}: {{ Bread.map(item => item["ingredient_"+lang]).join(", ") }}</li>
            <li v-show="burgerOrder">{{uiLabels.burger}}: {{ Burger.map(item => item["ingredient_"+lang]).join(", ") }}</li>
            <li v-show="dressingOrder">{{uiLabels.dressing}}: {{ Dressing.map(item => item["ingredient_"+lang]).join(", ") }}</li>
            <li v-show="toppingsOrder">{{uiLabels.toppings}}: {{ Toppings.map(item => item["ingredient_"+lang]).join(", ") }}</li>
          </ul> -->
        </div>
        <h3 class="totalText" style="text-align:right"><u>{{uiLabels.total}}: {{ price }}:-</u></h3>
      </div>

      <div style="text-align:right">
        <button class="cancelButton" v-on:click="cancelAlert4()"><i class="fa fa-trash"></i>{{ uiLabels.cancelOrder }}</button>
        <button class="orderButtonO" v-on:click="placeOrder()">{{ uiLabels.pay }}</button>
      </div>
    </div>
  </div>

    <div class="alert" v-show="alert">
      <div class="confirmText">{{uiLabels.confirmMess}}</div>
    <a href="#/start" class="confirmCancel" role="button" v-on:click="cancelOrder()">{{uiLabels.yes}}</a>
    <button class="confirmNoCancel" v-on:click="cancelAlert4()">{{uiLabels.no}}</button>
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
      price:0
    }
  },
  mounted: function(){
    this.getPrice();
  },
  methods: {
    getPrice: function(){
      this.price=0;
      for(var i=0;i<this.noBurger.length;i++){
        this.price+=this.noBurger[i].price;
      }
    },
    deleteBurger: function(key){
      store.commit('deleteBurger',key);
      this.noBurger=store.getters.getNoBurger;
      this.getPrice();
    },
    changeOrder: function(key,index){
      key.index=index;
      store.commit('changeOrder',key);
    },
    placeOrder: function () {
      if (typeof this.noBurger[0] === 'undefined') {
        this.cancelAlert4();
      }
      else {
      var order = {ingredients:this.noBurger[0].ingredients,price:this.price};
      // for (var i=0; i<this.noBurger.length; i++) {
      //   var order = {ingredients:this.noBurger[0].ingredients,price:this.price};
      //
      //   this.$store.state.socket.emit('order', {order: order});
      // }
      this.$store.state.socket.emit('order', {order: order});
      window.location.replace("#/payment");
    }
    },
    cancelAlert4: function() {
  var background = document.getElementById("toChangeBackground4");
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
}
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
     .changeButton{
       background-color:lightblue;
       font-family: "Comic Sans MS", cursive, sans-serif;
     }
     .deleteButton{
       background-color:#f44336;
       font-family: "Comic Sans MS", cursive, sans-serif;
     }

     #toChangeBackground4 {
       opacity: 1;
       pointer-events: auto;
     }
</style>
