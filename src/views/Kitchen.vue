<template>
  <section class="orders">

  <div class="box a">
    {{ uiLabels.staffView }}
    <button v-on:click="switchLang()" class="LanguageButtonK">{{ uiLabels.language }}</button>
    <button v-on:click="stockView()" class="OrderButtonK" id="OrderButton">{{ uiLabels.ordersToView }}</button>
    <button v-on:click="stockView()" class="StockButton" id="StockButton">{{ uiLabels.stock }}</button>
  </div>

  <div id="currentStock">
    <div class="tabsKitchen">
      <button v-on:click="toBurger()">{{uiLabels.burger}}</button>
      <button v-on:click="toToppings()">{{uiLabels.toppings}}</button>
      <button v-on:click="toDressing()">{{uiLabels.dressing}}</button>
      <button v-on:click="toBread()">{{uiLabels.bread}}</button>
      <button v-on:click="toSides()">{{uiLabels.sides}}</button>
      <button v-on:click="toBeverage()">{{uiLabels.beverage}}</button>
      <button v-on:click="toReadyMadeBurger()">{{uiLabels.favouriteBurger}}</button>
    </div>
<!--
    <br>
    <br>
    <br> -->
<div id="itemInStock">
  <!-- kom ihåg att ändra addToOrder-funktionen (ska vara en funktion som antingen
  minskar eller ökar saldot) -->
    <IngredientKitchen
      ref="ingredientKitchen"
      v-show="state === 'burger'"
      v-if="item.category===1"
      v-for="item in ingredients"
      v-on:updateStock="updateStock()"
      :item="item"
      :lang="uiLabels.lang"
      :key="item.ingredient_id">
    </IngredientKitchen>

    <IngredientKitchen
      ref="ingredientKitchen"
      v-show="state === 'toppings'"
      v-if="item.category===2"
      v-for="item in ingredients"
      v-on:updateStock="updateStock()"
      :item="item"
      :lang="uiLabels.lang"
      :key="item.ingredient_id">
    </IngredientKitchen>

      <IngredientKitchen
        ref="ingredientKitchen"
        v-show="state === 'dressing'"
        v-if="item.category===3"
        v-for="item in ingredients"
        v-on:updateStock="updateStock()"
        :item="item"
        :lang="uiLabels.lang"
        :key="item.ingredient_id">
      </IngredientKitchen>

      <IngredientKitchen
        ref="ingredientKitchen"
        v-show="state === 'bread'"
        v-if="item.category===4"
        v-for="item in ingredients"
        v-on:updateStock="updateStock()"
        :item="item"
        :lang="uiLabels.lang"
        :key="item.ingredient_id">
      </IngredientKitchen>

      <IngredientKitchen
        ref="ingredientKitchen"
        v-show="state === 'sides'"
        v-if="item.category===5"
        v-for="item in ingredients"
        v-on:updateStock="updateStock()"
        :item="item"
        :lang="uiLabels.lang"
        :key="item.ingredient_id">
      </IngredientKitchen>

      <IngredientKitchen
        ref="ingredientKitchen"
        v-show="state === 'beverage'"
        v-if="item.category===6"
        v-for="item in ingredients"
        v-on:updateStock="updateStock()"
        :item="item"
        :lang="uiLabels.lang"
        :key="item.ingredient_id">
      </IngredientKitchen>

      <IngredientKitchen
        ref="ingredientKitchen"
        v-show="state === 'favouriteBurger'"
        v-if="item.category===7"
        v-for="item in ingredients"
        v-on:updateStock="updateStock()"
        :item="item"
        :lang="uiLabels.lang"
        :key="item.ingredient_id">
      </IngredientKitchen>
  </div>
</div>

  <div class="box b" id="box b"><h1>{{ uiLabels.ordersInQueue }}</h1></div>
  <div class="box c" id="box c"><h1>{{ uiLabels.ordersStarted }}</h1></div>
  <div class="box d" id="box d"><h1>{{ uiLabels.ordersFinished }}</h1></div>

  <div class="box e" id="box e">
    <OrderItemToPrepare
      v-for="(order, key) in orders"
      v-if="order.status !== 'started' && order.status !== 'done'"
      v-on:done="markStarted(key)"
      :order-id="key"
      :order="order"
      :ui-labels="uiLabels"
      :lang="uiLabels.lang"
      :key="key">
    </OrderItemToPrepare>
  </div>
  <div class="box f" id="box f">
    <OrderItemStarted
      v-for="(order, key) in orders"
      v-if="order.status === 'started'"
      v-on:done="markDone(key)"
      :order-id="key"
      :order="order"
      :lang="uiLabels.lang"
      :ui-labels="uiLabels"
      :key="key">
    </OrderItemStarted>
  </div>
  <div class="box g" id="box g">
    <OrderItem
      v-for="(order, key) in orders"
      v-if="order.status === 'done'"
      :order-id="key"
      :order="order"
      :lang="uiLabels.lang"
      :ui-labels="uiLabels"
       :key="key">
    </OrderItem>
  </div>
</section>

</template>
<script>
import OrderItem from '@/components/OrderItem.vue'
import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'
import OrderItemStarted from '@/components/OrderItemStarted.vue'
import Ingredient from '@/components/Ingredient.vue'
import IngredientKitchen from '@/components/IngredientKitchen.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Ordering',
  components: {
    OrderItem,
    OrderItemToPrepare,
    OrderItemStarted,
    Ingredient,
    IngredientKitchen
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
                            //the ordering system and the kitchen
  data: function(){
    return {
      chosenIngredients: [],
      price: 0,
      state: "burger",
      burger:true,
      toppings:false,
      dressing:false,
      bread:false,
      sides:false,
      beverages:false,
      orderingvue:false,
      readyBurger: false
    }
  },
  methods: {
    // updateStock: function(item, payload){
    //   console.log(item, payload)
    //   this.$store.state.socket.emit("updateStock", {item,payload});
    //
    // },
    markDone: function (orderid) {
      this.$store.state.socket.emit("orderDone", orderid);
    },
    markStarted: function (orderid) {
      this.$store.state.socket.emit("orderStarted", orderid);
    },
    stockView: function(){
     var stock = document.getElementById("currentStock");
     var b = document.getElementById("box b");
     var c = document.getElementById("box c");
     var d = document.getElementById("box d");
     var e = document.getElementById("box e");
     var f = document.getElementById("box f");
     var g = document.getElementById("box g");
     var stockButt = document.getElementById("StockButton");
     var orderButt = document.getElementById("OrderButton");
     if (stock.style.display === "none" || stock.style.display === "") {
        stock.style.display = "block";
        b.style.display = "none";
        c.style.display = "none";
        d.style.display = "none";
        e.style.display = "none";
        f.style.display = "none";
        g.style.display = "none";
        orderButt.style.display = "block";
        stockButt.style.display = "none";
    } else {
        stock.style.display = "none";
        b.style.display = "block";
        c.style.display = "block";
        d.style.display = "block";
        e.style.display = "block";
        f.style.display = "block";
        g.style.display = "block";
        orderButt.style.display = "none";
        stockButt.style.display = "block";
    }
  },
  toBurger: function(){
    this.state="burger";
    this.burger=true;
    this.toppings=false;
    this.dressing=false;
    this.bread=false;
    this.sides=false;
    this.beverage=false;
    this.ReadyBurger=false;
  },
  toToppings: function(){
    this.state="toppings";
    this.burger=false;
    this.toppings=true;
    this.dressing=false;
    this.bread=false;
    this.sides=false;
    this.beverage=false;
    this.ReadyBurger=false;
  },
  toDressing: function(){
    this.state="dressing";
    this.burger=false;
    this.toppings=false;
    this.dressing=true;
    this.bread=false;
    this.sides=false;
    this.beverage=false;
    this.ReadyBurger=false;
  },
  toBread: function(){
    this.state="bread";
    this.burger=false;
    this.toppings=false;
    this.dressing=false;
    this.bread=true;
    this.sides=false;
    this.beverage=false;
    this.ReadyBurger=false;
  },
  toSides: function(){
    this.state="sides";
    this.burger=false;
    this.toppings=false;
    this.dressing=false;
    this.bread=false;
    this.sides=true;
    this.beverage=false;
    this.ReadyBurger=false;
  },
  toBeverage: function(){
    this.state="beverage";
    this.burger=false;
    this.toppings=false;
    this.dressing=false;
    this.bread=false;
    this.sides=false;
    this.beverage=true;
    this.ReadyBurger=false;
  },
  toReadyMadeBurger: function() {
    this.state="favouriteBurger";
    this.burger=false;
    this.toppings=false;
    this.dressing=false;
    this.bread=false;
    this.sides=false;
    this.beverage=false;
    this.ReadyBurger=true;
  }
  }
}
</script>
<style scoped>
	.orders {
    font-size:15pt;
    display: grid;
    grid-gap: 5px;
    grid-template-columns: 33% 33% 33%;
    background-color: #fff;
    color: #444;
    position: sticky;
    top: 0;
  }

 .box {
    background-color: #444;
    color: #fff;
    border-radius: 5px;
    padding: 20px;
    font-size: 150%;
}

.a {
  display: grid;
  grid-template-columns: 20% 60% 20%;
  grid-column: 1 / span 3;
  grid-row: 1;
  top: 0;
  background-color: black;
  color: white;
  text-align: center;
}

.StockButton {
  background-color: #000000;
  border: 2px solid #fff;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 100%;
  margin: 4px 2px;
  cursor: pointer;
  grid-column: 3;
  grid-row: 1;
}

.OrderButtonK {
  background-color: #000000;
  border: 2px solid #fff;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 100%;
  margin: 4px 2px;
  cursor: pointer;
  grid-column: 3;
  grid-row: 1;
}

.LanguageButtonK {
  background-color: #000000;
  border: 2px solid #fff;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 100%;
  margin: 4px 2px;
  cursor: pointer;
  grid-column: 1;
  grid-row: 1;
}

#currentStock {
    /* overflow: scroll; */
    z-index: 2;
    grid-column: 1 / span 3;
    /* grid-row: 2 / span 2; */
    width: 100%;
    height: 40em;
    text-align: center;
    background-color: lightblue;
    /* padding: 50px 0; */
    display: none;
    font-size: 100%;
}

#itemInStock {
  overflow: scroll;
  height: 30em;
  width: 40em;
  margin: auto;
  text-align: left;
}

.tabsKitchen align center{
  /* background-color: #000000; */
  /* background-color: green; */
  overflow: hidden;
  position: sticky;
  top: 0;
  margin-top: 0em;
  z-index: 20;
  width: 100%;
}

.tabsKitchen button{
  border: 2px solid #fff;
  color: white;
  padding: 15px 32px;
  text-align: center;
  display: inline-block;
  font-size: 100%;
  margin: 4px 2px;
  cursor: pointer;

}
.tabsKitchen button:hover {
  background-color:#ddd;
}
.b {
  grid-column: 1 ;
  grid-row: 2 / span 1;
  height: 3,5em;
  text-align: center;
  font-size: 100%;
}
.c {
    grid-column: 2 ;
    grid-row: 2 / span 1;
    height: 3,5em;
    text-align: center;
    font-size: 100%;
}
.d {
    grid-column: 3 ;
    grid-row: 2 / span 1;
    height: 3,5em;
    text-align: center;
    font-size: 100%;
}
.e {
  overflow: scroll;
  height: 17em;
  grid-column: 1 ;
  grid-row: 3 / span 1;
}

.f {
  overflow: scroll;
  height: 17em;
  grid-column: 2 ;
  grid-row: 3 / span 1;
}

.g {
  overflow: scroll;
  height: 17em;
  grid-column: 3 ;
  grid-row: 3 / span 1;
}

.ingredient {
  border: 1px solid #ccd;
  padding: 1em;
  color: black;
}
.ingredientKitchen {
  border: 1px solid #ccd;
  padding: 1em;
  color: black;
}
  h1 {
    text-transform: uppercase;
    font-size: 1.4em;
  }
</style>
