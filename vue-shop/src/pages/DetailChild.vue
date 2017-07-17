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
                  500 元
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">&nbsp;</div>
              <div class="sales-board-line-right">
                  <div class="button">
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
	</div>
</template>
<script>
import oddChoose from '@/components/product/oddChoose';
import manyChoose from '@/components/product/manyChoose';
import oddSelect from '@/components/product/oddSelect';
import count from '@/components/product/count';
export default {
	components: {
		oddChoose,
		manyChoose,
		oddSelect,
		'v-count': count
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
		 */
		return {
			products:[],
			buyNum: 0,
			buyType: 0,
			district: 0,
			period: 0,
			version: [0],
			medium: [0]
		}
	},
	created() {
		// 获得产品
		this.$http.get('/api/products')
		.then((data) => {
			this.products = data.body;
			this.reMsg();
		},(error) => {
			console.log(error);
		});
	},
	watch: {
		'$route.params'() {
			this.reMsg();
		}
	},
	methods: {
		reMsg(){
			const product = this.products[this.$route.params.product];
			if (product) {
				this.buyNum = product.des.buyNum ? product.des.buyNum.min : 0;
			}
		},
		change(key,value){
			this[key] = value;
			var parms = {
				buyNum: this.buyNum,
				buyType: this.buyType,
				district: this.district,
				period: this.period,
				version: this.version,
				medium: this.medium
			}
			this.$http.post("/product/" + this.$route.params.product,parms)
			.then(function(data){
				console.log(data);
			},function(error){
				console.log(error)
			})
		}
	},
	computed: {
		// 找到产品中的描述
		des() {
			const product = this.products[this.$route.params.product];
				return product ? product.des :{};
		}
	}
}
</script>
<style>
	
</style>