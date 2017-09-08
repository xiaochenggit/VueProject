<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <Count @change="changeNumber" :number='number'/>
    <p>{{ number }}</p>
  </div>
</template>

<script>
import Count from './Count'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      number: 10
    }
  },
  methods: {
    changeNumber (meth) {
      if (meth === 'add') {
        this.number ++
      } else {
        this.number --
      }
    }
  },
  components: {
    Count
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
