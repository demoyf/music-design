<template>
  <div id="App">
    <header-com></header-com>
    <song-info-com></song-info-com>
    <my-footer></my-footer>
    <to-top></to-top>
  </div>
</template>
<script>
import my_header from './../../../src/components/header/header.vue';
import song_info from './../components/play_music_info';
import footer from './../../../src/components/footer/footer.vue';
import to_top from './../../common/components/to_top.vue';
export default {
  name: "App",
  data() {
    return{

    }
  },
  components: {
    'header-com':my_header,
    'song-info-com':song_info,
    'my-footer':footer,
    'to-top':to_top
  }
}
</script>
