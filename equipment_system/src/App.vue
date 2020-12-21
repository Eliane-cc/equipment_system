<template>
  <div id="app">
    <a-config-provider :locale="zh_CN">
      <!--  导航栏  -->
      <mo-navigation v-if="ismOrpc == 'Moperation' && !$route.meta.showNav"></mo-navigation>
      <navigation v-else-if="!$route.meta.showNav"></navigation>
      <!--  页面内容  -->
      <router-view v-else/>
    </a-config-provider>
  </div>
</template>

<script>
  import Navigation from "./components/Navigation";
  import MoNavigation from "./components/mobile/MoNavigation";
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
      ismOrpc:'PCoperation'//默认展示pc
    }
  },
  components: {
    Navigation,
    MoNavigation
  },
  created(){
    if (this._isMobile()) {
      //手机端
      this.ismOrpc = 'Moperation'
      //设置rem
      window.onload = function(){
        getRem(750,100)
      };
      window.onresize = function(){
        getRem(750,100)
      };
      function getRem(pwidth,prem){
        var html = document.getElementsByTagName("html")[0];
        var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
        html.style.fontSize = oWidth/pwidth*prem + "px";
      }

    } else {
      //pc端
      this.ismOrpc = 'PCoperation'
    }
  },
  methods: {
    //判断手机端还是PC端
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    }
  },
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
