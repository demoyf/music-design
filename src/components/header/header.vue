<template>
  <div id="music-header">
  <div class="music-header-container">
    <h1 class="header-head">
      <a class="home-link" href="/">
        <img src="./../../assets/logo.png">
      </a>
    </h1>
    <div class="header-content">
      <ul class="header-nav">
        <li>
          <a href="/" :class="{'active': 1==active_el}">
          音乐馆
          </a>
        </li>
        <li>
          <a href="/page/hot_artist.html" :class="{'active': 2==active_el}">
          热门歌手
          </a>
        </li>
        <li>
          <a href="/page/billboard.html" :class="{'active': 3==active_el}">
          排行榜
          </a>
        </li>
        <li>
          <a href="#" :class="{'active': 4==active_el}">
          论坛
          </a>
        </li>
      </ul>
    </div>
    <vue-search></vue-search>
    <div class="button-container">
      <button class="login-button" @click="show_l"> 登录</button>
      <button class="register-button">注册</button>
    </div>
  </div>
  <transition name="fade-in">
    <login-com v-show="show_login" @close-login="close_login"></login-com>
  </transition>
  </div>
</template>
<script type="text/javascript">
import vue_search from './vue_search.vue';
import login_com from './../login/login';
export default {
  name: "music-header",
  props: ['active'],
  data() {
    return {
      active_el:this.active,
      show_login:false
    }
  },
  created() {
    //do something after creating vue instance
    if(!this.active_el){
      this.active_el = 1;
    }
  },
  methods: {
    show_l(){
      document.body.style.overflow = "hidden";
      this.show_login = true;
    },
    close_login(){
      console.log("in hear");
      document.body.style.overflow = "visible";
      this.show_login = false;
    }
  },
  compute: {

  },
  components:{
    "vue-search":vue_search,
    'login-com':login_com
  }
}

</script>
<style rel="stylesheet/stylus" lang="stylus">
@import './../../common/stylus/mixin.styl';
#music-header
  width:90%;
  min-width:my-min-width;
  margin:auto;
  .music-header-container
    display: flex;
    add_prefix('flex-direction',row);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    margin: auto;
    width:90%;
    position:relative;
    .header-head
      margin-right:5em;
      -ms-flex-negative:0;
      flex-shrink:0;
      .home-link
        display: table-cell;
        vertical-align: middle;
        height: 90px;
        width: 170px;
        margin: 0 2em
        img
          vertical-align: middle;
          display: inline-block
    .header-content
      flex-shrink:0;
      .header-nav
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: center;
        li
          -ms-flex-pack: center;
        li
          justify-content: center;
        li
          display: list-item;
          -ms-flex-negative:0;
          a
            flex-shrink:0
          a
            height: 90px;
            padding: 0 1.2em;
            line-height: 90px;
            display: inline-block;
            font-size: 1.2em;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.99);
            &:hover
              color: music-color
            &.active
              background-color:music-color;
              color: white
    .button-container
      position:absolute;
      right:0;
      height:90px;
      line-height:90px;
      .login-button
        font-size:1.1em;
        margin-right:1em;
        color:rgba(0,0,0,0.6);
      .register-button
        background-color:music-color;
        color:white;
        font-size:1.1em;
        padding:.5em .7em;
        border-radius:3px;
        margin-right:1em;
        height: 2.2em;
  .fade-in-enter-to,
  .fade-in-leave
    transform: scale(1) rotate(0);
    opacity: 1;
  .fade-in-enter-active,
  .fade-in-leave-active
    transition: all .5s;
    transform: scale(1) rotate(0);
  .fade-in-enter,
  .fade-in-leave-to
    opacity: 0;
    transform: scale(0) rotate(180deg);
</style>
