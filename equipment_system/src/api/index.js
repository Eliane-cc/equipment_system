import {get,post,postform} from './http';
import {getParams} from "ant-design-vue/lib/vc-form/src/utils";

/*
登录接口
 */
//生成验证码
export const generateCode = () => get(`user/cpa`);

//判断用户是否登录成功
//export const login = (params) => post(`login`,params);
export const login = (params) => post(`user/login`,params);


/*
首页接口
 */
//首页下拉列表
export const getDropIndexList =() => get(`index/allCName`);

//首页扫描二维码接口
export const scannCode =(params) => post(`index/getInfosByECode`,params);

//手机端首页筛选零件名
export const getEquitInfo =(params) => post(`/index/getInfoByCname`,params);

//获取用户列表
export const getIndexList =(params) => post(`index/allBaseList`,params);

//维护
export const maintainInfo =(params) => postform(`index/maintain`,params);

/*
用户接口
 */
//获取用户列表
//export const getUserList =(params) => post(`admin/user/list`,params);
export const getUserList =(params) => post(`user/listUser`,params);
// export const getUser = (params) => post(`user/getUser`,params);

//添加用户
export const addUser =(params) => post(`user/addUser`,params);

//修改用户信息
export const updateUser =(params) => post(`user/updateUser`,params);

//删除用户
export const deleteUser =(params) => post(`user/deleteUser`,params);

/*
设备接口
 */
//下拉列表获取
export const getDropDevList =() => get(`equipment/searchList`);

//设备列表分页查询
export const getDevList =(params) => post(`equipment/allEquipmentList`,params);

//新增设备
export const addDev =(params) => post(`equipment/addEquipment`,params);

//修改设备
export const updateDev =(params) => post(`equipment/updateEquipment`,params);

//删除设备
export const deleteDev =(params) => post(`equipment/deleteEquipment`,params);

/*
零件接口
 */
//下拉列表获取
export const getDropEquipList =() => get(`component/searchList`);

//零件列表分页查询
export const getequitmentList =(params) => post(`component/allComponentList`,params);

//新增零件
export const addEquipment =(params) => post(`component/addComponent`,params);

//修改零件
export const updateEquipment =(params) => post(`component/update`,params);

//删除零件
export const deleteEquipment =(params) => post(`component/deleteComponent`,params);

/*
维护接口
 */
//下拉列表获取
export const getDropMaintainList =() => get(`maintain/searchList`);

//维护列表分页查询
export const getmaintainList =(params) => post(`maintain/allMaintainList`,params);

//维护编辑
export const updateMaintain =(params) => post(`maintain/update`,params);

//维护删除
export const deleteMaintain =(params) => post(`maintain/deleteMaintain`,params);

//维护详情获取维护图片
export const getPicMaintain =(params) => post(`maintain/getPNameByMid`,params);

/*
维修接口
 */
//下拉列表获取
export const getDropRepairList =() => get(`repair/searchList`);

//维修列表分页查询
export const getrepairList =(params) => post(`repair/allRepairList`,params);

//维修编辑
export const updateRepair =(params) => post(`repair/update`,params);

//维修删除
export const deleteRepair =(params) => post(`repair/deleteRepair`,params);

//维修详情获取维护图片
export const getPicRepair =(params) => post(`repair/getPNameByRid`,params);

/*
更换接口
 */
//下拉列表获取
export const getDropChangeList =() => get(`change/searchList`);

//更换列表分页查询
export const getchangeList =(params) => post(`change/allChangeList`,params);

//更换编辑
export const updateChange =(params) => post(`change/update`,params);

//更换删除
export const deleteChange =(params) => post(`change/deleteChange`,params);

//更换下拉列表数据
export const getDropDownList =() => get(`change/searchList`);

//维修详情获取维护图片
export const getPicChange =(params) => post(`change/getPNameByCid`,params);