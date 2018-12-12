<template>

  <div id="paymentSide">
    <div class="thankYou">
      {{uiLabels.thankPayment}}
    </div>
    <div style="text-align:left">
      <button class="LanguageButtonO" v-on:click="switchLang()"><img :src="require('../assets/' + uiLabels.flag)" height="30em"></button>
    </div>
    <a href="#/start">
      <button class="startButton">{{uiLabels.goToStart}}</button>
    </a>
  </div>
</template>

<script>
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Payment' ,
  components: {
  },
  mixins: [sharedVueStuff],
  methods: {
  }

}

</script>

<style scoped>
#paymentSide {
  height: 100%;
  min-width: 100px;
  min-height: 100px;
  margin: auto;
  width: 40em;
}

.thankYou {
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
