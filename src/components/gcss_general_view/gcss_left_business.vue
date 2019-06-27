<template>
  <div>业务量</div>
</template>


<script>
export default {
  name: "gcssLeftBusiness",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  created: function() {},

  watch: {
    //页面大小发生变化时触发该处理
    "$store.state.systemChange.Page_Size_Change": function(param) {
      //this.pageWidth = param.width;
      //this.pageHeight = param.height;
    },
    //系统主题样式变化时触发该处理
    "$store.state.systemChange.Style_Change": function(styleName) {}
  },

  methods: {}
};
</script>

<style lang="stylus" scoped>
.theme-default {
}

.theme-zhanshi {
}
</style>