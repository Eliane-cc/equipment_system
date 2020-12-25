import {get,post} from './http';

//生成验证码
export const generateCode = () => get(`user/cpa`);

//判断用户是否登录成功
export const login = (params) => post(`login`,params);

//获取用户列表
export const getUserList =(params) => post(`admin/user/list`,params);
