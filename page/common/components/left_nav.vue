<template>
  <div id="left-nav">
    <div class="nav-title-container">
      <li class="nav-item" v-for="(item,index) in billboard_types"
      :class="current==index?'active':''" @click="change_active(index)">
        {{item.name}}
      </li>
    </div>
  </div>
</template>
<script>
export default {
  name: "left-nav",
  props: ['navTitleList'],
  data(){
    return {
      billboard_types:this.navTitleList,
      current:0
    }
  },
  methods: {
    change_active(index) {
      if(this.current ===index){
        return;
      }
      this.current = index;
      this.$emit('navIndex',index);
    }
  }
}
</script>
<style lang="stylus" scoped>
#left-nav
  .nav-title-container
    width: 100%;
    .nav-item
      text-align: center;
      padding: 1em 0;
      color: white;
      background-color: #666;
      &:first-child
        border-radius: 5px 5px 0 0;
      &:last-child
        border-radius: 0 0 5px 5px;
      &:hover
        cursor: pointer;
    .active
      transition: all .3s;
      transform: translateY(-10%) translateX(10%);
      box-shadow: 1px 2px 4px rgba(0,0,0,0.6);
@keyframes shock {
  0%{
    transform: rotate(0deg);
  }
  20%{
    transform: rotate(1deg);
  }
  40%{
    transform: rotate(0deg);
  }
  60%{
    transform: rotate(-1deg);
  }
  80%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(0deg);
  }
}
</style>
