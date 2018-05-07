<template>
  <div id="App">
    <forum-header></forum-header>
    <div class="info">
      <div class="bg">
      </div>
      <div class="title-info">
        {{current_user.nickname}}
      </div>
      <div class="tag-info">
        {{current_user.personal_tag}}
      </div>
      <div class="img-container" @click="show_choose_click">
        <div class="img-shadow">
        </div>
        <div class="real-img">
          <img :src="current_user.picture | get_picture" alt="">
        </div>
      </div>
    </div>
    <div class="banner">
      <span :class="current_banner==1?'my-active':''" @click="change_banner(1)">个人信息</span>
      <span :class="current_banner==2?'my-active':''" @click="change_banner(2)">收藏管理</span>
      <span :class="current_banner==3?'my-active':''" @click="change_banner(3)">论坛管理</span>
      <span :class="current_banner==4?'my-active':''" v-if="current_user.is_manager" @click="change_banner(4)">内容管理</span>
    </div>
    <div class="manage-content">
      <personal-manage v-if="current_banner==1" :current-user="current_user" @infochange="submit_info"></personal-manage>
      <collect-manage v-if="current_banner==2" @showtip='show_manage_tip' :current-user="current_user"></collect-manage>
      <my-forum-manage v-if="current_banner==3" @showtip='show_manage_tip' :current-user="current_user"></my-forum-manage>
      <manage-user v-if="current_banner==4"></manage-user>
    </div>
    <to-top></to-top>
    <choose-img @closechoose="close_choose_img" @choosesuccess="choose_img_success" v-show="show_choose_img" :current-index="current_user.picture">
    </choose-img>
    <my-footer></my-footer>
    <my-alert :msg='alert_msg' :is-show="show_alert" :show-color="alert_color"></my-alert>
  </div>
</template>
<script>
import url_util from './../../common/url';
import forum_header from './../../all_forum/components/header.vue';
import to_top from './../../common/components/to_top.vue';
import personal_manage from './../components/personal_manage';
import footer from './../../../src/components/footer/footer.vue';
import choose_img from './../components/choose_img';
import my_alert from './../../../src/common/my_alert.vue';
import collect_manage from './../components/collect_manage.vue';
import my_forum_manage from './../components/my_forum_manage';
import manage_user from './../components/manage_user.vue';
export default {
  name: "App",
  data() {
    return{
      current_user:undefined,
      current_banner:1,
      show_choose_img:false,
      show_alert:false,
      alert_msg:'123456',
      alert_color:'#FF7F50',
    }
  },
  components: {
    'forum-header':forum_header,
    'to-top':to_top,
    'personal-manage':personal_manage,
    'my-footer':footer,
    'choose-img':choose_img,
    'my-alert':my_alert,
    'collect-manage':collect_manage,
    'my-forum-manage':my_forum_manage,
    'manage-user':manage_user
  },
  methods:{
    show_alert_tip(msg,color){
      if(msg)
      this.alert_msg = msg;
      if(color)
      this.alert_color = color;
      this.show_alert = true;
      setTimeout(()=>{
        this.show_alert = false;
      },1000);
    },
    change_banner(index){
      this.current_banner = index;
    },
    close_choose_img(){
      this.show_choose_img = false;
    },
    show_manage_tip(msg){
      this.show_alert_tip(msg,'#31c27c');
    },
    submit_info(nickname,personal_tag){
      if(nickname==''||personal_tag==''){
        this.show_alert_tip('内容不能为空','#FF7F50');
        return;
      }
      let current_user = this.current_user;
      let url = url_util.update_user_info+current_user._id;
      let obj = {
        'nickname':nickname,
        'personal_tag':personal_tag
      }
      this.$http.post(url,obj).then((response)=>{
        if(response.status==200){
          if(response.body.success){
            this.show_alert_tip('修改成功','#31c27c');
            this.current_user.nickname = nickname;
            this.current_user.personal_tag = personal_tag;
            localStorage.setItem("current_user",JSON.stringify(this.current_user));
            setTimeout(()=>{
              window.location.reload();
            },800);
          }else{
            this.show_alert_tip('修改失败','#FF7F50');
          }
        }
      }).catch(()=>{
        this.show_alert_tip('修改失败','#FF7F50');
      });
    },
    show_choose_click(){
      this.show_choose_img = true;
    },
    choose_img_success(index){
      let current_user = this.current_user;
      let url = url_util.update_user_picture+current_user._id+"/"+index;
      this.$http.get(url).then((response)=>{
        if(response.status==200){
          if(response.body.success){
            this.current_user.picture = index;
            this.show_alert_tip('修改成功','#31c27c');
            localStorage.setItem("current_user",JSON.stringify(this.current_user));
            setTimeout(()=>{
              window.location.reload();
            },800);
          }else{
            this.show_alert_tip('修改失败','#FF7F50');
          }
          this.show_choose_img = false;
        }
      }).catch(()=>{
        this.show_alert_tip('修改失败','#FF7F50');
        this.show_choose_img = false;
      });
    }
  },
  filters:{
    get_picture(value){
      if(typeof value=='number'||value.indexOf('http')<0){
        return "http://106.14.13.178/icon/"+value+".jpg";
      }
      return value;
    },
    formatDateTime(inputTime) {
      var date = new Date(inputTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    }
  },
  created(){
    let current_user = localStorage.getItem("current_user");
    if(typeof current_user =="object"||current_user==''){
      return;
    }
    this.current_user = JSON.parse(current_user);
  }
}
</script>
<style lang="stylus" scoped>
#App
  width: 100%;
  position: relative;
  .banner
    margin-top: 140px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 1.2em;
    color:#999999;
    .my-active
      border-bottom: 1px solid #31c27c;
      color:#333333;
      padding-bottom: .5em;
    span
      margin-right: 15px;
      cursor: pointer;
  .info
    width: 100%;
    height: 380px;
    position: relative;
    .bg
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left:0;
      z-index: -1;
      background-color: #000000;
    .title-info
      font-size: 1.8em;
      color: white;
      width: 100%;
      position: absolute;
      text-align: center;
      top: 20%;
      font-family:'STXingkai','FZYaoti','SimSun',SimSun;
    .tag-info
      font-size: 1.2em;
      color: white;
      width: 40%;
      left:30%;
      color:rgba(255,255,255,0.6);
      position: absolute;
      text-align: center;
      top: 37%;
      font-family:'STXingkai','FZYaoti','SimSun',SimSun;
    .img-container
      width: 250px;
      height: 250px;
      border-radius: 125px;
      overflow: hidden;
      position: relative;
      left: calc(50% - 125px);
      top: calc(100% - 165px);
      background-color: #000000;
      cursor: pointer;
      .img-shadow
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top:0;
        background: rgba(0,0,0,0.3) url('/static/img/change.png') no-repeat;
        background-size: 85px 80px;
        background-position: 85px 85px;
        z-index: 12;
      .real-img
        left: 25px;
        top: 25px;
        position: absolute;
        width: 200px;
        height: 200px;
        border-radius: 100px;
        overflow: hidden;
        img
          width: 100%;
          height: 100%;
      &:hover
        box-shadow: 1px 1px 3px rgba(255,255,255,0.2);
        .img-shadow
          opacity: 0.8;
        .real-img
          filter:blur(5px);
</style>
