<template>
	<div>
		<v-dialog :isShow='isPlayChek' @dialogClose='checkStatus' 
		:name="'isPlayChek'">
		  请检查你的支付状态！{{orderId}}
	      <div class="button" @click="checkStatus">
	        支付成功
	      </div>
	      <div class="button" @click="checkStatus">
	        支付失败
	      </div>
        </v-dialog>
        <v-dialog :isShow='isChekTrue' @dialogClose='dialogClose' :name="'isChekTrue'">
        	支付成功
        </v-dialog>
        <v-dialog :isShow='isChekFalse' @dialogClose='dialogClose' :name="'isChekFalse'">
        	支付失败
        </v-dialog>
	</div>
</template>
<script>
import dialog from '@/components/dialog/dialog';
export default {
	props: {
		/**
		 * [isPlayChek 是否显示支付状态]
		 */
		isPlayChek: {
			type: Boolean,
			default() {
				return false;
			}
		},
		/**
		 * [orderId 订单]
		 * @type {Object}
		 */
		orderId: {
			type: [String, Number],
			default() {
				return ''
			}
		}
	},
	data() {
		/**
		 * 支付成功或失败的控制器
		 */
		return {
			isChekTrue: false,
			isChekFalse: false
		}
	},
	methods: {
		dialogClose(type) {
			this[type] = false;
		},
		checkStatus() {
			/**
			 * [获取订单支付信息]
			 */
			this.$http.post('/api/checkStatus',{
				'orderId': this.orderId
			}).then((data) => {
				this.isChekTrue = true;
				this.$emit('dialogClose', 'isPlayChek');
			},(error) => {
				this.isChekFalse = true;
				this.$emit('dialogClose', 'isPlayChek');
			});
		}
	},
	components: {
		'v-dialog': dialog
	}
}
</script>
<style>
	
</style>