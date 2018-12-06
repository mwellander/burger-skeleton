<template>
  <div class="ingredientKitchen">
    <label>
      {{item["ingredient_"+ lang]}}, {{item.stock}}
      <label for="addStock"></label>
      <input type="number" v-model="stock">
      <button type="submit" v-on:click="updateStock">add</button>
    </label>
  </div>
</template>
<script>
export default {
  name: 'IngredientKitchen',
  props: {
    item: Object,
    lang: String
  },
    data: function () {
    return {
      stock: this.item.stock
    };
  },
  // computed: {
  //   stock: function() { return this.item.stock; }
  // },
  methods: {
    updateStock: function () {
      // sending 'increment' message to parent component or view so that it
      // can catch it with v-on:increment in the component declaration
      this.$emit('updateStock', this.stock);
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
