<template>
	<div class="chooser-component">
		<ul class="chooser-list">
			<li v-for="(item,index) in selections" 
			:title="item.label" 
			:class="{active : index === nowIndex}" 
			@click="changeIndex(index)" :name='index'>
			{{item.label}}</li>
		</ul>
	</div>
</template>
<script>
	export default {
		props: {
			selections: {
				type: Array,
				default() {
					return [{
						"label": "text",
						"value": 0
					}]
				}
			},
			typeName: {
				type: String,
				default() {
					return ""
				}
			}
		},
		data() {
			/**
			 * @param {Number} [nowIndex] [当前选择项 默认 0]
			 */
			return {
				nowIndex: 0
			}
		},
		watch: {
			'$route.params'() {
				this.nowIndex = 0;
			}
		},
		methods: {
			changeIndex(index) {
				this.nowIndex = index;
				this.$emit("on-change", this.typeName, this.nowIndex);
			}
		}
	}
</script>
<style scoped>
.chooser-component {
  position: relative;
  display: inline-block;
}
.chooser-list li{
  display: inline-block;
  border: 1px solid #e3e3e3;
  height: 25px;
  line-height: 25px;
  padding: 0 8px;
  margin-right: 5px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}
.chooser-list li.active {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>