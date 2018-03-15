<template>
  <div id="hot-album">
    <div class="title-container">
      <h1>热门专辑</h1>
      <span class="all-song">全部</span>
    </div>
    <div class="album-container">
      <div class="one-card" v-for="album in album_list">
        <div @click="to_album_url(album.album_id)">
          <img-shadow :img-url="{img_url:album.pic_radio}" class="my-img-shadow" >
          </img-shadow>
        </div>
        <h2 class="album-title" @click="to_album_url(album.album_id)">{{album.title}}</h2>
        <h2 class="album-author">{{album.author}}</h2>
      </div>
    </div>
  </div>
</template>
<script>
import img_shadow from './../../common/components/img_shadow';
import * as loca from './../../../src/common/util/local_storage';
import key from './../../common/key.js';
export default {
  name: "all-album",
  props:['albumList'],
  data(){
    return {
      album_list:this.albumList
    }
  },
  mounted() {
    //do something after mounting vue instance
    console.log("enter");
    console.log(this.album_list)
  },
  components:{
    'img-shadow':img_shadow
  },
  methods: {
    to_album_url(album_id) {
      loca.save_item(key.get_album_info,album_id);
      window.location.href = key.jump_album_info;
    }
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
  .album-container
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .one-card
      width: 19%;
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
