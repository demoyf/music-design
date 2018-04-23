<template>
  <div id="title-list">
    <div class="container">
      <li @click="emit_title(1)" :class="active==1?'active':''">单曲</li>
      <li @click="emit_title(2)" :class="active==2?'active':''">歌手</li>
      <li @click="emit_title(3)" :class="active==3?'active':''">专辑</li>
    </div>
  </div>
</template>
<script>
export default {
  name: "title-list",
  data(){
    return {
      active:1
    }
  },
  methods: {
    emit_title(index) {
      this.active = index;
      this.$emit("change_search",index);
    }
  }
}
</script>
<style lang="stylus" scoped>
#title-list
  width: 100%;
  margin-left: 1em;
  padding-bottom: 2em;
  font-size: 1.1em;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  margin-top: 3em;
  font-size: 1.2em;
  .container
    width: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    li:hover
      cursor: pointer;
      color: #31c27c;
    .active
      color: #31c27c;
</style>
