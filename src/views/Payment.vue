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
@media screen and (min-width: 300px) {
  #paymentside {
    /* margin: auto; */
    width: 22.4em;
    background-color: black;
    font-family: "Helvetica", cursive, sans-serif;
  }
  .startButton{
    bottom:100em;
    padding: 0em 0em;
    font-size:3em;
  }
  .thankYou{
    font-size:1em;
    height:4em;
  }
}
@media screen and (min-width: 700px) {
   #paymentside {
      width:40em;
      margin: auto;
      padding:0.8em;
      font-family: "Helvetica", cursive, sans-serif;
   }
   .startButton{
     bottom:50em;
     padding: 1em 1em;
     font-size:4em;
   }
   .thankYou{
     font-size:2em;
     height:3em;
   }
 }
#paymentSide {
  height: 100%;
  min-width: 100px;
  min-height: 100px;
  margin: auto;
}

.thankYou {
  font-family: "Comic Sans MS", cursive, sans-serif;
  background-color: white;
  color: black;

  margin-top: 2em;
  margin-left: 10%;
  margin-right: 10%;
  width:80%;
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
  cursor: pointer;
  border-radius: 1em;
}
</style>
