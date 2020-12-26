<template>
  <div class="container">
    <div class="flex-space">
      <div class="nav-title flex-row">
        <div class="nav-icon" @click="toggleCollapsed">
          <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" class="icon"/>
        </div>
        <div class="nav-title-text">设备生命周期管理系统</div>
      </div>
      <div>
        <a-dropdown placement="bottomCenter">
          <a class="nav-title-user" @click="e => e.preventDefault()">
            <a-icon type="poweroff" />
            <div class="username">Elaine</div>
          </a>
          <a-menu slot="overlay">
            <a-menu-item key="0">
              <a @click="logout">退出登录</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>

    <a-row class="row">
      <!--  导航栏  -->
      <a-col :span="navSpan">
        <a-menu
          :default-selected-keys="defaultNav"
          :default-open-keys="['sub1','sub2','sub3']"
          mode="inline"
          theme="dark"
          :inline-collapsed="collapsed"
          class="nav"
        >
          <a-menu-item key="1" class="home" @click="navPage('/index')">
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
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="setting" /><span>查询管理</span></span>
            <a-menu-item key="4" @click="navPage('/maintainData')">
              维护数据
            </a-menu-item>
            <a-menu-item key="5" @click="navPage('/repairData')">
              维修数据
            </a-menu-item>
            <a-menu-item key="6" @click="navPage('/changeData')">
              更换数据
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title"><a-icon type="user" /><span>账户信息</span></span>
            <a-menu-item key="7" @click="navPage('/personalInfo')">
              个人信息
            </a-menu-item>
            <a-menu-item key="8" @click="navPage('/userManagement')">
              用户管理
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-col>
      <!--  主体内容  -->
      <a-col :span="mainSpan" :offset="offset">
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
        navSpan: '4',
        offset: '1',
        defaultNav: []
      };
    },
    created() {
      this.initNav()
    },
    methods: {
      //初始化导航栏跳转显示
      initNav(){
        if (this.$route.path == '/index'){
          this.defaultNav[0] = '1'
        }
        else if(this.$route.path == '/devInfo'){
          this.defaultNav[1] = '2'
        }
        else if(this.$route.path == '/equitmentPartInfo'){
          this.defaultNav[1] = '3'
        }
        else if(this.$route.path == '/maintainData'){
          this.defaultNav[1] = '4'
        }
        else if(this.$route.path == '/repairData'){
          this.defaultNav[1] = '5'
        }
        else if(this.$route.path == '/changeData'){
          this.defaultNav[1] = '6'
        }
        else if(this.$route.path == '/personalInfo'){
          this.defaultNav[1] = '7'
        }
        else if(this.$route.path == '/userManagement'){
          this.defaultNav[1] = '8'
        }
      },
      //左侧导航栏收缩
      toggleCollapsed() {
        this.collapsed = !this.collapsed;
        if(this.collapsed == true){
          this.navSpan = '2'
          this.mainSpan = '22'
          this.offset = '0'
        }else{
          this.navSpan = '4'
          this.mainSpan = '19'
          this.offset = '1'
        }
      },
      // 页面跳转
      navPage(path){
        this.$router.push(path)
      },
      //注销登录
      logout(){
        console.log("注销登录，清除缓存")
        this.$router.replace({path: '/',replace:true})
      }
    },
  }
</script>

<style scoped>
  .container{
    background-color: #040014;
    /*height: 100vh;*/
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
  }
  .main-content{
    width: 100%;
    height: 550px;
    background-color: #ffffff;
  }
  .nav{
    text-align: left;
  }
  .flex-space{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
  }
  .nav-title-user{
    color: #ffffff;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    cursor: pointer;
  }
  .username{
    padding-left: 15px;
    padding-right: 16px;
  }
</style>