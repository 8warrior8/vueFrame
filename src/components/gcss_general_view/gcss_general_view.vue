<template>
  <div class="gess-general-view-body">
    <div class="gess-general-view-body-left">
      <div class="gess-general-view-body-left-top">
        <gcssLeftBusiness ref="leftBusiness1" userlevel="1" :userregionid="currProvinceId"></gcssLeftBusiness>
      </div>
      <div class="gess-general-view-body-left-bottom">告警排名</div>
    </div>
    <div class="gess-general-view-body-center">
      <div class="gess-general-view-body-center-center">SVG地图</div>
      <div class="gess-general-view-body-center-bottom">重保信息</div>
    </div>
    <div class="gess-general-view-body-right">
      <div class="gess-general-view-body-right-top">客户运行情况</div>
      <div class="gess-general-view-body-right-bottom">主动发生率</div>
    </div>
  </div>
</template>


<script>
import { getGeneralReionInfo } from "../../service/gcssGeneralViewAjax";
import GcssLeftBusiness from "./gcss_left_business.vue";
export default {
  name: "gcssGeneralView",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      currProvinceId: "-1",
      currProvinceName: "",
      currRegionList: []
    };
  },
  components: {
    gcssLeftBusiness: GcssLeftBusiness
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
  background: #E6E9EF;
  font-size: 12px;
}

.gess-general-view-body-left {
  position: relative;
  width: 250px;
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
  background:white;
}

.gess-general-view-body-right {
  position: relative;
  width: 450px;
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
  background:white;
}
.gess-general-view-body-left-bottom {
  position: relative;
  margin: 5px;
  display: flex;
  flex-grow: 2;
  flex-shrink: 1;
  flex-basis: auto;
  background:white;
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
  background:white;
}

.gess-general-view-body-right-bottom {
  position: relative;
  margin: 5px;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  background:white;
}
</style>

<style lang="stylus" scoped>
.theme-default {
}

.theme-zhanshi {
}
</style>
