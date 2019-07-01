<template>
  <div ref="chartPie1" style="height:100%; min-height:100px; min-width:100px;"></div>
</template>

<script>
import Echarts from "echarts";
export default {
  name: "comp-echart-pie",
  props: {
    dataSource: {
      type: Array,
      default: function() {
        return [];
      }
    },
    fontColor: {
      type: String,
      default: "#333"
    },
    labelFormatterFun: {
      type: Function,
      default: function(item) {
        return item.name;
      }
    },
    tipFormatterFun: {
      type: Function,
      default: function(item) {
        return item.name + ":" + item.value + "(" + item.percent + "%)";
      }
    },
    showLegend: {
      type: Boolean,
      defalut: false
    },
    legendTextColor: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      myChart: null,
      baseoption: null,
      legendOrient: "vertical",
      gridTop: "1%",
      gridLeft: "1%",
      gridRight: "1%",
      gridBottom: "1%",
      legendData: []
    };
  },

  mounted: function() {
    var self = this;
    this.myChart = this.$echarts.init(this.$refs.chartPie1);
    this.myChart.on("click", params => {
      this.$emit("pointClick", params);
    });
    this.myChart.on("dblclick", params => {
      this.$emit("pointdbClick", params);
    });
    this.initOption();
  },

  //数据回收方法
  destroyed: function() {
    if (this.myChart) {
      this.myChart = null;
    }
    if (this.legendData) {
      this.legendData = [];
      this.legendData = null;
    }
    if (this.dataSource) {
      this.dataSource = [];
      this.dataSource = null;
    }
    if (this.baseoption) {
      this.baseoption = null;
    }
  },

  watch: {
    //页面大小发生变化时触发该处理
    "$store.state.systemChange.Page_Size_Change": function(param) {
      this.chartResize();
    },
    //系统主题样式变化时触发该处理
    "$store.state.systemChange.Style_Change": function(styleName) {
      if (styleName === "default") {
        this.axisLineColor = "#333";
      } else if (styleName === "zhanshi") {
        this.axisLineColor = "red";
      } else {
        this.axisLineColor = "#333";
      }
      this.initOption();
      this.drawEcharts();
    },

    dataSource: function(newDataSource, oldDataSource) {
      this.drawEcharts();
    }
  },

  methods: {
    initOption: function() {
      var self = this;
      this.baseoption = {
        tooltip: {
          trigger: "item",
          formatter: self.tipFormatterFun,
          align: "left"
        },
        legend: {
          show: self.showLegend,
          orient: self.legendOrient,
          x: self.legendX,
          textStyle: {
            color: self.legendTextColor
          }
        },
        series: [
          {
            type: "pie",
            clockWise: true,
            selectedMode: "single",
            radius: ["50%", "70%"],
            center: ["50%", "50%"],
            label: {
              normal: {
                formatter: self.labelFormatterFun,
                textStyle: {
                  color: self.fontColor
                }
              }
            },
            data: []
          }
        ]
      };
    },

    drawEcharts: function() {
      var tempXAxis = [];
      var option = this.initialOption();
      var data = this.dataSource;
      this.legendData = [];
      if (data && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          var pie = {};
          pie.name = data[i].name;
          if (data[i].value === undefined) {
            pie.value = 0;
          } else {
            pie.value = data[i].value;
          }
          if (data[i].color) {
            pie.itemStyle = {
              normal: {
                color: data[i].color
              }
            };
          }
          pie.userObject = data[i];
          option.series[0].data.push(pie);
          this.legendData.push(pie.name);
        }
      }
      option.legend.data = this.legendData;
      this.myChart.setOption(option);
    },

    initialOption: function() {
      var option = $.extend(true, {}, this.baseoption);
      option.grid = {
        top: this.gridTop,
        left: this.gridLeft,
        right: this.gridRight,
        bottom: this.gridBottom,
        containLabel: true
      };
      return option;
    },

    showMarkLine: function() {
      this.markLineFlag = true;
      this.drawEcharts();
    },

    hideMarkLine: function() {
      this.markLineFlag = false;
      this.drawEcharts();
    },

    chartResize: function() {
      if (this.myChart) {
        this.myChart.resize();
      }
    }
  }
};
</script>