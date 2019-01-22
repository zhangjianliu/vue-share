<template>
  <div class="home-page">
    <Welcome></Welcome>
  </div>
</template>
<script type="text/ecmascript-6">
  import Welcome from "../../components/welcome/welcome"
  export default {
    name: 'index',
    components: {
      Welcome
    },
    data () {
      return {
      }
    },
    created () {
    },
    mounted () {
    },
    computed: {
    },
    methods: {
    }
  }
</script>

<style scoped lang="scss" type="text/scss">
  @import "../../assets/scss/mix";
  .home-page{
    width: 100%;
    height: 100%;
  }

</style>
