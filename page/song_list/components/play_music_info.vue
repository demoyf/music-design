<template>
  <div id="play-music-info">
    <div class="all-info">
    <div class="img-container">
      <img :src="img_url"/>
    </div>
    <div class="info-container">
      <h1>{{song_info.title}}</h1>
      <div class="icon-conatiner">
        <i class="icon-github"></i>
        <span class="artist-name">{{song_info.author}}</span>
      </div>
      <div class="other-info">
        <div class="album-info one-part-info"
        :data-albumid="song_info.album_id">
          专辑：{{song_info.album_title}}
        </div>
        <div class="company-info one-part-info">
          发行公司：{{song_info.si_proxycompany}}
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import url_util from './../../../src/common/util/url.js';
export default {
  name: "play-music-info",
  data(){
    return {
      song_id:102723216,
      song_link:"",
      img_url:'./../../../static/img/default.png',
      song_info:null
    };
  },
  created() {
    //do something after creating vue instance
    let url = url_util.get_song_by_id;
    url += this.song_id;
    console.log(url);
    this.$http.get(url).then((response)=>{
      if(response.status===200){
        let body = response.body;
        this.song_info = body.songinfo;
        this.img_url = body.songinfo.pic_premium;
      }
    }).catch((error)=>{
      console.log("error");
    });
  }
}
</script>
<style lang="stylus" scoped>
@import "./../../../src/common/stylus/mixin.styl";
#play-music-info
  width:100%;
  color: #333;
  .all-info
    width: max-screen-width;
    display: flex;
    flex-direction: row;
    margin:5em auto;
    box-sizing: border-box;
    .img-container
      width: 250px;
      margin: 0 2em;
      >img
        width: 100%;
        height: 100%;
    .info-container
      max-width: 70%;
      padding-left: 1.5em;
      box-sizing: border-box;
      > h1
        margin: .5em 0 .5em 0;
        font-size: 2em;
        font-weight: 400;
        ellipsis_tran();
      > .icon-conatiner
        margin: .2em 0;
        color: #222;
        width: 520px;
        > i
          color: #999;
        .artist-name
          display: inline-block;
          position: relative;
          top: -2px;
          max-width: 80%;
          ellipsis_tran();
        .other-info
          width: 520px;
          display: flex;
          flex-direction: row;
          .one-part-info
            max-width: 50%;
            ellipsis_tran();
</style>
