<template>
<div id="check-box">
  <input type="checkbox" name="sex" id="male" class="chooseBtn" />
  <label for="male" class="choose-label"></label>
</div>
</template>
<script>
export default {
  name: "check-box",
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.chooseBtn
    display: none;
.choose-label
    box-shadow: #ccc 0 0 0 1px;
    width: 40px;
    height: 20px;
    display: inline-block;
    border-radius: 20px;
    position: relative;
    background-color: #bdbdbd;
    overflow: hidden;
.choose-label:before
    content: '';
    position: absolute;
    left: 0;
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 20px;
    background-color: #fff;
    z-index: 20;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
.chooseBtn:checked + label.choose-label:before
    left: 20px;

.chooseBtn:checked + label.choose-label
    background-color: #51ccee;
</style>
