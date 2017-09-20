<template>
  <div class="main">
     <nav-header></nav-header>
     <nav-bread>
       <a href="javascript:void(0)">OrderSuccess</a>
     </nav-bread>
     <div class="orderSuccess">
       <div class="public">
         <h1>订单详情页面</h1>
         <div class="icon">
           <span class="iconfont icon-smile" v-if="isOrderGet"></span>
           <span class="iconfont icon-cry"  v-else></span>
         </div>
         <div class="des">
           <h2>{{ isOrderGet ? '订单信息如下......' : '获取订单信息失败'}}</h2>
           <p v-if="isOrderGet">
             <span>Order ID:{{orderId}}</span>
             <span>PRICE:{{price | currency('¥')}}</span>
           </p>
         </div>
         <div class="btn-group" v-if="isOrderGet">
           <button class="btn cartBtn">CART LIST</button>
           <button class="btn cartBtn">GOODS LIST</button>
         </div>
       </div>
       <vue-model :message='modelMessage' :isShow='isModel' @close='isModel = false'>
      </vue-model>
     </div>
     <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavHeader from '@/components/Header'
import NavFooter from '@/components/Footer'
import NavBread from '@/components/Bread'
import VueModel from '@/components/Model'
import axios from 'axios'
export default {
  name: 'OrderSuccess',
  data () {
    /**
     * 订单详情
     * {Boolean} isOrderGet 订单是否获得
     * {Number} price 订单价格
     * {Number} orderId 订单id
     * {String} modelMessage 弹出框信息
     * {isModel} isModel 弹出框是否显示
     */
    return {
      isOrderGet: true,
      price: 0,
      orderId: 0,
      modelMessage: '',
      isModel: false
    }
  },
  mounted () {
    this.getOrder()
  },
  methods: {
    // 获得订单信息
    getOrder () {
      axios.get('/users/order', {
        params: {
          orderId: this.$route.params.orderId
        }
      }).then(res => {
        let resData = res.data
        if (resData.status === 200) {
          this.price = resData.result.price
          this.orderId = resData.result.orderId
        } else {
          this.isOrderGet = false
          this.modelMessage = resData.msg
          this.isModel = true
        }
      })
    }
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    VueModel
  }
}
</script>
<style scoped>
  .orderSuccess{
    text-align: center;
  }
  .icon .iconfont {
    font-size: 10rem;
  }
  .des span {
    font-size: 1.6rem;
    line-height: 3rem;
    margin: 0px 2rem;
    display: inline-block;
    width: 400px;
    text-align: left;
  }
  .cartBtn{
    width: 90%;
    max-width: 15rem;
    border: red 2px solid;
    color: red;
    display: inline-block;
    text-align: center;
    line-height: 2rem;
    font-size: 1.2rem;
    margin: 1rem 2rem;
  }
   .cartBtn:hover {
    color: #f60;
    border-color: #f60;
  }
</style>
