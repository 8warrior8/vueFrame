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
      <barchart
        v-bind:dataSource="dataSource"
        v-on:pointClick="pointClick"
        v-on:pointdbClick="pointdbClick"
      ></barchart>
    </div>
  </div>
</template>


<script>
import "./gcss_general_view.css";
import { getGeneralLeftBusinessCount } from "../../service/gcssGeneralViewAjax";
import Barchart from "../../common/businessviews/comp_echarts/comp_echart_bar.vue";
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
    barchart: Barchart
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
      var list = [];
      var tempModel = {
        title: "测试",
        chartType: "line",
        color: "red",
        data: []
      };
      objList.forEach(element => {
        tempModel.data.push({
          title:element.object_class_name,
          name: element.object_class_name,
          value: element.sum
        });
      });
      list.push(tempModel);
      this.dataSource = list;
    },

    pointClick: function(param) {
      var _param = param;
    },
    pointdbClick: function(param) {
      var _param = param;
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