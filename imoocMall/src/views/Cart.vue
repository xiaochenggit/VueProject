<template>
  <div class="main">
    <nav-header></nav-header>
    <div class="cart">
      {{ msg }}
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
    import NavHeader from '@/components/Header'
    import NavFooter from '@/components/Footer'
    export default {
      name: 'Cart',
      data () {
        return {
          msg: 'cart 页面'
        }
      },
      components: {
        NavHeader,
        NavFooter
      }
    }
</script>
