// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import IconSvg from './components/IconSvg';
import Print from 'vue-print-nb';
import moment from 'moment';

Vue.prototype.$moment = moment;
Vue.config.productionTip = false;

Vue.use(IconSvg);
Vue.use(Antd);
Vue.use(Print); //注册

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
