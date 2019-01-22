
import Vue from 'vue'
import App from './App.vue'
import fastclick from 'fastclick'
import VueLazyload from "vue-lazyload"
import router from './router/home/index'
import store from "./store/index/index"
import "babel-polyfill"

// api
import apis from "./api/api";
// 添加为实例方法
Vue.prototype.apis=apis;

//引入包含全局过滤器的文件
import * as filters from './filter';

// 翻译文件
import i18n from "./i18n"

//注册过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

// 注意如果不配置会报module找不到的错误
import "./assets/css/reset.css";

__webpack_public_path__ = window.__staticUrl; //动态配置路径



// 图片懒加载 应用
Vue.use(VueLazyload,{
  preLoad: 1.3,
  error: 'default-error.png',
  loading:window.__staticUrl+ 'defaultPic.png',
  attempt: 1,filter: {
    progressive (listener, options) {
      if(listener.src.indexOf(".dpg")<0  && listener.src.indexOf(".gif")<0){
        listener.src += '.dpg'
      }
    }
  }
});

// 解决移动端3毫秒延迟
fastclick.attach(document.body);

/* eslint-disable no-new */


// 创建Vue 实例
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
});
