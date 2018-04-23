<template>
  <div id="song-container">
    <div class="billboard-header">
      <div class="img-header">
      </div>
      <h1>歌曲名</h1>
      <i></i>
      <p>歌手名</p>
      <p>专辑名</p>
      <h2>时长</h2>
    </div>
    <div class="song-list-container">
      <billboard-item class="song-item" v-for="(item,index) in pageList.song_list" :billboard-item="item"
      v-if="item.author&&item.pic_small&&item.album_title&&index<=current">
      </billboard-item>
      <div v-show="show_loading">
        <loading></loading>
      </div>
      <div class="get-more" @click="load_more()" style="text-align:center;margin-top:1em">
        {{text}}
      </div>
    </div>
  </div>
</template>
<script>
import billboard_item from './../../common/components/billboard_item.vue';
import loading from './../../common/components/loading.vue';
import url_util from './../../common/url.js';
export default {
  name: "billboard-container",
  props:['pageInfo','pageList','type'],
  data(){
    return {
      show_loading:false,
      text:"加载更多",
      current:20
    }
  },
  mounted(){

  },
  components: {
    'billboard-item':billboard_item,
    'loading':loading
  },
  methods:{
    load_more(){
      if(this.show_loading){
        return;
      }
      if(this.current>=this.pageList.song_list.length){
        this.text = "无更多数据";
        return;
      }else{
        this.text = "加载更多";
      }
      this.show_loading = true;
      setTimeout(()=>{
          this.current+=20;
          this.show_loading = false;
          if(this.current>=this.pageList.song_list.length){
            this.text = "无更多数据";
            return;
          }
      },500);
    }
  },
  watch:{
  }
}
</script>
<style lang="stylus" scoped>
#song-container
  width:100%;
  margin-top: 3em;
  margin-left: 60px;
  .title h1
    text-align: left;
    margin-bottom: 1.8em;
    font-size: 1.5em;
    color:#333;
    letter-spacing:.3em;
    font-stretch:narrower;
    font-family:SimHei;
    font-weight:bold;
    -webkit-transform: scale(.95);
    transform: scale(.95);
  .billboard-header
    width: 100%;
    height: 50px;
    margin-bottom: 1em;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #000;
    font-size: 1.1em;
    font-weight: 900;
    align-items: center;
    border-radius: 5px;
    .img-header
      width: 80px;
      img
        width: 100%;
        height: 100%;
    h1
      width: 23%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    p
      width: 20%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    h2
      width: 8%;
    i
      display: block;
      width: 18px;
      height: 16px;
  .get-more
    border-radius: 5px;
    padding: 1em;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    cursor: pointer;
  .song-list-container
    height: auto;
    .song-item:nth-child(2n+1)
      background-color: rgba(0,0,0,0.02) !important;
</style>
