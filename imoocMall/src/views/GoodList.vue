<template>
  <div class="main">
    <nav-header></nav-header>
    <nav-bread></nav-bread>
    <div class="goodlist">
      <p>{{ msg }}</p>
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
      msg: '商品详情页面'
    }
  },
  mounted () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      axios.get('/goods').then(res => {
        this.msg = res.data.result
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
</style>

