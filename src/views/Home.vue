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
              <b> Order {{ key.noB }}</b>
              <button v-on:click="showOrder(index)" class="showButton">
                <span v-show="!show || key.ingredients!==showArray">{{uiLabels.show}}</span>
                <span v-show="show && key.ingredients===showArray">{{uiLabels.hide}}</span>
              </button>
              <a :href="key.path">
                <button v-on:click="changeOrder(key,index)" class="changeButton">{{uiLabels.change}}
                    </button></a>
                  <button v-on:click="deleteBurger(index)" class="deleteButton">{{uiLabels.erase}}
                </button>
              {{key.price}}:-<br>

            <span v-show="show && key.ingredients===showArray" id="showOrder">
                <li v-show="breadOrder">{{uiLabels.bread}}: {{ Bread.map(item => item["ingredient_"+lang]).join(", ") }}</li>
                <li v-show="burgerOrder">{{uiLabels.burger}}: {{ Burger.map(item => item["ingredient_"+lang]).join(", ") }}</li>
                <li v-show="dressingOrder">{{uiLabels.dressing}}: {{ Dressing.map(item => item["ingredient_"+lang]).join(", ") }}</li>
                <li v-show="toppingsOrder">{{uiLabels.toppings}}: {{ Toppings.map(item => item["ingredient_"+lang]).join(", ") }}</li>
                <li v-show="readyBurgerOrder">{{uiLabels.burger}}: {{ ReadyBurger.map(item => item["ingredient_"+lang]).join(", ") }}</li>
                <li v-show="sidesOrder">{{uiLabels.sides}}: {{ Sides.map(item => item["ingredient_"+lang]).join(", ") }}</li>
                <li v-show="beverageOrder">{{uiLabels.beverage}}: {{ Beverage.map(item => item["ingredient_"+lang]).join(", ") }}</li>
            </span></li>
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

    <div class="alertPay" v-show="alert2">
      <div class="confirmTextPay">{{uiLabels.nothingToOrder}}</div>
      <button class="confirmContinue" v-on:click="cancelAlert4b()">{{uiLabels.continue}}</button>
    <a href="#/start" class="confirmNoContinue" role="button" v-on:click="cancelOrder()">{{uiLabels.cancelThisOrder}}</a>
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
      readyBurgerOrder:false,
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
      width: 21em;
      background-color: black;
      font-family: "Helvetica", cursive, sans-serif;
    }
    .createBurgerButton {
      margin-top: 7%;
      grid-row: 1;
      grid-column: 1 /span 2;
    }
    .readyBurgerButton{
      grid-row:2;
      grid-column: 1 /span 2;
    }
    .sidesButton{
      grid-row:3;
      grid-column: 1 /span 2;
    }
    .alertPay {
      width: 18em;
      height: 10em;
      padding: 0.5em 1em;
      border: 0.2em solid black;
    }
     .confirmTextPay {
       margin-top: 0.7em;
       font-size: 1.5em;
     }
    .confirmContinue {
      font-size: 0.8em;
    }
    .confirmNoContinue {
     font-size: 0.8em;
    }
  }
  @media screen and (min-width: 700px) {
     #home {
        width:40em;
        margin: auto;
        padding:0.8em;
        font-family: "Helvetica", cursive, sans-serif;
     }
     .createBurgerButton {
       margin-top: 7%;
       grid-row: 1;
       grid-column: 1 /span 2;
       height:10em;
     }
     .readyBurgerButton{
       grid-row: 2;
       grid-column:1;
       height:4em;
     }
     .sidesButton{
       grid-row: 2;
       grid-column:2;
       height: 4em;
     }
     .alertPay {
       width: 25em;
       height: 15em;
       padding: 1em 2em;
       border: 0.5em solid black;
     }
     .confirmTextPay {
       margin-top: 1em;
       font-size: 2em;
     }
     .confirmContinue {
       font-size: 1em;
     }
     .confirmNoContinue {
      font-size: 1em;
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
       font-family: "Helvetica", cursive, sans-serif;
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
       font-family: "Helvetica", cursive, sans-serif;
     }

     .buttonHome button:hover {
       background-color:#ddd;
     }
     .changeButton{
       background-color:#5dade2;
       font-family: "Helvetica", cursive, sans-serif;
       font-size:0.7em;
       padding:0.1em;
       width:5em;
       border-radius:1.5em;
       margin:0.2em;
     }
     .deleteButton{
       background-color:#f44336;
       font-family: "Helvetica", cursive, sans-serif;
       font-size:0.7em;
       padding:0.1em;
       border-radius:1.5em;
       width:5em;
     }
     .showButton{
       background-color:#aed6f1;
       font-family: "Helvetica", cursive, sans-serif;
       font-size:0.7em;
       padding:0.1em;
       width:3.5em;
       margin-left:0.4em;
       border-radius:1.5em;
     }
     #toChangeBackground4 {
       opacity: 1;
       pointer-events: auto;
     }

     .alertPay {
       z-index: 100;
       position: relative;
       background-color: grey;
       display: grid;
       grid-template-columns: 40% 20% 40%;
       margin: auto;
       text-align: center;
     }

     .confirmTextPay {
       font-family: "Helvetica", cursive, sans-serif;
       grid-column: 1/ span 3;
       grid-row: 1;
     }
     .confirmContinue {
       font-family: "Helvetica", cursive, sans-serif;
       grid-column: 3;
       grid-row: 2;
       background-color: #6495ED;
       border: 0.1em solid black;
       color: black;
       text-align: center;
       text-decoration: none;
       display: inline-block;
       cursor: pointer;
       box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
       vertical-align: middle;
       margin: auto;
       padding: 1em 1em;
       border-radius: 1em;
     }
     .confirmNoContinue {
       font-family: "Helvetica", cursive, sans-serif;
       grid-column: 1;
       grid-row: 2;
       background-color: #ADD8E6;
       border: 0.1em solid black;
       color: black;
       padding: 1em 1em;
       text-align: center;
       text-decoration: none;
       display: inline-block;
       cursor: pointer;
       border-radius: 1em;
       box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
       margin: auto;
     }

</style>
