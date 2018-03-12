<template>
  <div id="App">
    <header-com></header-com>
    <title-header></title-header>
    <my-footer></my-footer>
  </div>
</template>
<script>
import my_header from './../../../src/components/header/header.vue';
import title_header from './../components/title_all.vue';
import footer from './../../../src/components/footer/footer.vue';
export default {
  name: "App",
  data() {
    return{

    }
  },
  components: {
    'header-com':my_header,
    'title-header':title_header,
    'my-footer':footer
  }
}
</script>
