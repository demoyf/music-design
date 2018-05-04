<template>
  <div id="App">
    <forum-header></forum-header>
    <div class="publish-container">
      <div class="title container">
        <h1>标题</h1>
        <input type="text" name="title" v-model="publish_info.title" placeholder="输入你响亮的标题" @blur="check_isnull">
      </div>
      <div class="type container">
        <h1 v-if="!has_storage">类型</h1>
        <h1 v-if="has_storage">{{type==1?'歌曲相关':''}}
                  {{type==2?'歌手相关':''}}
                  {{type==3?'专辑相关':''}}</h1>
        <select v-model="publish_info.type" v-if="!has_storage">
          <option value ="1">歌手相关</option>
          <option value ="2">歌曲相关</option>
          <option value="3">专辑相关</option>
        </select>
        <div class="storage-info" v-if="has_storage">
          <div class="img-container">
            <img :src="publish_info.info.picture">
          </div>
          <p>{{publish_info.info.name}}</p>
        </div>
      </div>
    </div>
    <my-editor @changeinput="my_change_text" :value="current_value" :setting="editor_setting" class="my-editor"></my-editor>
    <button type="button" name="button" class="publish-button" @click="publish_forum">发布</button>
    <to-top></to-top>
    <my-alert :msg='alert_msg' :is-show="show_alert" :show-color="alert_color"></my-alert>
  </div>
</template>
<script>
import url_util from './../../common/url';
import * as local_uitl from './../../common/local_storage';
import key from './../../common/key.js';
import forum_header from './../components/header.vue';
import to_top from './../../common/components/to_top.vue';
import editor_tinymce from './../../common/components/editor.vue';
import my_alert from './../../../src/common/my_alert.vue';
export default {
  name: "App",
  data() {
    return{
      current_value:"",
      editor_setting:{
        height:400
      },
      publish_info:{
        title:'',
        type:1,
        content:'',
        info:{

        }
      },
      has_storage:false,
      type:0,
      show_alert:false,
      alert_msg:'123456',
      alert_color:'#FF7F50',
      login_result_msg:'',
      current_text:'',
      current_html:'',
      is_publish:false
    }
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
    check_isnull(){
      if(this.publish_info.title==''){
        this.show_alert_tip('标题不能为空');
        return false
      }
      return true;
    },
    check_textarea(){
      if(this.current_text==''){
        this.show_alert_tip('正文内容不能为空');
        return false
      }
      return true;
    },
    my_change_text(text,html){
      this.current_text = text;
      this.current_html = html;
    },
    publish_forum(){
      if(this.is_publish){
        this.show_alert_tip('上传数据中....');
        return;
      }
      if(this.check_isnull&&this.check_textarea){
        let publish_info = this.publish_info;
        publish_info.content = this.current_html;
        publish_info.type = this.type;
        let time = new Date();
        publish_info.publish_time = time.getTime();
        publish_info.comment_count = 0;
        let url = url_util.forum_url;
        this.$http.post(url,this.publish_info).then((response)=>{
          if(response.status===200){
            let body = response.body;
            if(body.success){
              console.log(body.id);
            }else{
              this.is_publish = false;
              this.show_alert_tip(body.msg);
            }
          }
        }).catch(()=>{
          this.is_publish = false;
          this.show_alert_tip('发布失败');
        })
      }
    }
  },
  created(){
    let info = localStorage.getItem("publish_artist");
    if(info&&info!==''){
      this.publish_info.info =JSON.parse(info);
      this.has_storage = true;
      this.type = 2;
      localStorage.setItem("publish_artist",'');
      return;
    }
    info = localStorage.getItem("publish_music");
    if(info&&info!==''){
      this.publish_info.info = JSON.parse(info);
      this.has_storage = true;
      this.type = 1;
      localStorage.setItem("publish_music",'');
      return;
    }
    info = localStorage.getItem("publish_album");
    if(info&&info!==''){
      this.publish_info.info = JSON.parse(info);
      this.has_storage = true;
      this.type = 3;
      localStorage.setItem("publish_album",'');
      return;
    }
  },
  components: {
    'forum-header':forum_header,
    'to-top':to_top,
    'my-editor':editor_tinymce,
    'my-alert':my_alert
  }
}
</script>
<style lang="stylus" scoped>
#App
  width: 100%;
  position: relative;
  .publish-container
    width: 480px;
    margin-left: 13%;
    display: flex;
    flex-direction: column;
    .container
      width: 100%;
      display: flex;
      flex-direction: row;
      height: 70px;
      align-items: center;
      h1
        width: 73px;
        padding: .5em 0;
        margin-right: 2em;
        font-size: 1.1em;
        border-bottom: 1px dashed  #e8e8e8;
        text-shadow: 1px 1px 2px #aeaeae;
      input,select
        font-size: 1em;
        padding: .5em;
        width: 250px;
        border-radius: 5px;
        border-bottom: 1px solid #8e8e8e;
        &::-webkit-input-placeholder
          color: rgba(0,0,0,0.3);
          opacity:1;
      .storage-info
        display: flex;
        flex-direction: row;
        align-items: center;
        .img-container
          width: 50px;
          height: 50px;
          border-radius: 25px;
          overflow: hidden;
          margin-right: 20px;
          img
            width: 100%;
            height: 100%;
  .publish-button
    width: 100px;
    height: 40px;
    border-radius: 5px;
    background-color: #31c27c;
    color: white;
    line-height: 40px;
    margin-left: calc(45% - 20px);
    margin-bottom: 100px;
    opacity: 0.8;
    &:hover
      opacity: 1;
  .my-editor
    margin-left: 200px;
</style>
