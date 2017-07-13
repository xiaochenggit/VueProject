<template>
	<div class="tem">
		<h1>模板</h1>
		<h2>动态prop</h2>
		<v-activeProp :prentMessage="activeProp"></v-activeProp>
		<p>父模板的conent {{activeProp.conent}}</p>
		<h2>使用 v-on 绑定自定义事件 this.$emit 派发事件</h2>
		<div>
			<p>total: {{total}}</p>
			<!-- 监听自定义事件 -->
			<v-button v-on:addcont="addTotal"></v-button>
			<v-button v-on:addcont="addTotal"></v-button>
		</div>
		<h2>非常简单的货币输入的自定义控件：</h2>
		<div>
			<p>price:{{price1}}</p>
			<v-price v-on:changeprice="changePrice" :pricetwo="price1"></v-price>
		</div>
	</div>
</template>
<script>
import ActiveProp from '@/components/activeProp';
import Button from '@/components/Button';
import Price from '@/components/price'	
export default {
	name: 'tem',
	data() {
		return {
			total: 0,
			activeProp: {
				activeProp: 'activeProp',
				conent: 0
			},
			price1: 0
		}
	},
	components: {
		'v-activeProp': ActiveProp,
		'v-button': Button,
		'v-price': Price
	},
	methods: {
		addTotal: function(){
			this.total += 1;
		},
		changePrice: function(msg){
			this.price1 = msg;
		}
	},
	mounted() {
		setTimeout(()=> {
			this.activeProp.activeProp = '我想要的动态Prop'
		},3000)
	}
}
</script>
<style scoped>
	
</style>