<template>
  <div id="loading">
    <div class="loading">
    </div>
    <div class="shadow-scall">
    </div>
  </div>
</template>
<script>
export default {
  name: "loading",
  data(){
    return{};
  }
}
</script>
<style lang="stylus" scoped>
#loading
  position: relative;
  width: 200px;
  height: 100px;
  margin: auto;
  .loading
    left: 4em;
    position: absolute;
    border-radius: 10%;
    width: 2.5em;
    height: 2.5em;
    background-color:#4a68ec;
    border-radius: 10%;
    /* -webkit-animation: jellyJump 0.6s -0.1s linear infinite; */
    animation: jellyJump 0.6s -0.1s linear infinite;
  .shadow-scall
    bottom: 14%;
    height: 10px;
    top: 4em;
    left: 4.3em;
    width: 2em;
    position: absolute;
    background: #000;
    border-radius: 50%;
    opacity: 0.2;
    -webkit-animation: jellyShadow 0.6s -0.1s linear infinite;
    animation: jellyShadow 0.6s -0.1s linear infinite;
@keyframes jellyShadow {
  50% {
    transform: scale(1.25, 1);
  }
}
@keyframes jellyJump {
  17% {
    border-bottom-right-radius: 10%;
  }
  25% {
    -webkit-transform: translateY(25%) rotate(22.5deg);
  }
  50% {
    border-bottom-right-radius: 100%;
    -webkit-transform: translateY(50%) scale(1, 0.9) rotate(45deg);
  }
  75% {
    -webkit-transform: translateY(25%) rotate(67.5deg);
  }
  100% {
    -webkit-transform: translateY(0) rotate(90deg);
  }
}
</style>
