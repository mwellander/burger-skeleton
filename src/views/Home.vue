<template>
  <div id="home">
    <link rel="stylesheet" href="Ordering.vue">
    <div style="text-align:left">
      <button class="LanguageButton" v-on:click="switchLang()"><img :src="require('../assets/' + uiLabels.flag)" height="30em"></button>
    </div>
    <div class="buttonHome">
      <div class="createBurgerButton">
        <a href="#/customburger"><button>{{uiLabels.createBurger}}</button></a>
      </div>
      <a href="#/favouriteburger"><button>{{uiLabels.favouriteBurger}}</button></a>
      <button>{{uiLabels.sidesDrink}}</button>
    </div>

  </div>
</template>

<script>
  import Ingredient from '@/components/Ingredient.vue'
  import OrderItem from '@/components/OrderItem.vue'
  import sharedVueStuff from '@/components/sharedVueStuff.js'

  export default {
    name: 'Home' ,
    components: {

  },
  mixins: [sharedVueStuff],
  methods: {

  }

}
</script>

<style scoped>
  #home {
    margin: auto;
    width: 40em;
    background-color: yellow;
  }
  .createBurgerButton {

  }
  .buttonHome {
    color: yellow;
  }
  .buttonHome button {
    width: 16em;
    background-color: #4CAF50;
    border: 0.1em solid black;
    color: black;
    padding: 1em 2em;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 2em;
    /* margin: 4px 2px; */
    cursor: pointer;
    border-radius: 1em;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  }
  .buttonHome button:hover {
    background-color:#ddd;
  }
</style>
