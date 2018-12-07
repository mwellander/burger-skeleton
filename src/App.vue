<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Ordering from "./views/Ordering.vue"
import Home from "./views/Home.vue"
import Ordering2 from "./views/Ordering2.vue"
import Start from "./views/Start.vue"
import Ordering3 from "./views/Ordering3.vue"


export default {
  name: 'app',
  components: {
    Ordering,
    Home,
    Ordering2,
    Start,
    Ordering3
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
