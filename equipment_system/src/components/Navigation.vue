<template>
  <div class="container">
    <div class="nav-title flex-row">
      <div class="nav-icon" @click="toggleCollapsed">
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" class="icon"/>
      </div>
      <div class="nav-title-text">设备生命周期管理系统</div>
    </div>
    <a-row class="row">
      <!--  导航栏  -->
      <a-col :span="navSpan">
        <a-menu
          :default-selected-keys="['1']"
          :default-open-keys="['sub1','sub2']"
          mode="inline"
          theme="dark"
          :inline-collapsed="collapsed"
          class="nav"
        >
          <a-menu-item key="1" class="home" @click="navPage('/')">
            <a-icon type="home" />
            <span>首页</span>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="database"/><span>基本数据</span></span>
            <a-menu-item key="2" @click="navPage('/devInfo')">
              设备信息
            </a-menu-item>
            <a-menu-item key="3" @click="navPage('/equitmentPartInfo')">
              设备零件信息
            </a-menu-item>
            <a-menu-item key="4" @click="navPage('/personalInfo')">
              个人信息
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="setting" /><span>查询管理</span></span>
            <a-menu-item key="5" @click="navPage('/maintainData')">
              维护数据
            </a-menu-item>
            <a-menu-item key="6" @click="navPage('/repairData')">
              维修数据
            </a-menu-item>
            <a-menu-item key="7" @click="navPage('/changeData')">
              更换数据
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-col>
      <!--  主体内容  -->
      <a-col :span="mainSpan" :offset="1">
        <div class="main-content">
          <router-view></router-view>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: "Navigation.vue",
    data() {
      return {
        collapsed: false,
        mainSpan: '19',
        navSpan: '4'
      };
    },
    methods: {
      //左侧导航栏收缩
      toggleCollapsed() {
        this.collapsed = !this.collapsed;
        if(this.collapsed == true){
          this.navSpan = '2'
          this.mainSpan = '21'
        }else{
          this.navSpan = '4'
          this.mainSpan = '19'
        }
      },
      // 页面跳转
      navPage(path){
        this.$router.push(path)
      }
    },
  }
</script>

<style scoped>
  .container{
    background-color: #040014;
  }
  .row{
    padding: 20px 20px 10px 6px;
  }
  .flex-row{
    display: flex;
    flex-direction: row;
  }
  .icon{
    color: #F1F1F1;
    font-size: 20px;
    cursor: pointer;
  }
  .nav-title-text{
    color: #ffffff;
    font-size: 17px;
    margin-left: 30px;
  }
  .nav-title{
    justify-content: left;
    align-items: center;
    padding: 10px;
  }
  .main-content{
    width: 100%;
    background-color: #ffffff;
  }
  .nav{
    text-align: left;
  }
</style>