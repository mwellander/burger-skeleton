<template>
  <div class="ingredientKitchen">
    <form :id="stock+item.ingredient_id">
      <div class="ingredientName">
        {{item["ingredient_"+ lang]}}
      </div>
      <div class="ingredientAddStock">
        {{uiLabels.inStock}}: {{item.stock}}{{uiLabels.pcs}},
        <br>
        <div class="inputNumberDiv">
          <input type="number" :id="item.ingredient_en + item.ingredient_id" min="0">
        </div>
        <button class="negative buttonLayout" type="submit" v-on:click="updateStock($event)">{{uiLabels.erase}}</button>
        <button class="positive buttonLayout" type="submit" v-on:click="updateStock($event)">{{uiLabels.add}}</button>
      </div>
      <h1 v-if="item.stock<=0">{{uiLabels.finished}}</h1>
    </form>
  </div>
</template>

<script>
import sharedVueStuff from '@/components/sharedVueStuff.js'
export default {
  name: 'IngredientKitchen',
  props: {
    item: Object,
  },
  mixins: [sharedVueStuff],
  data: function () {
    return {
      stock: this.item.stock,
    };
  },
  methods: {
    updateStock: function (e) {
      var id = this.item.ingredient_en + this.item.ingredient_id;
      var numberToUpdate = document.getElementById(id).value;
      var currentStock;
      if (e.target.className === "positive buttonLayout") {
        currentStock = Number(this.item.stock) + Number(numberToUpdate);
      }
      else if (e.target.className === "negative buttonLayout"){
        currentStock = Number(this.item.stock) - Number(numberToUpdate);
      }
      this.$store.state.socket.emit('updateStock', {"ingredient":this.item}, currentStock);
      document.getElementById(id).value = "";
    },
    resetCounter: function () {
      this.counter = 0;}
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
  .buttonLayout {
    border: 0.1em solid black;
    color: black;
    padding: 0.5em 1em;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    border-radius: 1em;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  }
  .positive {
    background-color: #91ff87;
  }
  .negative {
    background-color: #d76d63;
  }
  .inputNumberDiv {
    padding-bottom: 0.5em;
  }
  </style>
