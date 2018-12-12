<template>
  <div class="ingredient">
      <br><img v-bind:src="require('../assets/Images_ingedients/' + item.image)" width="100">
      <label>
        <br>{{item["ingredient_"+ lang]}},
        {{item.selling_price}}:-
        <br>
        <div class = "btn-group">
        <br><button class="decrementButton" v-on:click="decrementCounter">{{ "-" }}</button>
        <button class="incrementButton" v-on:click="incrementCounter">{{ "+" }}</button>
        </div>
      </label>
  </div>
</template>
<script>
export default {
  name: 'Ingredient',
  props: {
    item: Object,
    lang: String
  },
    data: function () {
    return {
      counter: 0
    };
  },
  methods: {
    decrementCounter: function() {
      //this.counter-=1;
      this.$emit('decrement');
    },
    incrementCounter: function () {
      //this.counter += 1;
      // sending 'increment' message to parent component or view so that it
      // can catch it with v-on:increment in the component declaration
      this.$emit('increment');
    },
    resetCounter: function () {
      //this.counter = 0;
    }
  }
}
</script>
<style scoped>
@media screen and (min-width: 300px){
  .incrementButton{
    padding:0.2em;
    width:1.5em;
    height:1.5em;
  }
  .decrementButton{
    padding:0.2em;
    width:1.5em;
    height:1.5em;
  }
}
@media screen and (min-width: 700px){
  .incrementButton{
  width:2em;
  height:2em;

}
.decrementButton{
  width:2em;
  height:2em;
}
}
.decrementButton, .incrementButton{

}
.incrementButton{

}
.btn-group button{
   background-color: #808080;
   border: 1px solid black; /* Green border */
   color: black;
   font-size: 1em;
}

</style>
