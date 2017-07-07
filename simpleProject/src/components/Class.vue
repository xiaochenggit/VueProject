<template>
	<div class="class">
		<h2>对象语法</h2>
		<div class="static" :class="{ active: isActive,'text-danger': hasError}">
			对象语法
		</div>
		<h2>数组语法</h2>
		<div class="static" :class="[activeClass, errorClass]">
			数组语法
		</div>
		<h2>条件切换列表中的 class ，可以用三元表达式：</h2>
		<div class="static" :class="[isActive ? 'active' : '', errorClass]">
			条件切换列表中的 class ，可以用三元表达式：
		</div>
		<h2>不过，当有多个条件 class 时这样写有些繁琐。可以在数组语法中使用对象语法：</h2>
		<div class="static" :class="[{active: isActive}, errorClass]">
			不过，当有多个条件 class 时这样写有些繁琐。可以在数组语法中使用对象语法：
		</div>
		<h2>绑定内链样式</h2>
		<div :style="{color: activeColor, fontSize: fontSize + 'px'}">
			绑定内链样式
		</div>
		<h2>条件渲染 v-if v-else</h2>
		<div v-if="isOk">
			ok
		</div>
		<div v-else>
			noOk
		</div>
	</div>
</template>
<script>
export default {
	name:'Class',
	data () {
		return {
			isActive: true,
			hasError: true,
			activeClass: 'active',
			errorClass: 'error',
			activeColor: 'red',
			fontSize: 30,
			isOk: Math.random() > 0.5
		}
	},
	mounted() {
		setTimeout(() => {
			this.isActive = this.hasError = false;
		}, 3000)
	}
}
</script>
<style scoped>
	
</style>