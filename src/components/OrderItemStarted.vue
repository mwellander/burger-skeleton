<template>
  <!-- Note in this component that it is using another component -->
  <div>
    <OrderItem
      :ui-labels="uiLabels"
      :lang="lang"
      :order-id="orderId"
      :order="order">
      <button class="OrderDoneButton" slot="knapp" v-on:click="orderDone">
        {{uiLabels.ready}}
      </button>
    </OrderItem>
  </div>
</template>

<script>
import OrderItem from '@/components/OrderItem.vue'
export default {
  name: 'OrderItemStarted',
  components: { OrderItem },
  props: {
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String
  },
  methods: {
    orderDone: function () {
      // sending 'done' message to parent component or view so that it
      // can catch it with v-on:done in the component declaration
      this.$emit('done');
    }
  }
}
</script>

<style scoped>
  .OrderDoneButton{
    background-color: #339966;
    border: 0.1em solid black;
    color: black;
    padding: 1em 2em;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 0,005em;
    cursor: pointer;
    border-radius: 1em;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  }
</style>
