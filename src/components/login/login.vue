<template>
  <div id="login-com">
    <div class="main-bg" @click="close_me()">
    </div>
    <div class="container">
      <div class="login-container" :class="is_login?'start-animation':''">
        <div class="title-info">
          <h2>登 录</h2>
        </div>
        <div class="user-name-container">
          <label>
            账号：
            <input type="email" name="user_name" v-model="info.username" @blur="check_email()"/>
          </label>
        </div>
        <div class="password-container">
          <label>
            密码：
            <input type="password" name="password" v-model="info.password"/>
          </label>
        </div>
        <div class="check-container">
          <input type="checkbox" name="sex" id="male" class="chooseBtn" v-model="is_manage"/>
          <label for="male" class="choose-label"></label>
          管理员登录选项
        </div>
        <button type="button" name="login" @click="login()" class="login-button">登录</button>
      </div>
      <div class="login-msg">

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login-com",
  props:['loginType'],
  data(){
    return{
      type:this.loginType,
      is_login:false,
      info:{
        username:'',
        password:''
      },
      is_manage:false
    }
  },
  methods:{
    close_me(){
      this.is_login = false;
      this.$emit("close-login");
    },
    login(){
      this.is_login = true;
    },
    check_email(){

    }
  }
}
</script>
<style lang="stylus" scoped>
#login-com
  width: 100%;
  position: fixed;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 200;
  .main-bg
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 50;
  .container
    z-index: 200;
    position: absolute;
    height: auto;
    filter: drop-shadow(3px 3px 3px #999);
    .login-container
      width: 350px;
      background-color: rgba(255,255,255,0.9);
      border-radius: 10px;
      position: relative;
      z-index: 200;
      border-radius: 10px;
      padding-bottom: 2em;
      .title-info
        text-align: center;
        font-size: 1.3em;
        padding:1em 0;
        h2
          font-weight: bolder;
      .user-name-container,
      .password-container
        padding: 10px;
        font-size: 1.1em;
        color: #333;
        label
          display: block;
          margin: auto;
          text-align: center;
          input
            padding: .3em;
            border-bottom: 1px solid #999;
            border-radius: 3px;
            font-size: 1em;
            background-color: transparent;
      .login-button
        margin:2em auto 0 auto;
        display: block;
        padding: .8em 1.6em;
        background-color: #31c27c;
        border-radius: 5px;
        color: rgba(255,255,255,.8);
      .check-container
        margin: 1em 36px;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 1.1em;
        .chooseBtn
            display: none;
        .choose-label
            box-shadow: #ccc 0 0 0 1px;
            width: 40px;
            height: 18px;
            display: inline-block;
            border-radius: 20px;
            position: relative;
            background-color: #bdbdbd;
            overflow: hidden;
            margin-right: 15px;
        .choose-label:before
            content: '';
            position: absolute;
            left: 0;
            width: 18px;
            height: 18px;
            display: inline-block;
            border-radius: 18px;
            background-color: #fff;
            z-index: 20;
            -webkit-transition: all 0.5s;
            transition: all 0.5s;
        .chooseBtn:checked + label.choose-label:before
            left: 22px;
        .chooseBtn:checked + label.choose-label
            background-color: #31c27c;
    .start-animation
      animation:login-animation .8s;
      animation-fill-mode: forwards;
    .login-msg
      border-radius: 10px;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      z-index: 150;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: rgba(255,255,255,0.9);
@keyframes login-animation {
  0%{
    transform: rotateX(0) translate3d(0,0,0);
  }
  55%{
    transform: rotateX(-30deg) translateX(100%) translateY(-30%);
  }
  56%{
    z-index: 150;
  }
  100%{
    transform: rotateX(0) translate3d(0,0,0);
    z-index: 150;
  }
}
</style>
