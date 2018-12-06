<template>

		<!-- <div>
			{{orderId}} {{order.type}}
			{{uiLabels.bread}}: {{ getCategoryItems(2)}} {{order.ingredients.map(item=>item["ingredient_"+ lang]).join(", ") }}<br>
			{{uiLabels.burger}}: {{ getCategoryItems(1)}} {{order.ingredients.map(item=>item["ingredient_"+ lang]).join(", ") }} <br>
			{{uiLabels.dressing}}: {{getCategoryItems(3)}} {{order.ingredients.map(item=>item["ingredient_"+ lang]).join(", ") }} <br>
			{{uiLabels.toppings}}: {{getCategoryItems(4)}} {{order.ingredients.map(item=>item["ingredient_"+ lang]).join(", ") }} <br>
			{{uiLabels.sides}}: {{getCategoryItems(5)}} {{order.ingredients.map(item=>item["ingredient_"+ lang]).join(", ") }} <br>
			{{uiLabels.beverage}}:{{getCategoryItems(6)}} {{order.ingredients.map(item=>item["ingredient_"+ lang]).join(", ") }}
			<br>
			<slot name="knapp"></slot>
			<hr>
		</div> -->

	<div>
			{{orderId}} {{order.type}}
			{{uiLabels.bread}}: {{ getCategoryItems(2)}}<br>
			{{uiLabels.burger}}: {{ getCategoryItems(1)}}<br>
			{{uiLabels.dressing}}: {{getCategoryItems(3)}}<br>
			{{uiLabels.toppings}}: {{getCategoryItems(4)}}<br>
			{{uiLabels.sides}}: {{getCategoryItems(5)}}<br>
			{{uiLabels.beverage}}: {{getCategoryItems(6)}}
			<br>
			<slot name="knapp"></slot>
			<hr>
		</div>


</template>
<script>
export default {
  name: 'OrderItem',
  props: {
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String
  },

methods: {
	getCategoryItems: function (category) {
		let orderArray = [];
		for(let i = 0; i<this.order.ingredients.length; i=1){
			if(this.order.ingredients[i].category === category)
			orderArray.push(this.order.ingredients[i].ingredient_sv)
		}
			return orderArray;

}}}



</script>
<style scoped>

</style>





<!-- <div>
	{{orderId}} {{order.type}}{{uiLabels.bread}}: {{ order.ingredients.map(item=>item["ingredient_"+ lang]).join(", ") }}<br>
	<br>
	<slot name="knapp"></slot>
	<hr>
</div> -->
