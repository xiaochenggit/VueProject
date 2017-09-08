<template>
    <div class="count">
        <span @click="add">+</span>
        <span @click="del">-</span>
        {{ number }}
    </div>
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  name: 'count',
  methods: {
    add () {
      this.$emit('change', 'add')
    },
    del () {
      this.$emit('change', 'del')
    }
  }
}
</script>

