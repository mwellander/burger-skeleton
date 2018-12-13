<template>

	<div>
			{{order.type}} {{getIngredientArray()}}
			<div id="infolabelBurger"> {{uiLabels.orderKitchen}} {{order.orderInLine}}, {{order.noInOrder}}/{{order.burgerArrayLength}}</div>
			<ul id = "ingredientList" style="list-style-type:none">
			<li v-show="breadLabel">{{uiLabels.bread}}: {{ this.Bread.map(item=>item["ingredient_"+ uiLabels.lang]).join(", ") }}</li>
			<li v-show="burgerLabel">{{uiLabels.burger}}: {{ this.Burger.map(item=>item["ingredient_"+ uiLabels.lang]).join(", ") }}</li>
			<li v-show="dressingLabel">{{uiLabels.dressing}}: {{ this.Dressing.map(item=>item["ingredient_"+ uiLabels.lang]).join(", ") }}</li>
			<li v-show="toppingsLabel">{{uiLabels.toppings}}: {{ this.Toppings.map(item=>item["ingredient_"+ uiLabels.lang]).join(", ") }}</li>
			<li v-show="sidesLabel">{{uiLabels.sides}}: {{ this.Sides.map(item=>item["ingredient_"+ uiLabels.lang]).join(", ") }}</li>
			<li v-show="beverageLabel">{{uiLabels.beverage}}: {{ this.Beverage.map(item=>item["ingredient_"+ uiLabels.lang]).join(", ") }}</li>
			<li v-show="readyBurgersLabel">{{uiLabels.readyBurger}}: {{ this.ReadyBurger.map(item=>item["ingredient_"+ uiLabels.lang]).join(", ") }}</li>
		</ul>
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
		ReadyBurger:[],
		breadLabel: false,
		burgerLabel: false,
		dressingLabel: false,
		toppingsLabel: false,
		sidesLabel: false,
		beverageLabel: false,
		readyBurgersLabel: false


	}
	},

methods: {

	getIngredientArray: function(){
		//console.log("hej")
		this.Bread = this.getCategoryItems(4)
		this.Burger = this.getCategoryItems(1)
		this.Dressing = this.getCategoryItems(3)
		this.Toppings = this.getCategoryItems(2)
		this.Sides = this.getCategoryItems(5)
		this.Beverage = this.getCategoryItems(6)
		this.ReadyBurger = this.getCategoryItems(7)

		if(this.Bread.length !== 0)
		this.breadLabel = true;
		if(this.Burger.length !== 0)
		this.burgerLabel = true;
		if(this.Dressing.length !== 0)
		this.dressingLabel = true;
		if(this.Toppings.length !== 0)
		this.toppingsLabel = true;
		if(this.Sides.length !== 0)
		this.sidesLabel = true;
		if(this.Beverage.length !== 0)
		this.beverageLabel = true;
		if(this.ReadyBurger.length !== 0)
		this.readyBurgersLabel = true;

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
	#infolabelBurger {
		font-size: 1.2em;
	}
	#ingredientList {
		font-size: 0.7em;
	}
</style>





<!-- <div>
	{{orderId}} {{order.type}}{{uiLabels.bread}}: {{ order.ingredients.map(item=>item["ingredient_"+ lang]).join(", ") }}<br>
	<br>
	<slot name="knapp"></slot>
	<hr>
</div> -->
