<template>
  <div id="app">
    <!--  导航栏  -->
    <navigation v-if="!$route.meta.showNav"></navigation>
    <!--  页面内容  -->
    <router-view v-else/>
  </div>
</template>

<script>
  import Navigation from "./components/Navigation";
export default {
  name: 'App',
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
