<template>
	<div class="slot">
		<h2>具名Slot</h2>
		<v-layout>
			<h1 slot="header">这里可能是一个页面标题</h1>
  			<p>主要内容的一个段落。</p>
  			<p>另一个主要段落。</p>
  			<p slot="footer">这里有一些联系信息</p>
		</v-layout>
		<h2>变化检测问题</h2>
		<div>
			cont: {{cont}}
		</div>
	</div>
</template>
<script>
import Layout from '@/components/layout';
export default {
	name: 'slot',
	data() {
		return {
			cont: 0
		}
	},
	components: {
		'v-layout': Layout
	},
	mounted() {
		setInterval(() => {
			this.$set(this,'cont',this.cont + 1);
		}, 1000)
	}
}
</script>
<style scoped>
	
</style>