<template>
  <div>
    <span>Layout 布局:</span>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="8">
        <div class="layout-grid-content layout-bg-purple"></div>
      </el-col>
      <el-col :span="8" :offset="2">
        <div class="layout-grid-content layout-bg-purple-light"></div>
      </el-col>
    </el-row>
    <p>ICO图标展示："width:" {{pageWidth}} " height:"{{pageHeight}}</p>
  </div>
</template>

<script>
//require("./ui_test_change_style.css")
export default {
  name: "ElementUiTest",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      pageWidth: 0,
      pageHeight: 0
    };
  },
  created: function() {},

  watch: {
    //页面大小发生变化时触发该处理
    "$store.state.systemChange.Page_Size_Change": function(param) {
      this.pageWidth = param.width;
      this.pageHeight = param.height;
    },
    //系统主题样式变化时触发该处理
    "$store.state.systemChange.Style_Change": function(styleName) {}
  },

  methods: {}
};
</script>

<style scoped>
.layout-grid-content {
  border-radius: 10px;
  min-height: 36px;
}

.layout-bg-purple-light {
  background: #e5e9f2;
}
</style>


<style lang="stylus" scoped>
.theme-default {
  .layout-bg-purple {
    background: black;
  }
}

.theme-zhanshi {
  .layout-bg-purple {
    background: red;
  }
}
</style>
