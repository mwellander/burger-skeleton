<template>
  <div class="ingredient">
    <div v-if="item.stock > 0">
      <br><img v-bind:src="require('../assets/Images_ingedients/' + item.image)" height="95">
      <label>
        <br>{{item["ingredient_"+ lang]}},<br> {{item.selling_price}}:-
          </label>

        <!-- <div class = "btn-group"> -->
        <br><button id="decrementButton" v-on:click="decrementCounter">{{ "-" }}</button>
        <button id="incrementButton" v-on:click="incrementCounter">{{ "+" }}</button>
      </div>
      <div v-if="item.stock <= 0">
        <div id="notInStockNow">{{uiLabels.showNotInStock}}</div>
        <br><div id="picture"><img v-bind:src="require('../assets/Images_ingedients/' + item.image)" height="95">
        <label>
          <br>{{item["ingredient_"+ uiLabels.lang]}}, {{item.selling_price}}:-, {{ item.stock }}
            </label>
          <br>
          <br>
        </div>
      </div>
        <!-- </div> -->
  </div>
</template>
<script>

import sharedVueStuff from '@/components/sharedVueStuff.js'
export default {
  name: 'Ingredient',
  props: {
    item: Object,
    lang: String
  },
  mixins: [sharedVueStuff],
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
margin: 0.7em;
border-radius: 20%;
font-size: 1.3em;
box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);

}
#incrementButton{
   background-color: #808080;
   border: 1px solid black;
   cursor: pointer;
   margin: 0.6em;
   border-radius: 20%;
   font-size: 1.3em;



}
#decrementButton:hover {
  background-color: #F08080;
  color: black;
  transition-duration: 0.3s;
}
#incrementButton:hover {
  background-color: #8FBC8F;
  color: black;
  transition-duration: 0.3s;
}
#incrementButton:active{
  background-color: green;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2),0 4px 20px 0 #8FBC8F;

}
#decrementButton:active{
  background-color: red;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2),0 4px 20px 0 #F08080;
}
/* .btn-group button{
   background-color: #808080;
   border: 1px solid black;
   color: black;
   font-size: 1em;
} */

#picture {
  opacity: 0.3;
}

#notInStockNow {
  font-size: 1em;
  z-index:1;
  margin-top: 4em;
  position: absolute;
}

</style>
