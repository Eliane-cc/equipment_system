import axios from 'axios';
import router from "../router/index";

axios.defaults.timeout = 5000;       //超时时间5s
//axios.defaults.withCredentials = true;     //允许跨域

//Content-Type响应头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//基础Url
//局域网
// axios.defaults.baseURL = "http://10.10.3.168:8080";
// axios.defaults.baseURL = process.env.API_ROOT;
axios.defaults.baseURL = '/api';

/*
* 封装get方法
* */
export function get(url,params={}) {
  return new Promise((resolve,reject) => {
    axios.get(url,{params: params})
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      })
  });
}

/*
* 封装post方法
* */
export function post(url,data={}){
  return new Promise((resolve,reject) => {
    axios.post(url,data)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      })
  });
}