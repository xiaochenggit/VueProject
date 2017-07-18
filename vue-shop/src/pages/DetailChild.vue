<template>
	<div class="sales-board" v-if='products[$route.params.product]'>
		<div class="sales-board-intro">
			<h2>{{products[$route.params.product].name}}</h2>
			<p>{{des.des}}</p>
		</div>
		<div class="sales-board-form">
		  <div class="sales-board-line" v-if='des.buyNum'>
              <div class="sales-board-line-left">
                  购买数量：
              </div>
              <div class="sales-board-line-right">
                  <v-count :max="des.buyNum.max" :min="des.buyNum.min" @on-change="change"></v-count>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  产品类型：
              </div>
              <div class="sales-board-line-right">
                  <odd-choose :selections="des.buyTypes" :typeName="'buyType'" @on-change='change'></odd-choose>
              </div>
          </div>
          <div class="sales-board-line" v-if='des.districts'>
              <div class="sales-board-line-left">
                  适用地区：
              </div>
              <div class="sales-board-line-right">
                  <odd-select :selections="des.districts" :typeName="'district'" @on-change='change'></odd-select>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  有效时间：
              </div>
              <div class="sales-board-line-right">
                  <odd-select :selections="des.periodList" :typeName="'period'" @on-change='change'></odd-select>
              </div>
          </div>
          <div class="sales-board-line" v-if="des.versionList">
              <div class="sales-board-line-left">
                  产品版本：
              </div>
              <div class="sales-board-line-right">
                  <manyChoose :selections="des.versionList" :typeName="'version'" @on-change='change'></manyChoose>
              </div>
          </div>
          <div class="sales-board-line" v-if="des.medium">
              <div class="sales-board-line-left">
                  媒介：
              </div>
              <div class="sales-board-line-right">
                  <manyChoose :selections="des.medium" :typeName="'medium'" @on-change='change'></manyChoose>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  总价：
              </div>
              <div class="sales-board-line-right">
                  {{price}}元
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">&nbsp;</div>
              <div class="sales-board-line-right">
                  <div class="button" @click="isPay = true">
                    立即购买
                  </div>
              </div>
          </div>
      </div>
      <div class="sales-board-des">
        <h2>产品说明</h2>
        <p>{{des.des2}}</p>
        <table class="sales-board-table" v-if='des.table'>
          <tbody>
              <tr class="ui-table-row" v-for="item in des.table.length">
                  <td v-for='cont in des.table[item-1]'>
                      <div class="intro-pic">
                          <label>{{cont}}</label>
                      </div>
                  </td>
              </tr>
          </tbody>
      	</table>
      	<div v-if='des.expand' v-for="item in des.expand">
      		<h3>{{item.title}}</h3>
      		<ul>
      			<li v-for="less in item.arr">{{less}}</li>
      		</ul>
      	</div>
      </div>
      <v-dialog :isShow='isPay' @dialogClose='dialogClose' :name="'isPay'">
      	<table class="buy-dialog-table">
          <tr>
            <th v-if='des.buyNum'>购买数量</th>
            <th>产品类型</th>
            <th v-if='des.districts'>适用地区</th>
            <th>有效时间</th>
            <th v-if="des.versionList">产品版本</th>
            <th v-if="des.medium">媒介</th>
            <th>总价</th>
          </tr>
          <tr>
            <td v-if='des.buyNum'>{{ buyNum }}</td>
            <td>{{ des.buyTypes[buyType].label }}</td>
            <td v-if='des.districts'>{{ des.districts[district].label }}</td>
            <td>{{ des.periodList[period].label }}</td>
            <td v-if="des.versionList">
              <span v-for="item in version">{{ des.versionList[item].label }}</span>
            </td>
            <td v-if="des.medium">
              <span v-for="item in medium">{{ des.medium[item].label }}</span>
            </td>
            <td>{{ price }}</td>
          </tr>
        </table>
        <h3 class="buy-dialog-title">请选择银行</h3>
        <bank-choose @on-change='changeBank'></bank-choose>
        <div class="button buy-dialog-btn" @click="createOrder">
          确认购买
        </div>
      </v-dialog>
      <play-chek :isPlayChek='isPlayChek' @dialogClose="dialogClose" :orderId="orderId"></play-chek>
	</div>
</template>
<script>
import oddChoose from '@/components/product/oddChoose';
import manyChoose from '@/components/product/manyChoose';
import oddSelect from '@/components/product/oddSelect';
import count from '@/components/product/count';
import dialog from '@/components/dialog/dialog';
import bankChoose from '@/components/product/bankChoose';
import playChek from '@/components/product/playChek';
export default {
	components: {
		oddChoose,
		manyChoose,
		oddSelect,
		'v-count': count,
		'v-dialog': dialog,
		bankChoose,
		playChek
	},
	data() {
		/**
		 * @param {Array} products [所有产品信息数组,请求获得]
		 * @param {Number} buyNum [购买数量 默认为 0 请求之后更新为最小购买量]
		 * @param {Number} buyType [产品类型 默认为 0 路由改变之后变成 0]
		 * @param {Number} district [使用地区]
		 * @param {Number} [period] [有效时间]
		 * @param {Array} [version] [版本选择 默认 [0]]
		 * @param {Array} [medium] [媒介选择 默认 [0]]
		 * @param {Number} [price] 选中商品金额
		 * @param {Blooean} [isPlay] [购买详情页面是否开启]
		 * @param {Number} [bank] [银行id] 默认为招商银行的id
		 * @param {Blooean} [isPlayChek] [支付验证窗口是否开启]
		 * @param {Number. string } orderId 订单编号
 		 */
		return {
			products:[],
			buyNum: 0,
			buyType: 0,
			district: 0,
			period: 0,
			version: [0],
			medium: [0],
			price: 0,
			isPay: false,
			bank: 201,
			isPlayChek: false,
			orderId: '',
		}
	},
	created() {
		/**
		 * 请求全部产品信息
		 */
		this.$http.get('/api/products')
		.then((data) => {
			this.products = data.body;
		},(error) => {
			console.log(error);
		});
	},
	watch: {
		/**
		 * 监测路由的变化
		 */
		'$route.params'() {
			this.reMsg();
		}
	},
	methods: {
		reMsg(){
			// 路由变化购买数量重置为该商品的最小购买数量
			const product = this.products[this.$route.params.product];
			if (product) {
				this.buyNum = product.des.buyNum ? product.des.buyNum.min : 0;
			}
			// 每次路由切换获得金额
			this.change();
		},
		changeBank(key,value) {
			this[key] = value;
		},
		change(key,value){
			if (key) {
				this[key] = value;
			}
			/**
			 * [ 根据选项获得金额]
			 */
			let parms = this.parms; 
			this.$http.post("/api/price", parms)
			.then(function(data){
				this.price = data.body[this.$route.params.product] * (this.buyNum || 1);
			},function(error){
				console.log(error)
			})
		},
		// 关闭支付弹窗
		dialogClose(type) {
			this[type] = false;
		},
		createOrder() {
			var parms = this.parms; 
			parms.bank = this.bank;
			this.$http.post("/api/createOrder", parms)
			.then((data) => {
				this['orderId'] = data.body.orderId;
				this.isPay = false;
				this.isPlayChek = true;
			},(error) => {
				console.log(error);
			});
		}
	},
	computed: {
		// 找到产品中的描述
		des() {
			const product = this.products[this.$route.params.product];
				return product ? product.des :{};
		},
		parms() {
			return {
				buyNum: this.buyNum,
				buyType: this.buyType,
				district: this.district,
				period: this.period,
				version: this.version,
				medium: this.medium
			}
		}
	},
	mounted() {
		this.change();
	}
}
</script>
<style scoped>
.buy-dialog-title {
  font-size: 16px;
  font-weight: bold;
}
.buy-dialog-btn {
  margin-top: 20px;
}
.buy-dialog-table {
  width: 100%;
  margin-bottom: 20px;
}
.buy-dialog-table td,
.buy-dialog-table th{
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 5px 0;
}
.buy-dialog-table td span{
	margin-right: 5px;
}
.buy-dialog-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
}
</style>