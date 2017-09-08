<template>
  <div class="goodList">
    <nav-header></nav-header>
    <div class="main">
      <p>{{ msg }}</p>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavHeader from '@/components/Header'
import NavFooter from '@/components/Footer'
export default {
  name: 'GoodList',
  data () {
    return {
      msg: '商品详情页面'
    }
  },
  components: {
    NavHeader,
    NavFooter
  }
}
</script>
<style scoped>
  .goodList {
    padding-top: 4.4rem;
    padding-bottom: 2rem;
  }
</style>

