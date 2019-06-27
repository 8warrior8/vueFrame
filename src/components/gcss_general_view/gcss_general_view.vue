<template>
  <div class="gess-general-view-body">
    <div class="gess-general-view-body-left">
      <div>客户量</div>
      <div>告警排名</div>
    </div>
    <div class="gess-general-view-body-center">
      <div>全省故障监控</div>
      <div>SVG地图</div>
      <div>重保信息</div>
    </div>
    <div class="gess-general-view-body-right">
      <div>客户运行情况</div>
      <div>主动发生率</div>
    </div>
  </div>

  <!-- <div>
    <gcssLeftBusiness ref="leftBusiness1"></gcssLeftBusiness>
  </div>-->
</template>


<script>
import GcssLeftBusiness from "./gcss_left_business.vue";
export default {
  name: "gcssGeneralView",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: {
    gcssLeftBusiness: GcssLeftBusiness
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

<style scoped>
.gess-general-view-body {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
}

.gess-general-view-body-left {
  position: relative;
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
}

.gess-general-view-body-center {
  position: relative;
  margin: 10px 0px;
  display: flex;
  flex-grow: 2;
  flex-shrink: 1;
  flex-basis: auto;
  flex-direction: column;
}

.gess-general-view-body-right {
  position: relative;
  width: 450px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
}
</style>

<style lang="stylus" scoped>
.theme-default {
}

.theme-zhanshi {
}
</style>
