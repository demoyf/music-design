<template>
  <div id="show-hot-artist">
    <div class="has-img-artist">
      <div class="img-artist-container"
      v-for="item in img_hot">
      <div class="img-container">
        <img :src="item.music_url" alt="">
      </div>
      <p>{{item.name}}</p>
      </div>
    </div>
    <div class="just-span-list" v-if="span_hot!==undefined"
    >
      <p v-for="item in span_hot">{{item.name}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "show-hot-artist",
  props: ['hotArtist'],
  data(){
    return {
      artist_list:this.hotArtist,
      music_url:'./../static/img/default.png',
      img_hot:undefined,
      span_hot:undefined
    }
  },
  created() {
    //do something after creating vue instance
    let hot_artist = this.artist_list;
    let img_list = hot_artist.slice(0,10);
    for(let i = 0;i<img_list.length;i++){
      let item = img_list[i];
      item.music_url = this.music_url;
    }
    this.img_hot = img_list;
    let temp_img_list = this.img_hot;
    for(let i = 0;i<temp_img_list.length;i++){
      let item = temp_img_list[i];
      let img = new Image();
      img.src = item.avatar_big;
      img.onload = ((i)=>{
        this.img_hot[i].music_url = item.avatar_big;
        console.log("created");
      })(i);
    }
    if(hot_artist.length>10){
      let span_list = hot_artist.slice(10,hot_artist.length);
      this.span_hot = span_list;
    }
  },
  mounted() {
    //do something after mounting vue instance
    console.log("mounted");
  }
}
</script>
<style lang="stylus" scoped>
@import './../../../src/common/stylus/mixin.styl';
#show-hot-artist
  width: max-screen-width;
  margin: 5em auto;
  .has-img-artist
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    .img-artist-container
      width: 19%;
      background-color: #99999911;
      border-radius: 10px;
      margin-top: 1em;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .img-container
        width: 80%;
        border-radius: 50%;
        overflow: hidden;
        margin: 10%;
        >img
          width: 100%;
          height: 100%;
          display: block;
      > p
        ellipsis_tran();
        max-width: 100%;
        margin-bottom: 2em;
        &:hover
          color: music-color;
          cursor: pointer;
  .just-span-list
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 3em;
    > p
      width: 19%;
      padding: .3em;
      display: block;
      text-align: left;
      ellipsis_tran();
      &:hover
        color: music-color;
        cursor: pointer;


</style>
