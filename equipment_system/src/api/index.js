import {get,post} from './http';

//生成验证码
export const generateCode = () => get(`user/cpa`);

//判断用户是否登录成功
export const login = (params) => post(`login`,params);

//获取用户列表
export const getUserList =(params) => post(`admin/user/list`,params);

//添加用户
export const addUser =(params) => post(`admin/user/addUser`,params);

//修改用户信息
export const updateUser =(params) => post(`admin/user/update`,params);

//删除用户
export const deleteUser =(params) => post(`admin/user/delete`,params);

//新增设备
export const addDev =(params) => post(`admin/equipment/add`,params);
