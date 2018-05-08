<template>
  <div id="manage-user">
    <div class="content">
      <div class="left">
        <li :class="current==1?'active':''" @click="change_active(1)">管理帖子</li>
        <li :class="current==2?'active':''" @click="change_active(2)">管理评论</li>
        <li :class="current==3?'active':''" @click="change_active(3)">管理用户</li>
      </div>
      <div class="right">
        <div class="forum-container" v-show="current==1">
          <div class="header part">
            <p class="title">标题</p>
            <p class="comment">发布者</p>
            <div class="info">
              类型
            </div>
            <p class="report">举报次数</p>
            <p class="time">发布时间</p>
            <p class="delete-con">删除</p>
          </div>
          <div class="a-forum part" v-for="(item,index) in forum_list" v-if="!item.is_ban">
            <p class="title" @click="to_show_forum(item._id)">{{item.title}}</p>
            <p class="comment">{{item.user_name}}</p>
            <div class="info">
              <div class="img-container">
                  <img :src="item.info.picture" alt="">
              </div>
              <p class="name">{{item.info.name}}</p>
              <p>{{item.type==1?'歌曲相关':item.type==2?'歌手相关':'专辑相关'}}</p>
            </div>
            <p class="report">{{item.report_count}}</p>
            <p class="time">{{item.publish_time | formatDateTime}}</p>
            <p class="delete-con">
              <button type="button" name="button" @click="delete_info(item._id,index)">删除</button>
            </p>
          </div>
        </div>
        <div class="forum-container" v-show="current==3">
          <div class="header part">
            <p class="title" style="width:230px">
            </p>
            <p class="comment">用户名</p>
            <p class="report">举报次数</p>
            <p class="time">管理员</p>
            <p class="delete-con">禁言</p>
          </div>
          <div class="a-forum part" v-for="(item,index) in user_list" v-if="!item.is_ban">
            <p class="title" style="" style="display:flex;flex-direction:row;">
               <div class="img-container"
               style="width:60px;height:60px;border-radius:30px;overflow:hidden;position:relative;left:-100px;">
                    <img :src="item.picture | get_picture" alt="" width="100%" height="100%">
              </div>
            </p>
            <p class="comment">{{item.nickname}}</p>
            <p class="report">{{item.report_count}}</p>
            <p class="time">{{item.is_manager?'是':'否'}}</p>
            <p class="delete-con">
              <button type="button" name="button" @click="delete_user(item._id,index)">禁言</button>
            </p>
          </div>
        </div>
        <div class="forum-container" v-show="current==2">
          <div class="header part">
            <p class="title">标题</p>
            <p class="comment">发布者</p>
            <div class="info">
              发布内容
            </div>
            <p class="time">发布时间</p>
            <p class="delete-con">删除</p>
          </div>
          <div class="a-forum part" v-for="(item,index) in comment_list" v-if="!item.is_ban">
            <p class="title" @click="to_show_forum(item.forum_id)">{{item.forum_title}}</p>
            <p class="comment">{{item.my_name}}</p>
            <div class="info">
              <p>{{item.comment_content}}</p>
            </div>
            <p class="time">{{item.publish_time | formatDateTime}}</p>
            <p class="delete-con">
              <button type="button" name="button" @click="delete_comment(item._id,index)">删除</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import url_util from './../../common/url';
export default {
  name: "manage-user",
  data(){
    return {
      current:1,
      forum_list:[],
      user_list:[],
      comment_list:[]
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
  methods: {
    to_show_forum(_id){
      localStorage.setItem("show_forum_current",_id);
      window.open('/page/show_forum.html');
    },
    change_active(current){
      this.current = current;
    },
    delete_user(_id,index){
      setTimeout(()=>{
        this.user_list.splice(index,1);
        this.$emit('showtip','删除成功');
      },500);
    },
    delete_comment(_id,index){
      setTimeout(()=>{
        this.comment.splice(index,1);
        this.$emit('showtip','删除成功');
      },500);
    },
    delete_info(_id,index){
      let url = url_util.delete_forum+_id+"/true";
      this.$http.get(url).then((response)=>{
        if(response.status==200){
          if(response.body.success){
            this.$emit('showtip','删除成功');
            this.forum_list.splice(index,1);
          }
        }
      })
    }
  },
  created() {
    //do something after creating vue instance
    let url = url_util.get_report_comment;
    this.$http.get(url).then((response)=>{
      if(response.status==200){
        this.forum_list = response.body;
      }
    });
    let all_user = url_util.all_user;
    this.$http.get(all_user).then((response)=>{
      if(response.status==200){
        this.user_list = response.body;
      }
    });
    let all_comment = url_util.all_comment;
    this.$http.get(all_comment).then((response)=>{
      if(response.status==200){
        this.comment_list = response.body;
      }
    });
  }
}
</script>
<style lang="stylus" scoped>
#manage-user
  width: 1400px;
  margin:4em  auto;
  .content
    width: 100%;
    display: flex;
    flex-direction: row;
    .right
      display: flex;
      flex-direction: column;
      width: 1100px;
      margin-left: 100px;
      .forum-container
        .header
          box-shadow: 1px 2px 3px rgba(0,0,0,0.3);
          border-radius: 10px;
          height: 50px;
        .part
          width: 100%;
          display: flex;
          flex-direction: row;
          margin-bottom: .8em;
          align-items: center;
          padding-left: .6em;
          .title
            cursor: pointer;
            width: 170px;
            margin-right: 15px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          .comment
            width: 120px;
            margin-right: 15px;
            text-align: center;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          .report
            width: 80px;
            margin-right: 15px;
            text-align: center;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          .time
            color: rgba(0,0,0,.6);
            text-align: left;
            margin-left: 15px;
            width: 170px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          .info
            width: 290px;
            margin-left: 15px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .img-container
              width: 50px;
              height: 50px;
              border-radius: 25px;
              overflow: hidden;
              img
                width: 100%;
                height: 100%;
            .name
              width: 140px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
          .delete-con
            width: 50px;
            margin-left: 50px;
            text-align: center;
            button
              width: 80px;
              height: 35px;
              color: white;
              background-color: #31c27c;
              border-radius: 5px;
          &:nth-child(2n)
            background-color: rgba(0,0,0,0.05);
    .left
      width: 160px;
      li
        width: 160px;
        text-align: center;
        padding: 1em 0;
        color: white;
        background-color: #666;
        &:first-child
          border-radius: 5px 5px 0 0;
        &:last-child
          border-radius: 0 0 5px 5px;
        &:hover
          cursor: pointer;
      .active
        transition: all .3s;
        transform: translateY(-10%) translateX(10%);
        box-shadow: 1px 2px 4px rgba(0,0,0,0.6);
</style>
