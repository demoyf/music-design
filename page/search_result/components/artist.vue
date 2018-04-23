<template>
  <div id="artist-contianer">
    <div class="has-img-artist">
      <div class="img-artist-container"
      v-for="(item,index) in artistList" v-if="item.avatar_middle&&item.author&&index<=current">
      <div class="img-container" @click="to_artist(item.artist_id,item.ting_uid)">
        <img :src="item.avatar_middle" alt="">
      </div>
      <p v-html="item.author">{{item.author}}</p>
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
import * as local_uitl from './../../common/local_storage';
import key from './../../common/key';
import url_util from './../../common/url.js';
import loading from './../../common/components/loading.vue';
export default {
  name: "artist-contianer",
  props:["artistList"],
  data(){
    return{
      current:20,
      show_loading:false,
      text:"加载更多",
    }
  },
  methods: {
    to_artist(artisid,tingid){
      local_uitl.save_item(key.get_artist_id,artisid);
      local_uitl.save_item(key.get_ting_id,tingid);
      window.open(key.jump_artist_info);
    },
    load_more(){
      if(this.show_loading){
        return;
      }
      if(this.current>=this.artistList.length){
        this.text = "无更多数据";
        return;
      }else{
        this.text = "加载更多";
      }
      this.show_loading = true;
      setTimeout(()=>{
          this.current+=20;
          this.show_loading = false;
          if(this.current>=this.artistList.length){
            this.text = "无更多数据";
            return;
          }
      },500);
    }
  },
  components:{
      'loading':loading
  }
}
</script>
<style lang="stylus" scoped>
#artist-contianer
  width: 100%;
  margin: 5em auto;
  .get-more
    border-radius: 5px;
    padding: 1em;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    cursor: pointer;
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
</style>
