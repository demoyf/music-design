<template>
  <div id="billboard-container">
    <h3 class="billboard-title">排行榜</h3>
    <div class="billboard">
      <one-billboard class="one-billboard"
      v-for="(item,index) in billboard_list"
      :color-name="my_class_list[index]"
      :billboard-info="item"
      :img-back="img_list[index]">
      </one-billboard>
      <i class="clear-float"></i>
    </div>
  </div>
</template>
<script>
import one_billboard from './one_billboard';
import type_util from './../../common/util/get_type.js';
import url_util from './../../common/util/url';
export default {
  name: "billboard",
  data: function(){
    return {
      my_class_list:["info-container-pink","info-container-blue",
      "info-container-qing","info-container-more-qing","info-container-orange"],
      billboard_list:[],
      img_list:['./../../../static/img/background/back1.jpg',
    './../../../static/img/background/back2.jpg',
  './../../../static/img/background/back3.jpg',
'./../../../static/img/background/back4.jpg','./../../../static/img/background/back5.jpeg']
    }
  },
  created(){
    let type_list = type_util.billboard_info;
    let promise_list = [];
    let url = url_util.billboard;
    let result = [];
    for (let item of type_list) {
      promise_list.push(this.$http.get((url+item.type+"/1")));
    }
    Promise.all(promise_list).then((response_list)=>{
      let index = 0;
      for (let response of response_list) {
        let body = response.body;
        if(!body.billboard.name){
          body.billboard.name = type_list[index].name;
        }
        body.song_list = body.song_list.slice(0,4);
        result.push(body);
        index++;
      }
      this.billboard_list = result;
      console.log(this.billboard_list);
    });
  },
  mounted() {
    //do something after mounting vue instance

  },
  components:{
    'one-billboard':one_billboard
  }
}
</script>
<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl";
#billboard-container
  width: max-screen-width;
  margin-left: 9%;
  overflow: hidden;
  margin-bottom: 6em;
  .billboard-title
    my-font-stretch();
    margin-top: 1.3em;
    position: relative;
  .billboard
    width: 100%;
    float: left;
    .billboard
      .clear-float::after
        clear: both;
        content: '';
    &::after
      clear: both;
      content: '';
@media(max-width:1300px)
  #billboard-container
    width: min-screen-width;
    margin-left: 5%;
</style>
