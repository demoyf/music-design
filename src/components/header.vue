<template>
  <div id="music-header">
    <h1 class="header-head">
      <a class="home-link">
        <img src="./../assets/logo.png" >
      </a>
    </h1>
    <div class="header-content">
      <ul class="header-nav">
        <li>
          <a href="#" class="active">
          音乐馆
          </a>
        </li>
        <li>
          <a href="#">
          我的音乐
          </a>
        </li>
        <li>
          <a href="#">
          客户端
          </a>
        </li>
        <li>
          <a href="#">
          音乐号
          </a>
        </li>
      </ul>
    </div>
    <vue-search></vue-search>
    <div class="button-container">
      <button class="login-button"> 登录</button>
      <button class="register-button">注册</button>
    </div>
  </div>
</template>
<script>
import vue_search from './vue_search.vue';
export default {
  name: "music-header",
  data() {
    return {

    }
  },
  methods: {

  },
  compute: {

  },
  components:{
    "vue-search":vue_search
  }
}

</script>
<style rel="stylesheet/stylus" lang="stylus">
music-color = #31c27c
#music-header
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  -o-flex-direction: row;
  flex-direction: row;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  max-width: 1240px;
  margin: auto;
  width:90%;
  min-width:900px;
  position:relative;
  .header-head
    margin-right:5em;
    flex-shrink:0;
    .home-link
      display: table-cell
      vertical-align: middle
      height: 90px
      width: 170px
      margin: 0 2em
      img 
        vertical-align: middle
        display: inline-block
  .header-content 
    flex-shrink:0;
    .header-nav
      display: flex
      flex-direction: row
      justify-content: center
      li
        display: list-item
        flex-shrink:0
        a 
          height: 90px
          padding: 0 1.2em
          line-height: 90px
          display: inline-block
          font-size: 1.2em
          font-weight: 400
          color: rgba(0, 0, 0, 0.99)
          &:hover
            color: music-color
          &.active 
            background-color:music-color
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
      background-color:music-color
      color:white;
      font-size:1.1em;
      padding:.5em .7em;
      border-radius:3px;
      margin-right:1em;
</style>
