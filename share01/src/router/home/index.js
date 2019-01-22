import Vue from 'vue'
import Router from 'vue-router'
import home from "../../views/home/index";
import VueResource from "vue-resource"
Vue.use(Router);

Vue.use(VueResource);

 const router = new Router({
   mode: 'history',
   routes: [
     {
      path: '/',
      name: 'home',
      component: home,
      meta:{ keepAlive:true }
    }
  ]
});
router.beforeEach((to, from, next) => {
  next();
  setTimeout(function () {
    let body = document.querySelector('body');
    let overFlowY = window.getComputedStyle(body).getPropertyValue('overflow-y');
    let fontSize = window.getComputedStyle(body).getPropertyValue('font-size');
    body.setAttribute('style', 'overflow-y:' + overFlowY + ';font-size:' + fontSize + ';');
  }, 400);
});
export default router
