<template>
  <div id="login-com">
    <i class="icon-plus-icon close-icon" @click="close_me"></i>
    <div class="login-container">
      <div class="show-message">
        <div class="loading">

        </div>

      </div>
      <div class="user-name-container">

      </div>
      <div class="password-container">

      </div>
      <button type="button" name="login">登录</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "login-com",
  data(){
    return{}
  },
  methods:{
    close_me(){
      this.$emit("close-login");
    }
  }
}
</script>
<style lang="stylus" scoped>
#login-com
  width: 100%;
  position: fixed;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .close-icon
    display: block;
    font-size: 2em;
    transform: rotateZ(45deg);
    color: rgba(255,255,255,0.6);
    transition: all .8s;
    position: absolute;
    top: 1em;
    right: 1em;
    &:hover
      transition: all .8s;
      transform: rotateZ(225deg);
      cursor: pointer;
  .login-container
    width: 200px;
    height: 300px;
    background-color: white;
    border-radius: 10px;
    box-shadow: -2px -2px 4px 4px rgba(0,0,0,0.5);
    position: absolute;
</style>
