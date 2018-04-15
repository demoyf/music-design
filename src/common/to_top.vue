<template>
  <div id="to-top">
    <div class="container" @click="back_top()" :class="is_show?'show-top':''">
      <i class="icon-chevron-up"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "to-top",
  data(){
    return {
      is_show:false
    }
  },
  methods:{
    back_top(){
      let duration = 300;
      let startX = window.scrollY;
      let step = Math.floor((startX/duration)*20);
      if(this.is_show){
        setTimeout(_scroll,20);
      }
      function _scroll(){
        if(startX-step<=0){
          window.scrollTo(0,0);
          return;
        }else{
          window.scrollTo(0,startX-step);
          console.log(startX-step);
          startX -= step;
          setTimeout(_scroll,20);
        }
      }
    }
  },
  mounted(){
    let self = this;
    document.body.onscroll = function(event){
      let top = event.target.scrollingElement.scrollTop;
      // console.log();
      if(top==0){
        self.is_show = false;
      }else{
        if(self.is_show){
          return;
        }
        self.is_show = true;
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
#to-top
  width: 40px;
  height: 40px;
  position: fixed;
  right: 50px;
  bottom: 50px;
  z-index: 100;
  .container
    width: 100%;
    height: 100%;
    line-height: 40px;
    background-color: rgba(0,0,0,0.4);
    text-align: center;
    border-radius: 5px;
    transition: all .5s;
    opacity: 0;
    transform: translateY(100%) scaleY(0);
    box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    cursor: pointer;
    i
      color: rgba(255,255,255,0.8);
      font-size: 1.3em;
  .show-top
    opacity: 1;
    transform: translateY(0) scaleY(1);
</style>
