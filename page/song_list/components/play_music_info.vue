<template>
<div id="play-music-info">
  <div class="all-info">
    <div class="img-container">
      <img :src="img_url"/>
    </div>
    <div class="info-container">
      <h1>{{song_info?song_info.title:''}}</h1>
      <div class="icon-conatiner">
        <i class="icon-user"></i>
        <span class="artist-name"
        @click="to_artist_url(song_info.all_artist_id,song_info.all_artist_ting_uid)">{{song_info?song_info.author:''}}</span>
      </div>
      <div class="other-info">
        <div class="album-info one-part-info"
        :data-albumid="song_info?song_info.album_id:''">
          专辑：
          <span @click="to_url(song_info.album_id)">
            {{song_info?song_info.album_title:''}}</span>
        </div>
        <div class="company-info one-part-info">
          发行公司：
          <span>{{song_info?song_info.si_proxycompany:''}}</span>
        </div>
      </div>
      <div class="button-container">
        <button class="music-play-button" type="button" name="play-button" @click="to_play_url(song_info.song_id)">
          <i class="icon-play-icon-1"></i>播放</button>
        <button type="button" class="music-other-button" name="coll-button" @click="add_new_music(song_info.song_id)">
          <i class="icon-plus-square-icon" style="font-weight:100"></i>
          播放队列
        </button>
        <button type="button" class="music-other-button" name="coll-button">
          <i class="icon-heart-icon"></i>
          收藏
        </button>
        <button class="music-other-button" type="button" name="comment-button">
          <i class="icon-quill"></i>
          去讨论
        </button>
      </div>
    </div>
  </div>
  <div class="lrc-and-brief">
    <lrc-com v-if="song_info!=undefined" :lrc-url="song_info.lrclink"></lrc-com>
    <div v-if="album_info!==undefined" class="album-brief">
      <h1>简介</h1>
      <p style="margin-bottom:.7em;">{{album_info.info}}</p>
      <more-span :config-obj="configObj" class="more-span-class"></more-span>
      <div class="album-img-container">
        <h1>所属专辑</h1>
        <img :src="album_info.pic_big" style="display:block"/>
        <h2 style="margin-top:.3em;font-size:1em;color:#333">{{album_info.title}}</h2>
        <h3 style="margin-top:.3em;font-size:.9em;color:#999;margin-left:.1em">{{album_info.publishtime}}</h3>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import url_util from './../../../src/common/util/url.js';
import lrc_com from './lrc_com.vue';
import more_span from './more_span.vue';
import * as loca from './../../../src/common/util/local_storage';
import key from './../../common/key.js';
export default {
  name: "play-music-info",
  data(){
    return {
      song_id:102723216,
      song_link:"",
      img_url:'./../static/img/default.png',
      song_info:undefined,
      album_info:undefined,
      configObj:undefined
    };
  },
  created() {
    //do something after creating vue instance
    let song_id = loca.read_item(key.get_song_info);
    let url = url_util.get_song_by_id;
    let album_url = url_util.get_album_info;
    url += song_id;
    // 获取歌曲信息
    this.$http.get(url).then((response)=>{
      if(response.status===200){
        let body = response.body;
        this.song_info = body.songinfo;
        this.img_url = body.songinfo.pic_premium;
        let album_id = this.song_info.album_id;
        if(album_id){
          return this.$http.get(album_url+album_id);
        }
      }
    }).then((response)=>{
      if(response.status===200){
        let album_info = response.body.albumInfo;
        this.album_info = album_info;
        let info = album_info.info;
        this.configObj = {
          info:info,
          direction:'l',
          show_header:"专辑简介"
        }
      }
    }).catch((error)=>{
      console.log("error");
    });
  },
  components: {
    'lrc-com':lrc_com,
    'more-span':more_span
  },
  methods: {
    to_url(album_id) {
      loca.save_item(key.get_album_info,album_id);
      window.location.href = key.jump_album_info;
    },
    to_artist_url(artistid,tingid){
      loca.save_item(key.get_artist_id,artistid);
      loca.save_item(key.get_ting_id,tingid);
      window.location.href = key.jump_artist_info;
    },
    to_play_url(song_id){
      loca.save_item(key.get_play_song_id,song_id);
      let temp = loca.read_item(key.get_has_paly_page);
      if(temp==0){
        loca.save_item(key.get_has_paly_page,"1");
        window.open(key.jump_play_music);
      }
    },
    add_new_music(song_id){
      loca.save_item("add_new_music",song_id);
      let temp = loca.read_item(key.get_has_paly_page);
      if(temp==0){
        loca.save_item(key.get_has_paly_page,"1");
        window.open(key.jump_play_music);
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "./../../../src/common/stylus/mixin.styl";
#play-music-info
  width:100%;
  color: #333;
  gardient-background();
  padding-top: 5em;
  .lrc-and-brief
    width: max-screen-width;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    > .album-brief
      width: 300px;
      margin-top: 4em;
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
      .album-img-container
        margin-top: 2em;
        > h1
          font-size: 1.1em;
          font-weight: 600;
          margin-bottom: .5em;
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
        font-weight: 400;
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
        max-width: 540px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 4em;
        overflow: hidden;
        >button
          border-radius: 3px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: .5em 1.8em;
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
