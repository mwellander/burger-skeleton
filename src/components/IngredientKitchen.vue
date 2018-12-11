<template>
  <div class="ingredientKitchen">
    <label>
      <form id="stockInput">
        {{item["ingredient_"+ lang]}}, {{uiLabels.inStock}}: {{item.stock}}{{uiLabels.pcs}},
        <input type="number">
        <button type="submit" v-on:click="updateStock()">{{uiLabels.add}}</button>
      </form>
      <!-- <label for="addStock"></label> -->
      <br>
      <br>


    </label>
  </div>
</template>
<script>
import sharedVueStuff from '@/components/sharedVueStuff.js'
export default {
  name: 'IngredientKitchen',
  props: {
    item: Object,
    lang: String
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
    updateStock: function () {
      // sending 'increment' message to parent component or view so that it
      // can catch it with v-on:increment in the component declaration
      //this.stockAdd = document.getElementById("stockInput").value;
      //this.$emit('updateStock', this.stock);
      document.getElementById("stockInput").reset();
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

</style>
