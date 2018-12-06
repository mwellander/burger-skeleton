<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Ordering from "./views/Ordering.vue"
import Home from "./views/Home.vue"
<<<<<<< HEAD
import Ordering2 from "./views/Ordering2.vue"
import Start from "./views/Start.vue"
=======

>>>>>>> c6b626703cc4a847ded4695372aade84d3020c2b

export default {
  name: 'app',
  components: {
    Ordering,
    Home,
    Ordering2,
    Start
  }
}
</script>

<style>
body {
  background-color: black;
   overflow: hidden;
  /* height:100vh;
  background: radial-gradient(white, lightblue);
  background-size: 200% 200%;
  animation: Gradient 20s linear infinite; */
}

</style>
