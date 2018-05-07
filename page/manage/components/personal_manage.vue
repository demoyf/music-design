<template>
  <div id="personal-manage">
    <h1>修改个人信息</h1>
    <div class="input-container">
      <label>昵称：<input class="tag" v-model="nickname" type="text"/></label>
      <label>个性签名：<input  v-model="personal_tag" type="text"/></label>
      <button type="button" name="button" @click="emit_change">修改</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "personal-manage",
  props:['currentUser'],
  data(){
    return{
      nickname:'',
      personal_tag:''
    }
  },
  created(){
    this.nickname = this.currentUser.nickname;
    this.personal_tag = this.currentUser.personal_tag;
  },
  methods: {
    emit_change() {
      this.$emit('infochange',this.nickname,this.personal_tag);
    }
  }
}
</script>
<style lang="stylus" scoped>
#personal-manage
  width: 1100px;
  margin: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.2);
  margin-top: 3em;
  background: linear-gradient(rgba(170,170,170,0.086) 40%, #fff 100%);
  h1
    margin-top: 1.4em;
    text-align: center;
    margin-bottom: 1.4em;
    font-size: 2em;
    color:#333;
    letter-spacing:.3em;
    font-stretch:narrower;
    font-family:SimHei;
    font-weight:bold;
    -webkit-transform: scale(.95);
    transform: scale(.95);
  .input-container
    display: flex;
    flex-direction: column;
    padding: 1% 15%;
    button
      width: 130px;
      height: 48px;
      font-size: 18px;
      color: white;
      background-color: #31c27c;
      line-height: 48px;
      display: block;
      margin: 25px auto;
      border-radius: 5px;
      opacity: 0.8;
      &:hover
        opacity: 1;
    label
      margin: .5em 0;
      font-size: 1.1em;
      line-height:40px;
      input
        color:#666666;
        width: 300px;
        background: transparent;
        margin-left: 1.5em;
        padding: .5em;
        border-bottom: 1px solid rgba(0,0,0,0.2);
        border-radius: 5px;
        font-size: 1em;
      .tag
        margin-left: 3.6em;
</style>
