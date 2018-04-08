<template>
  <div id="billboard-item">
    <div class="img-container">
      <img :src="billboardItem.pic_small" alt="">
    </div>
    <h1>{{billboardItem.title}}</h1>
    <p>{{billboardItem.artist_name}}</p>
    <p>{{billboardItem.album_title}}</p>
    <h2>{{billboardItem.file_duration|change_duration}}</h2>
  </div>
</template>
<script>
export default {
  name: "billboard-item",
  props: ['billboardItem'],
  data(){
    return {

    }
  },
  created() {
    //do something after creating vue instance
    console.log(this.billboardItem);
  },
  filters:{
    change_duration(value){
      if(!value){
        return '暂无';
      }
      let result = "";
      let minute = Math.ceil(value/60);
      result+=minute>=10?minute:("0"+minute);
      result+=":";
      let second = value%60;
      result+=second>=10?second:"0"+second;
      return result;
    }
  }
}
</script>
<style lang="stylus" scoped>
#billboard-item
  width: 100%;
  height: 60px;
  margin-bottom: 1em;
  padding-left: 1.5em;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #666;
  align-items: center;
  .img-container
    width: 60px;
    height: 100%;
    border-radius: 30px;
    overflow: hidden;
    img
      width: 100%;
      height: 100%;
  h1
    width: 25%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  p
    width: 20%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  h2
    width: 8%;
</style>
