<template>
  <div id="hot-song">
    <show-song :song-list="song_list"></show-song>
  </div>
</template>
<script>
import show_song from './../../album_info/components/show_song';
export default {
  name: "hot-song",
  props:['songList'],
  data(){
    return {song_list:this.songList}
  },
  components:{
    'show-song':show_song
  }
}
</script>
<style lang="stylus" scoped>

</style>
