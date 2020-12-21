<template>
  <div class="container">
    <template v-if="ismOrpc == 'PCoperation'">
      <basic-info></basic-info>
    </template>
    <template v-else>
      <mo-basic-info></mo-basic-info>
    </template>
  </div>
</template>

<script>
  import BasicInfo from "../components/BasicInfo";
  import MoBasicInfo from "../components/mobile/MoBasicInfo";
  export default {
    name: "Index.vue",
    components: {
      BasicInfo,
      MoBasicInfo
    },
    data() {
      return {
        ismOrpc:'PCoperation'//默认展示pc
      };
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

<style scoped>
</style>