<template>
  <div id="hot-album">
    <div class="album-container">
      <div class="one-card" v-for="(album,index) in albumList" v-if="index<current">
        <div @click="to_album_url(album.album_id)">
          <img-shadow :img-url="{img_url:album.pic_small}" class="my-img-shadow" >
          </img-shadow>
        </div>
        <h2 class="album-title" @click="to_album_url(album.album_id)" v-html="album.title">{{album.title}}</h2>
        <h2 class="album-author" v-html="album.author">{{album.author}}</h2>
      </div>

    </div>
    <div v-show="show_loading">
      <loading></loading>
    </div>
    <div class="get-more" @click="load_more()" style="text-align:center;margin-top:1em">
      {{text}}
    </div>
  </div>
</template>
<script>
import img_shadow from './../../common/components/img_shadow.vue';
import * as loca from './../../../src/common/util/local_storage';
import key from './../../common/key.js';
import loading from './../../common/components/loading.vue';
export default {
  name: "all-album",
  props:['albumList'],
  data(){
    return {
      current:20,
      show_loading:false,
      text:"加载更多",
    }
  },
  mounted() {
    //do something after mounting vue instance
  },
  methods: {
    to_album_url(album_id) {
      loca.save_item(key.get_album_info,album_id);
      window.open(key.jump_album_info);
    },
    load_more(){
      if(this.show_loading){
        return;
      }
      if(this.current>=this.albumList.length){
        this.text = "无更多数据";
        return;
      }else{
        this.text = "加载更多";
      }
      this.show_loading = true;
      setTimeout(()=>{
          this.current+=20;
          this.show_loading = false;
          if(this.current>=this.albumList.length){
            this.text = "无更多数据";
            return;
          }
      },500);
    }
  },
  components:{
      'loading':loading,
      'img-shadow':img_shadow
  }
}
</script>
<style lang="stylus" scoped>
#hot-album
  width: 100%;
  margin-top: 3em;
  .title-container
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: .5em;
    align-items: center;
    flex-wrap: wrap;
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
  .get-more
    border-radius: 5px;
    padding: 1em;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    cursor: pointer;
  .album-container
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    .one-card
      width: 19%;
      margin-bottom: 1em;
      .my-img-shadow
        width: 100%;
        height: 250px;
        max-height: 250px;
    .album-title
      font-size: 1.1em;
      margin: .3em 0;
      &:hover
        cursor: pointer;
        color: #31c27c;
    .album-author
      font-size: .95em;
      color: #999;
      &:hover
        cursor: pointer;
        color: #31c27c;
</style>
