import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/Login";
import Index from "../views/Index";
import DeviceInfo from "../components/DeviceInfo";
import EquitmentPartInfo from "../components/EquitmentPartInfo";
import PersonalInfo from "../components/PersonalInfo";
import MaintainData from "../components/MaintainData";
import RepairData from "../components/RepairData";
import ChangeData from "../components/ChangeData";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta:{
        showNav: true
      }
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/devInfo',
      name: 'devInfo',
      component: DeviceInfo
    },
    {
      path: '/equitmentPartInfo',
      name: 'equitmentPartInfo',
      component: EquitmentPartInfo
    },
    {
      path: '/personalInfo',
      name: 'personalInfo',
      component: PersonalInfo
    },
    {
      path: '/maintainData',
      name: 'maintainData',
      component: MaintainData
    },
    {
      path: '/repairData',
      name: 'repairData',
      component: RepairData
    },
    {
      path: '/changeData',
      name: 'changeData',
      component: ChangeData
    },
  ]
})
