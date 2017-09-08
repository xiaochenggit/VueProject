<template>
  <div class="goodList">
      {{ msg }}
      <p>{{ $route.params.id }}</p>
      <router-link to="/goods/title">Title 页面</router-link>
      <router-link to="/goods/img">Img 页面</router-link>
      <router-link :to="{ name: 'Cart', query: { goodsId: 123 } }">购物车 页面</router-link>
      <router-view></router-view>
      <button @click="toClick"> button - 购物车 </button>
  </div>
</template>
<script>
export default {
  name: 'GoodList',
  data () {
    return {
      msg: '商品详情页面'
    }
  },
  methods: {
    toClick () {
      this.$router.push({ path: '/cart?goodsId=123' })
    }
  }
}
</script>

