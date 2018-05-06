<template>
  <div id="yf-select">
    <div class="show-current">
      <p>{{current}}</p>
      <i class="icon-to-left-icon icon"></i>
    </div>
    <div class="select-list">
      <p v-for="(item,index) in list" @click="emit_slect(index)">{{item}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "yf-select",
  props: ['myList','active'],
  data(){
    return {
      list:this.myList,
      current:'',
      active_type:this.active
    }
  },
  created(){
    this.current = this.list[this.active_type];
  },
  methods: {
    emit_slect(index) {
      this.current = this.list[index];
      this.$emit('selectchange',index);
    }
  }
}
</script>
<style lang="stylus" scoped>
#yf-select
  width: 100px;
  position: relative;
  .select-list
    width: 120px;
    position: absolute;
    background-color: white;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.1);
    transition: all .5s;
    transform-origin: 50% 0;
    transform: scaleY(0);
    z-index: 200;
    p
      padding: .5em .3em;
      margin: 8px 0;
      font-size: .95em;
      color: rgba(0,0,0,0.6);
      &:hover
        background-color: #4a68ec;
        color: white;
        cursor: pointer;
  .show-current
    width: 120px;
    display: flex;
    flex-direction: row;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 5px;
    height: 35px;
    justify-content: space-between;
    align-items: center;
    color: #666666;
    box-shadow: 1px 1px 2px rgba(0,0,0,0.3);
    cursor: pointer;
    border-radius: 3px;
    p
      margin-left: .3em;
    i
      transform: rotate(-91deg);
      margin-right: .3em;
      transition: all .5s;
    &:hover
      color:#4a68ec;
      border: 1px solid #4a68ec;
      i
        transform: rotate(90deg);
        transition: all .5s;
  &:hover
    .select-list
      transform: scaleY(1);
      transition: all .5s;
      transform-origin: 50% 0;
</style>
