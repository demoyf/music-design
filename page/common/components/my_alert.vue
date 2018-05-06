<template>
  <div id="my-alert">
    <transition name="fade">
      <div class="alert-container" v-show="isShow" :style="{'background-color':showColor}">
        {{msg}}
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "my-alert",
  props: ['msg','isShow','showColor'],
  data(){
    return{

    }
  }
}
</script>
<style lang="stylus" scoped>
#my-alert
  .alert-container
    width: 150px;
    height: 50px;
    font-size: .9em;
    color: white;
    text-align: center;
    position: fixed;
    line-height: 50px;
    top: 150px;
    left: 46%;
    z-index: 700;
    border-radius: 5px
    transition: all .5s;
  .fade-enter-to,
  .fade-leave
    top: 150px;
    opacity: 1;
  .fade-in-enter-active,
  .fade-in-leave-active
    transition: top .5s;
  .fade-in-enter,
  .fade-in-leave-to
    opacity: 0;
    top: 200px;
</style>
