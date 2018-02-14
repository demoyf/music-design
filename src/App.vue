<template>
  <div id="app">
  <m-header></m-header>
  </div>
</template>

<script>
import header from './components/header.vue';
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    "m-header":header
  }
}
</script>

<style>

</style>
