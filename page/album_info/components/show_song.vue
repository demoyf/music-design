<template>
  <div id="show-song">
    <div class="list-header one-part-container">
      <i class="small-span"> </i>
      <span class="max-span">歌曲</span>
      <div class="play-or-add">
      </div>
      <span class="middle-span">歌手</span>
      <span class="small-span">时长</span>
    </div>
    <div class="list-header one-part-container"
     v-for="(item,index) in song_list">
      <i class="small-span">{{index+1}}</i>
      <span class="max-span" @click="to_url(item.song_id)">{{item.title}}</span>
      <div class="play-or-add">
        <i class="icon-play-circle-icon icon" @click="to_play_url(item.song_id)"></i>
        <i class="icon-plus-square-icon icon" @click="to_add_url(item.song_id)"></i>
      </div>
      <span class="middle-span">{{item.author}}</span>
      <span class="small-span">{{get_duration(item.file_duration)}}</span>
    </div>
  </div>
</template>
<script>
import key from './../../common/key';
import * as loca from './../../common/local_storage';
export default {
  name: "show-song",
  props: ['songList'],
  data(){
    return {
      song_list:this.songList
    }
  },
  methods:{
    get_duration(duration){
      let file_duration = parseInt(duration);
      let result = "";
      let minute = Math.floor(file_duration/60);
      result+=minute>=10?minute:("0"+minute);
      result+=":";
      let second = file_duration%60;
      result+=second>=10?second:"0"+second;
      return result;
    },
    to_url(songid){
      loca.save_item(key.get_song_info,songid);
      window.location.href = key.jump_song_info;
    },
    to_play_url(song_id){
      loca.save_item(key.get_play_song_id,song_id);
      let temp = loca.read_item(key.get_has_paly_page);
      if((typeof temp == 'object')||temp==0){
        loca.save_item(key.get_has_paly_page,"1");
        window.open(key.jump_play_music);
      }
    },
    to_add_url(song_id){
      loca.save_item("add_new_music",song_id);
      let temp = loca.read_item(key.get_has_paly_page);
      if((typeof temp == 'object')||temp==0){
        loca.save_item(key.get_has_paly_page,"1");
        window.open(key.jump_play_music);
      }
    }
  },
  created() {
    //do something after creating vue instance
    window.addEventListener("storage",(evenet)=>{
      if(event.key==="current_album"){
        return;
      }
      if(event.key==="current_song"){
        return;
      }
    });
  }
}
</script>
<style lang="stylus" scoped>
@import "./../../../src/common/stylus/mixin.styl";
#show-song
  width: 100%;
  margin-right: 4em;
  border-radius: 5px;
  .one-part-container
    display: flex;
    flex-direction: row;
    padding: 1em;
    &:nth-child(2n+1)
      background-color: rgba(0,0,0,0.01);
    > i
    > span
      display: block;
    .max-span
      width: 40%;
      ellipsis_tran();
      max-width: 40%;
      &:hover
        color: music-color;
        cursor: pointer;
    .small-span
      width: 4%;
      min-width: 2em;
      color: #999;
    .play-or-add
      opacity: 0;
      width: 10%;
      display: flex;
      flex-direction: row;
      justify-content:space-between;
      font-size: 1.2em;
      padding-right: 5%;
      i
        cursor: pointer;
    .middle-span
      width: 35%;
      max-width: 35%;
      ellipsis_tran();
      &:hover
        color: music-color;
        cursor: pointer;
    &:hover
      .play-or-add
        opacity: 1;
</style>
