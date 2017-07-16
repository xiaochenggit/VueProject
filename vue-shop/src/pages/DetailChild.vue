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
		// 获得产品
		this.$http.get('/api/products')
		.then((data) => {
			this.products = data.body;
		},(error) => {
			console.log(error);
		});
	},
	computed: {
		// 找到产品中的描述
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