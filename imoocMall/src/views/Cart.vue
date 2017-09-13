<template>
  <div class="main">
    <nav-header></nav-header>
    <nav-bread></nav-bread>
    <div class="cart">
      {{ msg }}
      <vue-model :message='modelMessage' :isShow='isModel' @close='closeModel'>
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
        return {
          msg: 'cart 页面',
          modelMessage: '',
          isModel: false
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
              console.log('获取成功!')
            } else {
              this.modelMessage = resData.msg
              this.isModel = true
            }
          })
        },
        closeModel () {
          this.isModel = false
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
