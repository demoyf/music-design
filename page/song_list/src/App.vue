<template>
  <div id="App">
    <header-com></header-com>
    <song-info-com></song-info-com>
  </div>
</template>
<script>
import my_header from './../../../src/components/header/header.vue';
import song_info from './../components/play_music_info';
export default {
  name: "App",
  data() {
    return{

    }
  },
  components: {
    'header-com':my_header,
    'song-info-com':song_info
  }
}
</script>
