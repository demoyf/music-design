<template>
  <div id="billboard-item">
    <div class="img-container" @click="to_music(billboardItem.song_id)">
      <img :src="billboardItem.pic_small" alt="">
    </div>
    <h1 @click="to_music(billboardItem.song_id)">{{billboardItem.title}}</h1>
    <div class="icon-container">
      <i class="icon-play-circle-icon icon" @click="to_play_url(billboardItem.song_id)"></i>
      <i class="icon-plus-square-icon icon" @click="to_add_url(billboardItem.song_id)"></i>
    </div>
    <p @click="to_artist(billboardItem.artist_id,billboardItem.ting_uid)">{{billboardItem.artist_name||billboardItem.author}}</p>
    <p @click="to_album(billboardItem.album_id)">{{billboardItem.album_title}}</p>
    <h2>{{billboardItem.file_duration|change_duration}}</h2>
  </div>
</template>
<script>
import * as local_uitl from './../../common/local_storage';
import key from './../../common/key';
export default {
  name: "billboard-item",
  props: ['billboardItem'],
  data(){
    return {

    }
  },
  created() {
    //do something after creating vue instance

  },
  filters:{
    change_duration(value){
      if(!value){
        return '暂无';
      }
      let result = "";
      let minute = Math.floor(value/60);
      result+=minute>=10?minute:("0"+minute);
      result+=":";
      let second = value%60;
      result+=second>=10?second:"0"+second;
      return result;
    }
  },
  methods:{
    to_music(music_id){
      local_uitl.save_item(key.get_song_info,music_id);
			window.open("/page/song_list.html");
    },
    to_album(album_id){
      local_uitl.save_item(key.get_album_info,album_id);
      window.open("/page/album_info.html");
    },
    to_artist(artisid,tingid){
      local_uitl.save_item(key.get_artist_id,artisid);
      local_uitl.save_item(key.get_ting_id,tingid);
      window.open(key.jump_artist_info);
    },
    to_play_url(song_id){
      local_uitl.save_item(key.get_play_song_id,song_id);
      let temp = local_uitl.read_item(key.get_has_paly_page);
      if(!temp||temp==0){
        local_uitl.save_item(key.get_has_paly_page,"1");
        window.open(key.jump_play_music);
      }
    },
    to_add_url(song_id){
      local_uitl.save_item("add_new_music",song_id);
      let temp = local_uitl.read_item(key.get_has_paly_page);
      if(!temp||temp==0){
        local_uitl.save_item(key.get_has_paly_page,"1");
        window.open(key.jump_play_music);
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
#billboard-item
  width: 100%;
  height: 60px;
  margin-bottom: 1em;
  padding-left: 1.5em;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #666;
  align-items: center;
  &:hover
    .icon-container
      opacity: 1;
      font-size: 1.1em;
  .icon-container
    width: 8%;
    opacity: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-right: 2%;
    .icon
      width: 18px;
      height: 18px;
      &:hover
        cursor: pointer;
  .img-container
    width: 60px;
    height: 100%;
    border-radius: 30px;
    overflow: hidden;
    img
      width: 100%;
      height: 100%;
      &:hover
        color: #31c27c;
        cursor: pointer;
  h1
    width: 23%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    &:hover
      color: #31c27c;
      cursor: pointer;
  p
    width: 20%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    &:hover
      color: #31c27c;
      cursor: pointer;
  h2
    width: 8%;
em
  color:#31c27c;
</style>
