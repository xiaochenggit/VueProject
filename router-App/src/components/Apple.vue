<template>
	<div class="apple">
		<h1>Apple</h1>
		<p>{{$route.params}}</p>
		<p>count: {{count}}</p>
		<button @click='count ++ '>Count ++ </button>
		<button @click="getParam">getParam</button>
	</div>
</template>
<script>
export default{
	name: 'Apple',
	data() {
		return {
			count: 0
		}
	},
	methods: {
		getParam() {
			console.log(this.$route.params);
		}
	}
}
</script>