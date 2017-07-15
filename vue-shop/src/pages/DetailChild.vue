<template>
	<div>
		{{rt}}
	</div>
</template>
<script>
export default {
	data() {
		return {
			products:{}
		}
	},
	created() {
		this.$http.get('/api/products')
		.then((data) => {
			this.products = data.body;
		},(error) => {
			console.log(error);
		});
	},
	computed: {
		rt() {
			return this.products[this.$route.params.product] ? this.products[this.$route.params.product].des :'';
		}
	},	
	mounted() {
		
	}
}
</script>
<style>
	
</style>