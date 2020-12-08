<template>
  <div id="app">
    <a-config-provider :locale="zh_CN">
      <!--  导航栏  -->
      <navigation v-if="!$route.meta.showNav"></navigation>
      <!--  页面内容  -->
      <router-view v-else/>
    </a-config-provider>
  </div>
</template>

<script>
  import Navigation from "./components/Navigation";
  // 国际化
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
  import moment from 'moment';
  import 'moment/locale/zh-cn';

  moment.locale('zh-cn');
export default {
  name: 'App',
  data(){
    return{
      zh_CN,
    }
  },
  components: {
    Navigation
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
