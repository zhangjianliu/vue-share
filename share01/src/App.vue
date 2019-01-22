<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style scoped lang="scss" type="text/scss">
  @import "assets/scss/common.scss";
#app {
  width: 100%;
  height: 100%;
}
</style>
