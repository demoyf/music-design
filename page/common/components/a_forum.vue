<template>
  <div id="a-forum" :class="show_menu?'':'hidden_test'">
    <div class="tag" :class="forumInfo.info?'scroll-tag':''">
      <div class="img-container" v-if="forumInfo.info">
        <img :src="forumInfo.info.picture" alt="">
      </div>
      <p v-if="forumInfo.info">{{forumInfo.info.name}}</p>
      <p>{{forumInfo.type==1?'歌曲相关':forumInfo.type==2?'歌手相关':'专辑相关'}}</p>
    </div>
    <div class="time-info">
      <span style="margin-right:10px;">评论：{{forumInfo.comment_count}}</span>
      <span>{{forumInfo.publish_time | formatDateTime}}</span>
    </div>
    <div class="info-container">
      <div class="img-container" v-if="user_info" @click="show_control_menu">
        <img :src="user_info.picture" alt="">
      </div>
      <div class="control">
        <div class="info" v-if="user_info">
          <div class="img-container">
            <img :src="user_info.picture" alt="">
          </div>
          <p>{{user_info.nickname}}</p>
          <p v-if="current_user._id!==user_info._id&&current_user.is_manager" class="id-p">{{user_info._id}}</p>
          <p v-if="current_user._id==user_info._id" class="delete-button" @click="start_report($event,4)">删除帖子(个人)</p>
        </div>
        <div class="button-container" v-if="user_info&&current_user._id!==user_info._id">
          <button type="button" name="button" @click="start_report($event,1)">举报用户</button>
          <button type="button" name="button" @click="start_report($event,2)">举报帖子</button>
          <button type="button" name="button" v-if="current_user.is_manager" @click="start_report($event,3)">禁言用户</button>
          <button type="button" name="button" v-if="current_user.is_manager" @click="start_report($event,4)">删除帖子</button>
        </div>
      </div>
    </div>
    <div class="content-container" @click="show_forum">
      <h1>{{forumInfo.title}}</h1>
      <div class="content" v-html="forumInfo.content">
        {{forumInfo.content}}
      </div>
      <div class="my-shadow">
      </div>
    </div>
    <my-alert :msg='alert_msg' :is-show="show_alert"  :show-color="alert_color"></my-alert>
    <yf-comfirm :config="config_obj" @sure="sure_click" v-show="show_comfirm"  @closeconfirm="hide_comfirm"></yf-comfirm>
  </div>
</template>
<script>
import url_util from './../url.js';
import my_alert from './my_alert';
import confirm_yf from './comfirm';
export default {
  name: "a-forum",
  props: ['forumInfo'],
  data(){
    return{
      user_info:undefined,
      show_alert:false,
      alert_msg:'123456',
      alert_color:'#FF7F50',
      current_user:undefined,
      show_menu:false,
      config_obj:{
        header:'删除',
        msg:'确定删除？'
      },
      show_comfirm:false,
      report_type:1
    }
  },
  components:{
    'my-alert':my_alert,
    'yf-comfirm':confirm_yf
  },
  created(){
      let forumInfo = this.forumInfo;
      let user_id = forumInfo.user_id;
      let url = url_util.user_info_url+user_id;
      let current_user = localStorage.getItem("current_user");
      this.current_user = JSON.parse(current_user);
      this.$http.get(url).then((response)=>{
        if(response.status===200){
          this.user_info = response.body;
        }
      });
      let that = this;
      window.addEventListener("click",function(){
        that.show_menu  = false;
      })
      // this.show_alert_tip('hhh','#31c27c');
  },
  filters:{
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
    },
  },
  methods:{
    show_forum(){
      let id = this.forumInfo._id;
      localStorage.setItem("show_forum_current",id);
      window.open('/page/show_forum.html');
    },
    start_report(event,index){
      event.stopPropagation();
      event.preventDefault();
      let show_obj = {
        header:'删除',
        msg:'确定删除？'
      }
      if(index<=2){
        show_obj = {
          header:'举报',
          msg:'确定举报？'
        }
      }
      this.config_obj = show_obj;
      this.report_type = index;
      this.show_comfirm = true;
    },
    sure_click(){
      this.show_comfirm = false;
      let report_type = this.report_type;
      let url = "";
      let forumInfo = this.forumInfo;
      let user_info = this.user_info;
      let msg = '举报成功';
      let error_msg = '举报失败';
      let need_reload = false;
      if(report_type==1){
        url = url_util.report_user+urer_info._id;
      }else if(report_type==2){
        url = url_util.report_tag +forumInfo._id;
      }else if(report_type==3){
        url = url_util.delete_user+user_info._id+"/true";
        msg = '删除成功';
        error_msg = '删除失败';
        need_reload = true;
      }else{
        url = url_util.delete_forum+forumInfo._id+"/true";
        msg = '删除成功';
        error_msg = '删除失败';
        need_reload = true;
      }
      this.$http.get(url).then((response)=>{
        if(response.status==200){
          if(response.body.success){
            this.show_alert_tip(msg,'#31c27caa');
            if(need_reload){
              setTimeout(()=>{
                window.location.reload();
              },1200);
            }
          }
          else{
            this.show_alert_tip(error_msg,'#FF7F50');
          }
        }
      }).catch(()=>{
        this.show_alert_tip(error_msg,'#FF7F50');
      });
    },
    hide_comfirm(){
      this.show_comfirm = false;
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
    },
    show_control_menu(event){
      if(this.show_menu){
        this.show_menu = false;
      }
      this.show_menu  = true;
      event.preventDefault();
      event.stopPropagation();
    }
  },
  watch:{
    forumInfo(){
      let forumInfo = this.forumInfo;
      let user_id = forumInfo.user_id;
      let url = url_util.user_info_url+user_id;
      this.$http.get(url).then((response)=>{
        if(response.status===200){
          this.user_info = response.body;
        }
      });
    }
  }
}
</script>
<style lang="stylus" scoped>
.hidden_test
  overflow: hidden;
#a-forum
  width: 1100px;
  margin:1em auto;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
  position: relative;
  .time-info
    position: absolute;
    right: 0;
    bottom:0;
    background-color: #31c27caa;
    color: white;
    padding: 10px 20px;
  .tag
    height: 40px;
    display: flex;
    flex-direction: row;
    width: 200px;
    position: absolute;
    align-items: center;
    justify-content: space-between;
    right: -140px;
    top: 10px;
    overflow: hidden;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
    background-color: #31c27caa;
    cursor: pointer;
    .img-container
      width: 50px;
      height: 50px;
      border-radius: 25px;
      overflow: hidden;
      img
        width: 100%;
        height: 100%;
    p
      font-size: .8em;
      color: white;
      margin-left: .3em;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 60px;
  .scroll-tag
    right: -140px;
    background-color: transparent;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.0);
    transition: all .8s;
    height: auto;
    border-radius: 25px 0 0 25px;
    &:hover
      transition: all .8s;
      background-color: #31c27caa;
      right: 0;
      box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
  .content-container
    padding: 0 2em;
    position: relative;
    cursor: pointer;
    h1
      text-align: center;
      font-size: 1.3em;
      color:#666;
      letter-spacing:.3em;
      font-stretch:narrower;
      font-family:SimHei;
      font-weight:bold;
      -webkit-transform: scale(.95);
      transform: scale(.95);
      margin-bottom: 1em;
      max-width: 600px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin: auto;
    .content
      height: 100px;
      overflow: hidden;
      margin-bottom: 2em;
    .my-shadow
      width: 100%;
      height: 100%;
      position: absolute;
      background: linear-gradient(transparent 0%,transparent 70%,rgba(0,0,0,0.1) 100%);
      top: 0;
      left: 0;
  .info-container
    display: flex;
    flex-direction: row;
    height: 60px;
    align-items: center;
    padding: 1em;
    .img-container
      width: 60px;
      height: 60px;
      border-radius: 30px;
      overflow: hidden;
      cursor: pointer;
      img
        width: 100%;
        height: 100%;
  .control
    display: flex;
    flex-direction: column;
    width: 200px;
    background-color: white
    position: absolute;
    left: -210px;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
    border-radius: 5px;
    box-sizing: border-box;
    padding: 15px;
    .button-container
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      margin-top: 1em;
      button
        margin-top: .5em;
        width: 80px;
        background-color: #31c27caa;
        color: white;
        padding: .5em 0;
        text-align: center;
        border-radius: 5px;
    .info
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      .img-container
        width: 50px;
        height: 50px;
        border-radius: 25px;
        overflow: hidden;
        img
          width: 100%;
          height: 100%;
      p
        width: 120px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      .id-p
        width: 170px;
        margin: .3em 0;
      .delete-button
        width: 140px;
        box-sizing: border-box;
        padding: .5em;
        background-color:  #31c27caa;
        color: white;
        margin:1em auto;
        border-radius: 5px;
        cursor: pointer;
</style>
