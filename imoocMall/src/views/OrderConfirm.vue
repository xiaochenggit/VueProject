<template>
  <div class="main">
    <nav-header></nav-header>
    <nav-bread></nav-bread>
    <div class="orderconfirm">
      <div class="public">
        <h2>订单详情</h2>
        <div class="cart-body">
          <div class="cart-dl">
            <dl>
              <dd class="check">
              </dd>
              <dd class="product">商品</dd>
              <dd class="des"></dd>
              <dd class="price text-right">单价</dd>
              <dd class="num text-center">数量</dd>
              <dd class="subtotal text-right">小计</dd>
              <dd class="operation">操作</dd>
            </dl>
          </div>
          <div class="cart-main">
            <dl v-for="(item, key) in cartList" :key="key" v-if='item.checked'>
              <dd class="check">
                <img :src="'../../static/'+item.productImg" :alt="item.productName">
              </dd>
              <dd class="product">{{item.productName}}</dd>
              <dd class="des">颜色: 不要太鲜艳, 我是喜欢的红色的!颜色: 不要太鲜艳, 我是喜欢的红色的!颜色: 不要太鲜艳, 我是喜欢的红色的!颜色: 不要太鲜艳, 我是喜欢的红色的!颜色: 不要太鲜艳, 我是喜欢的红色的!颜色: 不要太鲜艳, 我是喜欢的红色的! </dd>
              <dd class="price text-right">{{item.productPrice | currency('¥')}}</dd>
              <dd class="num text-center">
                {{item.productNum}}
              </dd>
              <dd class="subtotal text-right">{{item.productPrice * item.productNum | currency('¥')}}</dd>
              <dd class="operation">
              </dd>
            </dl>
          </div>
          <div class="cart-price">
            <p>商品总金额:<span>{{allPrice | currency('¥')}}</span></p>
            <p>返现:<span>{{ rePrice | currency('¥') }}</span></p>
            <p>运费:<span>{{ freight | currency('¥') }}</span></p> 
            <p>应付总额:<span>{{ price | currency('¥') }}</span></p>
          </div>
          <div class="next btn" @click="next">
            next
          </div>
          <div class="next btn left" @click='prv'>
            prv
          </div>
        </div>
      </div>
      <vue-model :message='usermodelMessage' :isShow='userisModel' @close='userisModel = false'>
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
  name: 'OrderConfirm',
  data () {
    /**
     * {Array} cartList 购物车商品数组（选中的）
     * {Number} allPrice 商品总价（选中的）
     * {Number} rePrice 优惠返现
     * {Number} freight 运费
     */
    return {
      cartList: [],
      allPrice: 0,
      rePrice: 5,
      freight: 100,
      usermodelMessage: '',
      userisModel: false
    }
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    VueModel
  },
  computed: {
    // 最终的价格
    price () {
      return this.allPrice - this.rePrice + this.freight
    }
  },
  mounted () {
    this.getCartList()
  },
  methods: {
    // 获得商品
    getCartList () {
      axios.get('/users/cartlist').then(res => {
        let resData = res.data
        if (resData.status === 200) {
          this.cartList = resData.result
          let price = 0
          resData.result.forEach((item) => {
            if (item.checked) {
              price += item.productPrice * item.productNum
            }
          })
          this.allPrice = price
        } else {
          this.usermodelMessage = resData.msg
          this.userisModel = true
        }
      })
    },
    // 创建订单成功之后 跳转页面
    next () {
      let addressId = this.$route.params.addressId
      axios.post('/users/createorder', {
        price: this.price,
        addressId: addressId
      }).then(res => {
        let resData = res.data
        if (resData.status === 200) {
          this.$router.push({name: 'OrderSuccess', params: {orderId: resData.result.orderId}})
          this.$store.commit('updateCartCount', resData.result.productLength)
        } else {
          this.usermodelMessage = resData.msg
          this.userisModel = true
        }
      })
    },
    // 回到地址选择栏
    prv () {
      this.$router.push({ name: 'Address' })
    }
  }
}
</script>
<style scoped>
.cart-price {
  font-size: 1rem;
  line-height: 1.8rem;
}
.cart-price p {
  text-align: right;
}
.cart-price span{
  display: inline-block;
  width: 6rem;
  color: red;
}
.cart-body {
  overflow: hidden;
}
.cart-body dd{
  float: left;
  min-height: 2.4rem;
}
.cart-body dd.right{
  float: right;
}
.cart-body dl{
  overflow: hidden;
}
.cart-dl {
  background-color: #f3f3f3;
  border: 1px solid #e9e9e9;
  font-size: 0.8rem;
  color: #000;
  line-height: 2.3rem;
}
.cart-body .check{
  width: 133px;
  text-align: center;
}
.cart-body .price {
  width: 120px;
  padding-right: 40px;
}
.cart-body .num {
  width: 80px;
}
.cart-body .subtotal {
  width: 100px;
  padding-right: 40px;
}
.cart-body .operation {
  width: 75px;
}
.product {
  width: 500px;
}
.des {
  width: 210px;
  min-height: 2.4rem;
}
.cart-body .checkbox {
  display: none;
}
.cart-body .iconfont {
  cursor: pointer;
}
.cart-body .check .iconfont{
  margin: 0px 0.5rem;
}
.cart-body .check .iconfont.checked {
  color: green;
}
.cart-body .check .icon-xuanze::before{
  vertical-align: top;
}
.cart-main {
  margin: 1rem 0px;
  border-top: 2px solid #aaa;
  border-bottom: 2px solid #aaa;
}
.cart-main dl {
  padding: 1rem 0px;
  background-color: #fff4e8;
}
.cart-main dl + dl {
  margin-top: 1rem;
}
.cart-main .check img{
  width: 6rem;
  height: 6rem;
}
.cart-main .product,
.cart-main .des{
  padding: 0px 0.5rem;
  box-sizing: border-box;
}
.cart-main .price,
.cart-main .subtotal{
  color: red;
}
.product-check {
  margin-left: 10rem;
}
.productPrice-all {
  margin-left: 10rem;
  float: right;
  margin-right: 2rem;
}
.productPrice-all span {
  font-weight: bold;
  color: red;
  font-size:1.2rem;
}
.cart-dl .right .btn {
  line-height: 2.3rem;
  width: 5rem;
  font-weight: bold;
  text-align: center;
  background-color: red;
  color: #f5f5f5;
}
.cart-dl .right .btn.dis{
  background-color: #ccc;
}
.cart-dl .right .btn:hover{
  color: #fff;
}
.num .btn{
  border: 1px solid #333;
  float: left;
  width: 18px;
  text-align: center;
}
.num input {
  padding: 0px;
  float: left;
  height: 14px;
  line-height: 14px;
  width: 42px;
  margin: 0 -1px;
}
.next {
    width: 5rem;
    float: right;
    line-height: 2rem;
    text-align: center;
    font-size: 1rem;
    border-radius: 0.2rem;
    background-color: #f60;
    margin: 0.5rem 0;
}
.next.left{
  float: left;
}
</style>

