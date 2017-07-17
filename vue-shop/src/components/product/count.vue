<template>
	<div class="counter-component">
		<div class="counter-btn" @click='mins'> - </div>
		<div class="counter-show">
			<input type="text" v-model='number' @keyup='inputNumber'>
		</div>
		<div class="counter-btn" @click='add'> + </div>
		<div v-show='false'>
			{{a}}
		</div>
	</div>
</template>
<script>
	export default {
		/**
		 * [props 一些传递属性]
		 * @param {Number} min 购买最小值 默认 1
		 * @param {Number} max 购买最大值 默认 1
		 */
		props: {
			min: {
				type: Number,
				default() {
					return 1
				}
			},
			max: {
				type: Number,
				default() {
					return 1
				}
			}
		},
		data() {
			/**
			 * @param {Number} number 购买数量 默认为最小购买数量
			 */
			return {
				number: this.min
			}
		},
		computed: {
			a() {
				this.number = this.min;
				return this.$route.pramas;
			}
		},
		methods: {
			add() {
				if (this.number < this.max) {
					this.number ++;
				}
			},
			mins() {
				if (this.number > this.min) {
					this.number --;
				}
			},
			inputNumber() {
				let fix;
				if (typeof this.number === 'string') {
					fix = Number(this.number.replace(/\D/g,''));
				}
				if (fix < this.min) {
					fix = this.min;
				}
				if (fix > this.max) {
					fix = this.max;
				}
				this.number = fix;
			}
		},
		watch: {
			/**
			 * [number 监控 number 发生变化就向父组件传值]
			 */
			number() {
				this.$emit('on-change','buyNum',this.number)
			}
		}
	}
</script>
<style scoped>
.counter-component {
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
}
.counter-show {
  float: left;
}
.counter-show input {
  border: none;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  height: 23px;
  line-height: 23px;
  padding: 1px 15px;
  width: 30px;
  min-width: 30px;
  outline: none;
  text-indent: 4px;
  text-align: center;
}
.counter-btn {
  border: 1px solid #e3e3e3;
  float: left;
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  cursor: pointer;
}
.counter-btn:hover {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>