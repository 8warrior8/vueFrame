<template>
  <div ref="chartBar1" style="height:100%; min-height:100px; min-width:100px;"></div>
</template>

<script>
import Echarts from "echarts";
export default {
  name: "comp-echart-bar-line",
  props: {
    dataSource: {
      type: Array,
      default: function() {
        return [];
      }
    },
    customTheme: {
      type: Object,
      default: function() {
        return {};
      }
    },
    //是否显示tip
    showTip: {
      type: Boolean,
      default: true
    },
    //是否显示提示框浮层
    showContent: {
      type: Boolean,
      default: true
    },
    //x轴呈现方式  0：正常显示  1：换行显示
    xlabelType: {
      type: Number,
      default: 0
    },
    //是否显示Legend
    showLegend: {
      type: Boolean,
      defalut: true
    },
    //自定义tip函数
    tipFormatterFun: {
      type: Function,
      default: function(item) {
        return item.name + ":" + item.value + "(" + item.percent + "%)";
      }
    },
    //x周label formatter方法
    labelFormatterFun: {
      type: Function,
      default: function(item) {
        return item.name;
      }
    }
  },
  data() {
    return {
      myChart: null,
      baseoption: null,
      showAxisTick: true,
      xisLineColor: "#333",
      fontSize: 12,
      showSplitLine: false,
      splitLineColor: ["#ccc"],
      yAxisName1: "",
      axisLineColor: "#333",
      yMax1: null,
      gridTop: 20,
      gridLeft: 10,
      gridRight: 10,
      gridBottom: 10,
      xInterval: 0, //x周刻度显示间隔
      labelColor: null,
      axisNameTextColor: "",
      doubleYAxis: false,
      yAxisName2: "",
      yMax2: null,
      symbolSize: 4,
      lineType: "",
      markLineFlag: false,
      showSymbol: true //是否显示showSymbol
    };
  },

  mounted: function() {
    var self = this;
    this.myChart = this.$echarts.init(this.$refs.chartBar1);
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
    if (this.dataSource) {
      this.dataSource = [];
      this.dataSource = null;
    }
    if (this.customTheme) {
      this.customTheme = null;
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
          show: self.showTip,
          showContent: self.showContent,
          confine: true,
          trigger: "axis",
          axisPointer: {
            type: "line"
          },
          formatter: self.tipFormatterFun
        },
        legend: {
          data: []
        },
        xAxis: [
          {
            type: "category",
            data: [],
            splitLine: {
              show: false
            },
            axisTick: {
              show: self.showAxisTick
            },
            axisLine: {
              lineStyle: {
                color: self.axisLineColor
              }
            },
            axisLabel: {
              textStyle: {
                fontSize: self.fontSize
              },
              formatter: self.labelFormatterFun,
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: self.showSplitLine,
              lineStyle: {
                color: self.splitLineColor
              }
            },
            name: self.yAxisName1,
            nameTextStyle: {},
            axisTick: {
              show: self.showAxisTick
            },
            axisLine: {
              lineStyle: {
                color: self.axisLineColor
              }
            },
            axisLabel: {
              textStyle: {
                fontSize: self.fontSize
              }
            },
            max: self.yMax1
          }
        ],
        series: []
      };
    },

    drawEcharts: function() {
      var tempXAxis = [];
      var option = this.initialOption();
      var data = this.dataSource;
      if (data && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          if (this.showLegend) {
            option.legend.data.push(data[i].title);
          }
          var dataobj = $.extend(
            true,
            {
              name: data[i].title,
              type: data[i].chartType,
              showSymbol: this.showSymbol,
              symbol: "circle",
              data: []
            },
            this.customTheme && this.customTheme.series
          );
          if (data[i].chartType === "line" && data[i].areaFlag) {
            dataobj.areaStyle = {
              normal: {}
            };
          }
          if (data[i].color) {
            dataobj.itemStyle = {
              normal: {
                color: data[i].color
              }
            };
          }
          if (data[i].chartType === "line") {
            dataobj.symbolSize = this.symbolSize;
            dataobj.lineStyle = {
              normal: {
                //width:data[i].lineWidth
              }
            };
            dataobj.itemStyle = {
              normal: {
                borderColor: "white",
                borderWidth: 2
              }
            };
            if (data[i].lineWidth) {
              dataobj.lineStyle.normal.width = data[i].lineWidth;
            }
            if (this.lineType) {
              dataobj.lineStyle.normal.type = this.lineType;
            }
            if (this.symbolSize) {
              dataobj.symbolSize = this.symbolSize;
            }
          }
          if (this.xlabelType === 0) {
            for (var j = 0; j < data[i].data.length; j++) {
              if (option.xAxis[0].data.indexOf(data[i].data[j].name) === -1) {
                option.xAxis[0].data.push(data[i].data[j].name);
              }
              dataobj.data.push(data[i].data[j].value);
            }
          } else {
            for (var m = 0; m < data[i].data.length; m++) {
              if (tempXAxis.indexOf(data[i].data[m].name) === -1) {
                if (option.xAxis[0].data.length % 2 === 0) {
                  option.xAxis[0].data.push(data[i].data[m].name);
                } else {
                  option.xAxis[0].data.push("\n" + data[i].data[m].name);
                }
                tempXAxis.push(data[i].data[m].name);
              }
              dataobj.data.push(data[i].data[m].value);
            }
          }
          if (data[i].yAxisIndex) {
            dataobj.yAxisIndex = data[i].yAxisIndex;
          }
          dataobj.data.userObject = data[i];
          //         dataobj.barWidth = '36%';//写死，以后再传
          option.series.push(dataobj);
        }
        if (this.markLineFlag) {
          var markLineSource = this.marklineSource;
          if (markLineSource) {
            option.series[0].markLine = {
              silent: true,
              data: markLineSource
            };
          }
        }
      }
      this.myChart.setOption(option);
    },

    initialOption: function() {
      var option = $.extend(
        true,
        {},
        this.baseoption,
        this.customTheme && this.customTheme.option
      );
      option.grid = {
        top: this.gridTop,
        left: this.gridLeft,
        right: this.gridRight,
        bottom: this.gridBottom,
        containLabel: true
      };
      option.xAxis[0].axisLabel.interval = this.xInterval;
      if (this.labelColor) {
        option.xAxis[0].axisLabel.textStyle.color = this.labelColor;
        option.yAxis[0].axisLabel.textStyle.color = this.labelColor;
      }
      if (this.axisNameTextColor) {
        option.yAxis[0].nameTextStyle.color = this.axisNameTextColor;
      }
      option.yAxis[0].splitNumber = 5;
      if (this.doubleYAxis) {
        var self = this;
        option.yAxis[1] = {
          type: "value",
          splitLine: {
            show: self.showSplitLine,
            lineStyle: {
              color: self.splitLineColor
            }
          },
          name: self.yAxisName2,
          nameTextStyle: {},
          axisTick: {
            show: self.showAxisTick
          },
          axisLine: {
            lineStyle: {
              color: self.axisLineColor
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: self.fontSize
            }
          },
          max: self.yMax2
        };
        if (this.labelColor) {
          option.yAxis[1].axisLabel.textStyle.color = this.labelColor;
        }
        if (this.axisNameTextColor) {
          option.yAxis[1].nameTextStyle.color = this.axisNameTextColor;
        }
        option.yAxis[1].splitNumber = 5;
      }
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