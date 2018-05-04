<template>
  <div class="editor-xyf">
    <div id="editor_toolbar" class="toolbar" style="width:1100px;border: 1px solid #ccc;
    background-color: #f1f1f1;padding:5px;margin-bottom:1px;">
    </div>
    <div id="editor_area" class="text" style="width:1100px;height:400px;border: 1px solid #ccc;"> <!--可使用 min-height 实现编辑区域自动增加高度-->
    </div>
    <div class="submit-button">
      <button type="button" name="button" @click="save_data">提交</button>
    </div>
  </div>
</template>
<script>
// Import TinyMCE
import editor_Wang from 'wangeditor';
export default{
  name:'editor-xyf',
  data(){
    return {
      editor:undefined
    }
  },
  mounted(){
    this.editor = new editor_Wang('#editor_toolbar','#editor_area');
    let editor = this.editor;
    editor.customConfig.uploadImgServer = 'http://106.14.13.178:3000/img/upload';
    editor.customConfig.uploadFileName = 'img';
    editor.customConfig.uploadImgHeaders = {
    'Accept': 'text/x-json'
    };
    editor.customConfig.uploadImgHooks = {
      before: function (xhr, editor, files) {

      },
      success: function (xhr, editor, result) {
          // 图片上传并返回结果，图片插入成功之后触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      fail: function (xhr, editor, result) {
          // 图片上传并返回结果，但图片插入错误时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      error: function (xhr, editor) {
          // 图片上传出错时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      timeout: function (xhr, editor) {
          // 图片上传超时时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      customInsert: function (insertImg, result, editor) {
        var url = result.data[0];
        insertImg(url)
      }
    }
    editor.create();
  },
  methods:{
    save_data() {
      console.log(this.editor.txt.html());
    }
  }
}
</script>
<style lang="stylus">
.editor-xyf
  height:500px;
  margin-left: 100px;
  margin-bottom: 200px;
</style>
