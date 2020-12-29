import {get,post} from './http';

/*
登录接口
 */
//生成验证码
export const generateCode = () => get(`user/cpa`);

//判断用户是否登录成功
//export const login = (params) => post(`login`,params);
export const login = (params) => post(`user/login`,params);
/*
用户接口
 */
//获取用户列表
//export const getUserList =(params) => post(`admin/user/list`,params);
export const getUserList =(params) => post(`user/list`,params);

//添加用户
export const addUser =(params) => post(`user/addUser`,params);

//修改用户信息
export const updateUser =(params) => post(`user/update`,params);

//删除用户
export const deleteUser =(params) => post(`user/delete`,params);

/*
设备接口
 */
//设备列表分页查询
export const getDevList =(params) => post(`equipment/allEquipmentList`,params);

//新增设备
export const addDev =(params) => post(`equipment/add`,params);

//修改设备
export const updateDev =(params) => post(`equipment/update`,params);

//删除设备
export const deleteDev =(params) => post(`equipment/deleteEquipment`,params);

/*
零件接口
 */
//零件列表分页查询
export const getequitmentList =(params) => post(`component/allList`,params);

//新增零件
export const addEquipment =(params) => post(`component/add`,params);

//修改零件
export const updateEquipment =(params) => post(`equipment/update`,params);

//删除零件
export const deleteEquipment =(params) => post(`equipment/deleteEquipment`,params);

/*
维护接口
 */
//维护列表分页查询
export const getmaintainList =(params) => post(`maintain/allList`,params);

//维护编辑
export const updateMaintain =(params) => post(`maintain/update`,params);

//维护删除
export const deleteMaintain =(params) => post(`maintain/deleteMaintain`,params);

/*
维修接口
 */
//维修列表分页查询
export const getrepairList =(params) => post(`repair/allList`,params);

//维修编辑
export const updateRepair =(params) => post(`repair/update`,params);

//维修删除
export const deleteRepair =(params) => post(`repair/deleteRepair`,params);

/*
更换接口
 */
//更换列表分页查询
export const getchangeList =(params) => post(`change/allList`,params);

//维护编辑
export const updateChange =(params) => post(`change/update`,params);

//维护删除
export const deleteChange =(params) => post(`change/deleteChange`,params);
