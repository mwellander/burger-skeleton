<template>

  <!-- Måste komma ihåg att fixa så språket skickas med -->

  <div id="start">
    <div class="logo">
      {{uiLabels.welcome}}
      <br>
    <div id="NoKetchupLogo"><img src="../assets/Images_ingedients/ketchupNy.png" class="ketchup"/>{{uiLabels.noKetchup}}<img src="../assets/Images_ingedients/ketchupNy.png" class="ketchup"/></div>
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
@media screen and (min-width: 300px) {
  #start {
    width: 22.4em;
  }
  .startButton{
    bottom:100em;
    padding: 0em 0em;
    font-size:3em;
  }
  .logo{
    font-size:1em;
  }
  .ketchup{
    height:1em;
  }
}
@media screen and (min-width: 700px) {
   #start {
      width:40em;
   }
   .startButton{
     bottom:50em;
     padding: 1em 1em;
     font-size: 4em;
   }
   .logo{
     font-size:2em;
   }
   .ketchup{
     height:100;
   }
 }
#start {
  /* height: 100%; */
  min-width: 100px;
  min-height: 100px;
  margin: auto;
  font-family: "Helvetica", cursive, sans-serif;
  background-color: black;
  margin: auto;
  padding:0.8em;
}

.logo {
  font-family: "Comic Sans MS", cursive, sans-serif;
  background-color: white;
  color: black;

  margin-top: 2.5em;
  margin-left: 10%;
  margin-right: 10%;
  width:80%;
  height:6em;
  border: 0.1em solid black;
  padding: 0.5em 0.5em;
  text-decoration: none;
  display: inline-block;
  border-radius: 1em;
  vertical-align: middle;
  text-align: center;
}

#NoKetchupLogo {
  font-size: 2em;
}

.startButton{
  font-family: "Helvetica", cursive, sans-serif;
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
  text-decoration: none;
  display: inline-block;
  /* margin: 4px 2px; */
  cursor: pointer;
  border-radius: 1em;
}

</style>
