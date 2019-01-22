import axios from 'axios';

import jsonpAdapter from 'axios-jsonp';

/**
 * api方法声明。
 * type：Get, Post
 * url: 请求的url
 */
const apiUrl = {
  getData: {
    type: 'get',
    url: "",
    urlTest: ""
  }
};
let apis = {};
let CancelToken = axios.CancelToken;
apis.isCancel = axios.isCancel; // 判断是否是取消
Object.keys(apiUrl).forEach((item) => {
  /**
   * 创建api请求function，返回promise对象
   */
  apis[item] = function apiFunc(response) {
    let obj = apiUrl[item];
    let promise;
    //let dataTmp = data;
    promise = axios({
      adapter: process.env.mock === 'true' ? null : jsonpAdapter,
      method: obj.type,
      url: process.env.mock === 'true' ? obj.urlTest : obj.url,
      timeout: 20000,
      params:response,
      cancelToken: new CancelToken(function executor(c) {
        apis[item + 'Cancel'] = c;
      })
    }).then(response => {
      return response.data;
    }).catch((e)=>{
      console.log(e)
    });
    return promise;
  }
});

export default apis;
