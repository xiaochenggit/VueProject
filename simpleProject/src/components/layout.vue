<template>
	<div class="layout">
		<header>
			<slot name="header"></slot>
		</header>
		<main>
			<slot></slot>
		</main>
		<footer>
			<slot name="footer"></slot>
		</footer>
	</div>
</template>
<script>
	export default{
		name:'layout',
		data() {
			return {

			}
		}
	}
</script>