<template>
	<div class="tem">
		<h1>模板</h1>
		<h2>动态prop</h2>
		<v-activeProp :prentMessage="activeProp"></v-activeProp>
		<p>父模板的conent {{activeProp.conent}}</p>
		<h2>使用 v-on 绑定自定义事件 this.$emit 派发事件</h2>
		<div>
			<p>total: {{total}}</p>
			<v-button v-on:addcont="addTotal"></v-button>
			<v-button v-on:addcont="addTotal"></v-button>
		</div>
	</div>
</template>
<script>
import ActiveProp from '@/components/activeProp';
import Button from '@/components/Button';	
export default {
	name: 'tem',
	data() {
		return {
			total: 0,
			activeProp: {
				activeProp: 'activeProp',
				conent: 0
			}
		}
	},
	components: {
		'v-activeProp': ActiveProp,
		'v-button': Button
	},
	methods: {
		addTotal: function(){
			this.total += 1;
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