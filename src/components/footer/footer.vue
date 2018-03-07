<template>
  <div id="footer">
    <a v-for="item in link_list" :href="item.link"
    target="_blank">
      <div class="link-container">
        <p class="name-container">{{item.name}}</p>
        <i :class="item.icon" class="my-link-icon"></i>
      </div>
    </a>
  </div>
</template>
<script>
import my_link from './../../common/util/my_link';
export default {
  name: "",
  data: () => ({
    link_list:[]
  }),
  created() {
    //do something after creating vue instance
    this.link_list = Array.from(my_link);
  }
}
</script>
<style lang="stylus" scoped>
#footer
  width: 100%;
  height: 300px;
  background-color: #333;
  color: #999;
  a:nth-child(1)
    .link-container
      margin:4em 0 0 200px;
  a:nth-child(2)
    .link-container
      margin:4em 0 0 500px;
  a:nth-child(3)
    .link-container
      margin:4em 0 0 800px;
  a
    display: block;
    width: 10px;
    .link-container
      font-size: 1em;
      padding-top: 1em;
      width: 200px;
      overflow: hidden;
      height: 20px;
      .name-container
        width: 0;
        overflow: hidden;
        transition: all 2s;
        height: 1em;
        display: inline-block;
        float: left;
      .my-link-icon
        display: block;
        width: 1em;
        height: 1em;
        font-size: 1.3em;
        float: left;
        &::after
          content: '';
          clear: both;
      &:hover
        .my-link-icon
          animation: link-animation 2s ease-in-out;
        p
          width: 7em;
          transition: all 2s;
@keyframes link-animation
  0%
    transform: translateX(0) rotateZ(0);
  10%
    transform: rotateZ(25deg) translateY(0);
  20%
    transform: rotateZ(0deg) translateY(0);
  30%
    transform: rotateZ(-25deg) translateY(0);
  40%
    transform: rotateZ(0deg) translateY(0);
  50%
    transform: rotateZ(25deg) translateY(-30%);
  60%
    transform: rotateZ(0) translateY(0%);
  70%
    transform: rotateZ(-25deg) translateY(-30%);
  80%
    transform: rotateZ(0) translateY(-20%);
  85%
    transform: rotateZ(0) translateY(0%);
  90%
    transform: rotateZ(0) translateY(-10%);
  95%
    transform: rotateZ(0) translateY(0%);
  98%
    transform: rotateZ(0) translateY(-5%);
  100%
    transform: rotateZ(0) translateY(0%);
</style>
