<template>
    <div class="welcome">
      <h3>hello，欢迎来到 Vue.js</h3>
      <img src="../../assets/images/Vue.png" alt="">
      <div @click="go" class="go">Lets’go</div>
    </div>
</template>

<script>
  // store 应用
  import { mapActions, mapMutations,mapGetters} from "vuex"

    export default {
       props: ["id","title"],
       methods:{
         ...mapMutations({
           setTestData:"SET_TEST_DATA"
         }),
         go(){
           this.setTestData("世界要改变啦");
         }
       },
       created(){
          console.log(this.id);
          console.log(this.title);
       },
      computed: {
        ...mapGetters([
          "testData"  // store 里面获取页面传的值
        ])
      }
    };
</script>

<style scoped lang="scss" type="text/scss">
  @import "../../assets/scss/mix";
  .welcome{
    width: 100%;
    height: 100%;
    background-image: url("../../assets/images/bg.gif");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    h3{
      width: 100%;
      height: px2rem(80);
      line-height: px2rem(80);
      text-align: center;
      font-size: px2rem(40);
      color: #ffffff;
      margin: 70% auto 0;
    }
    img{
      display: block;
      margin: 10px auto;
    }
    .go{
      position: fixed;
      bottom: 60px;
      left: 30%;
      width: 150px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 0;
      font-weight: bold;
      border-radius: 10px;
      color: yellow;
      animation: move 3s linear infinite;
    }
    /*大小渐变、模糊渐变 字体颜色渐变 */
    @keyframes move
    {
      0%   {background: red;font-size: 0;opacity: 1;color:#ffffff}
      25%  {background: yellow;font-size: 10px;opacity: 0.8;color:orange}
      50%  {background: blue;font-size: 20px;opacity: 0.6;color:#ffffff}
      75%  {background: orange;font-size: 25px;opacity: 0.4;color:yellow}
      100% {background: green;font-size: 30px;opacity: 0.2;color:#ffffff}
    }

  }
</style>
<!-- vue文件中css使用scoped标记时，会出现一个新的'data-v-xxx'标记,因为要保证各文件中的css不相互影响，给每个component都做了唯一的标记-->
