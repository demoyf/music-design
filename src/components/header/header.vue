<template>
  <div id="music-header">
  <div class="music-header-container">
    <h1 class="header-head">
      <a class="home-link" href="/">
        <img src="./../../assets/logo.jpg" width="170" height="46">
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
          <a href="/page/all_forum.html" :class="{'active': 4==active_el}">
          论坛
          </a>
        </li>
      </ul>
    </div>
    <vue-search></vue-search>
    <div class="button-container" v-if="!user_info">
      <button class="login-button" @click="show_l"> 登录</button>
      <button class="register-button" @click="start_reg">注册</button>
    </div>
    <div class="user-info-container" v-if="user_info" >
      <div class="user-icon" @click="show_user_control">
        <img :src="user_info.picture" alt="">
      </div>
      <div class="user-control" v-show="show_control" :class="show_control?'active':''">
        <div class="info">
          <div class="img-container">
            <img :src="user_info.picture" alt="">
          </div>
          <p>{{user_info.nickname}}</p>
        </div>
        <div class="manage-list">
          <div class="personal-manage manage">
            <p @click="to_manage($event,1)">个人信息管理</p>
            <button type="button" name="button" @click="to_manage($event,1)">进入</button>
          </div>
          <div class="forum-manage manage">
            <p @click="to_manage($event,2)">论坛管理</p>
            <button type="button" name="button" @click="to_manage($event,2)">进入</button>
          </div>
          <div class="forum-manage manage" v-if="user_info.is_manager">
            <p @click="to_manage($event,3)">用户管理</p>
            <button type="button" name="button" @click="to_manage($event,4)">进入</button>
          </div>
          <div class="manage">
            <p></p>
            <button type="button" name="button" @click="login_out">退出</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <transition name="fade-in">
    <login-com v-show="show_login" @close-login="close_login" :login-type="'login'"></login-com>
  </transition>
  <transition name="fade-in">
    <login-com v-show="show_reg" @close-login="close_login" :login-type="'reg'"></login-com>
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
      show_login:false,
      show_reg:false,
      user_info:undefined,
      show_control:false
    }
  },
  created() {
    //do something after creating vue instance
    let user_info = localStorage.getItem("current_user");
    if(user_info&&user_info!==''){
      let data =  JSON.parse(user_info);
      if((typeof data.picture)=='number'||data.picture.indexOf('http')<0){
        data.picture = "http://106.14.13.178/icon/"+data.picture+".jpg";
      }
      this.user_info = data;
    }
    if(!this.active_el){
      this.active_el = 1;
    }
    window.addEventListener("storage",function(event){
      if(event.key=="current_user"){
        setTimeout(()=>{
          window.location.reload();
        },800);
      }
    });
  },
  mounted(){
    document.addEventListener("mousewheel",(event)=>{
      if(this.show_login){
        event.preventDefault();
        event.stopPropagation();
      }
    });
    document.addEventListener("click",(event)=>{
      if(this.show_control){
        this.show_control = false;
      }
    });
  },
  methods: {
    show_l(){
      this.show_login = true;
    },
    to_manage(event,index){
      event.preventDefault();
      event.stopPropagation();
      window.location.href = '/page/manage.html';
    },
    close_login(){
      if(this.show_login)
      this.show_login = false;

      if(this.show_reg)
      this.show_reg = false
    },
    start_reg(){
      this.show_reg = true;
    },
    show_user_control(event){
      this.show_control = true;
      event.preventDefault();
      event.stopPropagation();
    },
    login_out(event){
      localStorage.setItem("current_user",'');
      event.preventDefault();
      event.stopPropagation();
      window.location.reload();
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
    .user-info-container
      position: relative;
      right:0;
      height:90px;
      line-height:90px;
      width: 90px;
      left: 500px;
      .user-icon
        position: absolute;
        top: 20px;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        overflow: hidden;
        cursor: pointer;
        img
          width: 100%;
          height: 100%;
      .user-control
        box-shadow: 1px 1px 5px rgba(0,0,0,0.3);
        border-radius: 5px;
        transition: all .5s;
        transform-origin:  50% 0;
        transform: scaleX(0);
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 90px;
        right: -50px;
        background-color: white;
        z-index: 600;
        width: 300px;
        padding: 2em;
        box-sizing: border-box;
        .info
          display: flex;
          flex-direction: row;
          align-items: center;
          .img-container
            width: 60px;
            height: 60px;
            border-radius: 30px;
            overflow: hidden;
            border: 1px solid white;
            img
              width: 100%;
              height: 100%;
          p
            width: 150px;
            margin-left: 40px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        .manage-list
          display: flex;
          flex-direction: column;
          margin-top: .5em;
          .manage
            margin: .5em 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            p
              width: 100px;
            button
              border-radius: 5px;
              background-color: #31c27c;
              color: white;
              padding: .7em 1em;
      .active
        transition: all .5s;
        transform: scaleX(1);
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
