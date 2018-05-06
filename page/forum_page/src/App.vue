<template>
  <div id="App">
    <forum-header class="my-header"></forum-header>
    <div class="scroll-control">
      <div class="input-container" ref="input_container">
        <input  placeholder="帖子的标题，未输入内容则显示选中类型的帖子"
        class="search-input" type="text" name="search-input" v-model="search_content" v-on:keyup.enter="start_search"/>
        <i class="icon-search-icon icon" @click="start_search">
        </i>
      </div>
      <yf-select :my-list="['全部','歌曲相关','歌手相关','专辑相关']"
      @selectchange="change_select" class="custom-select" :active='forum_type'></yf-select>
      <yf-select :my-list="['热度正序','热度倒序','时间正序','时间倒序']"
       @selectchange="change_sort" class="sort-select" :active='select_sort'></yf-select>
       <button type="button" name="button" @click="start_search">重新排序</button>
    </div>
    <div class="forum-container">
      <a-forum v-for="item in forum_list" :forum-info='item'></a-forum>
    </div>
    <div class="load-more" style="width:1100px;margin:auto">
      <loading-yf v-show="show_load"></loading-yf>
      <div class="msg"
      style="width:100%;height:50px;line-height:50px;font-size:1.2em;text-align:center;box-shadow: 2px 2px 4px rgba(0,0,0,0.2);cursor: pointer;"
      @click="load_more">
        {{msg}}
      </div>
    </div>
    <to-top></to-top>
    <my-footer></my-footer>
  </div>
</template>
<script>
import url_util from './../../common/url';
import * as local_uitl from './../../common/local_storage';
import key from './../../common/key.js';
import forum_header from './../../all_forum/components/header.vue';
import to_top from './../../common/components/to_top.vue';
import a_forum from './../../common/components/a_forum.vue';
import footer from './../../../src/components/footer/footer.vue';
import yf_select from './../../common/components/select.vue';
import loading_yf from './../../common/components/loading.vue';
export default {
  name: "App",
  data() {
    return{
      forum_list:[],
      sort_type:1,
      forum_type:0,
      select_sort:0,
      select_type:0,
      search_content:'',
      show_load:false,
      offset:0,
      limit:10,
      can_get_more:true,
      msg:'加载更多'
    }
  },
  components: {
    'forum-header':forum_header,
    'to-top':to_top,
    'a-forum':a_forum,
    'my-footer':footer,
    'yf-select':yf_select,
    'loading-yf':loading_yf
  },
  created(){
    let forum_sort = localStorage.getItem("forum_sort");
    let forum_type = localStorage.getItem("forum_type");
    if(forum_sort=='new'){
      this.select_sort = 3;
      this.sort_type = 2;
    }else{
      this.select_sort = 1;
      this.sort_type = 1;
    }
    if(forum_type&&forum_type!==''){
      this.forum_type = forum_type;
      this.select_sort = 2;
    }
    this.get_data();
    localStorage.setItem("forum_type",'');
    localStorage.setItem("forum_sort",'');
  },
  methods: {
    load_more(){
      if(!this.can_get_more){
        this.msg = '无更多数据';
        return;
      }
      this.show_load = true;
      this.start_search(1);
    },
    get_data(add_or_replace) {
      let sort_type = this.sort_type;
      let forum_type = this.forum_type;
      let url = forum_type==0?url_util.get_time_forum:url_util.get_type_time_forum;
      if(sort_type==1){
        url = forum_type==0?url_util.get_hot_forum:url_util.get_type_hot_forum;
      }
      url +=(forum_type==0?'':forum_type+'/')+"0/0/10";
      this.$http.get(url).then((response)=>{
        if(response.status===200){
          let body = response.body;
          if(add_or_replace==1){
            this.forum_list.push(...body);
          }else{
            this.forum_list = body;
          }
          if(this.forum_list.length!==0&&this.forum_list.length%10==0){
            this.offset = this.forum_list.length;
          }else{
            this.can_get_more = false;
          }
        }
      });
    },
    get_sort_data(add_or_replace){
      let select_sort = this.select_sort;
      let select_type = this.select_type;
      let url = '';
      if(select_type==0){
        if(select_sort==3){
          url = url_util.get_time_forum+"0/";
        }else if(select_sort==2){
          url = url_util.get_time_forum+"1/";
        }else if(select_sort==0){
          url = url_util.get_hot_forum+"0/";
        }else if(select_sort==1){
          url = url_util.get_hot_forum+"1/";
        }
      }else{
        if(select_sort==3){
          url = url_util.get_type_time_forum+select_type+"/0/";
        }else if(select_sort==2){
          url = url_util.get_type_time_forum+select_type+"/1/";
        }else if(select_sort==1){
          url = url_util.get_type_hot_forum+select_type+"/0/";
        }else if(select_sort==0){
          url = url_util.get_type_hot_forum+select_type+"/1/";
        }
      }
      url += this.offset+"/"+this.limit;
      this.$http.get(url).then((response)=>{
        if(response.status===200){
          let body = response.body;
          if(add_or_replace==1){
            this.forum_list.push(...body);
          }else{
            this.forum_list = body;
          }
          if(this.forum_list.length!==0&&this.forum_list.length%10==0){
            this.offset = this.forum_list.length;
          }else{
            this.can_get_more = false;
          }
          this.show_load = false;
        }
      });
    },
    get_search_data(add_or_replace){
      let url = url_util.get_search_forum;
      let content = this.search_content;
      let select_sort = this.select_sort+1;
      let select_type = this.select_type;
      url+= content;
      url+="/"+select_sort+"/"+select_type+"/"+this.offset+"/"+this.limit;
      this.$http.get(url).then((response)=>{
        if(response.status===200){
          let body = response.body;
          if(add_or_replace==1){
            this.forum_list.push(body);
          }else{
            this.forum_list = body;
          }
          if(this.forum_list.length!==0&&this.forum_list.length%10==0){
            this.offset = this.forum_list.length;
          }else{
            this.can_get_more = false;
          }
          this.show_load = false;
        }
      });
    },
    change_select(index){
      this.select_type = index;
    },
    change_sort(index){
      this.select_sort = index;
    },
    start_search(add_or_replace){
      let content = this.search_content;
      if(!content||content==''){
        this.get_sort_data(add_or_replace);
      }else{
        this.get_search_data(add_or_replace);
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
#App
  width: 100%;
  position: relative;
  .scroll-control
    position: relative;
    height: 200px;
    > button
      padding: 1em 2em;
      background-color: #4a68ec;
      border-radius: 5px;
      color: white;
      position: absolute;
      left: 79%;
      top: 52%;
    .custom-select
      position: relative;
      left: 58%;
      top: 55%;
    .sort-select
      position: relative;
      left: 69%;
      top: 36%;
    .input-container
      display:flex;
      -ms-flex-direction:row;
      flex-direction:row;
      align-items:center;
      border-radius:6px;
      position:absolute;
      z-index:50;
      background-color:white;
      width: 40%;
      left: 14%;
      top: 107px;
      background-color: white;
      font-size: .9em;
      padding: 10px 5px;
      box-shadow: 2px 2px 4px rgba(0,0,0,0.4);
      .search-input
        display: inline-block;
        padding:5px;
        width: calc(100% - 2em);
        position:relative;
      .icon
        display:block;
        color:gray;
        font-size:1.1em;
        position:relative;
        padding-right:0.2em;
        &:hover
          color:#31c27c;
          cursor:pointer;
  .my-header
    position: relative;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
</style>
