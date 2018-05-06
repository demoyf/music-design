<template>
  <div id="confirm">
    <div class="bg" @click="close_comfim">

    </div>
    <div class="content">
      <div class="header">
        {{config.header}}
      </div>
      <div class="msg">
        {{config.msg}}
      </div>
      <div class="button-container">
        <button type="button" name="button" class="delete-button" @click="sure_button">确定</button>
        <button type="button" name="button" @click="close_comfim">取消</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "confirm",
  props: ['config'],
  data(){
    return {

    }
  },
  methods: {
    close_comfim(event) {
      event.preventDefault();
      event.stopPropagation();
      this.$emit('closeconfirm','');
    },
    sure_button(){
      event.preventDefault();
      event.stopPropagation();
      this.$emit('sure','');
    }
  }
}
</script>
<style lang="stylus" scoped>
#confirm
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  .bg
    position: absolute;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.1);
  .content
    width: 300px;
    background-color: white;
    position: absolute;
    left: calc(50% - 170px);
    top:calc(50% - 100px);
    z-index: 200;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .header
      font-size: 1.1em;
      width: 100%;
      padding: 1em;
      padding-left: 3em;
      border-bottom: 1px solid rgba(0,0,0,0.1);
    .msg
      width: 160px;
      height: 30px;
      padding: 1em;
      margin-top: 1em;
      text-align: center;
    .button-container
      width: 170px;
      margin: 1em;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      button
        padding: .8em 1.2em;
        font-size: 1em;
        background-color: #d8d8d8;
        border-radius: 3px;
      .delete-button
        background-color: #31c27caa;
        color: white;

</style>
