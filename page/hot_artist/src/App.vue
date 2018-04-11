<template>
  <div id="App">
    <header-com :active='2'></header-com>
    <hot-artist v-if="hot_artist!==undefined"
    :hot-artist="hot_artist" :page-info="page_info"></hot-artist>
    <my-footer></my-footer>
  </div>
</template>
<script>
import my_header from './../../../src/components/header/header.vue';
import footer from './../../../src/components/footer/footer.vue';
import hot_artist from './../components/show_hot_artist.vue';
import url_util from './../../../src/common/util/url';
export default {
  name: "App",
  data() {
    return{
      hot_artist:undefined,
      page_info:undefined
    }
  },
  created() {
    //do something after creating vue instance
    let url = url_util.get_hot_artsit+"?page=0";
    this.$http.get(url).then((response)=>{
      if(response.status===200){
        let body = response.body;
        this.hot_artist=body.artist;
        this.page_info = body.name;
      }
    });
  },
  components: {
    'header-com':my_header,
    'my-footer':footer,
    'hot-artist':hot_artist
  }
}
</script>
