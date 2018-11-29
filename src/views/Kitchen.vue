<template>
  <section class="orders">

  <div class="box a">{{ uiLabels.staffView }}
      <button v-on:click="switchLang()" class="LanguageButton">{{ uiLabels.language }}</button>
      <button v-on:click="stockView()" class="StockButton">{{ uiLabels.stock }}</button>
</div>

<div id="currentStock">
  This is my DIV element.<br>
  This is my DIV element.<br>
  This is my DIV element.<br>
  This is my DIV element.<br>
  This is my DIV element.<br>
  This is my DIV element.<br>
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
      :lang="lang"
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
      :lang="lang"
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
       :lang="lang"
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

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Ordering',
  components: {
    OrderItem,
    OrderItemToPrepare,
    OrderItemStarted
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
                            //the ordering system and the kitchen
  data: function(){
    return {
      chosenIngredients: [],
      price: 0
    }
  },
  methods: {
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
    console.log(stock);
    console.log(e);
    if (stock.style.display === "none" || stock.style.display === "") {
        stock.style.display = "block";
        b.style.display = "none";
        c.style.display = "none";
        d.style.display = "none";
        e.style.display = "none";
        f.style.display = "none";
    } else {
        stock.style.display = "none";
        b.style.display = "block";
        c.style.display = "block";
        d.style.display = "block";
        e.style.display = "block";
        f.style.display = "block";
    }
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

.LanguageButton {
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

.b {

  grid-column: 1 ;
  grid-row: 2 / span 1;
}
.c {
    grid-column: 2 ;
    grid-row: 2 / span 1;
}
.d {
    grid-column: 3 ;
    grid-row: 2 / span 1;
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

#currentStock {
    overflow: scroll;
    z-index: 2;
    grid-column: 1 / span 3;
    grid-row: 2 / span 2;
    width: 100%;
    height: 6em;
    text-align: center;
    background-color: lightblue;
    padding: 50px 0;
    display: none;
    font-size: 500%;
}
  h1 {
    text-transform: uppercase;
    font-size: 1.4em;
  }
</style>
