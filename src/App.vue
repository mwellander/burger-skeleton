<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Ordering from "./views/Ordering.vue"

export default {
  name: 'app',
  components: {
    Ordering
  }
}
</script>

<style>
body {
  background-color: white;
   overflow: hidden; 
  /* height:100vh;
  background: radial-gradient(white, lightblue);
  background-size: 200% 200%;
  animation: Gradient 20s linear infinite; */
}

</style>
