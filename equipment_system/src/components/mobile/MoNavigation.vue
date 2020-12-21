<template>
  <div>
    <a-layout id="components-layout-demo-responsive">
      <a-layout-sider
        breakpoint="lg"
        collapsed-width="0"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
      >
        <a-menu
          :default-selected-keys="['1']"
          :default-open-keys="['sub1','sub2']"
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
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="header">
          <div class="nav-title flex-row">
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

        </a-layout-header>
        <a-layout-content>
          <div :style="{ padding: '10px', background: '#fff', minHeight: '360px',height: '100vh' }">
            <router-view></router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
  export default {
    name: "MoNavigation.vue",
    methods: {
      onCollapse(collapsed, type) {
        console.log(collapsed, type);
      },
      onBreakpoint(broken) {
        console.log(broken);
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
    }
  }
</script>

<style scoped>
  .header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px;
  }
  .nav-title-text{
    margin-left: 10px;
    color: #ffffff;
  }
  .nav-title-user{
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    cursor: pointer;
    color: #ffffff;
  }
  .username{
    padding-left: 6px;
    padding-right: 10px;
  }
</style>