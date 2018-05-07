<template>
  <div id="choose-img">
    <div class="bg" @click="emit_close">

    </div>
    <div class="content">
      <div class="img-container" v-for="item in 18" :class="current==item?'active':''" @click="change_image(item)">
        <img :src="item | get_picture" alt="">
      </div>
    </div>
    <div class="footer">
      <button type="button" name="button" class="sure-btn" @click="emit_success">确认</button>
      <button type="button" name="button" class="cancel-btn" @click="emit_close">取消</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "choose-img",
  props: ['currentIndex'],
  data(){
    return {
      current:this.currentIndex
    }
  },
  methods:{
    emit_close(){
      this.$emit('closechoose');
    },
    change_image(index){
      this.current = index;
    },
    emit_success(){
      this.$emit('choosesuccess',this.current);
    }
  },
  filters:{
    get_picture(value){
      if(typeof value=='number'||value.indexOf('http')<0){
        return "http://106.14.13.178/icon/"+value+".jpg";
      }
      return value;
    }
  }
}
</script>
<style lang="stylus" scoped>
#choose-img
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
  .footer
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: absolute;
    left: calc(50% + 200px);
    top: calc(50% + 200px);
    z-index: 400;
    button
      width: 80px;
      height: 35px;
      border-radius: 5px;
      font-size: 1.1em;
      color:#666666;
      margin-right: 20px;
    .sure-btn
      background-color: #31c27c;
      color: white;
    .cancel-btn
      background-color: #d8d8d8;
  .bg
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,0.3);
    z-index: 300;
  .content
    width: 800px;
    height: 500px;
    background-color: white;
    z-index: 400;
    position: absolute;
    left: calc(50% - 400px);
    top: calc(50% - 250px);
    border-radius: 10px;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 1em;
    box-sizing: border-box;
    overflow: scroll;
    .img-container
      width: 120px;
      height: 120px;
      padding: .5%;
      box-sizing: border-box;
      cursor: pointer;
      img
        width: 99%;
        height: 99%;
    .active
      border: 2px solid #4a68ec;
</style>
