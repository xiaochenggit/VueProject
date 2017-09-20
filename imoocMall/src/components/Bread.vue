<template>
    <nav class="bread">
        <div class="public">
            <router-link to="/">Home</router-link> / 
            <slot></slot>
        </div>
    </nav>
</template>
<script>
export default {
  name: 'Bread'
}
</script>
<style scoped>
    .bread {
        background-color: #ccc;
        line-height: 2rem;
        font-size: 1.2rem;
    }
    .bread a {
        color: #fff;
        text-decoration: none;
    }
    .bread a:hover{
        color:#f60;
    }
</style>
