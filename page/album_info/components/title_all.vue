<template>
  <div id="title-all" v-if="album_info!=undefined">
    <div class="all-info">
      <div class="img-container">
        <img :src="img_url"/>
      </div>
      <div class="info-container">
        <h1>{{album_info.title}}</h1>
        <div class="icon-conatiner">
          <i class="icon-user"></i>
          <span class="artist-name" @click="to_artist_url(song_list[0].artist_id,
            song_list[0].ting_uid)">{{album_info.author}}</span>
        </div>
        <div class="other-info">
          <div class="album-info one-part-info">
            类型：
            <span>
              {{album_info.styles}}</span>
          </div>
          <div class="company-info one-part-info">
            语种：
            <span>{{album_info.language}}</span>
          </div>
        </div>
        <div class="other-info">
          <div class="one-part-info">
            地区：
            <span>{{album_info.country}}</span>
          </div>
          <div class="one-part-info">
            发行公司：
            <span>{{album_info.publishcompany}}</span>
          </div>
        </div>
        <div class="button-container">
          <button class="music-play-button" type="button" name="play-button" @click="add_all_music">
            <i class="icon-play-icon-1"></i>播放</button>
          <button type="button" class="music-other-button" name="coll-button" @click="add_new_music_list">
            <i class="icon-plus-square-icon" style="font-weight:100"></i>
            播放队列
          </button>
          <button type="button" class="music-other-button" name="coll-button">
            <i class="icon-heart-icon"></i>
            收藏
          </button>
          <button class="music-other-button" type="button" name="comment-button" @click="to_publish">
            <i class="icon-quill"></i>
            去讨论
          </button>
        </div>
      </div>
    </div>
    <div class="show-and-brief">
      <show-song :song-list="song_list" class="show-song-list"></show-song>
      <div class="album-brief">
        <h1>简介</h1>
        <p style="margin-bottom:.7em;">{{album_info.info}}</p>
        <more-span :config-obj="configObj" class="more-span-class"></more-span>
      </div>
    </div>
  </div>
</template>
<script>
import url_util from './../../../src/common/util/url.js';
import show_song from './show_song.vue';
import more_span from './../../song_list/components/more_span.vue';
import * as loca from './../../../src/common/util/local_storage';
import key from './../../common/key.js';
export default {
  name: "title-all",
  data(){
    return {
      img_url:'/static/img/default.png',
      album_info:undefined,
      song_list:[],
      configObj:undefined
    }
  },
  created(){
    let albumid = loca.read_item(key.get_album_info);
    let url = url_util.get_album_info+albumid;
    this.$http.get(url).then((response)=>{
      if(response.status===200){
        let body = response.body;
        let albumInfo = body.albumInfo;
        this.configObj = {
          info:albumInfo.info,
          direction:'l',
          show_header:"专辑简介"
        }
        this.album_info = albumInfo;
        this.song_list = body.songlist.slice(0,6);
        this.img_url = albumInfo.pic_radio;
      }
    });
  },
  components:{
    "show-song":show_song,
    "more-span":more_span
  },
  methods: {
    to_publish(){
      let info = this.album_info;
      let obj = {
        name:info.title,
        picture:info.pic_small,
        album_id:info.album_id
      }
      localStorage.setItem("publish_album",JSON.stringify(obj));
      window.open('/page/publish_page.html');
    },
    to_artist_url(artistid,tingid){
      loca.save_item(key.get_artist_id,artistid);
      loca.save_item(key.get_ting_id,tingid);
      window.location.href = key.jump_artist_info;
    },
    add_all_music(){
      let song_list = this.song_list;
      let id_list = '';
      for(let item of song_list){
        id_list += item.song_id+",";
      }
      id_list = id_list.substr(0,id_list.length-1);
      loca.save_item("play_new_music_list",id_list);
      let temp = loca.read_item(key.get_has_paly_page);
      if((typeof temp == 'object')||temp==0){
        loca.save_item(key.get_has_paly_page,"1");
        window.open(key.jump_play_music);
      }
    },
    add_new_music_list(){
      let song_list = this.song_list;
      let id_list = '';
      for(let item of song_list){
        id_list += item.song_id+",";
      }
      id_list = id_list.substr(0,id_list.length-1);
      loca.save_item("add_new_music_list",id_list);
      let temp = loca.read_item(key.get_has_paly_page);
      if((typeof temp == 'object')||temp==0){
        loca.save_item(key.get_has_paly_page,"1");
        window.open(key.jump_play_music);
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "./../../../src/common/stylus/mixin.styl";
#title-all
  width:100%;
  color: #333;
  gardient-background();
  padding-top: 5em;
  .show-and-brief
    width: max-screen-width;
    margin:5em 9%;
    display: flex;
    flex-direction: row;
    .album-brief
      flex:0 0 290px;
      > h1
        font-size: 1.3em;
        margin-bottom: 1em;
        font-weight: 600;
      > p
        height: 10em;
        overflow: hidden;
        position: relative;
        font-size: 1em;
        color: #333;
        &::after
          position: absolute;
          right: 0em;
          bottom: 0;
          content: '....'
          background-color: white;
      &::after
        clear: both;
        content: ''
  .all-info
    width: max-screen-width;
    display: flex;
    flex-direction: row;
    margin:auto;
    box-sizing: border-box;
    .img-container
      width: 250px;
      margin: 0 2em 0 0;
      >img
        width: 100%;
        height: 100%;
    .info-container
      max-width: 70%;
      padding-left: 1.5em;
      box-sizing: border-box;
      > h1
        margin: .5em 0 0 0;
        font-size: 2em;
        font-weight: 600;
        ellipsis_tran();
        height: 1.5em;
      > .icon-conatiner
        margin: .2em 0;
        color: #222;
        width: 520px;
        font-size: 1.1em;
        > i
          color: #999;
          font-size: 1em;
          padding-left: .4em;
        .artist-name
          display: inline-block;
          max-width: 80%;
          ellipsis_tran();
          font-family: 'SimSun';
          &:hover
            color: music-color;
            cursor: pointer;
      .other-info
        width: 520px;
        display: flex;
        flex-direction: row;
        margin-top: 1em;
        .one-part-info
          width: 47%;
          margin-right: 3%;
          ellipsis_tran();
          >span:hover
            color: music-color;
            cursor: pointer;
      .button-container
        max-width: 880px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 3em;
        >button
          border-radius: 3px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: .5em 1.9em;
          font-size: 1em;
          > i
            margin-right: .2em;
        > .music-play-button
          background-color: music-color
          color: white;
          opacity: 0.8;
          &:hover
            opacity: 1;
        > .music-other-button
          border: 1px solid #99999977;
          color: #333;
          &:hover
            background-color: rgba(99,99,99,0.05);
          >i
            color: #999;
</style>
