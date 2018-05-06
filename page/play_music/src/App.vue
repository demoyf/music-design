<template>
  <div id="App" v-if="current_song">
    <div class="img-container">
      <img :src="current_song.songinfo.pic_premium">
    </div>
    <div class="song-info-container">
      <div class="song-controll">
        <button type="button" class="music-other-button" name="coll-button">
          <i class="icon-heart-icon"></i>
          收藏
        </button>
        <button type="button" class="music-other-button" name="coll-button" @click="clear_all_music">
          <i class="icon-heart-icon"></i>
          清空列表
        </button>
        <button type="button" class="music-other-button" name="coll-button" @click="remove_some_music">
          <i class="icon-heart-icon"></i>
          删除
        </button>
      </div>
      <div class="song-container">
        <div class="play-list">
          <div class="header">
            <div class="check-box" @click="my_check_all">
              <i class="icon-check-box-outline-icon" v-show="!check_all"></i>
              <i class="icon-check-box-icon" v-show="check_all"></i>
            </div>
            <p class="song_p">歌曲</p>
            <p class="aratist_p">歌手</p>
            <p class="duration_p">时长</p>
          </div>
          <div class="song-list">
            <div class="song_container" v-for="(song,index) in song_list" :class="current_play==index?'active':''"
            @dblclick="to_index(index)">
              <div class="check-box" @click="check_current(index)">
                <i class="icon-check-box-outline-icon" v-show="!check_list[index].is_check"></i>
                <i class="icon-check-box-icon" v-show="check_list[index].is_check"></i>
              </div>
              <p class="song_p">{{song.songinfo.title}}</p>
              <p class="aratist_p">{{song.songinfo.author}}</p>
              <p class="duration_p">{{song.bitrate.file_duration |change_duration}}</p>
            </div>
          </div>
        </div>
        <div class="song-info">
          <div class="song-img">
            <img :src="current_song.songinfo.pic_big">
          </div>
          <div class="info">
            <p>歌曲名：{{current_song.songinfo.title}}</p>
            <p>歌手名：{{current_song.songinfo.author}}</p>
            <p>专辑名：{{current_song.songinfo.album_title}}</p>
          </div>
          <div class="lrc">
            <div class="loop-lrc" ref="loop_lrc" :style="{top:current_top+'px'}">
              <p v-for="(item,index) in current_song.lrc_list"
              style="text-align:center;" :class="index==show_active?'active':''">
                {{item.lrc_text}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="play-control-container">
      <div class="play-control-button">
        <i class="icon-previous-icon icon" @click="to_previous"></i>
        <i class="icon-pause-icon icon plus" v-show="!is_stop" @click="stop_play"></i>
        <i class="icon-play-icon icon plus" v-show="is_stop" @click="continue_play"></i>
        <i class="icon-next-icon icon" @click="to_next"></i>
      </div>
      <div class="play-process" @mousemove="scroll" @mouseup="end_scroll">
        <div class="current_info">
          <div class="title">
            {{current_song.songinfo.title}}
          </div>
          <div class="time">
            {{current_duration | change_duration}}
            /{{current_song.bitrate.file_duration |change_duration}}
          </div>
        </div>
        <div class="process-bottom">
        </div>
        <div class="proces-top">
          <div class="scroll-line" ref="scroll_line" :style="{width:current_width+'px'}">
          </div>
          <div class="control-button" ref="control_button" @mousedown="start_scroll"  >
          </div>
        </div>
      </div>
      <div class="volumn-type-control">
        <div class="type-control" @click="change_shuffle">
          <i class="icon-loop-play-icon icon" v-show="is_shuffle===1"></i>
          <i class="icon-shuffle-play-icon icon" v-show="is_shuffle===2"></i>
          <i class="icon-loop-play-icon icon single-icon" v-show="is_shuffle===3"></i>
        </div>
        <div class="volumn-control">
          <div class="volumn" @mousemove="move_volumn_scroll" @mouseup="end_volumn_scroll">
            <div class="volumn-bottom" v-show="is_volume">
            </div>
            <div class="volumn-top" v-show="is_volume">
              <div class="button-control" @mousedown="start_volumn_scroll">
              </div>
              <div class="scroll-line" :style="{height:volumn_height+'px'}">
              </div>
            </div>
          </div>
          <i class="icon-volume-icon icon" @click="change_is_volume"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import url_util from './../../../src/common/util/url';
import * as local_uitl from './../../common/local_storage';
import key from './../../common/key.js';
import lrc_util from './../../common/slove_lrc.js';
export default {
  name: "App",
  data() {
    return{
      song_list:[],
      current:-1,
      p_height:0,
      current_top:0,
      show_active:-1,
      current_song:undefined,
      id_list:[],
      check_list:[],
      show_loop:true,
      song_audio:undefined,
      current_play:0,
      is_stop:false,
      scroll_obj:{
        isdown:false,
        start_x:0,
        end_x:0,
        move_x:0
      },
      current_width: 0,
      start_width:0,
      scroll_timer:undefined,
      current_duration:0,
      is_shuffle:1,
      process_timer:undefined,
      volumn_height:50,
      start_height:50,
      volumn_scroll_obj:{
        start_y:0,
        end_y:0,
        isdown:false
      },
      is_volume:false,
      check_list:[],
      check_all:false,
      is_key_down:false,
      key_list:[18,17,39,37,80],
      current_key:[]
    }
  },
  created() {
    //do something after creating vue instance
    let that = this;
    window.onunload = function(){
      let obj ={
          song_list:that.song_list,
          id_list:that.id_list,
          check_list:that.check_list,
          is_shuffle:that.is_shuffle,
      }
      local_uitl.save_item(key.get_has_paly_page,"0");
      localStorage.setItem("before_song_info",JSON.stringify(obj));
    }
    let before_song_list = localStorage.getItem("before_song_info");
    let song_id = local_uitl.read_item(key.get_play_song_id);
    let song_list = localStorage.getItem("play_new_music_list");
    let add_song_list = localStorage.getItem("add_new_music_list");
    let add_song = localStorage.getItem("add_new_music");
    if(before_song_list){
      var temp_list = JSON.parse(before_song_list);
      this.song_list = temp_list.song_list;
      this.id_list = temp_list.id_list;
      this.check_list = temp_list.check_list;
      this.is_shuffle = temp_list.is_shuffle;
    }
    if(song_id&&song_id!==''){
      localStorage.setItem(key.get_play_song_id,'')
      that.push_song(song_id,true);
    }
    else if(song_list&&song_list!==''){
      localStorage.setItem("play_new_music_list",'')
      that.push_song(song_list,true);
    }else if(add_song_list&&add_song_list!==''){
      localStorage.setItem("add_new_music_list",'')
      that.push_song(add_song_list,true);
    }else if(add_song&&add_song!==''){
      localStorage.setItem("add_new_music",'')
      that.push_song(add_song,true);
    }else{
      this.current = 0;
      this.current_song = this.song_list[0];
    }
  },
  mounted(){
    let that = this;
    window.addEventListener("storage",function(){
      if(event.key =="play_song_id"){
          let list = localStorage.getItem(event.key);
          if(list&&list!==''){
            that.push_song(list,true);
          }
          localStorage.setItem(event.key,'');
      }else if(event.key==='add_new_music'){
          let list = localStorage.getItem(event.key);
          if(list&&list!==''){
            that.push_song(list,false);
          }
          localStorage.setItem(event.key,'');
      }else if(event.key==="add_new_music_list"){
        let list = localStorage.getItem(event.key);
        if(list&&list!==''){
          let arr = list.split(',');
          that.push_song(list,false);
        }
        localStorage.setItem(event.key,'');
      }else if(event.key==='play_new_music_list'){
        let list = localStorage.getItem(event.key);
        if(list&&list!==''){
          that.push_song(list,true);
        }
        localStorage.setItem(event.key,'');
      }
    });
    // 18-alt 17-crtl 39-> 37 -<  80-p
    // 快捷键，兮兮
    document.body.addEventListener("keydown",(event)=>{
      let eventCode = event.keyCode;
      this.is_key_down = true;
      if(this.key_list.findIndex(item=>item==eventCode)>=0){
        if(this.current_key.findIndex(item=>item==eventCode)==-1){
          this.current_key.push(eventCode);
        }
      }
      return;
    });
    document.body.addEventListener("keyup",(event)=>{
      if(this.is_key_down&&this.current_key.length==3){
        if(this.current_key.findIndex(item=>item==18)>=0
        &&this.current_key.findIndex(item=>item==17)>=0){
          if(this.current_key.findIndex(item=>item==37)>=0){
            this.to_previous();
          }else if(this.current_key.findIndex(item=>item==39)>=0){
            this.to_next();
          }else if(this.current_key.findIndex(item=>item==80)>=0){
            if(this.is_stop){
              this.continue_play();
            }else{
              this.stop_play();
            }
          }
        }
      }
      this.current_key = [];
      this.is_key_down = false;
      return;
    })
  },
  filters:{
    change_duration(value){
      if(!value&&value!==0){
        return '暂无';
      }
      let result = "";
      let minute = Math.floor(value/60);
      result+=minute>=10?minute:("0"+minute);
      result+=":";
      let second = value%60;
      result+=second>=10?second:"0"+second;
      return result;
    }
  },
  watch:{

  },
  methods: {
    start_loop() {
      if(!this.show_loop){
        return;
      }
      let lrc_list = this.current_song.lrc_list;
      if(lrc_list.length===0){
        return;
      }
      let that = this;
      this.p_height = that.$refs.loop_lrc.firstChild.clientHeight;
      if(this.scroll_timer){
        clearTimeout(this.scroll_timer);
        _loop(0);
      }else{
        _loop();
      }
      function _loop(my_step){
        if(that.current>=lrc_list.length-1){
          return;
        }
        var currentTime = (that.song_audio.currentTime*1000).toFixed(2);
        let current = that.current;
        if(current<-1){
          that.current = current = -1;
        }
        let after = lrc_list[current+1];
        let step = 0;
        let can_scroll = false;
        step = after.time-currentTime;
        if(step<=0){
          step = 0;
        }
        if(that.is_stop){
          return;
        }
        if(my_step!==undefined){
          step = my_step;
        }
        that.scroll_timer = setTimeout(function(){
          if(that.is_stop){
            return;
          }
          that.current_top = -(that.p_height*(current-4)<=0?0:that.p_height*(current-4));
          that.current++;
          // console.log(after);
          if(after.lrc_text!==""){
            that.show_active = that.current;
          }
          _loop();
        },step);
      }
    },
    play_music(link){
      if(this.song_audio){
          this.song_audio.pause();
      }
      this.song_audio = null;
      this.current=-1,
      this.p_height=0,
      this.current_to=0,
      this.show_active=-1,
      this.current_width = 0;
      this.start_width = 0;
      this.current_duration = 0;
      this.scroll_obj ={
              isdown:false,
              start_x:0,
              end_x:0,
              move_x:0
      };
      this.volumn_scroll_obj = {
              isdown:false,
              start_x:0,
              end_x:0
      }
      if(this.scroll_timer){
        clearTimeout(this.scroll_timer);
      }
      if(this.process_timer){
        clearTimeout(this.process_timer);
      }
      this.song_audio = document.createElement("audio");
      let audio = this.song_audio;
      audio.src = link;
      audio.volume = 0.5;
      let init = 1;
      audio.addEventListener("canplaythrough",()=>{
        if(this.song_audio.src==audio.src)
        audio.play();
        if(init===1){
          this.start_loop();
          this.start_process();
          init++;
        }
      });
      audio.addEventListener("ended",()=>{
        if(this.song_audio.src==audio.src)
          this.to_next(1);
      })
    },
    stop_play(){
      this.current--;
      this.song_audio.pause();
      this.is_stop = true;
    },
    continue_play(){
      this.song_audio.play();
      this.is_stop = false;
      this.start_loop();
      this.start_process();
    },
    start_scroll(event){
      let scroll_obj = this.scroll_obj;
      scroll_obj.isdown = true;
      scroll_obj.start_x = event.clientX;
    },
    scroll(event){
      let scroll_obj = this.scroll_obj;
      if(scroll_obj.isdown){
        scroll_obj.move_x = event.clientX;
        let step = scroll_obj.move_x - scroll_obj.start_x;
        this.current_width = this.start_width + step;
      }
    },
    end_scroll(event){
      let scroll_obj = this.scroll_obj;
      if(scroll_obj.isdown){
        scroll_obj.end_x = event.clientX;
        let step = scroll_obj.end_x - scroll_obj.start_x;
        this.current_width = this.start_width + step;
        this.start_width = this.current_width;
        scroll_obj.isdown = false;
        this.change_current_time();
      }
    },
    start_process(){
      var audio = this.song_audio;
      var duration = audio.duration;
      var step = ((200/(duration*1000)*650)).toFixed(2);
      var that = this;
      if(this.process_timer){
        clearTimeout(this.process_timer);
      }
      _loop();
      function _loop(){
        if(that.scroll_obj.isdown||that.is_stop){
          return;
        }
        that.current_duration = Math.floor(audio.currentTime);
        if(that.current_width>=650){
          that.current_width = 650;
          return;
        }
        that.process_timer = setTimeout(()=>{
          let current_width = that.current_width;
          that.current_width = parseFloat(current_width)+parseFloat(step);
          _loop();
        },200);
      }
    },
    change_scroll(){
      let lrc_list = this.current_song.lrc_list;
      let duration = (this.song_audio.currentTime*1000).toFixed(2);
      let index = -1;
      for(let item of lrc_list){
        index++;
        if(duration<=item.time){
          this.current = index-2;
          let step = item.time-duration;
          this.start_loop(step);
          this.start_process();
          return;
        }
        if(index==lrc_list.length-1){
          this.start_loop(0);
          this.start_process();
        }
      }
    },
    change_current_time(){
      let width = this.current_width;
      let audio = this.song_audio;
      let duration = audio.duration;
      let step = ((width/650)*duration);
      if(this.scroll_timer){
        audio.pause();
        audio.currentTime = step;
        audio.play();
        this.change_scroll(step);
        return;
      }
    },
    start_volumn_scroll(event){
      let scroll_obj = this.volumn_scroll_obj;
      scroll_obj.start_y = event.clientY;
      scroll_obj.isdown = true;
    },
    move_volumn_scroll(event){
      let scroll_obj = this.volumn_scroll_obj;
      if(!scroll_obj.isdown){
        return;
      }
      scroll_obj.end_y = event.clientY;
      let step = scroll_obj.end_y - scroll_obj.start_y;
      this.volumn_height =  this.start_height - step;
      if(this.volumn_height>100){
        this.volumn_height = 100;
      }else if(this.volumn_height<0){
        this.volumn_height = 0;
      }
    },
    end_volumn_scroll(event){
      let scroll_obj = this.volumn_scroll_obj;
      if(!scroll_obj.isdown){
        return;
      }
      scroll_obj.end_y = event.clientY;
      let step = scroll_obj.end_y - scroll_obj.start_y;
      this.volumn_height =  this.start_height - step;
      scroll_obj.isdown = false;
      if(this.volumn_height>100){
        this.volumn_height = 100;
      }else if(this.volumn_height<0){
        this.volumn_height = 0;
      }
      this.start_height = this.volumn_height;
      this.song_audio.volume = (this.volumn_height/100);
    },
    change_is_volume(){
      this.is_volume = !this.is_volume;
    },
    change_shuffle(){
      this.is_shuffle = (this.is_shuffle)%3+1;
    },
    my_check_all(){
      this.check_all = !this.check_all;
      let check = this.check_all;
      for(let item of this.check_list){
        item.is_check = check;
      }
    },
    check_current(index){
      this.check_list[index].is_check  = !this.check_list[index].is_check;
    },
    stop_music_methods(){
      if(this.song_audio){
          this.song_audio.pause();
          this.song_audio = null;
      }
      this.song_audio = null;
      this.current=-1,
      this.p_height=0,
      this.current_to=0,
      this.show_active=-1,
      this.current_width = 0;
      this.start_width = 0;
      this.current_duration = 0;
      this.scroll_obj ={
              isdown:false,
              start_x:0,
              end_x:0,
              move_x:0
      };
      this.volumn_scroll_obj ={
              isdown:false,
              start_x:0,
              end_x:0
      }
      if(this.scroll_timer){
        clearTimeout(this.scroll_timer);
      }
      if(this.process_timer){
        clearTimeout(this.process_timer);
      }
    },
    clear_all_music(){
      this.song_list = [];
      this.check_list = [];
      this.id_list = [];
      this.stop_music_methods();
    },
    remove_some_music(){
      let check_list = [].concat(this.check_list);
      let current = 0;
      let current_play = this.current_play;
      let not_check = 0;
      let song_id = 0;
      for(let item of check_list){
        if(item.is_check&&current==current_play&&not_check==0){
            not_check=1;
        }
        else if(not_check==1&&!item.is_check){
          not_check=2;
          song_id = item.song_id;
          break;
        }
        current++;
      }
      for(let temp of check_list){
        if(temp.is_check){
          this.song_list.splice(this.check_list.findIndex(item=>item.is_check==true),1);
          this.id_list.splice(this.check_list.findIndex(item=>item.is_check==true),1);
          this.check_list.splice(this.check_list.findIndex(item=>item.is_check==true),1);
        }
      }
      if(song_id==0&&this.song_list==0){
        this.stop_music_methods();
      }else if(song_id==0&&not_check==1){
        this.current_play = 0;
        this.current_song = this.song_list[this.current_play];
        this.stop_music_methods();
        this.play_music(this.current_song.bitrate.show_link);
      }else if(song_id!=0&&not_check==2){
        this.current_play = this.check_list.findIndex(item=>item.song_id==song_id);
        this.current_song = this.song_list[this.current_play];
        this.stop_music_methods();
        this.play_music(this.current_song.bitrate.show_link);
      }else{
        let current_id = this.current_song.songinfo.song_id;
        this.current_play = this.check_list.findIndex(item=>item.song_id==current_id);
      }
    },
    to_next(is_end){
      let current = this.current_play;
      let is_shuffle = this.is_shuffle;
      let song_list = this.song_list;
      // 循环列表
      if(is_shuffle==1){
        if(current==song_list.length-1){
          this.current_song = song_list[0];
          this.current_play = 0;
          this.play_music(this.current_song.bitrate.show_link);
        }else{
          this.current_song = song_list[current+1];
          this.current_play++;
          this.play_music(this.current_song.bitrate.show_link);
        }
      }else if(is_shuffle==2){
        // 随机
        let length = song_list.length;
        let temp = Math.floor(Math.random()*length + 1)-1;
        if(temp==this.current_play){
          temp--;
          if(temp<0){
            temp = length-1;
          }
        }
        this.current_song = song_list[temp];
        this.current_play = temp;
        this.play_music(this.current_song.bitrate.show_link);
      }else{
        // 单曲
        if(is_end===1){
          this.play_music(this.current_song.bitrate.show_link);
        }else{
          if(current==song_list.length-1){
            this.current_song = song_list[0];
            this.current_play = 0;
            this.play_music(this.current_song.bitrate.show_link);
          }else{
            this.current_song = song_list[current+1];
            this.current_play++;
            this.play_music(this.current_song.bitrate.show_link);
          }
        }
      }
    },
    to_previous(){
      let current = this.current_play;
      let song_list = this.song_list;
      let length = song_list.length-1;
      let is_shuffle = this.is_shuffle;
      if(is_shuffle!==2){
        if(current==0){
          this.current_song = song_list[length];
          this.current_play = length;
          this.play_music(this.current_song.bitrate.show_link);
        }else{
          this.current_song = song_list[current-1];
          this.current_play--;
          this.play_music(this.current_song.bitrate.show_link);
        }
      }else{
        let length = song_list.length;
        let temp = Math.floor(Math.random()*length + 1)-1;
        if(temp==this.current_play){
          temp--;
          if(temp<0){
            temp = length-1;
          }
        }
        this.current_song = song_list[temp];
        this.current_play = temp;
        this.play_music(this.current_song.bitrate.show_link);
      }
    },
    to_index(index){
      if(index==this.current_play){
        return;
      }
      let song_list = this.song_list;
      this.current_song = song_list[index];
      this.current_play = index;
      this.play_music(this.current_song.bitrate.show_link);
    },
    push_song(song_key,is_play){
      let url = url_util.get_song_by_id;
      let that = this;
      if(song_key.indexOf(',')!==-1){
        let arr = song_key.split(',');
        if(is_play){
          this.push_song(arr[0],is_play);
        }else{
          this.push_song(arr[0],false);
        }
        for(let i = 1;i<arr.length;i++){
          this.push_song(arr[i]);
        }
      }else{
        if(is_play){
          let index = this.id_list.findIndex(item=>item==song_key);
          if(index>=0){
            this.current_song = this.song_list[index];
            this.current_play = index;
            this.play_music(this.current_song.bitrate.show_link);
            return;
          }
        }else{
          let index = this.id_list.findIndex(item=>item==song_key);
          if(index>=0){
            return;
          }
        }
        that.$http.get(url+song_key).then((response)=>{
          if(response.status===200){
            let music_body = response.body;
            let lrc_url = music_body.songinfo.lrclink;
            that.check_list.push({
              is_check:that.check_all,
              song_id:song_key
            });
            that.$http.get(lrc_url).then((response)=>{
              if(response.status===200){
                let text = response.bodyText;
                music_body.lrc_list = lrc_util.slove(text);
                if(music_body.lrc_list.length==0){
                  that.show_loop = false;
                }else{
                  that.show_loop = true;
                }
                that.song_list.push(music_body);
                that.id_list.push(song_key);
                if(is_play){
                  that.current_song = music_body;
                  that.current_play = that.song_list.length-1;
                  that.play_music(music_body.bitrate.show_link);
                }
              }
            });
          }
        });
      }
    },
  }
}
</script>
<style lang="stylus" scoped>
#App
  user-select: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .play-control-container
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 300;
    height: 100px;
    width: 100%;
    display: flex;
    flex-direction: row;
    .play-process
      position: relative;
      width: 700px;
      height: 150px;
      top:0;
      left: 220px;
      z-index: 400;
      .current_info
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 20px;
        color:rgba(255,255,255,0.3);
        z-index: 0;
      .process-bottom
        border-radius: 3px;
        width: 650px;
        height: 8px;
        background: rgba(0,0,0,0.3);
        position: absolute;
        top: 46px;
        left: 20px;
      .proces-top
        cursor: pointer;
        width: 656px;
        height: 8px;
        position: absolute;
        top: 46px;
        left: 17px;
        display: flex;
        flex-direction: row;
        z-index: 600;
        .scroll-line
          background: rgba(255,255,255,0.8);
          border-radius: 3px 0 0 3px;
        .control-button
          width: 16px;
          height: 16px;
          background-color:#fff;
          border-radius:8px;
          position: relative;
          top: -4px;
          left: -1px;
    .play-control-button
      position: relative;
      height: 100px;
      width: 140px;
      left: 150px;
      top:0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .icon
        display: block;
        font-size: 1.7em;
        color: #ffffffcc;
        cursor: pointer;
        &:hover
          color: #fff;
      .plus
        font-size: 2.1em;
    .volumn-type-control
      display: flex;
      width: 100px;
      height: 100px;
      position: relative;
      top: 0;
      left:250px;
      color:rgba(255,255,255,0.8);
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .type-control
        position: relative;
        width: 1.6em;
        height: 1.6em;
        font-size: 1.6em;
        padding:.1em;
        box-sizing: border-box;
        top: 6px;
        .icon
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          cursor: pointer;
        .single-icon::after
          content:'1';
          display: block;
          position: absolute;
          font-size: .3em;
          top: .76em;
          left: 1.05em;;
      .volumn-control
        position: relative;
        top:-52px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon
          font-size: 1.3em;
          cursor: pointer;
        .volumn
          width: 50px;
          position: relative;
          height: 100px;
          background-color: transform;
          z-index: 400;
          top: -10px;
          .volumn-bottom
            left: 21px;
            position: absolute;
            width: 8px;
            height: 100%;
            border-radius: 3px;
            background-color: rgba(0,0,0,0.3);
          .volumn-top
            position: absolute;
            display: flex;
            left: 21px;
            width: 8px;
            height: 100%;
            flex-direction: column;
            justify-content: flex-end;
            .scroll-line
              width: 100%;
              height: 30px;
              background-color: rgba(255,255,255,0.8);
              border-radius: 0 0 3px 3px;
            .button-control
              width: 16px;
              height: 16px;
              border-radius: 8px;
              background-color: #fff;
              left: -4px;
              position: relative;
              top: 1px;
              cursor: pointer;
  .img-container
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
    filter: blur(100px);
    font-size: 1.1em;
    img
      width: 120%;
      height: 120%;
      position: relative;
      left: -10%;
      top: -10%;
  .song-info-container
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    box-shadow: 5px 5px 10px rgba(0,0,0,0.6);
    position: fixed;
    z-index: 200;
    padding: 5em 7em;
    box-sizing: border-box;
    .song-controll
      display: flex;
      flex-direction: row;
      width: 400px;
      justify-content: space-between;
      .music-other-button
        width: 120px;
        height: 40px;
        line-height: 40px;
        border: 1px solid white;
        color: white;
        opacity: 0.8;
        cursor: pointer;
        border-radius: 3px;
        i
          padding-right: 10px;
        &:hover
          opacity: 1;
    .song-container
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      z-index: 300;
      .play-list
        width: 800px;
        padding: .5em;
        margin-top: 2em;
        .header
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          font-size: 1.1em;
          color: white;
          margin-top: 1em;
          padding-bottom: 1em;
          border-bottom: 1px solid rgba(255,255,255,.3);
          .check-box
            width: 3%;
            position: relative;
            i
              position: absolute;
              left: 0;
              top: 0;
          .song_p
            width:40%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          .aratist_p
            width: 35%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          .duration_p
            width: 10%;
        .song-list
          width: 810px;
          height: 431px;
          overflow-y: scroll;
          overflow-x: hidden;
          box-sizing: border-box;
          .song_container
            width: 790px;
            position: relative;
            transition: left .3s;
            left: 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            font-size: 1.1em;
            color: rgba(255,255,255,0.8);
            padding-top: 1em;
            padding-bottom: 1em;
            border-bottom: 1px solid rgba(255,255,255,.3);
            .check-box
              width: 3%;
              position: relative;
              i
                position: absolute;
                left: 0;
                top: 0;
            .song_p
              width:40%;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            .aratist_p
              width: 35%;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            .duration_p
              width: 10%;
          .active
            background-color: rgba(0,0,0,0.2);
            position: relative;
            transition: left .3s;
            left: 20px;
      .song-info
        width: 400px;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        opacity: 1;
        position: relative;
        top: -40px;
        right: -40px;
        .song-img
          border-radius: 100px;
          width: 200px;
          height: 200px;
          overflow: hidden;
          animation: rotation-img 20s infinite;
          img
            width: 100%;
            height: 100%;
        .info
          margin-top: 1em;
          width: 100%;
          color: rgba(255,255,255,.8);
          margin-bottom: .5em;
          p
            width: 100%;
            text-align: center;
            margin:.3em 0;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        .lrc
          font-size: 1em;
          width: 100%;
          height: 15em;;
          overflow: hidden;
          color: rgba(255,255,255,0.8);
          position: relative;
          .loop-lrc
            width: 100%;
            height: auto;
            position: absolute;
            top:0;
            p
              width: 100%;
              text-align: left;
              text-align: center;
              text-overflow: ellipsis;
              overflow: hidden;
              line-height: 1em;
              height: 1em;
              margin: 0;
              padding: .25em;
            .active
              color:#31c27c;
@keyframes rotation-img {
  0%{
    transform: rotate(0);
  }
  50%{
    transform: rotate(180deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>
