<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Ordering from "./views/Ordering.vue"
import Home from "./views/Home.vue"
<<<<<<< HEAD
import Kitchen from "./views/Kitchen.vue"
=======
// import Ordering2 from "./views/Ordering2.vue"
>>>>>>> 6d206f53b3172afa3a47089f94455306b0901b49

export default {
  name: 'app',
  components: {
    Ordering,
    Home
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
