<template>
  <div id="header">
    <div class="link-container">
      <a href="/">音乐首页</a>
      <a href="/page/all_forum.html">论坛首页</a>
      <a href="#" @click="to_forum_page('hot')">热门</a>
      <a href="#" @click="to_forum_page('new')">最新</a>
    </div>
    <div class="button-container" v-if="!user_info">
      <button class="login-button" @click="to_show_login"> 登录</button>
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
            <p>个人信息管理</p>
            <button type="button" name="button">进入</button>
          </div>
          <div class="forum-manage manage">
            <p>论坛管理</p>
            <button type="button" name="button">进入</button>
          </div>
          <div class="forum-manage manage" v-if="user_info.is_manager">
            <p>用户管理</p>
            <button type="button" name="button">进入</button>
          </div>
          <div class="manage">
            <p></p>
            <button type="button" name="button" @click="login_out">退出</button>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade-in">
      <login-com v-show="show_login" @close-login="my_close" :login-type="'login'"></login-com>
    </transition>
    <transition name="fade-in">
      <login-com v-show="show_reg" @close-login="my_close" :login-type="'reg'"></login-com>
    </transition>
  </div>
</template>
<script>
import  login  from './../../../src/components/login/login.vue';
export default {
  name: "forum-header",
  data(){
    return {
      show_login:false,
      show_reg:false,
      user_info:undefined,
      show_control:false
    }
  },
  created(){
    let user_info = localStorage.getItem("current_user");
    if(user_info&&user_info!==''){
      let data =  JSON.parse(user_info);
      if((typeof data.picture)=='number'||data.picture.indexOf('http')<0){
        data.picture = "http://106.14.13.178/icon/"+data.picture+".jpg";
      }
      this.user_info = data;
    }
    document.addEventListener("click",(event)=>{
      if(this.show_control){
        this.show_control = false;
      }
    });
  },
  components:{
    'login-com':login
  },
  methods: {
    to_forum_page(type){
      localStorage.setItem("forum_sort",type);
      window.location.href = '/page/forum_page.html';
    },
    to_show_login() {
      this.show_login = true;
    },
    my_close(){
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
  }
}
</script>
<style lang="stylus" scoped>
#header
  position: relative;
  width: 100%;
  padding: 0 9%;
  min-width: 1100px;
  box-sizing: border-box;
  margin: auto;
  display: flex;
  justify-content: space-between;
  height: 90px;
  background-color: transparent;
  z-index: 20;
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
  .link-container
    height: 90px;
    display: flex;
    flex-direction: row;
    width: 430px;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2em;
    font-weight: bolder;
    a
      display: block;
      width: 90px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      padding: 0 5px;
      color: #ffffffee;
      outline: none;
      background-color: rgba(0,0,0,0.4);
      border-radius: 5px;
      transition: all .5s;
      box-shadow: 1px 1px 1px rgba(0,0,0,0.2);
      &:hover
        transition: all .5s;
        box-shadow: 1px 1px 7px rgba(255,255,255,0.3);
  .button-container
    width: 210px;
    height: 90px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    button
      color: #ffffffee;
      display: block;
      width: 90px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      padding: 0 5px;
      color: #ffffffee;
      outline: none;
      background-color: rgba(0,0,0,0.2);
      border-radius: 5px;
      transition: all .5s;
      box-shadow: 1px 1px 1px rgba(0,0,0,0.2);
      font-size: 1em;
      &:hover
        transition: all .5s;
        box-shadow: 1px 1px 7px rgba(255,255,255,0.3);
  .user-info-container
    position: relative;
    right:0;
    height:90px;
    line-height:90px;
    width: 90px;
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
      box-shadow: 1px 1px 5px rgba(0,0,0,0.3);
      border-radius: 5px;
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
</style>
