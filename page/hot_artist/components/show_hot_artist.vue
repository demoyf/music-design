<template>
  <div id="show-hot-artist">
    <div class="has-img-artist">
      <div class="img-artist-container"
      v-for="item in img_hot">
      <div class="img-container" @click="to_artist(item.artist_id,item.ting_uid)">
        <img :src="item.music_url" alt="">
      </div>
      <p>{{item.name}}</p>
      </div>
    </div>
    <div class="just-span-list" v-if="span_hot!==undefined"
    >
      <p v-for="item in span_hot" @click="to_artist(item.artist_id,item.ting_uid)">{{item.name}}</p>
    </div>
    <pagination-com @pagination="change"
    :page-num="page_info.page_num"></pagination-com>
  </div>
</template>
<script>
import pagination from './../../common/components/pagination.vue';
import * as local_uitl from './../../common/local_storage';
import key from './../../common/key';
import url_util from './../../common/url.js';
export default {
  name: "show-hot-artist",
  props: ['hotArtist',"pageInfo"],
  data(){
    return {
      artist_list:this.hotArtist,
      music_url:'/static/img/default.png',
      img_hot:undefined,
      span_hot:undefined,
      page_info:this.pageInfo
    }
  },
  created() {
    //do something after creating vue instance
    let hot_artist = this.artist_list;
    let img_list = hot_artist.slice(0,10);
    for(let i = 0;i<img_list.length;i++){
      let item = img_list[i];
      item.music_url = this.music_url;
    }
    this.img_hot = img_list;
    let temp_img_list = this.img_hot;
    for(let i = 0;i<temp_img_list.length;i++){
      let item = temp_img_list[i];
      let img = new Image();
      img.src = item.avatar_big;
      img.onload = ((i)=>{
        this.img_hot[i].music_url = item.avatar_big;
      })(i);
    }
    if(hot_artist.length>10){
      let span_list = hot_artist.slice(10,hot_artist.length);
      this.span_hot = span_list;
    }
  },
  mounted() {
    //do something after mounting vue instance
    console.log("mounted");
  },
  components: {
    'pagination-com':pagination
  },
  methods:{
    change(index){
      let url = url_util.get_hot_artsit+"?page="+(index-1);
      this.$http.get(url).then((response)=>{
        if(response.status===200){
          let body = response.body;
          this.artist_list = body.artist;
          let hot_artist = this.artist_list;
          let img_list = hot_artist.slice(0,10);
          for(let i = 0;i<img_list.length;i++){
            let item = img_list[i];
            item.music_url = this.music_url;
          }
          this.img_hot = img_list;
          let temp_img_list = this.img_hot;
          for(let i = 0;i<temp_img_list.length;i++){
            let item = temp_img_list[i];
            let img = new Image();
            img.src = item.avatar_big;
            img.onload = ((i)=>{
              this.img_hot[i].music_url = item.avatar_big;
            })(i);
          }
          if(hot_artist.length>10){
            let span_list = hot_artist.slice(10,hot_artist.length);
            this.span_hot = span_list;
          }
        }
      });
    },
    to_artist(artisid,tingid){
      local_uitl.save_item(key.get_artist_id,artisid);
      local_uitl.save_item(key.get_ting_id,tingid);
      window.open(key.jump_artist_info);
    }
  }
}
</script>
<style lang="stylus" scoped>
@import './../../../src/common/stylus/mixin.styl';
#show-hot-artist
  width: max-screen-width;
  margin: 5em auto;
  .has-img-artist
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    .img-artist-container
      width: 19%;
      background-color: #99999911;
      border-radius: 10px;
      margin-top: 1em;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .img-container
        width: 80%;
        border-radius: 50%;
        overflow: hidden;
        margin: 10%;
        >img
          width: 100%;
          height: 100%;
          display: block;
      > p
        ellipsis_tran();
        max-width: 100%;
        margin-bottom: 2em;
        &:hover
          color: music-color;
          cursor: pointer;
  .just-span-list
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 3em;
    > p
      width: 19%;
      padding: .3em;
      display: block;
      text-align: left;
      ellipsis_tran();
      &:hover
        color: music-color;
        cursor: pointer;
</style>
