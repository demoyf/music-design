<template>
  <div id="one-billboard-com">
    <div class="bg-container">
      <img src="./../../../static/img/background/back1.jpg"/>
    </div>
    <div class="info-container" :class="color_name">
      <p class="text-center">巅峰榜</p>
      <h3 class="billboard-title">流行指数</h3>
      <div class="hover-change">
        
      </div>
      <ul class="ul-container">
        <li>
          <p>
            1 欲火成诗
          </p>
          <p>
            迪丽热巴/毛不易
          </p>
        </li>
        <li>
          <p>
            1 欲火成诗
          </p>
          <p>
            迪丽热巴/毛不易
          </p>
        </li>
        <li>
          <p>
            1 欲火成诗
          </p>
          <p>
            迪丽热巴/毛不易
          </p>
        </li>
        <li>
          <p>
            1 欲火成诗
          </p>
          <p>
            迪丽热巴/毛不易
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "one-billboard-com",
  props: ['colorName'],
  data: function(){
    return {
      color_name:this.colorName
    }
  },
  mounted() {
    //do something after mounting vue instance
    console.log(this.color_name);
  }
}
</script>
<style lang="stylus" scoped>
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
      transform: scale(1.8) translate(-20%,20%);
      opacity: .25;
      transition: transform .5s;
      transform-origin: 0% 50%;
  &:hover
    .bg-container > img
      transform: scale(1.95) translate(-20%,20%);
      transition: transform .5s;
      transform-origin: 0% 50%;
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
    .billboard-title
      width: 100%;
      text-align: center;
      font-size: 1.6em;
    .ul-container
      padding-left: 2em;
      margin-top: 2em;
      font-size: 1em;
      padding-bottom: 4em;
      > li
        padding-bottom: 1em;
        > p
          padding-top: .5em;
          font-weight: 500;
</style>
