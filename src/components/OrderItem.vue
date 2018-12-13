<template>

	<div>
		{{orderId}} <br> {{order.type}} {{getIngredientArray()}}
			{{uiLabels.bread}}:{{ this.Bread.map(item=>item["ingredient_"+ lang]).join(", ") }}<br>
			{{uiLabels.burger}}:{{ this.Burger.map(item=>item["ingredient_"+ lang]).join(", ") }}<br>
			{{uiLabels.dressing}}:{{ this.Dressing.map(item=>item["ingredient_"+ lang]).join(", ") }}<br>
			{{uiLabels.toppings}}:{{ this.Toppings.map(item=>item["ingredient_"+ lang]).join(", ") }}<br>
			{{uiLabels.sides}}:{{ this.Sides.map(item=>item["ingredient_"+ lang]).join(", ") }}<br>
			{{uiLabels.beverage}}:{{ this.Beverage.map(item=>item["ingredient_"+ lang]).join(", ") }}<br>
			{{order.orderInLine}}
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
	data: function(){
		return{
		Bread: [],
		Burger:[],
		Dressing:[],
		Toppings:[],
		Sides:[],
		Beverage:[],
		breadLabel: false,
		burgerLabel: false,
		dressingLabel: false,
		toppingsLabel: false,
		sidesLabel: false,
		beverageLabel: false

	}
	},

methods: {

	getIngredientArray: function(){
		console.log("hej")
		this.Bread = this.getCategoryItems(4)
		this.Burger = this.getCategoryItems(1)
		this.Dressing = this.getCategoryItems(3)
		this.Toppings = this.getCategoryItems(2)
		this.Sides = this.getCategoryItems(5)
		this.Beverage = this.getCategoryItems(6)
	},

	getCategoryItems: function (category) {
		let orderArray = [];
		for(let i = 0; i<this.order.ingredients.length; i++){
			if(this.order.ingredients[i].category === category)
			orderArray.push(this.order.ingredients[i])
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
