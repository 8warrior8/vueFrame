<template>
  <div class="gcss-left-top-body">
    <div class="gcss-general_view_title">
      <span>
        <img src="../../../static/gcss_general_view/u124.png">全省告警排名
      </span>
    </div>
    <div class="gcss-left-top-body-content">
      <div
        class="gcss-left-regiontop-content-bottom"
        v-for="(item, i) in dataSourceList"
        :key="i"
        data-toggle="tooltip"
        data-placement="bottom"
        :title="item.tipName"
      >
        <span>{{item.region_name}}</span>
        <div class="gcss-left-regiontop-content-progress">
          <div :style="{width: item.percent + '%', background: item.bgcolor}"></div>
        </div>
        <span>{{item.alarmCount}}</span>
        <span>个</span>
      </div>
    </div>
    <div class="gcss-left-top-body-bottom">
      <div v-if="pageFirstStatus === true">
        <span v-on:click="leftPageClick(1)">
          <img
            style="margin-top:-9px"
            class="gcss-left-regiontop-bottom-img"
            src="../../../static/gcss_general_view/u298.png"
          >
        </span>
      </div>
      <div v-else>
        <span>
          <img style="margin-top:-9px" src="../../../static/gcss_general_view/u296.png">
        </span>
      </div>
      <div v-if="pageNextStatuw === true">
        <span v-on:click="leftPageClick(2)">
          <img style="margin-top:-9px" src="../../../static/gcss_general_view/u298.png">
        </span>
      </div>
      <div v-else>
        <span>
          <img
            style="margin-top:-9px"
            class="gcss-left-regiontop-bottom-img"
            src="../../../static/gcss_general_view/u296.png"
          >
        </span>
      </div>
    </div>
  </div>
</template>


<script>
import "./gcss_general_view.css";
import {
  getGeneralLeftTopCount,
  getGeneralLeftTopAlarm
} from "../../service/gcssGeneralViewAjax";
export default {
  name: "gcssLeftTop",
  props: ["userlevel", "userregionid"],
  data() {
    return {
      currRegionList: [],
      allSourceList: [],
      dataSourceList: [],
      pageSize: 5,
      currPageCount: 1,
      currPageIndex: 1,
      pageFirstStatus: false, //上一页是否可用 True 可用 False不可用
      pageNextStatuw: false //下一页是否可用 True 可用 False不可用
    };
  },

  //数据回收方法
  destroyed: function() {
    if (this.currRegionList) {
      this.currRegionList = [];
      this.currRegionList = null;
    }
    if (this.allSourceList) {
      this.allSourceList = [];
      this.allSourceList = null;
    }
    if (this.dataSourceList) {
      this.dataSourceList = [];
      this.dataSourceList = null;
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

  //子组件注册
  components: {},

  methods: {
    //页面主入口方法
    startUp: function(regionList) {
      var self = this;
      this.currRegionList = regionList;
      //需要延时处理，v-bind动态绑定属性后值会有延时
      setTimeout(function() {
        self.initUiStart();
      }, 10);
    },

    //初始化页面相关显示数据
    initUiStart: function() {
      if (this.currRegionList) {
        this._setAllRegionInfo();
        this.currPageCount = Math.ceil(
          this.allSourceList.length / this.pageSize
        );
        this._setPageStatus();
        var listSort = this._getDataSourcBySort();
        this._setDataSource(listSort);
        var param = { province_id: this.userregionid, ContextName: "nmosdb" };
        getGeneralLeftTopCount(param).then(data => {
          this._getGeneralReionCountCompleted(data);
        });
      }
    },

    //获取当前地市信息
    _setAllRegionInfo: function() {
      var alarmList = [];
      this.currRegionList.forEach(function(item, index) {
        alarmList.push({
          region_id: item.region_id,
          region_name: item.region_name,
          region_full_name: item.region_full_name,
          percent: 0,
          bgcolor: "#FF6600",
          alarmCount: 0,
          alarmLevel: 5,
          alarmCellId: 0,
          allCount: 0,
          tipName: item.region_full_name + " 总数量:0 告警数：0"
        });
      });
      this.dataSourceList = [];
      this.allSourceList = alarmList;
    },

    //设置分业组件的状态
    _setPageStatus: function() {
      this.pageFirstStatus = false;
      this.pageNextStatuw = false;
      if (this.currPageCount > 1) {
        if (this.currPageIndex > 1) {
          this.pageFirstStatus = true;
        }
        if (this.currPageIndex < this.currPageCount) {
          this.pageNextStatuw = true;
        }
      }
    },

    //根据排序获取指定列数据
    _getDataSourcBySort: function() {
      var self = this;
      var sortList = self.allSourceList.sort(function(a, b) {
        if (b.percent === a.percent) {
          return b.region_id - a.region_id;
        } else {
          return -a.percent + b.percent;
        }
      });
      return sortList;
    },

    //设置数据到页面显示
    _setDataSource: function(sortList) {
      var intBegin = (this.currPageIndex - 1) * this.pageSize;
      var intEnd = this.currPageIndex * this.pageSize;
      var list = [];
      sortList.forEach(function(item, index) {
        if (index >= intBegin && index < intEnd) {
          list.push({
            region_id: item.region_id,
            region_name: item.region_name,
            region_full_name: item.region_full_name,
            percent: item.percent,
            bgcolor: item.bgcolor,
            alarmCount: item.alarmCount,
            alarmLevel: item.alarmLevel,
            alarmCellId: item.alarmCellId,
            allCount: item.allCount,
            tipName:
              item.region_full_name +
              " 总数量:" +
              item.allCount +
              " 告警数：" +
              item.alarmCount
          });
        }
      });
      this.dataSourceList = list;
    },

    //获取资源数据完成事件
    _getGeneralReionCountCompleted: function(objList) {
      var regionList = [];
      this.allSourceList.forEach(function(item, index) {
        var itemCount = objList.find(function(itemObj) {
          if (itemObj.region_id === item.region_id) {
            return itemObj;
          }
          return null;
        });
        if (itemCount) {
          item.allCount = Number(itemCount.sum);
          var tempName =
            item.region_full_name +
            " 总数量:" +
            item.allCount +
            " 告警数：" +
            item.alarmCount;
          item.tipName = tempName;
        }
        regionList.push(item.region_id);
      });
      var listSort = this._getDataSourcBySort();
      this._setDataSource(listSort);
      var param = { province_id: this.userregionid, ContextName: "nmosdb" };
      getGeneralLeftTopAlarm(param).then(data => {
        this._getGeneralReionAlarmCompleted(data);
      });
    },

    //告警数据返回处理事件
    _getGeneralReionAlarmCompleted: function(data) {
      var self = this;
      if (!data || data.length <= 0) {
        return;
      }
      if (data && data.length !== 0) {
        data.forEach(
          function(alarm) {
            var itemRegion = self.allSourceList.find(function(itemObj) {
              if (itemObj.region_id === alarm.region_id) {
                return itemObj;
              }
              return null;
            });
            if (itemRegion) {
              itemRegion.alarmCount = alarm.sum;
              itemRegion.alarmLevel = 1;
              itemRegion.alarmCellId = "0";
              if (itemRegion.allCount === 0) {
                itemRegion.percent = 0;
              } else {
                itemRegion.percent =
                  (itemRegion.alarmCount / itemRegion.allCount) * 100;
              }
              if (itemRegion.percent > 100) {
                itemRegion.percent = 100;
              }
            }
          }.bind(this)
        );
        var listSort = this._getDataSourcBySort();
        this._setDataSource(listSort);
      }
    },

    //页面分页控件单击事件 1上一页 2下一页
    leftPageClick: function(type) {
      if (type === 1) {
        this.currPageIndex = this.currPageIndex - 1;
        if (this.currPageIndex <= 0) {
          this.currPageIndex = 1;
        }
      } else {
        this.currPageIndex = this.currPageIndex + 1;
        if (this.currPageIndex > this.currPageCount) {
          this.currPageIndex = this.currPageCount;
        }
      }
      this._setPageStatus();
      var listSort = this._getDataSourcBySort();
      this._setDataSource(listSort);
    }
  }
};
</script>

<style scoped>
.gcss-left-top-body {
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
}

.gcss-left-top-body-content {
  position: relative;
  display: flex;
  flex: 1 1;
  flex-direction: column;
  height: 100%;
  padding: 5px 10px;
  overflow: auto;
}

.gcss-left-top-body-bottom {
  width: 100%;
  height: 30px;
  line-height: 17px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  justify-content: flex-end;
}
.gcss-left-regiontop-content-bottom {
  width: 100%;
  height: 30px;
  line-height: 17px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #d7d7d7;
}

.gcss-left-regiontop-content-bottom:nth-last-of-type(1) {
  border: none;
}
.gcss-left-regiontop-content-bottom > span:nth-of-type(1) {
  width: 30%;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gcss-left-regiontop-content-bottom > span:nth-of-type(2) {
  width: 20%;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
  font-weight: bold;
}

.gcss-left-regiontop-content-bottom > span:nth-of-type(3) {
  width: 5%;
  text-align: right;
}

.gcss-left-regiontop-content-bottom > span > span {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 1px solid #6c7583;
  background: #c3daf7;
  color: #6c7583;
  text-align: center;
  border-radius: 10px;
}

.gcss-left-regiontop-content-progress {
  background: #e2e1e2;
  width: 45%;
  height: 4px;
  display: inline-block;
  border-radius: 2px;
}

.gcss-left-regiontop-content-progress > div {
  height: 100%;
  background: red;
  border-radius: 2px;
}

.gcss-left-top-body-bottom > div {
  margin: 0 10px;
  cursor: pointer;
}

.gcss-left-regiontop-bottom-img {
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
</style>
<style lang="stylus" scoped>
.theme-default {
}

.theme-zhanshi {
}
</style>