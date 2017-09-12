<template>
  <div class="main">
    <nav-header></nav-header>
    <nav-bread></nav-bread>
    <div class="goodlist">
      <div class='goodlist-nav'>
        <div class="public">
          <div class='right'>
            SortBy: 
            <span class="sortBy">Default</span>
            <span class="sortBy" @click="sortPrice">Price<span 
              :class="['iconfont', {'icon-paixu1': sortFlog}, {'icon-paixu': !sortFlog}]"></span>
            </span>
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
              {{ price.startPrice + '.00' + '-' + price.endPrice + '.00' }}
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
          <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <img src="../../static/loading-svg/loading-spin.svg" v-if="isLodingShow">
          </div>
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
      /**
       * {Array} goodList 商品数组 默认 []
       * {Boolean} sortFlog 排序 默认 true
       * {Boolean} busy 是否可以加载分页数据 默认 true (不许加载)
       * {Number} page 分页 默认 1
       * {Number} pageSize 每页条目 默认 8
       * {Array} priceFilter 商品价格区间 默认 [...]
       * {String or Number} priceFilterCheck 当前选中的商品价格区间 默认 All
       */
      goodList: [],
      sortFlog: true,
      busy: true,
      page: 1,
      pageSize: 8,
      priceFilter: [{
        startPrice: 0,
        endPrice: 500
      }, {
        startPrice: 500,
        endPrice: 1000
      }, {
        startPrice: 1000,
        endPrice: 2000
      }, {
        startPrice: 2000,
        endPrice: 5000
      }],
      priceFilterCheck: 'All',
      isLodingShow: false
    }
  },
  mounted () {
    this.getGoodsList()
  },
  methods: {
    /**
     * {Object} params 请求参数 sort排序 page页码 pageSize页面条目
     * {Boolean} flog 是否是下拉加载 下拉加载需要连接数组
     * {Object or String } priceSection 价格区间 All 或者 {startPrice:xx , endPrice: xx}
     * 加载完数据之后根据 返回的条目来判断是否可以继续下拉加载
     */
    getGoodsList (flog) {
      let params = {
        sort: this.sortFlog ? 1 : -1,
        page: this.page,
        pageSize: this.pageSize,
        priceSection: this.priceFilterCheck === 'All' ? 'All' : JSON.stringify(this.priceFilter[this.priceFilterCheck])
      }
      axios.get('/goods', {
        params
      }).then(res => {
        this.isLodingShow = false
        let resData = res.data
        if (resData.status === 200) {
          if (flog) {
            this.goodList = this.goodList.concat(resData.list)
          } else {
            this.goodList = resData.list
          }
          if (params.pageSize > resData.counts) {
            this.busy = true
          } else {
            this.busy = false
          }
        }
      })
    },
    /**
     * 改变商品价格区间
     * {String or Number} type (all 或者 数组下标)
     */
    changePriceFilter (type) {
      this.priceFilterCheck = type
      this.page = 1
      this.getGoodsList()
    },
    /**
     * 改变价格排序
     */
    sortPrice () {
      this.sortFlog = !this.sortFlog
      this.page = 1
      this.getGoodsList()
    },
    /**
     * 下拉加载
     * 上来加载数据 先变成不可加载 然后页码++ 运行商品请求函数
     */
    loadMore () {
      this.busy = this.isLodingShow = true
      setTimeout(() => {
        this.page ++
        this.getGoodsList(true)
      }, 500)
    }
  },
  filters: {
    /**
     * 价格过滤器
     */
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
  .goodlist-nav .sortBy {
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
    -webkit-transition: text-indent 0.2s linear ;
    -moz-transition: text-indent 0.2s linear ;
    transition: text-indent 0.2s linear ;
  }
  .price-filter li.cur {
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
  .goodlist-body ul::after{
    display: block;
    content: '';
    height: 0;
    width: 0;
    clear: both;
    overflow: hidden;
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
    -webkit-transition: transform 0.2s linear;
    -moz-transition: transform 0.2s linear;
    transition: transform 0.2s linear;
  }
  .item:hover {
    box-shadow: 1px 1px 8px 1px red;
    transform: translate(0, -0.5rem);
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
  .icon-paixu, .icon-paixu1 {
    color: #f60;
  }
  .load-more {
    line-height: 4rem;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
  }
</style>

