<template>
  <div id="App">
    <header-com :active="1"></header-com>
    <search-container></search-container>
    <my-footer></my-footer>
    <to-top></to-top>
  </div>
</template>
<script>
import my_header from './../../../src/components/header/header.vue';
import footer from './../../../src/components/footer/footer.vue';
import url_util from './../../common/url.js';
import to_top from './../../common/components/to_top.vue';
import * as local_uitl from './../../common/local_storage';
import search_container from './../components/search_container.vue';
export default {
  name: "App",
  data() {
    return{
      
    }
  },
  created(){
    let search_content = local_uitl.read_item("current_search");
    console.log(search_content);
  },
  mounted() {
    //do something after mounting vue instance
  },
  components: {
    'header-com':my_header,
    'my-footer':footer,
    'to-top':to_top,
    'search-container':search_container
  },
  methods: {

  }
}
</script>
<style lang="stylus" scoped>
</style>
