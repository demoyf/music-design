<template>
  <div id="billboard-container">
    <h3 class="billboard-title">排行榜</h3>
    <div class="billboard">
      <one-billboard class="one-billboard" v-for="item in my_class_list" :color-name="item">
      </one-billboard>
      <i class="clear-float"></i>
    </div>
  </div>
</template>
<script>
import one_billboard from './one_billboard';
export default {
  name: "billboard",
  data: function(){
    return {
      my_class_list:["info-container-pink","info-container-blue",
      "info-container-qing","info-container-more-qing","info-container-orange"]
    }
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
</style>
