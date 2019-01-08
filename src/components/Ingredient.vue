<template>
  <div class="ingredient">
    <div v-if="item.stock > 0">
      <div class="allergies" style="text-align:left">
        <span v-show="item.vegan===1" id="vegan">....</span>
        <span v-show="item.milk_free===1" id="milk">....</span>
        <span v-show="item.gluten_free===1" id="gluten">....</span>
        <span v-show="item.gluten_free===0&&item.milk_free===0&&item.vegan===0"><br></span>
      </div>
      <img id = "images" v-bind:src="require('../assets/Images_ingedients/' + item.image)" height="85">
      <label id="ingredientLabel"><font face="helvetica">
        <br>{{item["ingredient_"+ lang]}},<br> {{item.selling_price}}:-
      </font></label>
        <br>
        <button id="decrementButton" v-on:click="decrementCounter">{{ "-" }}</button>
        <button id="incrementButton" v-on:click="incrementCounter">{{ "+" }}</button>
      </div>
      <div v-if="item.stock <= 0">
        <div id="notInStockNow">{{uiLabels.showNotInStock}}</div>
        <br><div id="picture"><img v-bind:src="require('../assets/Images_ingedients/' + item.image)" height="85">
        <label><span id="ingredientText">
          <br>{{item["ingredient_"+ uiLabels.lang]}}, {{item.selling_price}}:-
        </span></label>
          <br>
          <br>
        </div>
      </div>
  </div>
</template>

<script>
import sharedVueStuff from '@/components/sharedVueStuff.js'
export default {
  name: 'Ingredient',
  props: {
    item: Object,
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
      width:3em;
      height:3em;
      font-size: 0.4em;
    }
    #decrementButton{
      padding:0.2em;
      width:3em;
      height:3em;
      font-size: 0.4em;
    }
    #images {
      height: 7em;
    }
    #ingredientLabel {
      font-size: 2em;
    }
    #notInStockNow {
      font-size: 1.1em;
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
    #images {
      height: 4.5em;
    }
    #ingredientLabel {
      font-size: 1em;
    }
    #notInStockNow {
      font-size: 0.9em;
    }
  }

  #decrementButton{
    background-color: #808080;
    border: 1px solid black;
    cursor: pointer;
    margin: 0.6em;
    border-radius: 20%;
    font-size: 1.3em;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    bottom:0em;
  }
  #incrementButton{
    background-color: #808080;
    border: 1px solid black;
    cursor: pointer;
    margin: 0.6em;
    border-radius: 20%;
    font-size: 1.3em;
    animation-name: incrementButtonAnimation;
    animation-duration: 4s;
    bottom:0em;
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
  #picture {
    opacity: 0.3;
  }
  #notInStockNow {
    z-index:1;
    margin-top: 4em;
    position: absolute;
  }
  #vegan{
    background-color:green;
    display:inline-block;
    border-radius:50%;
    color:green;
    font-size:0.5em;
    margin:0.2em;
  }
  #milk{
    background-color:yellow;
    display:inline-block;
    border-radius:50%;
    color:yellow;
    font-size:0.5em;
    margin:0.2em;
  }
  #gluten{
    background-color:blue;
    display:inline-block;
    border-radius:50%;
    color:blue;
    font-size:0.5em;
    margin:0.2em;
  }
  #ingredientText{
    font-family: "Helvetica", cursive, sans-serif;
  }
</style>
