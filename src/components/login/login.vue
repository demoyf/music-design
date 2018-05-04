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
        <div class="code-container" v-if="loginType!=='login'">
          <input type="text" name="code" v-model="info.code" @blur="check_code()"/>
          <button type="button" name="button">获取验证码</button>
        </div>
        <div class="password-container">
          <label>
            密码：
            <input type="password" name="password" v-model="info.password" @blur="check_password()"/>
          </label>
        </div>
        <div class="password-container" v-if="loginType!='login'">
          <label>
            密码：
            <input type="password" name="second_password" v-model="info.second_password" @blur="check_second_password()"/>
          </label>
        </div>
        <div class="check-container" v-if="loginType=='login'">
          <input type="checkbox" name="sex" id="male" class="chooseBtn" v-model="is_manage"/>
          <label for="male" class="choose-label"></label>
          管理员登录选项
        </div>
        <button type="button" name="login" @click="login()" class="login-button">{{loginType=='login'?'登录':'注册'}}</button>
      </div>
      <div class="login-msg" style="display:flex;flex-direction:column;justify-content:center;align-items:center">
        <p style="margin-bottom:1em;font-size:1.2em;">亲爱的{{is_manage?'管理员':'用户'}}</p>
        <p style="color:#31c27c;margin-bottom:1em;">{{login_result_msg}}</p>
        <p>{{loginType=='login'?'欢迎回来':'欢迎加入'}}</p>
      </div>
    </div>
    <my-alert :msg='alert_msg' :is-show="show_alert" :show-color="alert_color"></my-alert>
  </div>
</template>
<script>
import url_util from './../../common/util/url.js';
import my_alert from './../../common/my_alert.vue';
export default {
  name: "login-com",
  props:['loginType'],
  data(){
    return{
      type:this.loginType,
      is_login:false,
      info:{
        username:'',
        password:'',
        second_password:'',
        code:''
      },
      is_manage:false,
      mail_success:false,
      code_success:false,
      password_success:false,
      second_password_success:false,
      show_alert:false,
      alert_msg:'123456',
      alert_color:'#FF7F50',
      login_result_msg:''
    }
  },
  components: {
    'my-alert':my_alert
  },
  methods:{
    close_me(){
      this.is_login = false;
      this.$emit("close-login");
    },
    login(){
      if(this.loginType=='login'){
        if(this.check_email()&&this.check_password()){
          let info = this.info;
          let url = url_util.check_user_info;
          this.$http.post(url,info).then((response)=>{
            if(response.status==200){
              let body = response.body;
              if(body.success){
                let user_data = body.info;
                this.login_result_msg = user_data.nickname;
                setTimeout(()=>{
                  this.is_login = true;
                  setTimeout(()=>{
                    window.location.reload();
                  },1500);
                },200);
                localStorage.setItem("current_user",JSON.stringify(user_data));
              }else{
                this.show_alert_tip(body.msg);
              }
            }
          }).catch(()=>{
            this.show_alert_tip('未知的错误发生了');
          });
        }
      }else{
        if(this.check_email()&&this.check_code()&&this.check_password()&&this.check_second_password()){
          let url = url_util.add_user;
          let info = this.info;
          this.$http.post(url,info).then((response)=>{
            if(response.status==200){
              let body = response.body;
              if(body.success){
                let user_data = body.data;
                this.login_result_msg = user_data.nickname;
                setTimeout(()=>{
                  this.is_login = true;
                  setTimeout(()=>{
                    window.location.reload();
                  },1500);
                },200);
                localStorage.setItem("current_user",JSON.stringify(user_data));
              }else{
                this.show_alert_tip(body.msg);
              }
            }
          }).catch(()=>{
            this.show_alert_tip('未知的错误发生了');
          })
        }
      }
    },
    check_email(){
      let username = this.info.username;
      let regExp = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if(regExp.test(username)){
        this.mail_success = true;
        return true;
      }else{
        this.show_alert_tip('邮箱格式不正确');
      }
      return false;
    },
    check_password(){
      let password = this.info.password;
      if(password.length<6){
        this.show_alert_tip('密码长度不少于6位');
        return false;
      }else{
        this.password_success = true;
        return true;
      }
    },
    check_second_password(){
      let info = this.info;
      if(info.password===info.second_password){
        this.second_password_success = true;
        return true;
      }else{
        this.show_alert_tip('两次输入的密码不一致');
        return false;
      }
    },
    check_code(){
      let info = this.info;
      if(info.code){
        this.code_success = true;
        return true;
      }else{
        this.show_alert_tip('验证码不能为空');
        return false;
      }
    },
    show_alert_tip(msg,color){
      if(msg)
      this.alert_msg = msg;
      if(color)
      this.alert_color = color;
      this.show_alert = true;
      setTimeout(()=>{
        this.show_alert = false;
      },1000);
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
      background-color: white;
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
      .code-container
        padding-left: 1em;
        margin: 1em;
        input
          padding: .3em;
          border-bottom: 1px solid #999;
          border-radius: 3px;
          font-size: 1em;
          width: 10em;
        button
          margin-left: 1em;
          background-color: #31c27c;
          padding: .5em 1em;
          border-radius: 5px;
          color: white;
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
      background-color: white;
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
