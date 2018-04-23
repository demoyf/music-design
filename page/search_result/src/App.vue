<template>
  <div id="App">
    <header-com :active="1"></header-com>
    <search-container @search="change_keyword"></search-container>
    <div style="width:82%;margin:6em auto;">
      <title-list @change_search="change_type"></title-list>
      <div v-show="type==1">
        <song-container :page-list="song_list"></song-container>
      </div>
      <div v-show="type==2">
        <artist-contianer :artist-list="artist_list"></artist-contianer>
      </div>
      <div v-show="type==3">
        <album-container :album-list="album_list"></album-container>
      </div>
    </div>
    <my-footer></my-footer>
    <to-top></to-top>
  </div>
</template>
<script>
import my_header from './../../../src/components/header/header.vue';
import footer from './../../../src/components/footer/footer.vue';
import url_util from './../../common/url.js';
import to_top from './../../common/components/to_top.vue';
import * as local_uitl from './../../common/local_storage';
import search_container from './../components/search_container.vue';
import title_list from './../components/title_list.vue';
import song_container from './../components/song_container.vue';
import artist_container from './../components/artist.vue';
import album_container from './../components/album.vue';
export default {
  name: "App",
  data() {
    return{
      type:1,
      keywords:"",
      song_list:[],
      artist_list:[],
      album_list:[]
    }
  },
  created(){
    let search_content = local_uitl.read_item("current_search");
    let url = url_util.search_all+search_content+"/0";
    this.$http.get(url).then((response)=>{
      if(response.status===200){
        let song_list = response.body.result.song_info;
        this.song_list = song_list;
      }
    });
  },
  mounted() {
    //do something after mounting vue instance
  },
  components: {
    'header-com':my_header,
    'my-footer':footer,
    'to-top':to_top,
    'search-container':search_container,
    'title-list':title_list,
    'song-container':song_container,
    'artist-contianer':artist_container,
    'album-container':album_container
  },
  methods: {
    change_type(index){
      if(this.type==index){
        return;
      }
      this.type=index;
      if(index==1&&this.song_list.song_list.length&&this.song_list.song_list.length>0){
        return;
      }
      if(index==2&&this.artist_list.length>0){
        return;
      }
      if(index==3&&this.album_list.length>0){
        return;
      }
      let search_content = local_uitl.read_item("current_search");
      let url = url_util.search_all+search_content+"/"+(index-1);
      this.$http.get(url).then((response)=>{
        if(response.status===200){
          if(index==1){
            let song_list = response.body.result.song_info;
            this.song_list = song_list;
          }else if(index==2){
            let artist_list = response.body.result.artist_info.artist_list;
            this.artist_list = artist_list;
          }else if(index==3){
            let album_list = response.body.result.album_info.album_list;
            this.album_list = album_list;
          }
        }
      });
      // console.log("emit:"+index);
    },
    change_keyword(keyword){
      let search_content = local_uitl.save_item("current_search",keyword);
      window.location.reload();
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
