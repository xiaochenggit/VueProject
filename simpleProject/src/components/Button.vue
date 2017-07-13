<template>
	<div class="button">
		<button @click="addcont">{{cont}}</button>
	</div>
</template>
<script>
export default {
	data() {
		return {
			cont: 0
		}
	},
	methods:{
		addcont: function(){
			this.cont += 1;
			// 派发自定义事件
			this.$emit('addcont')
		}
	}
}	
</script>