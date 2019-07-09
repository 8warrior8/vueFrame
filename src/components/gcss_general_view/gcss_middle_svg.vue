<template>
  <div class="gcss-middle-svg-body">
    <div class="gcss-middle-svg-title">
      <img src="../../../static/gcss_general_view/line.png" />
      <span>全省故障监控</span>
      <img src="../../../static/gcss_general_view/line.png" />
    </div>
    <div ref="mapPathSvg"></div>
  </div>
</template>


<script>
import "./gcss_general_view.css";
export default {
  name: "gcssMiddleSvg",
  props: ["userlevel", "userregionid"],
  data() {
    return {};
  },

  //数据回收方法
  destroyed: function() {},

  watch: {
    //页面大小发生变化时触发该处理
    "$store.state.systemChange.Page_Size_Change": function(param) {
      //this.pageWidth = param.width;
      //this.pageHeight = param.height;
    },
    //系统主题样式变化时触发该处理
    "$store.state.systemChange.Style_Change": function(styleName) {}
  },

  components: {},

  methods: {}
};
</script>

<style>
.gcss-middle-svg-body {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

#mapPathSvg > svg {
  position: absolute;
  top: 25px;
  height: calc(100% - 25px);
  width: 100%;
}

.gcss-middle-svg-title {
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
  font-weight: 700;
  font-style: normal;
  font-size: 18px;
  position: absolute;
  width: 100%;
  top: 5px;
  z-index: 10;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gcss-middle-svg-title > img:nth-last-of-type(1) {
  transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  /* IE 9 */
  -webkit-transform: rotate(180deg);
  /* Safari and Chrome */
  -o-transform: rotate(180deg);
  /* Opera */
  -moz-transform: rotate(180deg);
  /* Firefox */
}

.gcss-middle-svg-title > span {
  margin: 0 10px;
  flex: 0 0 auto;
}

.gcss-general-svg-legend {
  width: 100px;
  height: 90px;
  padding: 5px;
  position: absolute;
  margin: 12px;
}

.gcss-general-svg-legend-item {
  background: #f2f2f2;
  padding: 6px;
  border-radius: 3px;
}

.gcss-general-svg-legend-item > div > span {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 50%;
  margin-right: 5px;
}

.gcss-general-svg-legend-item > div:nth-of-type(1) > span {
  background: red;
}

.gcss-general-svg-legend-item > div:nth-of-type(2) > span {
  background: orange;
}

.gcss-general-svg-legend-item > div:nth-of-type(3) > span {
  background: green;
}

.gcss-general-svg-legend-l {
  left: 10px;
}

.gcss-general-svg-legend-r {
  right: 10px;
}

.gcss-general-svg-legend-t {
  top: 10px;
}

.gcss-general-svg-legend-b {
  bottom: 10px;
}

.gcss-middle-svg-body .view-map-svg-background {
  stroke-miterlimit: 10;
  opacity: 0.23;
  enable-background: new;
}

.gcss-middle-svg-body .view-map-svg-text {
  transform: matrix(1 0 0 1 0 0);
  cursor: pointer;
}

.gcss-middle-svg-body .view-map-svg-path {
  stroke-linejoin: round;
  stroke-miterlimit: 10;
  cursor: pointer;
}
</style>

<style lang="stylus" scoped>
.theme-default {
  .gcss_keyassure_view_insurance {
    background: #153043;
  }

  .gcss-middle-svg-body .view-map-svg-background {
    fill: transparent !important;
    stroke: none !important;
  }

  .gcss-middle-svg-body .view-map-svg-path {
    fill: transparent !important;
    stroke: #5EC2DD !important;
  }

  .gcss-middle-svg-body .view-map-svg-text {
    fill: #fff !important;
    font-family: 'MicrosoftYaHeiLight' !important;
    font-size: 12.7881px !important;
    font-weight: normal !important;
  }
}

.theme-zhanshi {
  .gcss-middle-svg-body .view-map-svg-background {
    fill: #BDF476;
    stroke: #FFFFFF;
  }

  .gcss-middle-svg-body .view-map-svg-path {
    fill: #C0DDFF;
    stroke: #FFFFFF;
  }

  .gcss-middle-svg-body .view-map-svg-text {
    fill: #666 !important;
    font-family: 'MicrosoftYaHeiLight' !important;
    font-size: 12.7881px !important;
    font-weight: normal !important;
  }
}
</style>