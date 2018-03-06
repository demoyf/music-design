<template>
  <div id="recommend-container">
    <h3 class="recommend-title">独家推荐</h3>
    <div class="parent-container" >
      <div class="roll-container" ref="dujia_roll_container">
        <div class="recommend-one-card" ref="dujia_one_container" v-for="item in dujia_list">
          <a href="#" v-for="my_src in item">
            <img :src="my_src">
          </a>
        </div>
        <i class="clear-float"></i>
      </div>
    </div>
    <div class="circle-bottom-icon-container">
      <i class="bottom-icon icon-circle-icon" v-for="n in count" :class="n===active_index?'active':''"
      @click="to_index(n)"></i>
    </div>
    <div class="to-left-button loop-ctrl" @click="to_left">
      <i class="icon-to-left-icon icon"></i>
    </div>
    <div class="to-right-button loop-ctrl" @click="to_right">
      <i class="icon-to-right-icon icon"></i>
    </div>
  </div>
</template>
<script>
import Roll from './../../common/util/roll_util';
export default {
  name: "recommend-container",
  data:function(){
    return{
      count:3,
      active_index:1,
      dujia_list:[["./../../../static/img/recommend/5.jpg","./../../../static/img/recommend/6.jpg"],
      ["./../../../static/img/recommend/1.jpg","./../../../static/img/recommend/2.jpg"],
      ["./../../../static/img/recommend/3.jpg","./../../../static/img/recommend/4.jpg"],
      ["./../../../static/img/recommend/5.jpg","./../../../static/img/recommend/6.jpg"],
      ["./../../../static/img/recommend/1.jpg","./../../../static/img/recommend/2.jpg"]]
    }
  },
  created() {
    //do something after creating vue instance
    this.$nextTick(()=>{
      this.roll = new Roll(this,"dujia_roll_container","dujia_one_container");
      this.roll.build("add_transition",this.count);
      this.roll.bind_transition_listener("roll-container");
    });
  },
  methods: {
    to_left(){
      if(!this.roll){
        return;
      }
      this.roll.to_left();
      this.active_index = this.roll.get_active();
    },
    to_right(){
      if(!this.roll){
        return;
      }
      this.roll.to_right();
      this.active_index = this.roll.get_active();
    },
    to_index(index){
      if(!this.roll){
        return;
      }
      this.roll.to_index(index);
      this.active_index = this.roll.get_active();
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "./../../common/stylus/mixin.styl";
#recommend-container
  width: 100%;
  gardient-background();
  margin-bottom: 4em;
  position: relative;
  overflow: hidden;
  &:hover
    .to-left-button
      left: 0;
      transition: left .5s;
    .to-right-button
      cursor: pointer;
      right: 0;
      transition: right .5s;
  .recommend-title
    my-font-stretch();
    padding-top: 2em;
  .circle-bottom-icon-container
    text-align: center;
    margin-top: 2.5em;
    .bottom-icon
      bottom-icon(.6em)
    .active
      color: rgba(0,0,0,.3);
      transition: color scale-second;
  .loop-ctrl
    loop-ctrl-mixin();
    &:hover
      cursor: pointer;
      background-color: rgba(99,99,99,.1);
    .icon
      font-size:2.6em;
      color:#666;
      font-weight: 400;
  .to-left-button
    left: -5em;
    transition: left .5s;
  .to-right-button
    right: -5em;
    transition: right .5s;
  .parent-container
    width: max-screen-width;
    margin-left: 9%;
    overflow: hidden;
    position: relative;
    .add_transition
      transition: left roll-scond;
    .roll-container
      width: 300%;
      float: left;
      position: relative;
      left:-100%;
      .recommend-one-card
        width: 33.33%;
        float: left;
        > a
          display: block;
          width: 48%;
          margin:1%;
          float: left;
          min-height: 100px;
          &::after
            content: '';
            clear:both;
          > img
            width: 100%;
      .clear-float
        content: '';
        clear: both;
@media (max-width:1300px)
  #recommend-container .parent-container
    width: min-screen-width;
    margin-left: 5%;
</style>
