<template>
  <div id="hot-song">
    <div class="title-container">
      <h1>热门歌曲</h1>
      <span class="all-song">全部</span>
    </div>
    <show-song :song-list="song_list"></show-song>
  </div>
</template>
<script>
import show_song from './../../album_info/components/show_song';
export default {
  name: "hot-song",
  props:['songList'],
  data(){
    return {
      song_list:this.songList
    }
  },
  components:{
    'show-song':show_song
  }
}
</script>
<style lang="stylus" scoped>
#hot-song
  width: 100%;
  .title-container
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: .5em;
    align-items: center;
    > h1
      font-size: 1.4em;
      margin-left: .3em;
      margin-bottom: .5em;
    .all-song
      display: block;
      margin-right: .3em;
      &:hover
        cursor: pointer;
        color: #31c27c;
</style>
