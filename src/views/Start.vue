<template>

  <!-- Måste komma ihåg att fixa så språket skickas med -->

  <div id="start">
    <div class="logo">
      {{uiLabels.welcome}}
    </div>
    <div style="text-align:left">
      <button class="LanguageButtonO" v-on:click="switchLang()"><img :src="require('../assets/' + uiLabels.flag)" height="30em"></button>
    </div>
    <a href="#/home">
      <button class="startButton">{{uiLabels.start}}</button>
    </a>
  </div>
</template>

<script>
import Ingredient from '@/components/Ingredient.vue'
import OrderItem from '@/components/OrderItem.vue'
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Start' ,
  components: {
    Ingredient,
    OrderItem
  },
  mixins: [sharedVueStuff],
  data: function() {
    return {
      //lang: "en"
    }
  },
  methods: {
  }

}

</script>

<style scoped>
#start {
  height: 100%;
  min-width: 100px;
  min-height: 100px;
  margin: auto;
  width: 40em;
}

.logo {
  font-family: "Comic Sans MS", cursive, sans-serif;
  background-color: white;
  color: black;

  margin-top: 4em;
  margin-left: 10%;
  margin-right: 10%;
  width:80%;
  height:3em;

  border: 0.1em solid black;
  padding: 0.5em 0.5em;
  text-decoration: none;
  display: inline-block;
  font-size: 2em;
  border-radius: 1em;

  vertical-align: middle;
  text-align: center;

}

.startButton{
  vertical-align: middle;
  text-align: center;
  margin-top: 3em;
  margin-left: 10%;
  margin-right: 10%;
  width:80%;
  height:4.5em;

  background-color: #4CAF50;
  border: 0.1em solid black;
  color: black;
  padding: 1em 1em;
  text-decoration: none;
  display: inline-block;
  font-size: 4em;
  /* margin: 4px 2px; */
  cursor: pointer;
  border-radius: 1em;
}

</style>
