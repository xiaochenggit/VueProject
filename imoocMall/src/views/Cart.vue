<template>
  <div class="cart">
      {{ msg }}
      <p>{{$route.query.goodsId}}</p>
  </div>
</template>
<script>
    export default {
      name: 'Cart',
      data () {
        return {
          msg: 'cart 页面'
        }
      }
    }
</script>
