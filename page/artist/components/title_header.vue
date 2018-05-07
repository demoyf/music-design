<template>
  <div id="title-header">
    <div class="all-info" v-if="artist_info!=undefined">
      <div class="img-container">
        <img :src="img_url"/>
      </div>
      <div class="info-container">
        <h1>{{artist_info.name}}</h1>
        <div class="other-info">
          <div class="album-info one-part-info">
            国籍：
            <span>
              {{artist_info.country}}</span>
          </div>
          <div class="company-info one-part-info">
            生日：
            <span>{{artist_info.birth}}</span>
          </div>
        </div>
        <div class="other-info">
          <div class="album-info one-part-info">
            所属公司：
            <span>
              {{artist_info.company}}</span>
          </div>
          <div class="company-info one-part-info">
            星座：
            <span>{{artist_info.constellation}}</span>
          </div>
        </div>
        <div class="intro-container">
          <p>{{artist_info.intro}}</p>
          <more-span :config-obj="configObj"></more-span>
        </div>
        <div class="artist-song-etc">
          <h1>单曲 {{artist_info.songs_total}} | </h1>
          <h1>专辑 {{artist_info.albums_total}} | </h1>
          <h1>MV {{artist_info.mv_total}}</h1>
        </div>
      <div class="button-container">
          <button class="music-play-button" type="button" name="play-button" @click="play_new_music_list">
            <i class="icon-play-icon-1"></i>热门</button>
          <button type="button" class="music-other-button" name="coll-button" @click="add_new_music_list">
            <i class="icon-plus-square-icon" style="font-weight:100"></i>
            播放队列
          </button>
          <button type="button" class="music-other-button" name="coll-button" @click="collect_this">
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
    <div class="hot-song-container">
      <hot-song v-if="songList!==undefined"
      :song-list="songList"></hot-song>
      <hot-album v-if="albumList!=undefined" :album-list="albumList">
      </hot-album>
    </div>
    <my-alert :msg='alert_msg' :is-show="show_alert" :show-color="alert_color"></my-alert>
  </div>
</template>
<script>
import * as loca from './../../common/local_storage';
import key_util from './../../common/key';
import url_util from './../../common/url';
import more_span from './../../song_list/components/more_span';
import hot_song from './hot_song.vue';
import hot_album from './hot_album.vue';
import my_alert from './../../../src/common/my_alert.vue';
export default {
  name: "title-header",
  data(){
    return {
      img_url:'/static/img/default.png',
      artist_info:undefined,
      configObj:undefined,
      songList:undefined,
      albumList:undefined,
      show_alert:false,
      alert_msg:'123456',
      alert_color:'#FF7F50',
    }
  },
  created(){
    let artist_url = url_util.get_artist_by_id;
    let artist_id = loca.read_item(key_util.get_artist_id)||88;
    let tinguid = loca.read_item(key_util.get_ting_id)||2517;
    artist_url += tinguid+"/"+artist_id;
    let artist_song_url = url_util.get_artist_song_lsit;
    artist_song_url += tinguid+"/"+artist_id+"/1";
    let artist_album_url = url_util.get_artist_album;
    artist_album_url += tinguid+"/1";
    this.$http.get(artist_url).then((response)=>{
      if(response.status===200){
        let body = response.body;
        this.artist_info = body;
        this.img_url = body.avatar_big;
        this.configObj = {
          info:body.intro,
          direction:'t',
          show_header:"歌手简介"
        }
      }
    });
    this.$http.get(artist_song_url).then((response)=>{
      if(response.status===200){
        let songlist = response.body.songlist.slice(0,10);
        this.songList = songlist;
      }
    });
    this.$http.get(artist_album_url).then((response)=>{
      if(response.status===200){
        this.albumList = response.body.albumlist.slice(0,5);
      }
    });
  },
  components:{
    'more-span':more_span,
    'hot-song':hot_song,
    'hot-album':hot_album,
    'my-alert':my_alert
  },
  methods: {
    show_alert_tip(msg,color){
      if(msg)
      this.alert_msg = msg;
      if(color)
      this.alert_color = color;
      this.show_alert = true;
      setTimeout(()=>{
        this.show_alert = false;
      },1000);
    },
    collect_this(){
      let info = this.artist_info;
      let url = url_util.collect_url;
      let str = localStorage.getItem("current_user");
      if(typeof str == 'object'||str==''){
        this.show_alert_tip('请先登录','#FF7F50');
        return;
      }
      let current_user = JSON.parse(str);
      let obj = {
        user_id:current_user._id,
        title:info.name,
        is_ban:false,
        artist_id:info.artist_id,
        picture:info.avatar_big,
        ting_uid:info.ting_uid,
        type:2
      };
      this.$http.post(url,obj).then((response)=>{
        if(response.status==200){
          if(response.body.success)
            this.show_alert_tip('收藏成功','#31c27c');
          else{
            this.show_alert_tip(response.body.msg,'#FF7F50');
          }
        }
      }).catch(()=>{
        this.show_alert_tip('添加失败','#FF7F50');
      });
    },
    to_publish(){
      let info = this.artist_info;
      let obj = {
        name:info.name,
        picture:info.avatar_small,
        artist_id:info.artist_id,
        ting_uid:info.ting_uid
      }
      localStorage.setItem("publish_artist",JSON.stringify(obj));
      window.open('/page/publish_page.html');
    },
    play_new_music_list() {
      let song_list = this.songList;
      let id_list = '';
      for(let item of song_list){
        id_list += item.song_id+",";
      }
      id_list = id_list.substr(0,id_list.length-1);
      loca.save_item("play_new_music_list",id_list);
      let temp = loca.read_item(key_util.get_has_paly_page);
      if((typeof temp == 'object')||temp==0){
        loca.save_item(key_util.get_has_paly_page,"1");
        window.open(key_util.jump_play_music);
      }
    },
    add_new_music_list(){
      let song_list = this.songList;
      let id_list = '';
      for(let item of song_list){
        id_list += item.song_id+",";
      }
      id_list = id_list.substr(0,id_list.length-1);
      loca.save_item("add_new_music_list",id_list);
      let temp = loca.read_item(key_util.get_has_paly_page);
      if((typeof temp == 'object')||temp==0){
        loca.save_item(key_util.get_has_paly_page,"1");
        window.open(key_util.jump_play_music);
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "./../../../src/common/stylus/mixin.styl";
#title-header
  width:100%;
  color: #333;
  gardient-background();
  padding-top: 5em;
  .all-info
    width: max-screen-width;
    display: flex;
    flex-direction: row;
    margin:auto;
    box-sizing: border-box;
    .img-container
      width: 250px;
      margin: 0 2em 0 0;
      border-radius: 50%;
      overflow: hidden;
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
      .other-info
        width: 520px;
        display: flex;
        flex-direction: row;
        margin-top: .5em;
        .one-part-info
          width: 47%;
          margin-right: 3%;
          ellipsis_tran();
          >span:hover
            color: music-color;
            cursor: pointer;
      .intro-container
        display: flex;
        flex-direction: row;
        align-items: center;
        >p
          display: inline-block;
          max-width: 80%;
          ellipsis_tran();
      .artist-song-etc
        display: flex;
        margin-top: .5em;
        flex-direction: row;
        font-size: 1.2em;
        >h1
          margin-right: .3em;
      .button-container
        max-width: 540px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 2em;
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
  .hot-song-container
    width: max-screen-width;
    margin:5em auto;
</style>
