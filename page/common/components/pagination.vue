<template>
  <div id="pagination">
    <div class="my-pagination">
      <i class="icon-to-left-icon icon" @click="to_left"></i>
      <transition name="page-item" v-for="item in this.page_num"
      >
        <i @click="to_index(item)"
         :class="{'active':item==current}"
         v-show="item>=before&&item<(count+before)">{{item}}</i>
      </transition>
      <i class="icon-to-right-icon icon" @click="to_right"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "pagination",
  props: ['pageNum'],
  data(){
    return {
      page_num:this.pageNum+1,
      count:0,
      current:1,
      before:1
    }
  },
  created() {
    //do something after creating vue instance
    if(this.page_num>4){
      this.count = 4;
    }else{
      this.count = this.page_num;
    }
  },
  methods: {
    to_left() {
      if(this.current-2<this.before&&this.before>=2){
        console.log("before:"+this.before);
        this.before--;
      }
      if(this.current<=1){
        return;
      }else{
        this.current--;
        this.$emit("pagination",this.current);
      }
    },
    to_right(){
      if(this.current+2>this.count&&this.current+2<=this.page_num){
        this.before++;
      }
      if(this.current>=this.page_num){
        return;
      }else{
        this.current++;
        this.$emit("pagination",this.current);
      }
    },
    to_index(index){
      this.current = index;
      this.$emit("pagination",index);
    }
  }
}
</script>
<style lang="stylus" scoped>
#pagination
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .my-pagination
    display: flex;
    width: auto;
    margin-top:6em;
    .page-item-enter-active
      transition: all .5s;
      opacity: 1;
      transform: scale(1);
    .page-item-leave-active
      transition: all .5s;
      opacity: 0;
      transform: scale(0);
    .page-item-enter,.page-item-leave-to
      opacity: 0;
      transform: scale(0);
    .page-item-leave,.page-item-enter-to
      opacity: 1;
      transform: scale(1);
    > i
      display: block;
      width: 2.1em;
      height: 2.1em;
      text-align: center;
      line-height: 2.1em;
      font-size: 1em;
      color: #999;
      margin: .3em;
      &:hover
        background-color: #31c27c;
        color: white;
        cursor: pointer;
    .active
      background-color: #31c27c;
      color: white;
</style>
