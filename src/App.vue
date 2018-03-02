<template>
  <div id="app">
  <m-header></m-header>
  <card-loop></card-loop>
  <little-loop></little-loop>
  </div>
</template>

<script>
import header from './components/header/header.vue';
import card_loop from './components/song_loop_card/circle_loop.vue';
import little_loop from './components/little_loop/little_loop.vue';
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    "m-header":header,
    "card-loop":card_loop,
    "little-loop":little_loop
  },
}
</script>

<style>

</style>
