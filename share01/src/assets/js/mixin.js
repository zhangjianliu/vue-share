
let mixin = {
  data() {
    return {
    }
  },
  methods: {
    scrollToTop(){
      //设置定时器
      let timer = setInterval(function(){
        //获取滚动条距离顶部的高度
        let osTop = document.documentElement.scrollTop || document.body.scrollTop;  //同时兼容了ie和Chrome浏览器
        //减小的速度
        let isSpeed = Math.floor(-osTop / 2);
        document.documentElement.scrollTop = document.body.scrollTop = osTop + isSpeed;
        //isTop = true;
        //判断，然后清除定时器
        if (osTop === 0) {
          clearInterval(timer);
        }
      },10);
    }
  }
}

export default mixin;
