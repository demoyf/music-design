<template>
  <div id="recommend-container">
    <div class="parent-container">
      <div class="roll-container">
        <div class="recommend-one-card">
          <a href="#">
            <img src="./../../../static/img/recommend/1.jpg">
          </a>
          <a href="#">
            <img src="./../../../static/img/recommend/2.jpg">
          </a>
        </div>
        <div class="recommend-one-card">
          <a href="#">
            <img src="./../../../static/img/recommend/3.jpg">
          </a>
          <a href="#">
            <img src="./../../../static/img/recommend/4.jpg">
          </a>
        </div>
        <div class="recommend-one-card">
          <a href="#">
            <img src="./../../../static/img/recommend/5.jpg">
          </a>
          <a href="#">
            <img src="./../../../static/img/recommend/6.jpg">
          </a>
        </div>
        <i class="clear-float"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "recommend-container",
  data:function(){
    return{

    }
  }
}
</script>
<style lang="stylus" scoped>
@import "./../../common/stylus/mixin.styl";
#recommend-container
  width: 100%;
  max-width: my-min-width;
  .parent-container
    position: relative;
    width: max-screen-width;
    margin-left: 9%;
    .roll-container
      position: absolute;
      width: 300%;
      float: left;
      .recommend-one-card
        width: 33.33%;
        float: left;
        > a
          display: block;
          width: 44%;
          margin: 3%;
          > img
            width: 100%;
      .clear-float
        content: '';
        clear: both;
@media (max-width:1300px) {
  #recommend-container .parent-container
    width: min-screen-width;
    margin-left: 5%;
}
</style>
