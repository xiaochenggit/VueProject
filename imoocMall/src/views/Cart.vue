<template>
  <div class="main">
    <nav-header></nav-header>
    <nav-bread>
      <a href="javascript:void(0)">Cart</a>
    </nav-bread>
    <div class="cart">
      <div class="public">
        <h2>全部商品</h2>
        <div class="cart-body">
          <div class="cart-dl">
            <dl>
              <dd class="check">
                <label @click="checkAll">
                  <span :class="['iconfont','icon-xuanze', {'checked': isCheckAll }]"></span>全选
                </label>
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
            <dl v-for="(item, key) in cartList" :key="key">
              <dd class="check">
                <span :class="['iconfont','icon-xuanze', {'checked': item.checked}]" @click="update('check', item)"></span>
                <input type="checkbox" class="checkbox" checked="item.checked"/>
                <img :src="'../../static/'+item.productImg" :alt="item.productName">
              </dd>
              <dd class="product">{{item.productName}}</dd>
              <dd class="des">颜色: 不要太鲜艳, 我是喜欢的红色的!颜色: 不要太鲜艳, 我是喜欢的红色的!颜色: 不要太鲜艳, 我是喜欢的红色的!颜色: 不要太鲜艳, 我是喜欢的红色的!颜色: 不要太鲜艳, 我是喜欢的红色的!颜色: 不要太鲜艳, 我是喜欢的红色的! </dd>
              <dd class="price text-right">{{item.productPrice | currency('¥')}}</dd>
              <dd class="num">
                <button class="add btn" @click="update('add', item)">+</button>
                <input type="text" v-model="item.productNum" class="text-center">
                <button class="minus btn" @click="update('minus', item)">-</button>
              </dd>
              <dd class="subtotal text-right">{{item.productPrice * item.productNum | currency('¥')}}</dd>
              <dd class="operation">
                <span class="iconfont icon-shanchu" @click="delProductConfirm(item.productId, key)"></span>
              </dd>
            </dl>
          </div>
          <div class="cart-dl">
            <dl>
              <dd class="check">
                <label @click="checkAll">
                  <span :class="['iconfont','icon-xuanze', {'checked': isCheckAll }]"></span>全选
                </label>
              </dd>
              <dd class="delete">删除选中的商品</dd>
              <dd class="product-check">已选择<span>1</span>件商品</dd>
              <div class="right">
                <dd class="productPrice-all">总价：<span>{{getAllPrice | currency('¥')}}</span></dd>
                <dd><button :class="['btn', {'dis': getCheckLength() == 0}]" @click="goChooseAddress">去结算</button></dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <vue-model :message='usermodelMessage' :isShow='userisModel' @close='userisModel = false'>
      </vue-model>
      <vue-model :message='delProductMessage' :isShow='delisModel' @close='delisModel = false' :isTimer='false'>
        <div class="btngroup" slot="btngroup">
          <button class="btn" @click="delProduct">确认</button>
          <button class="btn cancel right" @click="delisModel = false" >取消</button>
        </div>
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
      name: 'Cart',
      data () {
        /**
         * {Array} cartList 商品列表
         * {String} usermodelMessage 消息弹窗的消息 默认""
         * {Boolean} userisModel 弹窗是否显示 默认false
         * {String} delProductId 删除商品的 id
         * {Number} delIndex 删除商品的数组索引
         * {Sting} delProductMessage 确认删除弹窗上的消息
         * {Boolean} delisModel 确认弹窗控制器
         */
        return {
          cartList: [],
          usermodelMessage: '',
          userisModel: false,
          delProductId: '',
          delIndex: 0,
          delProductMessage: '确定删除该商品吗?',
          delisModel: false
        }
      },
      watch: {
        '$store.state.nickName' (val) {
          if (val) {
            this.getCartList()
          }
        }
      },
      mounted () {
        this.getCartList()
      },
      methods: {
        getCartList () {
          axios.get('/users/cartlist').then(res => {
            let resData = res.data
            if (resData.status === 200) {
              this.cartList = resData.result
            } else {
              this.usermodelMessage = resData.msg
              this.userisModel = true
            }
          })
        },
        // 是否删除商品弹窗
        delProductConfirm (productId, index) {
          this.delProductId = productId
          this.delisModel = true
          this.delIndex = index
        },
        // 删除商品
        delProduct () {
          this.delisModel = false
          axios.post('/users/cart/delete', {
            productId: this.delProductId
          }).then(res => {
            let resData = res.data
            this.usermodelMessage = resData.msg
            this.userisModel = true
            if (resData.status === 200) {
              this.$store.commit('updateCartCount', -this.cartList[this.delIndex].productNum)
              this.cartList.splice(this.delIndex, 1)
            }
          })
        },
        // 更新商品数据 是否选择 数量
        update (flag, item) {
          if (flag === 'add') {
            item.productNum ++
          } else if (flag === 'minus') {
            if (item.productNum <= 1) {
              return
            } else {
              item.productNum --
            }
          } else {
            item.checked = !item.checked
          }
          axios.post('/users/cart/update', {
            productId: item.productId,
            productNum: item.productNum,
            checked: item.checked
          }).then(res => {
            let resData = res.data
            if (resData.status !== 200 && flag === 'check') {
              item.checked = !item.checked
            } else {
              if (flag === 'add') {
                this.$store.commit('updateCartCount', 1)
              } else if (flag === 'minus') {
                this.$store.commit('updateCartCount', -1)
              }
            }
          })
        },
        // 全选
        checkAll () {
          let flag = !this.isCheckAll
          this.cartList.forEach((item) => {
            item.checked = flag
          })
          axios.post('/users/cart/checkall', {
            checked: flag
          }).then(res => {
            console.log(res.data.msg)
          })
        },
        // 获得当前 选择商品数量 用于和所有商品数量比较 从而确定是否是全选状态
        getCheckLength () {
          let length = 0
          this.cartList.forEach((item) => {
            if (item.checked) {
              length++
            }
          })
          return length
        },
        // 去结算
        goChooseAddress () {
          if (this.getCheckLength() > 0) {
            this.$router.push({'path': '/address'})
          }
        }
      },
      computed: {
        // 计算属性是否全选状态
        isCheckAll () {
          return this.getCheckLength() === this.cartList.length
        },
        // 获得所有选择商品价格
        getAllPrice () {
          let price = 0
          this.cartList.forEach((item) => {
            if (item.checked) {
              price += item.productPrice * item.productNum
            }
          })
          return price
        }
      },
      components: {
        NavHeader,
        NavBread,
        NavFooter,
        VueModel
      }
    }
</script>
<style scoped>
.cart-body dd{
  float: left;
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
</style>

