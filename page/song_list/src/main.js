import Vue from 'vue'
import App from './App.vue'
import vue_resourse from 'vue-resource';
Vue.use(vue_resourse);
new Vue({
  el: '#app',
  render: h => h(App)
});
