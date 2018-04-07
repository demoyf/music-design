<template>
  <div id="billboard-container">
    <div class="title">
      <h1> {{pageInfo.name}}</h1>
    </div>
    <div class="song-list-container">
      <li v-for="item in pageList">
        {{item.title}}
      </li>
    </div>
  </div>
</template>
<script>
export default {
  name: "billboard-container",
  props:['pageInfo','pageList'],
  data(){
    return {

    }
  },
  mounted(){

  }
}
</script>
<style lang="stylus" scoped>
#billboard-container
  height: 500px;
  width:calc(100% - 300px);
  .title h1
    text-align: left;
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
