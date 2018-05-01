<template>
  <div id="billboard-container">
    <div class="title">
      <h1> {{pageInfo.name}}</h1>
    </div>
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
      <billboard-item v-for="item in pageList" :billboard-item="item">
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
      current:1
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
      if(this.show_loading||this.pageInfo.page_num<=this.current){
        return;
      }
      this.current++;
      this.show_loading = true;
      let url = url_util.billboard;
      url += this.type+"/"+this.current;
      this.$http.get(url).then((response)=>{
        if(response.status===200){
          setTimeout(()=>{
            this.show_loading = false;
            let body = response.body;
            if(body.song_list)
            this.pageList.push(...body.song_list);
          },500);
        }
      });
      if(this.pageInfo.page_num<=this.current){
        this.text = "无更多数据";
      }else{
        this.text = "加载更多";
      }
    }
  },
  watch:{
    pageInfo(){
      this.current = 1;
      if(this.pageInfo.page_num<=this.current){
        this.text = "无更多数据";
      }else{
        this.text = "加载更多";
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
#billboard-container
  width:calc(100% - 300px);
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
    height: 60px;
    margin-bottom: 1em;
    padding-left: 1.5em;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #000;
    font-size: 1.1em;
    font-weight: 900;
    align-items: center;
    box-shadow: 1px 1px 4px rgba(55,255,25,0.25);
    border-radius: 5px;
    .img-header
      width: 60px;
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
      width: 10%;
      height: 16px;
  .get-more
    border-radius: 5px;
    padding: 1em;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    cursor: pointer;
</style>
