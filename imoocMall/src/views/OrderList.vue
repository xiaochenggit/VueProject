<template>
  <div class="main">
      {{msg}}{{$route.params.id}}
  </div>
</template>
<script>
export default {
  name: 'OrderList',
  data () {
    return {
      msg: 'OrderList'
    }
  }
}
</script>
<style scoped>

</style>

