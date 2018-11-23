<template>
<div class="orders">
  <div class="box a">STAFF VIEW</div>
  <div class="box b"><h1>{{ uiLabels.ordersInQueue }}</h1></div>
  <div class="box c"><h1>{{ uiLabels.ordersStarted }}</h1></div>
  <div class="box d"><h1>{{ uiLabels.ordersFinished }}</h1></div>
  <div class="box e">
    <OrderItemToPrepare
      v-for="(order, key) in orders"
      v-if="order.status !== 'started'"
      v-on:done="markDone(key)"
      :order-id="key"
      :order="order"
      :ui-labels="uiLabels"
      :lang="lang"
      :key="key">
    </OrderItemToPrepare>
  </div>
  <div class="box f">
    <OrderItemStarted
      v-for="(order, key) in orders"
      v-if="order.status === 'started'"
      :order-id="key"
      :order="order"
      :lang="lang"
      :ui-labels="uiLabels"
      :key="key">
    </OrderItemStarted>
  </div>
   <div class="box g">
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


</div>
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
    OrderItemToPrepare
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
    }
  }
}
</script>
<style scoped>
	.orders {
    font-size:15pt;
    display: grid;
     grid-gap: 10px;
     grid-template-columns: 33% 33% 33%;
     background-color: #fff;
     color: #444;
  }

  h1 {
    text-transform: uppercase;
    font-size: 1.4em;
  }
  .box {
    background-color: #444;
    color: #fff;
    border-radius: 5px;
    padding: 20px;
    font-size: 150%;

}

.a {
    grid-column:1/span 3;
}
.b {
    grid-column: 1 ;
    grid-row: 2 / span 1;
}
.c {
    grid-column: 2 ;
    grid-row: 2 ;
}
.d {
    grid-column: 3 ;
    grid-row: 2 ;
}
.e {
  grid-column: 1;
  grid-row:3;
}
.f {
  grid-column: 2;
  grid-row:3;
}
.g {
  grid-column: 3;
  grid-row:3;
}
</style>
