<template>
  <div id="App">
    <forum-header></forum-header>
    <div class="info-container">
      <span class="center-icon" @click="to_publish">
        <i class="icon-quill"></i>
      </span>
      <h1>不准备写点什么吗？</h1>
      <h2>不要试图去填满生命的空白，因为，音乐就来自那空白深处~</h2>
      <h2 class="name">——泰戈尔</h2>
    </div>
    <to-top></to-top>
  </div>
</template>
<script>
import url_util from './../../../src/common/util/url';
import * as local_uitl from './../../common/local_storage';
import key from './../../common/key.js';
import forum_header from './../components/header.vue';
import to_top from './../../common/components/to_top.vue';
import editor_tinymce from './../../common/components/editor.vue';
export default {
  name: "App",
  data() {
    return{

    }
  },
  components: {
    'forum-header':forum_header,
    'to-top':to_top
  },
  methods:{
    to_publish(){
      window.open('/page/publish_page.html');
    }
  }
}
</script>
<style lang="stylus" scoped>
#App
  width: 100%;
  position: relative;
  .info-container
    width: 100%;
    top: -90px;
    height: 460px;
    position: relative;
    padding: 6em 0 12em 0;
    background-attachment: scroll,	scroll,	scroll;
    background-image: url('/../static/img/top-1600.svg'),url('/../static/img/overlay.png'), url('/../static/img/forum.jpg');
    background-size: 1600px 230px,	auto,	cover;
    background-position: bottom center,	top left, center center;
    background-repeat: repeat-x,	repeat,	no-repeat;
    h1
      position: absolute;
      width: 100%;
      font-size: 1.8em;
      text-align: center;
      color: white;
      top: 44%;
      font-weight: 900;
      margin-bottom: 1.8em;
      letter-spacing:.3em;
      font-stretch:narrower;
      font-family:SimHei;
      font-weight:bold;
    h2
      position: absolute;
      width: 100%;
      font-size: 1.3em;
      text-align: center;
      color: #7e7e7e;
      top: 51%;
      font-weight: 900;
    .name
      top: 57%;
      width: 130px;
      left: 61%;
    .center-icon
      display: block;
      position: absolute;
      left: calc(50% - 30px);
      top: calc(35% - 30px);
      width: 60px;
      height: 60px;
      border-radius: 30px;
      text-align: center;
      line-height: 70px;
      background-color: #4eb980;
      cursor: pointer;
      transition: all .5s;
      i
        font-size: 1.7em;
        color: white;
        display: block;
        padding-top: 15px;
      &:hover
        width: 70px;
        height: 70px;
        border-radius: 35px;
        line-height: 80px;
        left: calc(50% - 35px);
        top: calc(35% - 35px);
        transition: all .5s;
        i
          padding-top: 20px;
          animation: rotate-scroll .5s ease-in-out;
@keyframes rotate-scroll {
  0%{
    transform: rotate(0);
  }
  25%{
    transform: rotate(25deg);
  }
  50%{
    transform: rotate(0deg);
  }
  75%{
    transform: rotate(-25deg);
  }
  100%{
    transform: rotate(0deg);
  }
}
</style>
