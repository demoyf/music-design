<template>
  <div id="app">
  <m-header></m-header>
  <card-loop></card-loop>
  <little-loop></little-loop>
  <billboard-com></billboard-com>
  </div>
</template>
<script>
import header from './components/header/header.vue';
import card_loop from './components/song_loop_card/circle_loop.vue';
import little_loop from './components/little_loop/little_loop.vue';
import billboard from './components/billboard/billboard_com.vue';
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
    "little-loop":little_loop,
    'billboard-com':billboard
  },
}
</script>

<style>

</style>
