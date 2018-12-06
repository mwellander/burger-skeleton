<template>
  <div id="home">
    <div class="buttonHome">
      <div class="createBurgerButton">
        <a href=""><button>Skapa din egna burgare</button></a>
      </div>
      <button>Favoritburgarna</button>
      <button>Tillbehör/Dryck</button>
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
