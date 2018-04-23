<template>
  <div id="search-container">
    <div class="input-container" ref="input_container">
      <input  placeholder="歌曲名、歌手名、专辑名"
      class="search-input" type="text" name="search-input" v-model="search_content" v-on:keyup.enter="emit_search()"/>
      <i class="icon-search-icon icon" @click="emit_search()" >
      </i>
    </div>
    <img src="/static/img/search.jpg" width="100%" height="100%"/>
    <div class="fix-search" v-show="is_show">
      <input ref="search_fixed"
      class="search-input" type="text" name="search-input" v-model="search_content"  v-on:keyup.enter="emit_search()"/>
      <i class="icon-search-icon" @click="emit_search()"></i>
    </div>
  </div>
</template>
<script>
import * as local_uitl from './../../common/local_storage';
export default {
  name: "search-container",
  data(){
    return{
      is_show:false,
      search_content:""
    }
  },
  mounted(){
    let search_content = local_uitl.read_item("current_search");
    this.search_content = search_content;
    let self = this;
    window.addEventListener("scroll",(event)=>{
      _Scroll(event);
    });
    function _Scroll(event){
      let top = event.target.scrollingElement.scrollTop;
      if(top>270){
        if(self.is_show){
          return;
        }
        self.is_show = true;
        setTimeout(()=>{
          self.$refs.search_fixed.classList.add("large");
          self.$refs.input_container.classList.add("large");
        },0);
      }else{
        if(!self.is_show){
          return;
        }
        self.is_show = false;
        self.$refs.search_fixed.classList.remove("large");
        setTimeout(()=>{
            self.$refs.input_container.classList.remove("large");
        },0);
      }
    }
  },
  methods:{
    emit_search(){
      if(this.search_content==""){
        return;
      }
      this.$emit("search",this.search_content);
    }
  }
}
</script>
<style lang="stylus" scoped>
#search-container
  position: relative;
  width: 100%;
  height: 250px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin-top: 2em;
  img
    filter: blur(3px);
  .input-container
    display:flex;
    -ms-flex-direction:row;
    flex-direction:row;
    align-items:center;
    border-radius:6px;
    position:absolute;
    z-index:50;
    add_prefix('transition',left inpur-second);
    background-color:white;
    width: 40%;
    left: 30%;
    top: 107px;
    background-color: white;
    font-size: .9em;
    padding: 10px 5px;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.4);
    transition: all .5s;
    .search-input
      display: inline-block;
      padding:5px;
      width: calc(100% - 2em);
      position:relative;
    .icon
      display:block;
      color:gray;
      font-size:1.1em;
      position:relative;
      padding-right:0.2em;
      &:hover
        color:music-color;
        cursor:pointer;
  .large
    transition: all .5s;
    width: 60%;
  .fix-search
    position: fixed;
    top: 0;
    left: 0;
    height: 90px;
    width: 101%;
    background-color: white;
    z-index: 300;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 2px 2px 8px rgba(0,0,0,0.4);
    input
      width: 50%;
      margin-left: 10%;
      height: 90px;
      display: block;
      transition: width .5s;
    .large
      transition: width .5s;
      width: 80%;
    i
      display: block;
      width: 90px;
      height: 86px;
      text-align: center;
      line-height: 86px;
      background-color: #31c27c;
      color: white;
      font-size: 1.5em;
      box-shadow: 1px 1px 4px rgba(0,0,0,0.3);
      cursor: pointer;

</style>
