<template>
  <div class="ingredient">
      <br><img v-bind:src="require('../assets/Images_ingedients/' + item.image)" height="95">
      <label>
        <br>{{item["ingredient_"+ lang]}}, {{item.selling_price}}:-, {{ item.stock }}
          </label>
        <br>
        <!-- <div class = "btn-group"> -->
        <br><button id="decrementButton" v-on:click="decrementCounter">{{ "-" }}</button>
        <button id="incrementButton" v-on:click="incrementCounter">{{ "+" }}</button>
        <!-- </div> -->
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
  #incrementButton{
    padding:0.2em;
    width:1.5em;
    height:1.5em;
    font-size: 0.4em;
  }
  #decrementButton{
    padding:0.2em;
    width:1.5em;
    height:1.5em;
    font-size: 0.4em;
  }
}
@media screen and (min-width: 700px){
  #incrementButton{
  width:2em;
  height:2em;
  font-size: 1em;
}
  #decrementButton{
    width:2em;
    height:2em;
  font-size: 1em;
  }
}
#decrementButton{
background-color: #808080;
border: 1px solid black;
cursor: pointer;
}
#incrementButton{
   background-color: #808080;
   border: 1px solid black;
   cursor: pointer;

}
/* #decrementButton:hover {
  background-color: #f44336;
  color: black;
  transition-duration: 0.8s;
}
#incrementButton:hover {
  background-color: #4CAF50;
  color: black;
  transition-duration: 0.8s;
} */
#incrementButton:active{
  background-color: green;
   margin-bottom: 20px;

}
#decrementButton:active{
  background-color: red;
}
/* .btn-group button{
   background-color: #808080;
   border: 1px solid black;
   color: black;
   font-size: 1em;
} */

</style>
