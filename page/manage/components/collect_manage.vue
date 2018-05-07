<template>
  <div id="collect-manage">
    <div class="content">
      <div class="left">
        <li :class="current==1?'active':''" @click="change_active(1)">收藏的歌曲</li>
        <li :class="current==2?'active':''" @click="change_active(2)">收藏的歌手</li>
        <li :class="current==3?'active':''" @click="change_active(3)">收藏的专辑</li>
      </div>
      <div class="right">
        <div class="collect-item" v-for="(item,index) in collect_list" v-if="!item.is_ban" v-show="item.type==current">
          <div class="img-container" @click="to_next_page(index)">
            <img :src="item.picture" alt="">
          </div>
          <p>{{item.title}}</p>
          <button type="button" name="button" @click="delete_collect(index,item._id)">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import url_util from './../../common/url';
import key from './../../common/key.js';
export default {
  name: "collect-manage",
  props:['currentUser'],
  data(){
    return {
      current:1,
      collect_list:[]
    }
  },
  created(){
    let user = this.currentUser;
    let url = url_util.get_collect+user._id;
    this.$http.get(url).then((response)=>{
      if(response.status==200){
        this.collect_list = response.body;
      }
    });
  },
  methods: {
    change_active(index) {
      this.current = index;
    },
    delete_collect(index,_id){
      setTimeout(()=>{
        this.$emit('showtip','删除成功');
        this.collect_list.splice(index,1);
      },400);
    },
    to_next_page(index){
      let item = this.collect_list[index];
      if(item.type==1){
        localStorage.setItem (key.get_song_info,item.song_id);
  			window.open("/page/song_list.html");
      }else if(item.type==3){
        localStorage.setItem(key.get_album_info,item.album_id);
        window.open(key.jump_album_info);
      }else{
        localStorage.setItem(key.get_artist_id,item.artist_id);
        localStorage.setItem(key.get_ting_id,item._tingid);
        window.open(key.jump_artist_info);
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
#collect-manage
  width: 1100px;
  margin:4em  auto;
  .content
    width: 100%;
    display: flex;
    flex-direction: row;
    .right
      width: 900px;
      margin-left: 140px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .collect-item
        margin:0 15px 15px 15px;
        width: 160px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: .3em;
        box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
        border-radius: 10px;
        p
          margin-top: 20px;
        button
          width: 80px;
          height: 35px;
          border-radius: 5px;
          background-color: #31c27c;
          color: white;
          margin-top: 15px;
        .img-container
          width: 150px;
          height: 150px;
          border-radius: 75px;
          overflow: hidden;
          cursor: pointer;
          img
            width: 100%;
            height: 100%;
    .left
      width: 140px;
      li
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

</style>
