<template>
  <div class="gcss-right-chart-body">
    <barLinechart
      v-bind:dataSource="dataSource"
      v-bind:labelFormatterFun="labelFormatterFun1"
      :showLegend="true"
    ></barLinechart>
  </div>
</template>


<script>
import "./gcss_general_view.css";
import BarLinechart from "../../common/businessviews/comp_echarts/comp_echart_bar_line.vue";
export default {
  name: "gcssRightChart",
  props: ["userlevel", "userregionid"],
  data() {
    return {
      dataSource: []
    };
  },

  //数据回收方法
  destroyed: function() {
    if (this.dataSource) {
      this.dataSource = [];
      this.dataSource = null;
    }
  },

  watch: {
    //页面大小发生变化时触发该处理
    "$store.state.systemChange.Page_Size_Change": function(param) {
      //this.pageWidth = param.width;
      //this.pageHeight = param.height;
    },
    //系统主题样式变化时触发该处理
    "$store.state.systemChange.Style_Change": function(styleName) {}
  },

  components: {
    barLinechart: BarLinechart
  },

  methods: {
    //页面主入口方法
    startUp: function() {
      var self = this;
      //需要延时处理，v-bind动态绑定属性后值会有延时
      setTimeout(function() {
        self.initUiStart();
      }, 10);
    },

    //初始化页面相关显示数据
    initUiStart: function() {
      this.setChartDataSource();
    },

    setChartDataSource: function() {
      var self = this;
      var list = [];
      var tempModel1 = {
        title: "当前值",
        chartType: "line",
        //areaFlag: true,
        color: self.$comUtil.getColorByIndex(0),
        data: []
      };
      tempModel1.data.push({ name: "2019-7-4 10:00:00", value: 11 });
      tempModel1.data.push({ name: "2019-7-4 11:00:00", value: 22 });
      tempModel1.data.push({ name: "2019-7-4 12:00:00", value: 33 });
      list.push(tempModel1);
      var tempModel2 = {
        title: "今日值",
        chartType: "line",
        //areaFlag: true,
        color: self.$comUtil.getColorByIndex(1),
        data: []
      };
      tempModel2.data.push({ name: "2019-7-4 10:00:00", value: 55 });
      tempModel2.data.push({ name: "2019-7-4 11:00:00", value: 66 });
      tempModel2.data.push({ name: "2019-7-4 12:00:00", value: 77 });
      list.push(tempModel2);
      this.dataSource = list;
    },

    labelFormatterFun1: function(item) {
      var date = new Date(item);
      return date.getHours() + "点";
    }
  }
};
</script>

<style lang="stylus" scoped>
.gcss-right-chart-body {
  position: absolute;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>
<style lang="stylus" scoped>
.theme-default {
}

.theme-zhanshi {
}
</style>