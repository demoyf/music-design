<template>
  <div id="App">
    <forum-header></forum-header>
    <div class="publish-container">
      <div class="title">
        
      </div>
      <div class="type">

      </div>
    </div>
    <my-editor :value="current_value" :setting="editor_setting" class="my-editor"></my-editor>
    <to-top></to-top>
  </div>
</template>
<script>
import url_util from './../../../src/common/util/url';
import * as local_uitl from './../../common/local_storage';
import key from './../../common/key.js';
import forum_header from './../components/header.vue';
import to_top from './../../common/components/to_top.vue';
import editor_tinymce from './../../common/components/editor.vue';
export default {
  name: "App",
  data() {
    return{
      current_value:"",
      editor_setting:{
        height:400
      }
    }
  },
  components: {
    'forum-header':forum_header,
    'to-top':to_top,
    'my-editor':editor_tinymce
  }
}
</script>
<style lang="stylus" scoped>
#App
  width: 100%;
  position: relative;
  .my-editor
    margin-left: 200px;
    margin-bottom: 200px;
</style>
