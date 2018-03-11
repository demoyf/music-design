<template>
  <div id="lrc-com">
      <div class="lrc-container" ref="lrc_container">
        {{lrc_text}}
      </div>
      <span class="more-span" @click="expend">[展开]</span>
  </div>
</template>
<script>
export default {
  name: "lrc-com",
  props: ['lrcUrl'],
  data(){
    return {
      lrc_url:this.lrcUrl,
      lrc_text:'',
      is_show:false
    }
  },
  created() {
    //do something after creating vue instance
    console.log(this.lrc_url)
    this.$http.get(this.lrc_url).then((response)=>{
      if(response.status===200){
        let text = response.bodyText;
        text = text.replace(/\[\d{2}:\d{2}\.\d{2}\]/ig,'');
        this.lrc_text = text;
      }
    })
  },
  methods:{
    expend(){
      let is_show = this.is_show;
      if(!is_show){
        this.$refs.lrc_container.classList.add('expend-lrc');
      }else{
        this.$refs.lrc_container.classList.remove('expend-lrc');
      }
      this.is_show = !is_show;
    }
  }
}
</script>
<style lang="stylus" scoped>
@import './../../../src/common/stylus/mixin.styl';
#lrc-com
  max-width: 60%;
  margin-top: 3em;
  margin-bottom: 2em;
  .lrc-container
    height: 29.9em;
    line-height: 1.3em;
    overflow: hidden;
    ellipsis_tran();
    white-space:pre-line;
  .expend-lrc
    height: auto;
  .more-span
    margin-top: 1em;
    display: block;
    width: 3em;
    color: music-color;
    &:hover
      cursor: pointer;
</style>
