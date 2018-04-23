<template>
  <div id="App" v-if="current_song">
    <div class="img-container">
      <img :src="current_song.songinfo.pic_premium">
    </div>
    <div class="song-info-container">
      <div class="song-controll">
        <button type="button" class="music-other-button" name="coll-button">
          <i class="icon-heart-icon"></i>
          收藏
        </button>
        <button type="button" class="music-other-button" name="coll-button">
          <i class="icon-heart-icon"></i>
          清空列表
        </button>
        <button type="button" class="music-other-button" name="coll-button">
          <i class="icon-heart-icon"></i>
          删除
        </button>
      </div>
      <div class="song-container">
        <div class="play-list">
          <div class="header">
            <div class="check-box">
              <i class="icon-check-box-icon"></i>
            </div>
            <p class="song_p">歌曲</p>
            <p class="aratist_p">歌手</p>
            <p class="duration_p">时长</p>
          </div>
          <div class="song_container">
            <div class="check-box">
              <i class="icon-check-box-icon"></i>
            </div>
            <p class="song_p">{{current_song.songinfo.title}}</p>
            <p class="aratist_p">{{current_song.songinfo.author}}</p>
            <p class="duration_p">{{current_song.bitrate.file_duration |change_duration}}</p>
          </div>
        </div>
        <div class="song-info">
          <div class="song-img">
            <img :src="current_song.songinfo.pic_big">
          </div>
          <div class="info">
            <p>歌曲名：{{current_song.songinfo.title}}</p>
            <p>歌手名：{{current_song.songinfo.author}}</p>
            <p>专辑名：{{current_song.songinfo.album_title}}</p>
          </div>
          <div class="lrc">
            <p class="lrc-p">
              {{lrc_text}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import url_util from './../../../src/common/util/url';
import * as local_uitl from './../../common/local_storage';
import key from './../../common/key.js';
export default {
  name: "App",
  data() {
    return{
      song_list:[],
      current:0,
      current_song:undefined,
      lrc_text:""
    }
  },
  created() {
    //do something after creating vue instance
    window.onunload = function(){
      local_uitl.save_item(key.get_has_paly_page,"0");
    }
    let song_id = local_uitl.read_item(key.get_play_song_id);
    let url = url_util.get_song_by_id+song_id;
    this.$http.get(url).then((response)=>{
      if(response.status===200){
        let body = response.body;
        this.song_list.push(body);
        this.current_song = body;
        let lrc_url = this.current_song.songinfo.lrclink;
        this.$http.get(lrc_url).then((response)=>{
          if(response.status===200){
            let text = response.bodyText;
            let lrc_array = text.split("\n");
            let res_list = [];
            for(let key in lrc_array){
              let item = lrc_array[key];
              let matches = item.match(/\[\d{2}:\d{2}\.\d{2}\]/ig);
              if(!matches||matches.length==0){
                continue;
              }
              else{
                let time = item.substr(1,8);
                let lrc_text = item.replace(/\[\d{2}:\d{2}\.\d{2}\]/ig,'');
                lrc_text = lrc_text.trim();
                let has_text = (lrc_text!="");
                let m = parseInt(time.substr(0,2));
                let s = parseInt(time.substr(3,2));
                let ms = parseInt(time.substr(6,2));
                let duration = m*60*1000+s*1000+ms*10;
                let obj = {
                  time:duration,
                  lrc_text:lrc_text,
                  has_text:has_text
                }
                res_list.push(obj);
              }
            }
            console.log(res_list);
          }
        });
      }
    })
  },
  components: {

  },
  filters:{
    change_duration(value){
      if(!value){
        return '暂无';
      }
      let result = "";
      let minute = Math.ceil(value/60);
      result+=minute>=10?minute:("0"+minute);
      result+=":";
      let second = value%60;
      result+=second>=10?second:"0"+second;
      return result;
    }
  }
}
</script>
<style lang="stylus" scoped>
#App
  width: 100%;
  height: 100%;
  overflow: hidden;
  .img-container
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
    filter: blur(70px);
    img
      width: 120%;
      height: 120%;
      position: relative;
      left: -10%;
      top: -10%;
  .song-info-container
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.3);
    position: fixed;
    z-index: 200;
    padding: 5em 7em;
    box-sizing: border-box;
    .song-controll
      display: flex;
      flex-direction: row;
      width: 400px;
      justify-content: space-between;
      .music-other-button
        width: 120px;
        height: 40px;
        line-height: 40px;
        border: 1px solid white;
        color: white;
        opacity: 0.8;
        cursor: pointer;
        border-radius: 3px;
        i
          padding-right: 10px;
        &:hover
          opacity: 1;
    .song-container
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      z-index: 300;
      .play-list
        width: 800px;
        padding: .5em;
        margin-top: 2em;
        .header
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          font-size: 1.1em;
          color: white;
          margin-top: 1em;
          padding-bottom: 1em;
          border-bottom: 1px solid rgba(255,255,255,.3);
          .check-box
            width: 3%;
          .song_p
            width:40%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          .aratist_p
            width: 35%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          .duration_p
            width: 10%;
        .song_container
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          font-size: 1.1em;
          color: rgba(255,255,255,0.8);
          padding-top: 1em;
          padding-bottom: 1em;
          border-bottom: 1px solid rgba(255,255,255,.3);
          .check-box
            width: 3%;
          .song_p
            width:40%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          .aratist_p
            width: 35%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          .duration_p
            width: 10%;
      .song-info
        width: 400px;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        opacity: 1;
        position: relative;
        top: -40px;
        right: -40px;
        .song-img
          border-radius: 100px;
          width: 200px;
          height: 200px;
          overflow: hidden;
          img
            width: 100%;
            height: 100%;
        .info
          margin-top: 1em;
          width: 100%;
          color: rgba(255,255,255,.8);
          p
            width: 100%;
            text-align: center;
            margin:.3em 0;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        .lrc
          font-size: 1em;
          width: 100%;
          height: 15em;;
          overflow: hidden;
          color: rgba(255,255,255,0.8);
          .lrc-p
            text-align: left;
            white-space: pre-line;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            line-height: 1.5em;

</style>
