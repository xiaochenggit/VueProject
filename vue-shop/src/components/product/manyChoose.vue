<template>
	<div class="chooser-component">
		<ul class="chooser-list">
			<li v-for='(item, index) in selections' 
			:class="{active: indexArr.indexOf(index)!== -1}" 
			@click="toggleChoose(index)" >
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
						"label":'text',
						"value": 0
					}]
				}
			}
		},
		data() {
			/**
			 * @param {Array} indexArr 选择数组 默认 [0]
			 */
			return {
				indexArr: [0]
			}
		},
		watch: {
			'$route.params'() {
				this.indexArr = [0]
			}
		},
		methods: {
			/**
			 * [toggleChoose 选择切换 判断选项是否被选中,如果选中切换不选中并且在数组中删除该下标,如果选项没有被选中,就添加该下标]
			 * @param  {Number} index [点击选项下标]
			 * @$emit 把选项数组传递出去
			 */
			toggleChoose(index) {
				const num =  this.indexArr.indexOf(index);
				if (num === -1) {
					this.indexArr.push(index);
				} else {
					this.indexArr.splice(num,1);
				}
				this.$emit("on-change", this.indexArr)
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