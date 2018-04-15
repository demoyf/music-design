<template>
  <div id="search-container">
    <div class="input-container" ref="input_container">
      <input ref="search_input" placeholder="歌曲名、歌手名、专辑名" class="search-input input-large" type="text" name="search-input" v-on:input="search_suggestion" v-model="search_content" v-on:blur="hide_result" v-on:focus="show_result" v-on:keyup.enter="local_to_search_page">
      <i class="icon-search-icon icon">
      </i>
    </div>
    <img src="/static/img/search.jpg" width="100%" height="100%"/>
    
  </div>
</template>
<script>
export default {
  name: "search-container",
  data(){

  },
  mounted(){
    let self = this;
    document.body.onscroll = function(event){
      let top = event.target.scrollingElement.scrollTop;
      // console.log();
      if(top==0){

      }else{

      }
    }
  }
}
</script>
<style lang="stylus" scoped>
#search-container
  position: relative;
  width: 100%;
  height: 200px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
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
    top: 82px;
    background-color: white;
    font-size: .9em;
    padding: 10px 5px;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.4);
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
</style>
