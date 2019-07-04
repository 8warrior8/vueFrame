<template>
  <div class="gess-general-view-body">
    <div class="gess-general-view-body-left">
      <div class="gess-general-view-body-left-top">
        <gcssLeftBusiness ref="leftBusiness1" userlevel="1" :userregionid="currProvinceId"></gcssLeftBusiness>
      </div>
      <div class="gess-general-view-body-left-bottom">
        <gcssLeftTop ref="leftTop1" userlevel="1" :userregionid="currProvinceId"></gcssLeftTop>
      </div>
    </div>
    <div class="gess-general-view-body-center">
      <div class="gess-general-view-body-center-center">SVG地图</div>
      <div class="gess-general-view-body-center-bottom">重保信息</div>
    </div>
    <div class="gess-general-view-body-right">
      <div class="gess-general-view-body-right-top">
        <div class="gcss-general_view_title">
          <span>
            <img src="../../../static/gcss_general_view/u124.png" />
            {{rightTitle}}
          </span>
          <div class="gcss-general-view-body-right-top-div">
            <span
              :class="{'gcss-general-first-right-selected':isRightClientShow===true}"
              v-on:click="rightTableClick(1)"
            >客户</span>
            <span
              :class="{'gcss-general-first-right-selected':isRightClientShow===false }"
              v-on:click="rightTableClick(2)"
            >业务</span>
          </div>
        </div>

        <div class="gcss-general-view-body-right-content">
          <gcssRightClient
            ref="rightClient1"
            v-if="isRightClientShow === true"
            userlevel="1"
            :userregionid="currProvinceId"
          ></gcssRightClient>
          <gcssRightService
            ref="rightService1"
            v-if="isRightClientShow === false"
            userlevel="1"
            :userregionid="currProvinceId"
          ></gcssRightService>
        </div>
      </div>
      <div class="gess-general-view-body-right-bottom">
        <gcssRightChart ref="rightChart1" userlevel="1" :userregionid="currProvinceId"></gcssRightChart>
      </div>
    </div>
  </div>
</template>


<script>
import { getGeneralReionInfo } from "../../service/gcssGeneralViewAjax";
import GcssLeftBusiness from "./gcss_left_business.vue";
import GcssLeftTop from "./gcss_left_top.vue";
import GcssRightClient from "./gcss_right_client.vue";
import GcssRightService from "./gcss_right_service.vue";
import GcssRightChart from "./gcss_right_chart.vue";
import "./gcss_general_view.css";
export default {
  name: "gcssGeneralView",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      currProvinceId: "-1",
      currProvinceName: "",
      currRegionList: [],
      rightTitle: "客户运行情况",
      isRightClientShow: true
    };
  },
  components: {
    gcssLeftBusiness: GcssLeftBusiness,
    gcssLeftTop: GcssLeftTop,
    gcssRightClient: GcssRightClient,
    gcssRightService: GcssRightService,
    gcssRightChart: GcssRightChart
  },

  //页面初始化完成后调用该方法
  mounted: function() {
    var userName = this.$store.getters["userInfo/getUserName"];
    var param = { province_id: "6603520", ContextName: "nmosdb" };
    getGeneralReionInfo(param).then(data => {
      this.getCurrRegionInfo(data);
      this.initUiStart();
    });
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

  methods: {
    getCurrRegionInfo: function(data) {
      var self = this;
      var list = [];
      var id = null;
      var name = null;
      data.forEach(element => {
        list.push({
          region_id: element.region_id,
          region_name: element.region_name,
          region_full_name: element.region_full_name,
          pcode: element.pcode
        });
        if (!id) {
          id = element.provinceId;
        }
        if (!name) {
          name = element.provinceName;
        }
      });
      this.currRegionList = list;
      this.currProvinceId = id;
      this.currProvinceName = name;
    },

    //初始化页面其他组件对应的数据
    initUiStart: function() {
      this.$refs.leftBusiness1.startUp();
      this.$refs.leftTop1.startUp(this.currRegionList);
      this.$refs.leftTop1.startUp(this.currRegionList);
      if (this.isRightClientShow === true) {
        this.rightClientStartUp();
      } else {
        this.rightServieStartUp();
      }
      this.$refs.rightChart1.startUp();
    },

    rightClientStartUp: function() {
      var self = this;
      if (this.$refs.rightClient1) {
        this.$refs.rightClient1.startUp(this.currRegionList);
      } else {
        setTimeout(function() {
          self.rightClientStartUp();
        }, "500");
      }
    },

    rightServieStartUp: function() {
      var self = this;
      if (this.$refs.rightService1) {
        this.$refs.rightService1.startUp(this.currRegionList);
      } else {
        setTimeout(function() {
          self.rightServieStartUp();
        }, "500");
      }
    },

    //表格切换切换客户1和业务2
    rightTableClick: function(type) {
      if (type === 1) {
        this.rightTitle = "客户运行情况";
        this.isRightClientShow = true;
        this.rightClientStartUp();
      } else if (type === 2) {
        this.rightTitle = "业务运行情况";
        this.isRightClientShow = false;
        this.rightServieStartUp();
      }
    }
  }
};
</script>

<style scoped>
.gess-general-view-body {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  background: #e6e9ef;
  font-size: 12px;
  min-height: 400px;
  min-width: 600px;
}

.gess-general-view-body-left {
  position: relative;
  width: 300px;
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
  background: white;
}

.gess-general-view-body-right {
  position: relative;
  width: 400px;
  display: flex;
  flex-direction: column;
  padding: 5px;
}

.gess-general-view-body-left-top {
  margin: 5px;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 45%;
  position: relative;
  background: white;
}
.gess-general-view-body-left-bottom {
  position: relative;
  margin: 5px;
  display: flex;
  flex-grow: 2;
  flex-shrink: 1;
  flex-basis: auto;
  background: white;
}

.gess-general-view-body-center-center {
  position: relative;
  display: flex;
  flex-grow: 2;
  flex-shrink: 1;
  flex-basis: auto;
}

.gess-general-view-body-center-bottom {
  position: relative;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 150px;
}

.gess-general-view-body-right-top {
  position: relative;
  margin: 5px;
  display: flex;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: 360px;
  flex-direction: column;
  background: white;
}

.gess-general-view-body-right-bottom {
  position: relative;
  margin: 5px;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  background: white;
}

.gcss-general-view-body-right-top-div {
  width: 80px;
  height: 24px;
  display: flex;
  /* justify-content: space-between; */
  /* align-items: center; */
  border: 1px solid #237bdc;
  border-radius: 3px;
}

.gcss-general-view-body-right-top-div > span {
  display: inline-block;
  line-height: 24px;
  text-align: center;
  width: 50%;
  height: 100%;
  border-right: 1px solid #237bdc;
  cursor: pointer;
}

.gcss-general-view-body-right-top-div > span:nth-last-of-type(1) {
  border-right: none;
}

.gcss-general-first-right-selected {
  color: #237bdc;
  font-weight: bold;
}
.gcss-general-view-body-right-content {
  position: relative;
  display: flex;
  flex: 1 1;
}
</style>

<style lang="stylus" scoped>
.theme-default {
}

.theme-zhanshi {
}
</style>
