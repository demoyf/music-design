<template>
  <div id="App">
    <header-com :active="3"></header-com>
    <div class="billboard-container">
      <left-nav class="nav" :nav-title-list="billboard_type"
        v-on:navIndex="on_current"
      ></left-nav>
      <billboard class="billboard"
      :page-info="page_info" :page-list="page_list" :type="type">
      </billboard>
    </div>
    <my-footer></my-footer>
    <to-top></to-top>
  </div>
</template>
<script>
import my_header from './../../../src/components/header/header.vue';
import footer from './../../../src/components/footer/footer.vue';
import left_nav from './../../common/components/left_nav.vue';
import nav_container from './../components/billboard_container.vue';
import bilboard_type from './../../../src/common/util/get_type.js';
import url_util from './../../common/url.js';
import to_top from './../../common/components/to_top.vue';
export default {
  name: "App",
  data() {
    return{
      billboard_type:[],
      page_info:{
        name:''
      },
      page_list:[],
      type:0,
      current:1
    }
  },
  created(){
    this.billboard_type = bilboard_type.billboard_info;
  },
  mounted() {
    //do something after mounting vue instance
    let first = this.billboard_type[0];
    let url = url_util.billboard;
    url += first.type+"/1";
    this.type=first.type;
    this.$http.get(url).then((response)=>{
      if(response.status===200){
        let body = response.body;
        this.page_info = body.billboard;
        this.page_list = body.song_list;
      }
    });
  },
  components: {
    'header-com':my_header,
    'left-nav':left_nav,
    'billboard':nav_container,
    'my-footer':footer,
    'to-top':to_top
  },
  methods: {
    on_current(index) {
      this.type = bilboard_type.billboard_info[index].type;
      this.current = 1;
      let url = url_util.billboard;
      url += bilboard_type.billboard_info[index].type+"/1";
      this.$http.get(url).then((response)=>{
        if(response.status===200){
          let body = response.body;
          this.page_info = body.billboard;
          this.page_list = [];
          this.page_list = body.song_list;
        }
      });
    }
  }
}
</script>
<style lang="stylus" scoped>
#App
  .billboard-container
    padding-top: 3em;
    width: 82%;
    margin: auto;
    display: flex;
    flex-direction: row;
    .nav
      width: 300px;
      padding-right: 100px;
      box-sizing: border-box;
</style>
