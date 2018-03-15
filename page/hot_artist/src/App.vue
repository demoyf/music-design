<template>
  <div id="App">
    <header-com :active='2'></header-com>
    <my-footer></my-footer>
  </div>
</template>
<script>
import my_header from './../../../src/components/header/header.vue';
import footer from './../../../src/components/footer/footer.vue';
export default {
  name: "App",
  data() {
    return{

    }
  },
  components: {
    'header-com':my_header,
    'my-footer':footer
  }
}
</script>
