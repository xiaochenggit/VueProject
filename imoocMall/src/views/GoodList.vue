<template>
  <div class="goodList">
    <nav-header></nav-header>
    <nav-bread></nav-bread>
    <div class="main">
      <p>{{ msg }}</p>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavHeader from '@/components/Header'
import NavFooter from '@/components/Footer'
import NavBread from '@/components/Bread'
export default {
  name: 'GoodList',
  data () {
    return {
      msg: '商品详情页面'
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
  .goodList {
    padding-top: 4.4rem;
    padding-bottom: 2rem;
  }
</style>

