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
          <ul>
            <h2>Price</h2>
            <li>All</li>
            <li>0 - 100</li>
          </ul>
        </div>
        <div class='right goodlist-body'>
          <ul>
            <li class="item" v-for="(item, index) in goodList">
              <img src="../../static/1.jpg" :alt="item.productName">
              <p class="name">{{ item.productName }}</p>
              <p class="price">{{ item.prodcutPrice }}</p>
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
      goodList: []
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
  }
  .item:hover {
    box-shadow: -2px -2px 15px 3px #989090;
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

