<template>
  <div id="App">
    <header-com></header-com>
    <title-header></title-header>
    <my-footer></my-footer>
  </div>
</template>
<script>
import my_header from './../../../src/components/header/header.vue';
import title_header from './../components/title_header';
import footer from './../../../src/components/footer/footer.vue';
export default {
  name: "App",
  data() {
    return{
      
    }
  },
  components: {
    'header-com':my_header,
    'my-footer':footer,
    'title-header':title_header
  }
}
</script>
