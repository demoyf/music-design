<template>
  <div id="app">
  <m-header></m-header>
  <card-loop></card-loop>
  </div>
</template>

<script>
import header from './components/header/header.vue';
import card_loop from './/components/song_loop_card/circle_loop.vue';
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    "m-header":header,
    "card-loop":card_loop
  }
}
</script>

<style>

</style>
