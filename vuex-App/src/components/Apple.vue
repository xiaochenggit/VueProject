<template>
	<div class="apple">
		<h1>Apple</h1>
		<p>单价 {{5}} 元</p>
		<button @click="addApple">Add</button>
		<button @click='deleteApple'>减少</button>
	</div>
</template>
<script>
export default {
	data() {
		return {
			price: 5
		}
	},
	methods: {
		addApple() {
			this.$store.commit('increment', this.price);
		},
		deleteApple() {
			this.$store.commit('reduce', this.price);
		}
	}
}
</script>