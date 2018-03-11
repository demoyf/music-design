<template>
  <div id="more-span">
    <span class="more-click" @click="show_mod">[更多]</span>
    <div class="more-info-container" v-show="is_show">
      <div class="more-header">
        专辑简介
      </div>
      <div class="album-info">
          {{config.album_info}}
      </div>
      <div class="pointer-icon">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "more-span",
  props: ['configObj'],
  data(){
    return {
      config:this.configObj,
      is_show:false
    }
  },
  mounted(){
    let that = this;
    let body = document.body||document.documentElement.body;
    body.addEventListener("click",(event)=>{
      let classList = event.target.classList;
        if(classList.contains("more-click")
        ||classList.contains("more-info-container")
        ||classList.contains("more-header")
        ||classList.contains("album-info")){
          return;
        }
        if(that.is_show){
          that.is_show = false;
        }
    });
  },
  methods:{
    show_mod(){
      if(!this.is_show){
        this.is_show = !this.is_show;
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
#more-span
  >span
    color: #31c27c;
    font-size: 1em;
    margin-top: .7em;
    margin-left: .2em;
    display: inline-block;
    &:hover
      cursor: pointer;
  > .more-info-container
    width: 600px;
    left: -610px;
    top:-142px;
    float: left;
    position: relative;
    box-shadow: 0px 0px 2px 2px rgba(0,0,0,0.1);
    border-radius: 5px;
    padding-right: .2em;
    z-index: 100;
    .more-header
      font-size: 1.3em;
      background-color: white;
      padding-top: 1em;
      padding-left: 16px;
      font-weight: 600;
      padding-bottom: 10px;
    .album-info
      height: 100%;
      width: 100%;
      padding: 16px 20px;
      float: left;
      position: relative;
      background-color: white;
      overflow-y: scroll;
      box-sizing: border-box;
      height: 200px;
    > .pointer-icon
      width: .6em;
      height: .6em;
      border-left: 1px solid rgba(0,0,0,0.07);
      border-top: 1px solid transparent;
      border-right: 1px solid transparent;
      border-bottom: 1px solid transparent;
      border-width: .6em;
      float: left;
      box-sizing: border-box;
      position: absolute;
      left: 100%;
      top: 50%;
    &::after
      content: '';
      clear: both;
</style>
