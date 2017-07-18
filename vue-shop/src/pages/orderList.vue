<template>
	  <div class="order-wrap">
	    <h3>您的产品</h3>
	    <div class="order-list-choose">
	      <div class="order-list-option">
	        选择产品：<odd-select v-if='productTypes.length > 0' :selections='productTypes' :typeName="'productType'" @on-change="change"></odd-select>
	      </div>
	      <div class="order-list-option">
	        开始日期: <date-picker language="zh" :format="'dd-MM-yy'"  :disabled="startState.disabled" v-on:selected="startDateCheck" ></date-picker>
	      </div>

	      <div class="order-list-option">
	        结束日期: <date-picker language="zh"  :format="'dd-MM-yy'"  :disabled="endState.disabled" :value="endState.disabled.to" v-on:selected="endDateCheck"></date-picker>
	      </div>

	      <div class="order-list-option">
	        关键词：
	        <input type="text" class="order-query" v-model.lazy='query'>
	      </div>
	    </div>
	    <!-- <div class="order-list-table">
	      <table>
	        <tr>
	          <th v-for="head in tableHeads" @click="changeOrderType(head)" :class="{active:head.active}">{{ head.label }}</th>
	        </tr>
	        <tr v-for="item in tableData" :key="item.period">
	          <td v-for="head in tableHeads">{{ item[head.key] }}</td>
	        </tr>
	      </table>
	    </div> -->
	  </div>
</template>
<script>
import oddSelect from '@/components/product/oddSelect';
import Datepicker from 'vuejs-datepicker';
export default {
	data() {
		/**
		 * @param {Array} productTypes [所有订单产品类型] 默认为空(页面加载完成请求获得)
		 * @param {Number} productType [要筛选订单产品类型数组下标] 默认为0
		 * @param {Date} [startDate] [开始时间 默认 '']
		 * @param {Date} [endDate] [结束时间 endDate]
		 * @param {Object} startState [开始时间日历 参数]
		 * @param {Object} endState [结束时间日历 参数]
		 */
		return {
			productTypes:[],
			productType: 0,
			startDate:'',
			endDate: '',
			startState : {
			    disabled: {
			        to: new Date(), // Disable all dates up to specific date// Disable all dates after specific date
			        days: [], // Disable Saturday's and Sunday's
			    }
			},
			endState : {
			    disabled: {
			        to: "", // Disable all dates up to specific date// Disable all dates after specific date
			        days: [], // Disable Saturday's and Sunday's
			    }
			},
			query: ''
		}
	},
	methods: {
		/**
		 * [change 改变 this的string属性 子组件改变触发]
		 * @param  {[string]} type  [key]
		 * @param  {[string,number]} value [value]
		 */
		change(type, value) {
			this[type] = value;
		},
		/**
		 * [startDateCheck 开始时间日历选择]
		 */
		startDateCheck(date) {
			this.startDate = date;
			this.endState.disabled.to = date;
			this.endDate = date;
			console.log(this.startDate, this.endDate);
		},
		/**
		 * [endDateCheck 结束时间日历选择]
		 */
		endDateCheck(date) {
			this.endDate = date;
			console.log(this.startDate, this.endDate);
		}
	},
	watch: {
		query() {
			console.log(this.query);
		}
	},
	mounted() {
		// 获得产品类型
		this.$http.get("/api/productTypes")
		.then((data) => {
			this.productTypes = data.body;
		},(error) => {
			console.log(error)
		})
	},
	components: {
		oddSelect,
		DatePicker: Datepicker
	}
}
</script>
<style scoped>
.order-wrap {
  width: 1200px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-query {
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
.order-list-option {
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child {
  padding-left: 0;
}
.order-list-table {
  margin-top: 20px;
}
.order-list-table table {
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  cursor: pointer;
}
.order-list-table th.active {
  background: #35495e;
}	
</style>