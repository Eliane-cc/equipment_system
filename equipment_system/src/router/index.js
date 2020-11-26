import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/Login";
import Index from "../views/Index";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{
        showNav: true
      }
    }
  ]
})
