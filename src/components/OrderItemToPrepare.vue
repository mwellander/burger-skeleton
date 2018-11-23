<template>
  <!-- Note in this component that it is using another component -->
<div>
  <OrderItemStarted
    :ui-labels="uiLabels"
    :lang="lang"
    :order-id="orderId"
    :order="order">
  </OrderItemStarted>
  <button v-on:click="orderStarted">
    {{uiLabels.started}}
  </button>
</div>
</template>
<script>
import OrderItemStarted from '@/components/OrderItemStarted.vue'

export default {
  name: 'OrderItemToPrepare',
  components: { OrderItemStarted },
  props: {
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String
  },
  methods: {
    orderStarted: function () {
      // sending 'done' message to parent component or view so that it
      // can catch it with v-on:done in the component declaration
      console.log("klickat på orderstarted")
      this.$emit('started');
    },
    cancelOrder: function () {
      // not implemented
    }
  }
}
</script>
<style scoped>

</style>
