<template>
	<div class="banner">
		<h1>Banner</h1>
		<p>单价 {{2}} 元</p>
		<button @click="addApple">Add</button>
		<button @click='deleteApple'>减少</button>
	</div>
</template>
<script>
export default {
	data() {
		return {
			price: 2
		}
	},
	methods: {
		addApple() {
			// actions
			this.$store.dispatch('increment', this.price);
		},
		deleteApple() {
			this.$store.commit('reduce', this.price);
		}
	}
}
</script>