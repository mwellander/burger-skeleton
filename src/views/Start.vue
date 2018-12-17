<template>

  <!-- Måste komma ihåg att fixa så språket skickas med -->

  <div id="start">
    <div class="logo">
      {{uiLabels.welcome}}
      <br>
    <div id="NoKetchupLogo"><img src="../assets/Images_ingedients/ketchupNy.png" height="100"/>{{uiLabels.noKetchup}}<img src="../assets/Images_ingedients/ketchupNy.png" height="100"/></div>
    </div>
    <div style="text-align:left">
      <button class="LanguageButtonO" v-on:click="switchLang()"><img :src="getFlag()" height="30em"></button>
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
import ordering from '@/views/Ordering.vue'

export default {
  name: 'Start' ,
  components: {
    Ingredient,
    OrderItem
  },
  mixins: [sharedVueStuff,ordering],
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

  margin-top: 2em;
  margin-left: 10%;
  margin-right: 10%;
  width:80%;
  height:6em;
  border: 0.1em solid black;
  padding: 0.5em 0.5em;
  text-decoration: none;
  display: inline-block;
  font-size: 2em;
  border-radius: 1em;
  vertical-align: middle;
  text-align: center;
}

#NoKetchupLogo {
  font-size: 2em;
}

.startButton{
  vertical-align: middle;
  text-align: center;
  margin-top: 1em;
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
  bottom:50em;
}

</style>
