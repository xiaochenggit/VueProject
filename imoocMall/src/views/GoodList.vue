<template>
  <div class="main">
    <nav-header></nav-header>
    <nav-bread></nav-bread>
    <div class="goodlist">
      <div class='goodlist-nav'>
        <div class="public">
          <div class='right'>
            SortBy: <span>Default</span><span>Price</span>
          </div>
        </div>
      </div>
      <div class='goodlist-main public'>
        <div class='left goodlist-body-nav'>
          <ul class="price-filter">
            <h2>Price</h2>
            <li :class="{'cur': priceFilterCheck == 'All'}" 
              @click="changePriceFilter('All')">
              All
            </li>
            <li v-for="(price, index) in priceFilter" :key="index" 
              :class="{'cur': priceFilterCheck == index}"
               @click="changePriceFilter(index)">
              {{ price.startPrice + '-' + price.endPrice }}
            </li>
          </ul>
        </div>
        <div class='right goodlist-body'>
          <ul>
            <li class="item" v-for="(item, index) in goodList" :key="index">
              <img v-lazy="'../../static/' + item.prodcutImg" :alt="item.productName">
              <p class="name">{{ item.productName }}</p>
              <p class="price">{{ item.prodcutPrice|priceFilter }}</p>
              <button class='btn cartBtn'>加入购物车</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavHeader from '@/components/Header'
import NavFooter from '@/components/Footer'
import NavBread from '@/components/Bread'
import axios from 'axios'
export default {
  name: 'GoodList',
  data () {
    return {
      goodList: [],
      priceFilter: [{
        startPrice: '0.00',
        endPrice: '500.00'
      }, {
        startPrice: '500.00',
        endPrice: '1000.00'
      }, {
        startPrice: '1000.00',
        endPrice: '2000.00'
      }],
      priceFilterCheck: 'All'
    }
  },
  mounted () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      axios.get('/goods').then(res => {
        this.goodList = res.data.result
      })
    },
    changePriceFilter (type) {
      this.priceFilterCheck = type
    }
  },
  filters: {
    priceFilter (val) {
      if (!val) return ''
      val = val.toString()
      return val + ' ¥'
    }
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread
  }
}
</script>
<style scoped>
  .goodlist {
    background: #dedede;
    padding-top: 40px;
  }
  .goodlist-nav {
    overflow: hidden;
    background: #fff;
    font-size: 1.2rem;
    line-height: 2.4rem;
  }
  .goodlist-nav span {
    cursor: pointer;
    margin: 0 1rem;
  }
  .goodlist-main{
    overflow: hidden;
  }
  .price-filter {
    font-size: 1.1rem;
    line-height: 1.6rem;
  }
  .price-filter li {
    margin: 0.5rem 0px;
    cursor: pointer;
  }
  .price-filter .cur {
    border-left: 4px solid #f60;
    color: #f60;
    text-indent: 1rem;
  }
  .goodlist-body-nav {
    width: 220px;
  }
  .goodlist-body {
    width: 1080px;
  }
  .item {
    background-color: #fff;
    font-size: 1rem;
    line-height: 1.8rem;
    float: left;
    margin: 1rem;
    padding-bottom: 1rem;
    cursor: pointer;
    box-shadow: 1px 1px 8px 1px #ccc;
  }
  .item:hover {
    box-shadow: 1px 1px 8px 1px red;
  }
  .item img {
    height: 220px;
    width: 220px;
  }
  .item p {
    text-indent: 5%;
    line-height: 2rem;
  }
  .item p.price {
    color: red;
    font-weight: bold;
  }
  .cartBtn{
    width: 90%;
    border: red 2px solid;
    color: red;
    margin: 0 auto;
    display: block;
    text-align: center;
  }
  .cartBtn:hover {
    color: #f60;
    border-color: #f60;
  }
</style>

