<template>
  <div class="ingredientKitchen">
    <!-- <label> -->
    <form :id="stock+item.ingredient_id">
      <div class="ingredientName">
        {{item["ingredient_"+ lang]}}
      </div>
      <div class="ingredientAddStock">
        {{uiLabels.inStock}}: {{item.stock}}{{uiLabels.pcs}},
        <br>
        <input type="number" :id="item.ingredient_en + item.ingredient_id" min="0">
        <br>
        <button class="negative" type="submit" v-on:click="updateStock($event)">{{uiLabels.erase}}</button>
        <button class="positive" type="submit" v-on:click="updateStock($event)">{{uiLabels.add}}</button>
      </div>
      <h1 v-if="item.stock<=0">{{uiLabels.finished}}</h1>
    </form>
    <!-- </label> -->
  </div>
</template>
<script>
import sharedVueStuff from '@/components/sharedVueStuff.js'
export default {
  name: 'IngredientKitchen',
  props: {
    item: Object,
    lang: String,
  },
  mixins: [sharedVueStuff],

  data: function () {
    return {
      stock: this.item.stock,
    };
  },
  // computed: {
  //   stock: function() { return this.item.stock; }
  // },
  methods: {
    updateStock: function (e) {
      // sending 'increment' message to parent component or view so that it
      // can catch it with v-on:increment in the component declaration
      //this.stockAdd = document.getElementById("stockInput").value;
      //this.$emit('updateStock', this.stock);
      var id = this.item.ingredient_en + this.item.ingredient_id;
      var numberToUpdate = document.getElementById(id).value;
      var currentStock;
      if (e.target.className === "positive") {
        currentStock = Number(this.item.stock) + Number(numberToUpdate);

      }
      else if (e.target.className === "negative"){
        currentStock = Number(this.item.stock) - Number(numberToUpdate);
      }
      this.$store.state.socket.emit('updateStock', {"ingredient":this.item}, currentStock);
      document.getElementById(id).value = "";

    },
    resetCounter: function () {
      this.counter = 0;}
      // ,
      // addStocks: function(){
      //   increaseBy = document.getElementById("addStock").value;
      //   this.stock += increaseBy;
      //   console.log("increaseBy",increaseBy);
      // }
    }
  }
  </script>
  <style scoped>

  form {
    width: 100%;
    display: grid;
    grid-template-columns: 33% 33% 33%
  }

  .ingredientName {
    font-size: 1.5em;
    grid-column: 1;
  }

  .ingredientAddStock {
    grid-column: 2;
    text-align: center;
  }

  .notInStock {
    grid-column: 3;
    text-align: center;
    vertical-align: middle;
    display: none;
  }

  </style>
