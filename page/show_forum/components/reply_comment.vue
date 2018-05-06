<template>
  <div id="comment">
    <div class="header">
      <div class="img-container">
        <img :src="commentObj.my_picture|get_picture" alt="">
      </div>
      <p>{{commentObj.my_name}}</p>
      <p style="text-align:right;color:rgba(0,0,0,0.6)">{{commentObj.publish_time | formatDateTime}}</p>
    </div>
    <div class="content">
      <p>{{commentObj.comment_content}}</p>
      <div class="reply-to-content">
        <div class="header">
          <div class="img-container">
            <img :src="commentObj.replay_to_user_picture|get_picture" alt="">
          </div>
          <p>{{commentObj.replay_to_user_name}}</p>
        </div>
        <div class="msg">
          {{commentObj.replay_to_commetn_content}}
        </div>
      </div>
    </div>
    <div class="footer">
      <button type="button" name="button" @click="reply">回复</button>
      <button type="button" name="button" v-if="canDelete" @click="emit_delete">删除</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "comment",
  props: ['commentObj','canDelete','index'],
  data(){
    return {

    }
  },
  methods:{
    emit_delete(){
      this.$emit("deletecomment",this.commentObj._id,this.index);
    },
    reply(){
      this.$emit("replycomment",this.commentObj._id,this.index);
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
  }
}
</script>
<style lang="stylus" scoped>
#comment
  width: 900px;
  height: 350px;
  display: flex;
  flex-direction: column;
  padding: 1em;
  box-sizing: border-box;
  margin-bottom: 1.3em;
  background: linear-gradient(rgba(170,170,170,0.086) 40%, #fff 100%);
  border-radius: 10px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
  .footer
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: 50px;
    align-items: center;
    width: 100%;
  .content
    width: 100%;
    height: 240px;
    padding: 2em;
    box-sizing: border-box;
    .reply-to-content
      padding: 2em;
      margin-top: 1em;
      box-sizing: border-box;
      border-radius: 5px;
      background-color: rgba(0,0,0,0.2);
      width: 700px;
      margin-left: 50px;
      .header
        margin-bottom: 1em;
  .header
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 1em;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    .img-container
      width: 50px;
      height: 50px;
      border-radius: 25px;
      overflow: hidden;
      img
        width: 100%;
        height: 100%;
    p
      width: 350px;
      text-align: left;
      margin-left: 30px;
</style>
