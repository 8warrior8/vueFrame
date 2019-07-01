<template>
  <div class="gcss-left-business-body">
    <div class="gcss-general_view_title">
      <span>
        <img src="../../../static/gcss_general_view/u124.png">业务量
      </span>
    </div>
    <div class="gcss-left-business-body-center">
      <div>
        <span>客户数</span>
        <span>{{clientSum}}</span>个
      </div>
      <div>
        <span>业务数</span>
        <span>{{serviceSum}}</span>个
      </div>
    </div>
    <div class="gcss-left-business-body-bottom">
      <piechart
        v-bind:dataSource="dataSource"
        v-on:pointClick="pointClick"
        v-on:pointdbClick="pointdbClick"
        v-bind:labelFormatterFun="labelFormatterFun1"
        v-bind:tipFormatterFun="tipFormatterFun1"
      ></piechart>
    </div>
  </div>
</template>


<script>
import "./gcss_general_view.css";
import { getGeneralLeftBusinessCount } from "../../service/gcssGeneralViewAjax";
import Piechart from "../../common/businessviews/comp_echarts/comp_echart_pie.vue";
export default {
  name: "gcssLeftBusiness",
  props: ["userlevel", "userregionid"],
  data() {
    return {
      clientSum: 0,
      serviceSum: 0,
      dataSource: []
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

  components: {
    piechart: Piechart
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
      var param = { province_id: this.userregionid, ContextName: "nmosdb" };
      getGeneralLeftBusinessCount(param).then(data => {
        this.clientSum = data.clientSun;
        this.serviceSum = data.businessSum;
        this.initChartsDataSource(data.businessList);
      });
    },
    //整合数据源，绑定到chart
    initChartsDataSource: function(objList) {
      var self = this;
      var list = [];
      objList.forEach(function(element, index) {
        var tempColor = self.$comUtil.getColorByIndex(index);
        list.push({
          color: tempColor,
          objectClass: element.object_class,
          name: element.object_class_name,
          value: element.sum,
          alarmSum: 10,
          alarmLevel: 5,
          alarmCellId: "0"
        });
      });
      this.dataSource = list;
    },

    pointClick: function(param) {
      var _param = param;
    },
    pointdbClick: function(param) {
      var _param = param;
    },

    //饼形图中提示文字的样式控制
    labelFormatterFun1: function(item) {
      var strLabel = item.name + "\n" + item.percent + "% ";
      if (item.data && item.data.userObject && item.data.userObject.alarmSum) {
        strLabel = strLabel + item.data.userObject.alarmSum;
      } else {
        strLabel = strLabel + "0";
      }
      return strLabel;
    },

    //提示信息控制
    tipFormatterFun1: function(item) {
      var strLabel =
        "专线名称：" +
        item.name +
        "<br>" +
        "总数量：" +
        item.value +
        "<br>" +
        "百分比：" +
        item.percent +
        "% <br>";
      if (item.data && item.data.userObject && item.data.userObject.alarmSum) {
        strLabel = strLabel + "告警数量：" + item.data.userObject.alarmSum;
      } else {
        strLabel = strLabel + "告警数量：0";
      }
      return strLabel;
    }
  }
};
</script>

<style lang="stylus">
.gcss-left-business-body {
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
}

.gcss-left-business-body-center {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 40px;
  border-bottom: 2px dashed #B8B8B8;
}

.gcss-left-business-body-center>div {
  width: 49%;
  height: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #99C0EE;
  border-radius: 3px;
}

.gcss-left-business-body-center>div>span {
  white-space: nowrap;
}

.gcss-left-business-body-center>div>span:nth-of-type(2) {
  color: #247FE8;
  font-weight: bold;
  font-size: 14px;
}

.gcss-left-business-body-bottom {
  position: relative;
  margin-top: 5px;
  display: flex;
  flex-grow: 2;
  flex-shrink: 1;
  flex-basis: auto;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-height: 0px;
}
</style>
<style lang="stylus" scoped>
.theme-default {
}

.theme-zhanshi {
}
</style>