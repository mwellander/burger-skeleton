<template>
  <div class="ingredientKitchen">
    <label>
      {{item["ingredient_"+ lang]}}, {{item.stock}}
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
      counter: 0,
    };
  },
  methods: {
    incrementCounter: function () {
      this.counter += 1;
      // sending 'increment' message to parent component or view so that it
      // can catch it with v-on:increment in the component declaration
      this.$emit('increment');
    },
    resetCounter: function () {
      this.counter = 0;
    }
  }
}
</script>
<style scoped>

</style>
