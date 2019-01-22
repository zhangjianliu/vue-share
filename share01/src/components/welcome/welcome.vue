<template>
    <div class="welcome">
      <h3>hello，欢迎来到 Vue.js</h3>
    </div>
</template>

<script>
    export default {
        props: {
        },
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
  }
</style>
<!-- vue文件中css使用scoped标记时，会出现一个新的'data-v-xxx'标记,因为要保证各文件中的css不相互影响，给每个component都做了唯一的标记-->
