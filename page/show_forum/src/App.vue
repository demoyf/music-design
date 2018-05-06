<template>
  <div id="App" v-if="forum_info">
    <forum-header class="my-header"></forum-header>
    <div class="content">
      <div class="left-nav">
        <div class="img-container">
          <img :src="forum_info.user_picture" alt="">
        </div>
        <p>{{forum_info.user_name}}</p>
        <p>{{forum_info.publish_time | formatDateTime}}</p>
        <p>评论：{{forum_info.comment_count}}</p>
        <p v-if="current_user&&current_user.is_manager" style="cursor:pointer" @click="delete_click(1)">禁言用户</p>
        <p v-if="(current_user&&current_user.is_manager)||(current_user&&forum_info.user_id==current_user._id)"
        style="cursor:pointer" @click="delete_click(2)">删除帖子</p>
        <p @click="delete_click(3)" style="cursor:pointer">举报用户</p>
        <p @click="delete_click(4)" style="cursor:pointer">举报帖子</p>
      </div>
      <div class="right-content">
        <div class="tag" v-if="forum_info.info">
          <div class="img-container">
            <img :src="forum_info.info.picture" alt="">
          </div>
          <p>{{forum_info.info.name}}</p>
        </div>
        <div class="title">
          <h1>{{forum_info.title}}</h1>
        </div>
        <div class="forum-content" v-html="forum_info.content"
        style="padding-bottom:3em;border-bottom:1px solid rgba(0,0,0,0.1);">
          {{forum_info.content}}
        </div>
        <div class="comment-content">
          <div class="publish-comment">
            <h1>发表评论</h1>
            <textarea name="name" rows="8" cols="80" maxlength="140" v-model="publish_comment_content"
             style="resize:none" placeholder="说点什么？">
            </textarea>
            <p>剩余字数：{{get_length}}</p>
            <button type="button" name="button" @click="publish_comment">发表</button>
          </div>
        </div>
        <div class="tag-change" style="margin-bottom:2em;">
          <span :class="current_tag == 1?'active':''" @click="change_tag(1)">全部评论</span>
          <span :class="current_tag == 2?'active':''" @click="change_tag(2)">与我相关</span>
        </div>
        <div class="show-comment">
          <div v-for="(item,index) in comment_list" v-if="current_tag==1">
            <comment v-if="item.type==1&&!item.is_ban"
            :can-delete="item.my_id==(current_user?current_user._id:'')" :index="index"
            :comment-obj="item" @deletecomment="change_delete_comment" @replycomment="reply_show"></comment>
            <reply-comment v-if="item.type==2&&!item.is_ban"
            :can-delete="item.my_id==(current_user?current_user._id:'')" :index="index"
            :comment-obj="item" @deletecomment="change_delete_comment" @replycomment="reply_show"></reply-comment>
          </div>
          <div v-for="(item,index) in comment_list" v-if="current_tag==2">
            <comment v-if="item.type==1&&!item.is_ban&&item.my_id==current_user._id"
            :can-delete="item.my_id==(current_user?current_user._id:'')" :index="index"
            :comment-obj="item" @deletecomment="change_delete_comment" @replycomment="reply_show"></comment>
            <reply-comment
            v-if="item.type==2&&!item.is_ban&&(item.my_id==current_user._id||item.replay_to_user_id==current_user._id)"
            :can-delete="item.my_id==(current_user?current_user._id:'')" :index="index"
            :comment-obj="item" @deletecomment="change_delete_comment" @replycomment="reply_show"></reply-comment>
          </div>
        </div>
      </div>
    </div>
    <my-alert :msg='alert_msg' :is-show="show_alert"  :show-color="alert_color"></my-alert>
    <yf-comfirm :config="config_obj" @sure="sure_click" v-show="show_comfirm"  @closeconfirm="hide_comfirm"></yf-comfirm>
    <yf-comfirm :config="config_obj" @sure="sure_delete_comment" v-show="show_delete" @closeconfirm="hide_comfirm"></yf-comfirm>
    <to-top></to-top>
    <my-footer></my-footer>
    <div class="reply-content" v-if="current_reply_obj" v-show="show_reply">
      <div class="bg" @click="hide_reply">
      </div>
      <div class="content">
        <h1>回复</h1>
        <textarea name="name" rows="8" cols="80" maxlength="140" v-model="reply_comment_content"
         style="resize:none" :placeholder="'回复：'+current_reply_obj.my_name">
        </textarea>
        <p>剩余字数：{{get_reply_length}}</p>
        <button type="button" name="button" @click="publish_reply">发表</button>
      </div>
    </div>
  </div>
</template>
<script>
import url_util from './../../common/url';
import * as local_uitl from './../../common/local_storage';
import key from './../../common/key.js';
import forum_header from './../../all_forum/components/header.vue';
import to_top from './../../common/components/to_top.vue';
import my_alert from './../../common/components/my_alert';
import confirm_yf from './../../common/components/comfirm';
import footer from './../../../src/components/footer/footer.vue';
import comment from './../components/comment';
import reply_comment from './../components/reply_comment';
export default {
  name: "App",
  data() {
    return{
      forum_info:undefined,
      current_user:undefined,
      show_alert:false,
      alert_msg:'123456',
      alert_color:'#FF7F50',
      config_obj:{
        header:'删除',
        msg:'确定删除？'
      },
      show_comfirm:false,
      report_type:1,
      publish_comment_content:'',
      comment_list:[],
      current_active_comment:undefined,
      can_delete:false,
      show_delete:false,
      current_delete:0,
      current_index:-1,
      reply_comment_content:"",
      show_reply:false,
      current_reply_obj:undefined,
      current_tag:1
    }
  },
  components: {
    'forum-header':forum_header,
    'to-top':to_top,
    'my-alert':my_alert,
    'my-footer':footer,
    'yf-comfirm':confirm_yf,
    'comment':comment,
    'reply-comment':reply_comment
  },
  computed:{
    get_length(){
      return (140 - this.publish_comment_content.length);
    },
    get_reply_length(){
      return (140 - this.reply_comment_content.length);
    }
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
      return y + '-' + m + '-' + d;
    }
  },
  methods:{
    publish_reply(){
      if(this.current_reply_obj){
        this.publish_comment(2);
      }
    },
    change_tag(index){
      this.current_tag = index;
    },
    reply_show(_id,index){
      this.current_reply_obj = this.comment_list[index];
      this.show_reply = true;
    },
    hide_reply(){
      this.show_reply = false;
    },
    change_delete_comment(_id,index){
      this.current_delete = _id;
      this.show_delete = true;
      this.current_index = index;
    },
    sure_delete_comment(){
      let id = this.current_delete;
      let forum_id = this.forum_info._id;
      let url = url_util.delete_comment+id+"/"+forum_id;
      let index = this.current_index;
      this.$http.get(url).then((response)=>{
        if(response.status==200){
          if(response.body.success){
            this.comment_list.splice(index,1);
            this.forum_info.comment_count = response.body.count;
            this.show_alert_tip('删除成功','#31c27caa');
          }else{
            this.show_alert_tip('删除失败','#FF7F50');
          }
          this.show_delete = false;
        }
      }).catch(()=>{
        this.show_delete = false;
        this.show_alert_tip('删除失败','#FF7F50');
      })
    },
    publish_comment(type){
      let url = url_util.publish_comment;
      let content = this.publish_comment_content;
      if(type==2){
        content = this.reply_comment_content;
      }
      if(content==''){
        this.show_alert_tip('内容不能为空','#FF7F50');
        return;
      }
      let current_user = this.current_user;
      if(!current_user){
        this.show_alert_tip('登录后才能发表','#FF7F50');
        return;
      }
      let forum_info = this.forum_info;
      var time = new Date().getTime();
      let comment_obj = {
        comment_content:content,
        is_new:true,
        user_id:forum_info.user_id,
        my_id:current_user._id,
        forum_id:forum_info._id,
        my_picture:current_user.picture,
        forum_title:forum_info.title,
        my_name:current_user.nickname,
        is_ban:false,
        publish_time:time,
        type:1
      };
      if(type==2){
        let forum_info = this.forum_info;
        let current = this.current_reply_obj;
        if(current.my_id==current_user._id){
          this.show_alert_tip('不能回复自己','#FF7F50');
          return;
        }
        comment_obj = {
          comment_content:content,
          is_new:true,
          user_id:forum_info.user_id,
          my_id:current_user._id,
          forum_id:forum_info._id,
          my_picture:current_user.picture,
          forum_title:forum_info.title,
          my_name:current_user.nickname,
          is_ban:false,
          publish_time:time,
          replay_to_user_id:current.my_id,
          replay_to_commetn_content:current.comment_content,
          replay_to_user_name:current.my_name,
          replay_to_user_picture:current.my_picture,
          type:2
        }
      }
      this.$http.post(url,comment_obj).then((response)=>{
        if(response.status==200){
          let data =response.body;
          if(data.success){
            comment_obj._id = data._id;
            this.comment_list.push(comment_obj);
            this.publish_comment_content = '';
            this.forum_info.comment_count = data.count;
            this.show_alert_tip('发表成功','#31c27caa');
            if(type==2){
              this.reply_comment_content = '';
              this.show_reply = false;
            }
          }else{
            this.show_alert_tip('发表失败','#FF7F50');
            if(type==2){
              this.show_reply = false;
            }
          }
        }
      }).catch(()=>{
        this.show_alert_tip('发表失败','#FF7F50');
        if(type==2){
          this.show_reply = false;
        }
      });
    },
    delete_click(index){
      this.show_comfirm = true;
      this.report_type = index;
      if(index==3||index==4){
        this.config_obj = {
          header:'举报',
          msg:'确定举报？'
        }
      }
    },
    sure_click(){
      let type = this.report_type;
      let forum_info = this.forum_info;
      let url = "";
      let success_msg = '删除成功';
      let error_msg = '删除失败';
      if(type==1){
        url = url_util.delete_user+forum_info.user_id+"/true";
      }else if(type==2){
        url = url_util.delete_forum+forum_info.user_id+"/true";
      }else if(type==3){
        success_msg = '举报成功';
        error_msg = '举报失败';
        url = url_util.report_user+forum_info.user_id;
      }else {
        success_msg = '举报成功';
        error_msg = '举报失败';
        url = url_util.report_tag+forum_info._id;
      }
      this.$http.get(url).then((response)=>{
          if(response.status==200){
            if(response.body.success){
              this.show_alert_tip(success_msg,'#31c27caa');
            }else{
              this.show_alert_tip(error_msg,'#FF7F50');
            }
            this.config_obj = {
              header:'删除',
              msg:'确定删除？'
            }
            this.show_comfirm = false;
          }
      }).catch(()=>{
        this.show_alert_tip(error_msg,'#FF7F50');
        this.config_obj = {
          header:'删除',
          msg:'确定删除？'
        }
        this.show_comfirm = false;
      });
    },
    hide_comfirm(){
      this.show_comfirm = false;
      this.show_delete = false;
      this.config_obj = {
        header:'删除',
        msg:'确定删除？'
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
  },
  created(){
    let current_id = localStorage.getItem("show_forum_current");
    let url = url_util.forum_content_url+current_id;
    let current_user_string = localStorage.getItem("current_user");
    if(typeof current_user_string =='object'||current_user_string==''){
      this.current_user = undefined;
    }else{
      let current_user = JSON.parse(current_user_string);
      this.current_user = current_user;
    }
    this.$http.get(url).then((response)=>{
      if(response.status===200){
        let data = response.body;
        if((typeof data.user_picture)=='number'||data.user_picture.indexOf('http')<0){
          data.user_picture = "http://106.14.13.178/icon/"+data.user_picture+".jpg";
        }
        this.forum_info = data;
      }
    });
    let comment_url = url_util.get_comment_url+current_id+"/0/10";
    this.$http.get(comment_url).then((response)=>{
      if(response.status===200){
        let data = response.body;
        this.comment_list = data;
      }
    });
  }
}
</script>
<style lang="stylus" scoped>
#App
  width: 100%;
  position: relative;
  .reply-content
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    .bg
      width: 100%;
      height: 100%;
      z-index: 300;
      position: absolute;
      left: 0;
      top: 0;
      background-color: rgba(0,0,0,0.2);
    .content
      z-index: 400;
      position: absolute;
      width: 500px;
      height: 300px;
      background-color: white;
      left: calc(50% - 250px);
      top: calc(50% - 150px);
      display: flex;
      flex-direction: column;
      padding: 2em;
      border-radius: 10px;
      box-sizing: border-box;
      h1
        padding-bottom: 1em;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        font-size: 1.2em;
        margin-bottom: .5em;
      textarea
        display: block;
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 3px;
        font-size: 1.1em;
        padding: .9em;
        outline: none;
        margin-bottom: .5em;
      p
        font-size: .9em;
      button
        width: 100px;
        height: 50px;
        background-color: #31c27caa;
        color: white;
        border-radius: 5px;
        margin-top: .5em;
        display: block;
        margin: auto;
  .my-header
    background-color: white;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.1);
    z-index: 10;
  .content
    position: relative;
    width: 100%;
    padding-right: 9%;
    box-sizing: border-box;
    .left-nav
      position: fixed;
      width: 140px;
      background-color: rgba(0,0,0,0.9);
      height: 100%;
      top: 0;
      z-index: 1;
      padding-top: 120px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      p
        color: rgba(255,255,255,0.8);
        height: 30px;
        margin-top: 2em;
        line-height: 30px;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        width: 120px;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      .img-container
        width: 60px;
        height: 60px;
        border-radius: 30px;
        overflow: hidden;
        img
          width: 100%;
          height: 100%;
    .right-content
      padding: 3em 5em;
      box-sizing: border-box;
      width: 82%;
      margin-left: 120px;
      position: relative;
      .tag-change
        span
          margin-right: 1em;
          cursor: pointer;
        .active
          color: #31c27c;
          border-bottom: 1px solid #31c27c;
          padding-bottom: .5em;
      .comment-content
        display: flex;
        flex-direction:column;
        padding-top: 3em;
        margin-bottom: 3em;
        width: 500px;
        h1
          font-size: 1.2em;
          font-stretch:narrower;
          font-family:SimHei;
          margin-bottom: 1em;
        textarea
          display: block;
          width: 900px;
          height: 200px;
          padding: 1em;
          box-sizing: border-box;
          font-size: 1.3em;
          color:rgba(0,0,0,0.8);
          outline: none;
          border: 1px solid rgba(0,0,0,0.2);
          border-radius: 5px;
          margin-bottom: 1em;
        button
          width: 120px;
          height: 50px;
          color: white;
          background-color: #31c27caa;
          border-radius: 5px;
          margin-left: 380px;
          display: block;
      .tag
        position: absolute;
        right: 30px;
        top:30px;
        display: flex;
        flex-direction: row;
        width: 160px;
        border-radius: 25px 0 0 25px;
        background-color: #31c27caa;
        align-items: center;
        justify-content: space-between;
        .img-container
          width: 50px;
          height: 50px;
          border-radius: 25px;
          overflow: hidden;
          img
            width: 100%;
            height: 100%;
        p
          color: white;
          width: 100px;
          padding-right: .5em;
          text-align: right;
          box-sizing: border-box;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
      .title
        h1
          text-align: center;
          margin-bottom: 1.8em;
          font-size: 1.5em;
          color:#333;
          letter-spacing:.3em;
          font-stretch:narrower;
          font-family:SimHei;
          font-weight:bold;
          -webkit-transform: scale(.95);
          transform: scale(.95);
</style>
