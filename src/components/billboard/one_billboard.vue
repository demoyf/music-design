<template>
  <div id="one-billboard-com">
    <div class="bg-container">
      <img :src="background_url"/>
    </div>
    <div class="info-container" :class="color_name">
      <p class="text-center">巅峰榜</p>
      <h3 class="billboard-title">{{billboard_info.billboard.name}}</h3>
      <div class="hover-change">
        <i class="icon-play-icon billboard-icon"></i>
      </div>
      <ul class="ul-container">
        <li v-for="(item,index) in billboard_info.song_list">
          <p>
            {{index+1}}  {{item.title}}
          </p>
          <p class="artist-name">
            {{item.artist_name}}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "one-billboard-com",
  props: ['colorName','billboardInfo',"imgBack"],
  data: function(){
    return {
      color_name:this.colorName,
      billboard_info:this.billboardInfo,
      background_url:this.imgBack
    }
  },
  mounted() {
    //do something after mounting vue instance
  }
}
</script>
<style lang="stylus" scoped>
@import "./../../common/stylus/mixin.styl";
#one-billboard-com
  width: 18%;
  margin:0 1%;
  position: relative;
  float: left;
  overflow: hidden;
  .bg-container
    position: absolute;
    > img
      display: block;
      float: left;
      width: 100%;
      height: 100%;
      transform: scale(2.1) translate(-20%,20%);
      opacity: .2;
      transition: transform .5s;
      transform-origin: 0% 50%;
  &:hover
    .bg-container > img
      transform: scale(2.2) translate(-20%,20%);
      transition: transform .5s;
      transform-origin: 0% 50%;
    .info-container
      .hover-change
        &::after
          transition: opacity .5s;
          opacity: 0;
        .billboard-icon
          opacity: 1;
          transform: scale(1);
          transition: all .7s;
  .info-container-pink
    background-color:rgba(233, 64, 99, 0.68);
  .info-container-blue
    background-color:rgba(85, 115, 244, 0.66);
  .info-container-qing
    background-color:rgba(26, 155, 195, 0.68);
  .info-container-more-qing
    background-color:rgba(3, 93, 83, 0.66);
  .info-container-orange
    background-color:rgba(240, 128, 56, 0.67);
  .info-container
    position: relative;
    box-sizing: border-box;
    color: white;
    .text-center
      width: 100%;
      text-align: center;
      padding-top: 3em;
      font-size: 1.4em;
      font-weight: 100;
      padding-bottom: .3em;
    .hover-change
      position: relative;
      &::after
        content: '';
        display: block;
        width:2em;
        height: .2em;
        background-color: white;
        position: absolute;
        margin-left: 50%;
        left: -1em;
        top: 1.3em;
        transition: all .4s;
        opacity: 1;
      .billboard-icon
        display: block;
        background-color: white;
        height: 2em;
        width: 2em;
        line-height: 1.5em;
        border-radius: 50%;
        color: #666;
        text-align: center;
        box-sizing: border-box;
        padding-left: .24em;
        padding-top: .24em;
        font-size: 1.4em;
        margin:auto;
        opacity: 0;
        box-shadow: 1px 0px 1px 1px rgba(0,0,0,0.1);
        transform: scale(0);
        transition: all .7s;
    .billboard-title
      width: 100%;
      text-align: center;
      font-size: 1.6em;
      margin-bottom: 1em;
    .ul-container
      padding-left: 2em;
      margin-top: 2em;
      font-size: 1em;
      padding-bottom: 3em;
      > li
        padding-bottom: 1em;
        > p
          padding-top: .5em;
          font-weight: 500;
          padding-right: 1em;
          ellipsis_tran();
        .artist-name
          padding-left: .8em;
          padding-top: .6em;
</style>
