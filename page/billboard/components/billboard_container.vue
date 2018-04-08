<template>
  <div id="billboard-container">
    <div class="title">
      <h1> {{pageInfo.name}}</h1>
    </div>
    <div class="billboard-header">
      <div class="img-header">
        头像
      </div>
      <h1>歌曲名</h1>
      <p>歌手名</p>
      <p>专辑名</p>
      <h2>时长</h2>
    </div>
    <div class="song-list-container">
      <billboard-item v-for="item in pageList" :billboard-item="item">
      </billboard-item>
    </div>
  </div>
</template>
<script>
import billboard_item from './../../common/components/billboard_item.vue';
export default {
  name: "billboard-container",
  props:['pageInfo','pageList'],
  data(){
    return {

    }
  },
  mounted(){

  },
  components: {
    'billboard-item':billboard_item
  }
}
</script>
<style lang="stylus" scoped>
#billboard-container
  width:calc(100% - 300px);
  .title h1
    text-align: left;
    margin-bottom: 1.8em;
    font-size: 1.5em;
    color:#333;
    letter-spacing:.3em;
    font-stretch:narrower;
    font-family:SimHei;
    font-weight:bold;
    -webkit-transform: scale(.95);
    transform: scale(.95);
  .billboard-header
    width: 100%;
    height: 60px;
    margin-bottom: 1em;
    padding-left: 1.5em;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #000;
    font-size: 1.1em;
    font-weight: 900;
    align-items: center;
    box-shadow: 1px 1px 4px rgba(55,255,25,0.25);
    border-radius: 5px;
    .img-header
      width: 60px;
      img
        width: 100%;
        height: 100%;
    h1
      width: 25%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    p
      width: 20%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    h2
      width: 8%;
</style>
