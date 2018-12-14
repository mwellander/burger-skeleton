<template>
  <div id="home">
    <div id="toChangeBackground4">
    <link rel="stylesheet" href="Ordering.vue">
    <div style="text-align:left">
      <button class="LanguageButtonO" v-on:click="switchLang()">
        <img :src="getFlag()" height="30em"></button>
    </div>
    <div class="buttonHome" style="text-align:center">
      <div class="createBurgerButton">
        <a href="#/customburger"><button>{{uiLabels.createBurger}}</button></a>
      </div>
      <div class="readyBurgerButton">
      <a href="#/favouriteburger"><button>{{uiLabels.favouriteBurger}}</button></a>
    </div>
    <div class="sidesButton">
      <a href="#/sidesandbeverage"><button>{{uiLabels.sidesDrink}}</button></a>
    </div>
  </div>

    <div class="receipt">
      <div class="row">
        <div class="aa"><h3>{{ uiLabels.yourOrder }}</h3></div>
        <!-- <div class="column aa"><h3>{{ uiLabels.sideOrder }}</h3></div> -->
        <div class="column cc ccPlus" style="text-align:left">
          <ul style="list-style-type:none">
            <li v-bind:key="(key.noB)" v-for="(key,index) in noBurger">
              <font face="helvetica" size="4"><b> Order {{ key.noB }}</b>
              <button v-on:click="showOrder(index)" class="showButton">
                <span v-show="!show || key.ingredients!==showArray">{{uiLabels.show}}</span>
                <span v-show="show && key.ingredients===showArray">{{uiLabels.hide}}</span>
              </button>
              <a :href="key.path">
                <button v-on:click="changeOrder(key,index)" class="changeButton">{{uiLabels.change}}
                    </button></a>
                  <button v-on:click="deleteBurger(index)" class="deleteButton">{{uiLabels.erase}}
                </button>
              {{key.price}}:-<br></font>
              <font face="helvetica">
            <span v-show="show && key.ingredients===showArray" id="showOrder">
                <li v-show="breadOrder"><b>{{uiLabels.bread}}: </b>{{ Bread.map(item => item["ingredient_"+uiLabels.lang]).join(", ") }}</li>
                <li v-show="burgerOrder"><b>{{uiLabels.burger}}: </b>{{ Burger.map(item => item["ingredient_"+uiLabels.lang]).join(", ") }}</li>
                <li v-show="dressingOrder"><b>{{uiLabels.dressing}}: </b>{{ Dressing.map(item => item["ingredient_"+uiLabels.lang]).join(", ") }}</li>
                <li v-show="toppingsOrder"><b>{{uiLabels.toppings}}: </b>{{ Toppings.map(item => item["ingredient_"+uiLabels.lang]).join(", ") }}</li>
                <li v-show="readyBurgerOrder"><b>{{uiLabels.burger}}:</b> {{ ReadyBurger.map(item => item["ingredient_"+uiLabels.lang]).join(", ") }}</li>
                <li v-show="sidesOrder"><b>{{uiLabels.sides}}: </b>{{ Sides.map(item => item["ingredient_"+uiLabels.lang]).join(", ") }}</li>
                <li v-show="beverageOrder"><b>{{uiLabels.beverage}}:</b> {{ Beverage.map(item => item["ingredient_"+uiLabels.lang]).join(", ") }}</li>
            </span></font></li>
          </ul>
        </div>
        <div class="column dd ddPlus" style="text-align:left">
          <div class="dd1">
            <p></p>
          </div>
          <div class="dd2">
            <div class="totalText" style="text-align:right"><u>{{uiLabels.total}}: {{ price }}:-</u></div>
            <div style="text-align:right">
              <button class="cancelButton" v-on:click="cancelAlert4a()"><i class="fa fa-trash"></i>{{ uiLabels.cancelOrder }}</button>
              <button class="orderButtonO" v-on:click="placeOrder()">{{ uiLabels.pay }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    <div class="alert" v-show="alert">
      <div class="confirmText">{{uiLabels.confirmMess}}</div>
    <a href="#/start" class="confirmCancel" role="button" v-on:click="cancelOrder()">{{uiLabels.yes}}</a>
    <button class="confirmNoCancel" v-on:click="cancelAlert4a()">{{uiLabels.no}}</button>
    </div>

    <div class="alert" v-show="alert2">
      <div class="confirmText">{{uiLabels.nothingToOrder}}</div>
      <button class="confirmCancel" v-on:click="cancelAlert4b()">{{uiLabels.continue}}</button>
    <a href="#/start" class="confirmNoCancel" role="button" v-on:click="cancelOrder()">{{uiLabels.cancelThisOrder}}</a>
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
      //orderInLine: store.getters.orderInLine,
      price:0,
      alert: false,
      alert2: false,
      burgerArrayLength:0,
      noInOrder:0,
      show:false,
      showArray:[],
      Bread:[],
      Burger:[],
      Dressing:[],
      Toppings:[],
      Sides:[],
      Beverage:[],
      ReadyBurger:[],
      breadOrder:false,
      burgerOrder:false,
      dressingOrder:false,
      toppingsOrder:false,
      sidesOrder:false,
      beverageOrder:false,
      readyBurgerOrder:false
    }
  },
  mounted: function(){
    this.getPrice();
  },
  methods: {
    showOrder: function(index){
      if(!this.show||this.showArray!==this.noBurger[index].ingredients){
        this.show=false;
        this.showArray=[];
        this.Bread=[];
        this.Burger=[];
        this.Dressing=[];
        this.Toppings=[];
        this.Sides=[];
        this.Beverage=[];
        this.ReadyBurger=[];
        this.breadOrder=false;
        this.burgerOrder=false;
        this.dressingOrder=false;
        this.toppingsOrder=false;
        this.sidesOrder=false;
        this.beverageOrder=false;
        this.readyBurgerOrder=false;
        this.showArray=this.noBurger[index].ingredients;
        this.show=true;
        for(var i=0;i<this.showArray.length;i++){
          var item = this.showArray[i];
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
          else if(item.category===5){
            this.Sides.push(item);
            this.sidesOrder=true;
          }
          else if(item.category===6){
            this.Beverage.push(item);
            this.beverageOrder=true;
            }
          else if(item.category===7){
            this.ReadyBurger.push(item);
            this.readyBurgerOrder=true;
              }
        }
      }
      else{
        this.show=false;
        this.showArray=[];
        this.Bread=[];
        this.Burger=[];
        this.Dressing=[];
        this.Toppings=[];
        this.Sides=[];
        this.Beverage=[];
        this.ReadyBurger=[];
        this.breadOrder=false;
        this.burgerOrder=false;
        this.dressingOrder=false;
        this.toppingsOrder=false;
        this.sidesOrder=false;
        this.beverageOrder=false;
        this.readyBurgerOrder=false;
      }
    },
    getPrice: function(){
      this.price=0;
      for(var i=0;i<this.noBurger.length;i++){
        this.price+=this.noBurger[i].price;
      }
    },
    deleteBurger: function(index){
      store.commit('deleteBurger',index);
      this.noBurger=store.getters.getNoBurger;
      this.getPrice();
      if(this.noBurger.length===0){
        store.commit('startOver');
      }
    },
    changeOrder: function(key,index){
      key.index=index;
      store.commit('changeOrder',key);
    },
    placeOrder: function () {
      if (typeof this.noBurger[0] === 'undefined') {
        this.cancelAlert4b();
      }
      else {
        var lengthBurger = this.noBurger.length;
        store.commit("orderInLine");
        for (var i=0; i<lengthBurger; i++) {
          var order = {
            ingredients:this.noBurger[i].ingredients,
            price:this.price,
            orderInLine: store.getters.orderInLine,
            burgerArrayLength: lengthBurger,
            noInOrder: i+1,
          };

          this.$store.state.socket.emit('order', {order: order});
          store.commit('cancelOrder');
          window.location.replace("#/payment");
        }
        store.commit('cancelOrder');
    }
    },
    cancelOrder: function(){
      store.commit('cancelOrder');
    },
    cancelAlert4a: function() {
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
},
cancelAlert4b: function() {
    var background = document.getElementById("toChangeBackground4");
if (this.alert2===false){
    this.alert2=true;
    background.style.opacity = 0.5;
    background.style['pointer-events'] = "none";
  }
  else {
    this.alert2=false;
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
     .ccPlus {
       width: 65%;
     }
     .ddPlus {
       width: 35%;
     }
     .buttonHome {
       color: black;
       display: grid;
       grid-template-columns:50% 50%;
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
       height:4em;
     }
     .createBurgerButton {
       margin-top: 7%;
       grid-column: 1/span 2;
       height:10em;
     }
     .readyBurgerButton{
       grid-column:1;
       height:4em;
     }
     .sidesButton{
       grid-column:2;
       /* height:4em; */
     }
     .buttonHome button:hover {
       background-color:#ddd;
     }
     .changeButton{
       background-color:#5dade2;
       font-family: "Helvetica", cursive, sans-serif;
       font-size:0.7em;
       padding:0.1em;
     }
     .deleteButton{
       background-color:#f44336;
       font-family: "Helvetica", cursive, sans-serif;
       font-size:0.7em;
       padding:0.1em;
     }
     .showButton{
       background-color:#aed6f1;
       font-family: "Helvetica", cursive, sans-serif;
       font-size:0.7em;
       padding:0.1em;
       width:3.5em;
       margin-left:0.4em;
     }
     #toChangeBackground4 {
       opacity: 1;
       pointer-events: auto;
     }

</style>
