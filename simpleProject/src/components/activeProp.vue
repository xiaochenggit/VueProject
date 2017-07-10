<template>
	<div class="activeProp">
		{{prentMessage.activeProp}}
		<button @click="addConent(1)">conent + 1</button>
		<p>{{conent}}</p>
	</div>	
</template>
<script>
export default {
	props:['prentMessage'],
	data() {
		return {
			conent: this.prentMessage.conent
		}
	},
	methods: {
		addConent: function(num) {
			this.conent = parseInt(this.conent) + num;
		}
	}
}
</script>