<template>
	<div class="direactive">
		<h1>自定义指令 direactive</h1>
		<p v-color="'red'">颜色绑定指令</p>
		<h2>光标聚集指令</h2>
		<input type="text" v-focus>
	</div>
</template>
<script>
export default{
	directives: {
		color: function(el, bind) {
			el.style.color = bind.value;
		},
		focus: {
			inserted: function(el){
				el.focus();
			}
		}
	}
}
</script>
<style>
	
</style>