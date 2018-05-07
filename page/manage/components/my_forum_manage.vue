<template>
  <div id="my-forum-manage">
    <div class="content">
      <div class="left">
        <li :class="current==1?'active':''" @click="change_active(1)">发布的贴子</li>
        <li :class="current==2?'active':''" @click="change_active(2)">发表的评论</li>
        <li :class="current==3?'active':''" @click="change_active(3)">收到的评论</li>
      </div>
      <div class="right">
        <div class="forum-container" v-show="current==1">
          <div class="header part">
            <p class="title">标题</p>
            <p class="comment">评论数量</p>
            <div class="info">
              类型
            </div>
            <p class="time">发布时间</p>
            <p class="delete-con">删除</p>
          </div>
          <div class="a-forum part" v-for="(item,index) in forum_list" v-if="!item.is_ban">
            <p class="title" @click="to_show_forum(item._id)">{{item.title}}</p>
            <p class="comment">{{item.comment_count}}</p>
            <div class="info">
              <div class="img-container">
                  <img :src="item.info.picture" alt="">
              </div>
              <p class="name">{{item.info.name}}</p>
              <p>{{item.type==1?'歌曲相关':item.type==2?'歌手相关':'专辑相关'}}</p>
            </div>
            <p class="time">{{item.publish_time | formatDateTime}}</p>
            <p class="delete-con">
              <button type="button" name="button" @click="delete_info(item._id,index)">删除</button>
            </p>
          </div>
        </div>
        <div class="comment-container" v-show="current==2">
          <div class="header part">
            <p class="title">帖子标题</p>
            <p class="comment">评论内容</p>
            <p class="reply">回复谁</p>
            <p class="time">发布时间</p>
            <p class="delete-con">删除</p>
          </div>
          <div class="comment-part part"  v-for="item in comment_list" v-if="!item.is_ban&&(item.my_id==currentUser._id&&item.type!=2)">
            <p class="title" @click="to_show_forum(item.forum_id)">{{item.forum_title}}</p>
            <p class="comment">{{item.type==2?item.replay_to_commetn_content:item.comment_content}}</p>
            <p class="reply">{{item.type==2?item.replay_to_user_name:'无'}}</p>
            <p class="time">{{item.publish_time | formatDateTime}}</p>
          </div>
        </div>
        <div class="comment-container" v-show="current==3">
          <div class="header part">
            <p class="title">帖子标题</p>
            <p class="comment">评论内容</p>
            <p class="reply">谁回复我</p>
            <p class="time">发布时间</p>
          </div>
          <div class="comment-part part"  v-for="item in comment_list"
          v-if="!item.is_ban&&(item.user_id==currentUser._id&&item.my_id==currentUser._id)||
          (item.my_id==currentUser._id&&item.type==2)">
            <p class="title" @click="to_show_forum(item.forum_id)">{{item.forum_title}}</p>
            <p class="comment">{{item.type==2?item.replay_to_commetn_content:item.comment_content}}</p>
            <p class="reply">{{item.my_name}}</p>
            <p class="time">{{item.publish_time | formatDateTime}}</p>
            <p class="delete-con">
              <button type="button" name="button">删除</button>
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
  name: "my-forum-manage",
  props:['currentUser'],
  data(){
    return {
      current:1,
      forum_list:[],
      comment_list:[]
    }
  },
  methods:{
    to_show_forum(_id){
      localStorage.setItem("show_forum_current",_id);
      window.open('/page/show_forum.html');
    },
    change_active(current){
      this.current = current;
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
    let url = url_util.get_my_forum;
    let user = this.currentUser;
    url += user._id;
    this.$http.get(url).then((response)=>{
      if(response.status==200){
        this.forum_list = response.body;
      }
    });
    let comment_url = url_util.get_my_comment+user._id;
    this.$http.get(comment_url).then((response)=>{
      if(response.status==200){
        this.comment_list = response.body;
      }
    })
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
    }
  }
}
</script>
<style lang="stylus" scoped>
#my-forum-manage
  width: 1100px;
  margin:4em  auto;
  .content
    width: 100%;
    display: flex;
    flex-direction: row;
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
    .right
      display: flex;
      flex-direction: column;
      width: 900px;
      margin-left: 100px;
      .comment-container
        width: 900px;
        .header
          box-shadow: 1px 2px 3px rgba(0,0,0,0.3);
          border-radius: 10px;
          height: 50px;
        .part
          width: 100%;
          display: flex;
          flex-direction: row;
          margin-bottom: 1em;
          align-items: center;
          padding-left: .6em;
          justify-content: space-between;
          padding: .5em;
          p
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          .title
            width: 160px;
            cursor: pointer;
          .comment
            width: 200px;
          .reply
            width: 140px;
          .time
            width: 180px;
          .delete-con
            button
              width: 80px;
              height: 35px;
              color: white;
              background-color: #31c27c;
              border-radius: 5px;
          &:nth-child(2n)
            background-color: rgba(0,0,0,0.05);
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
            width: 150px;
            margin-right: 15px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          .comment
            width: 80px;
            margin-right: 15px;
            text-align: center;
          .time
            color: rgba(0,0,0,.6);
            text-align: left;
            margin-left: 15px;
            width: 170px;
          .info
            width: 270px;
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
</style>
