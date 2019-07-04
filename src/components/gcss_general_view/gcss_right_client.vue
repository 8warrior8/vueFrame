<template>
  <div class="gcss-right-client-body">
    <div class="gcss-right-client-body-top">
      <el-table
        ref="cleintTab1"
        :data="tableData"
        :border="true"
        :stripe="true"
        :highlight-current-row="true"
        style="width: 100%; height:100%;"
        :cell-class-name="tableRowClassNameFunc"
        :header-cell-class-name="headerRowClassNameFunc"
        @sort-change="tableSortFunc"
        @cell-click="tableCellClick"
      >
        <template v-for="(item, i) in tableColumn">
          <el-table-column
            :key="i"
            v-if="item.isJoinItem === false"
            :show-overflow-tooltip="true"
            header-align="center"
            sortable="custom"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
          ></el-table-column>
          <el-table-column
            :key="i"
            v-if="item.isJoinItem === true"
            sortable="custom"
            header-align="center"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
          >
            <template slot-scope="scope">
              <div
                class="gcss-right-client-body-top-div"
                data-toggle="tooltip"
                data-placement="bottom"
                :title="scope.row[item.childItem.prop1] + '/'  + scope.row[item.childItem.prop2]"
              >
                <span
                  @click="tableCellJoinClick(scope.row,scope.column,$event, 1)"
                  class="gcss-right-client-body-top-span1"
                  :style="{color: scope.row[item.childItem.alarmColor]}"
                >{{scope.row[item.childItem.prop1]}}</span>
                <span class="gcss-right-client-body-top-span2">/</span>
                <span
                  @click="tableCellJoinClick(scope.row,scope.column,$event, 2)"
                  class="gcss-right-client-body-top-span3"
                >{{scope.row[item.childItem.prop2]}}</span>
              </div>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="gcss-right-client-body-bottom">
      <div v-if="pageFirstStatus === true">
        <span v-on:click="rightPageClick(1)">
          <img
            style="margin-top:-9px"
            class="gcss-right-client-bottom-img"
            src="../../../static/gcss_general_view/u298.png"
          />
        </span>
      </div>
      <div v-else>
        <span>
          <img style="margin-top:-9px" src="../../../static/gcss_general_view/u296.png" />
        </span>
      </div>
      <div v-if="pageNextStatuw === true">
        <span v-on:click="rightPageClick(2)">
          <img style="margin-top:-9px" src="../../../static/gcss_general_view/u298.png" />
        </span>
      </div>
      <div v-else>
        <span>
          <img
            style="margin-top:-9px"
            class="gcss-right-client-bottom-img"
            src="../../../static/gcss_general_view/u296.png"
          />
        </span>
      </div>
    </div>
  </div>
</template>


<script>
import "./gcss_general_view.css";
import {
  getResourceDicByLevel,
  getRightClientSum,
  getRightClientAlarm
} from "../../service/gcssGeneralViewAjax";
export default {
  name: "gcssRightClient",
  props: ["userlevel", "userregionid"],
  data() {
    return {
      currRegionList: [],
      clientLevelList: [], //金牌 银牌等字典
      tableColumn: [],
      tableData: [],
      allSourceList: [],
      pageSize: 8,
      currPageCount: 1,
      currPageIndex: 1,
      pageFirstStatus: false, //上一页是否可用 True 可用 False不可用
      pageNextStatuw: false, //下一页是否可用 True 可用 False不可用
      defaultSortName: "name",
      defaultSortOrder: "ascending"
    };
  },

  //数据回收方法
  destroyed: function() {
    if (this.clientLevelList) {
      this.clientLevelList = [];
      this.clientLevelList = null;
    }
    if (this.tableColumn) {
      this.tableColumn = [];
      this.tableColumn = null;
    }
    if (this.tableData) {
      this.tableData = [];
      this.tableData = null;
    }
    if (this.allSourceList) {
      this.allSourceList = [];
      this.allSourceList = null;
    }
  },

  watch: {
    //页面大小发生变化时触发该处理
    "$store.state.systemChange.Page_Size_Change": function(param) {},
    //系统主题样式变化时触发该处理
    "$store.state.systemChange.Style_Change": function(styleName) {}
  },

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
      var param = { province_id: this.userregionid, ContextName: "nmosdb" };
      getResourceDicByLevel(param).then(data => {
        this._getResourceDicInfoCompleted(data);
      });
    },

    //获取客户等级完成事件
    _getResourceDicInfoCompleted: function(objList) {
      var levelList = [];
      objList.forEach(function(item, index) {
        levelList.push({
          cleintLevel: item.id.toString(),
          cleintLevelName: item.name,
          sortIndex: index + 1
        });
      });
      this.clientLevelList = levelList;
      this._setTableColInfo();
      var param = { province_id: this.userregionid, ContextName: "nmosdb" };
      getRightClientSum(param).then(data => {
        this._getRightClientSumCompleted(data);
      });
    },

    //设置表格列信息
    _setTableColInfo: function() {
      var self = this;
      var list = [];
      list.push({
        isJoinItem: false,
        prop: "name",
        label: "地区",
        width: "*"
      });
      this.clientLevelList.forEach(function(item, index) {
        list.push({
          isJoinItem: true,
          label: item.cleintLevelName,
          width: "70",
          prop: "alarmSort" + item.cleintLevel.toString(),
          childItem: {
            prop1: "alarmValue" + item.cleintLevel.toString(),
            prop2: "resValue" + item.cleintLevel.toString(),
            alarmColor: "alarmBackColor" + item.cleintLevel.toString()
          }
        });
      });
      this.tableColumn = list;
    },

    //获取客户资源数据完成事件
    _getRightClientSumCompleted: function(objList) {
      var j = 0;
      this._setAllDataSource(objList);
      this.currPageCount = Math.ceil(this.allSourceList.length / this.pageSize);
      this._setPageStatus();
      var listSort = this._getDataSourcBySort();
      this._setDataSource(listSort);
      var param = { province_id: this.userregionid, ContextName: "nmosdb" };
      getRightClientAlarm(param).then(data => {
        this._getRightClientAlarmCompleted(data);
      });
    },

    //设置数据到数据源中
    _setAllDataSource: function(objList) {
      var self = this;
      var tempSource = [];
      this.currRegionList.forEach(function(regionItem, index) {
        var tempModel = {
          id: regionItem.region_id.toString(),
          name: regionItem.region_name,
          pcode: regionItem.pcode,
          fullName: regionItem.region_name
        };
        self.clientLevelList.forEach(function(LevelItem, index) {
          var sumAll = 0;
          var isCheck = objList.find(function(item) {
            if (
              item.regionId.toString() === regionItem.region_id.toString() &&
              item.levelId.toString() === LevelItem.cleintLevel.toString()
            ) {
              return item;
            }
            return null;
          });
          if (isCheck) {
            sumAll = isCheck.sum;
          }
          (tempModel["resValue" + LevelItem.cleintLevel.toString()] = sumAll),
            (tempModel["alarmValue" + LevelItem.cleintLevel.toString()] = 0),
            (tempModel["alarmLevel" + LevelItem.cleintLevel.toString()] = 5),
            (tempModel["alarmCellId" + LevelItem.cleintLevel.toString()] = "0"),
            (tempModel[
              "alarmSort" + LevelItem.cleintLevel.toString()
            ] = self._getAlartSortNum(5, 0)),
            (tempModel[
              "alarmColor" + LevelItem.cleintLevel.toString()
            ] = self.$comUtil.getAlarmFontColorByLevel(5)),
            (tempModel[
              "alarmBackColor" + LevelItem.cleintLevel.toString()
            ] = self.$comUtil.getAlarmColorByLevel(5, "black"));
        });
        tempSource.push(tempModel);
      });
      this.allSourceList = tempSource;
    },

    //根据告警等级和告警数据生成排序关键字
    _getAlartSortNum: function(alarmLevel, alarmNum) {
      var tempSum = 0;
      if (alarmLevel === 1) {
        tempSum = 4 * 10000 + Number(alarmNum);
      } else if (alarmLevel === 2) {
        tempSum = 3 * 10000 + Number(alarmNum);
      } else if (alarmLevel === 3) {
        tempSum = 2 * 10000 + Number(alarmNum);
      } else if (alarmLevel === 4) {
        tempSum = 1 * 10000 + Number(alarmNum);
      }
      return tempSum;
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
      var prop = this.defaultSortName;
      var order = this.defaultSortOrder;
      var sortList = this.allSourceList.sort(function(a, b) {
        var temp1 = prop;
        if (prop === "name") {
          temp1 = "pcode";
        }
        if (order === "ascending") {
          return a[temp1] - b[temp1];
        } else {
          return b[temp1] - a[temp1];
        }
      });
      return sortList;
    },

    //设置数据到页面显示
    _setDataSource: function(sortList) {
      var self = this;
      var intBegin = (this.currPageIndex - 1) * this.pageSize;
      var intEnd = this.currPageIndex * this.pageSize;
      var list = [];
      sortList.forEach(function(item, index) {
        if (index >= intBegin && index < intEnd) {
          var tempModel = {
            id: item.id.toString(),
            name: item.name,
            pcode: item.pcode,
            fullName: item.fullName
          };
          self.clientLevelList.forEach(function(LevelItem, index) {
            tempModel["resValue" + LevelItem.cleintLevel.toString()] =
              item["resValue" + LevelItem.cleintLevel.toString()];
            tempModel["alarmValue" + LevelItem.cleintLevel.toString()] =
              item["alarmValue" + LevelItem.cleintLevel.toString()];
            tempModel["alarmLevel" + LevelItem.cleintLevel.toString()] =
              item["alarmLevel" + LevelItem.cleintLevel.toString()];
            tempModel["alarmCellId" + LevelItem.cleintLevel.toString()] =
              item["alarmCellId" + LevelItem.cleintLevel.toString()];
            tempModel["alarmSort" + LevelItem.cleintLevel.toString()] =
              item["alarmSort" + LevelItem.cleintLevel.toString()];
            tempModel["alarmColor" + LevelItem.cleintLevel.toString()] =
              item["alarmColor" + LevelItem.cleintLevel.toString()];
            tempModel["alarmBackColor" + LevelItem.cleintLevel.toString()] =
              item["alarmBackColor" + LevelItem.cleintLevel.toString()];
          });
          list.push(tempModel);
        }
      });
      this.tableData = list;
    },

    //获取告警数据返回事件
    _getRightClientAlarmCompleted: function(data) {
      if (!data || data.length <= 0) {
        return;
      }
      var self = this;
      data.forEach(function(alarm, index) {
        var isCheck = self.allSourceList.find(function(item) {
          if (item.id.toString() === alarm.regionId.toString()) {
            return item;
          }
          return null;
        });
        if (isCheck) {
          isCheck["alarmValue" + alarm.levelId.toString()] = alarm.sum;
          isCheck["alarmLevel" + alarm.levelId.toString()] = alarm.level;
          isCheck["alarmCellId" + alarm.levelId.toString()] = "0";
          isCheck[
            "alarmSort" + alarm.levelId.toString()
          ] = self._getAlartSortNum(alarm.level, alarm.sum);
          isCheck[
            "alarmColor" + alarm.levelId.toString()
          ] = self.$comUtil.getAlarmFontColorByLevel(alarm.level);
          isCheck[
            "alarmBackColor" + alarm.levelId.toString()
          ] = self.$comUtil.getAlarmColorByLevel(alarm.level, "black");
        }
      });
      var listSort = this._getDataSourcBySort();
      this._setDataSource(listSort);
    },

    //表格排序方法
    tableSortFunc: function({ column, prop, order }) {
      if (order) {
        this.defaultSortName = prop;
        this.defaultSortOrder = order;
      } else {
        this.defaultSortName = "name";
        this.defaultSortOrder = "ascending";
      }
      var listSort = this._getDataSourcBySort();
      this._setDataSource(listSort);
    },

    //表格单元格-单击事件
    tableCellClick: function(row, column, cell, event) {
      var j = row[column.property];
    },

    //表格单元格-特殊列-单击事件
    tableCellJoinClick: function(row, column, event, type) {
      var j = 0;
    },

    tableRowClassNameFunc: function({ row, rowIndex }) {
      return "ui-text-table-row";
    },

    headerRowClassNameFunc: function({ row, rowIndex }) {
      return "ui-text-table-col";
    },

    //页面分页控件单击事件 1上一页 2下一页
    rightPageClick: function(type) {
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

<style>
.gcss-right-client-body {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.gcss-right-client-body-top {
  overflow-y: auto;
  overflow-x: auto;
  flex: 1 1 auto;
}

.gcss-right-client-body .el-table .ui-text-table-row {
  font-size: 12px;
  height: 35px;
  line-height: 35px;
  padding: 0px;
}

.gcss-right-client-body .el-table .ui-text-table-col {
  font-size: 12px;
  height: 35px;
  line-height: 35px;
  padding: 0px;
  background:white;
}
.gcss-right-client-body .el-table .el-table__header-wrapper {
  height: 37px;
}

.gcss-right-client-body .el-table .el-table__body-wrapper {
  overflow-x: auto;
  height: calc(100% - 37px);
}

.gcss-right-client-body .gcss-right-client-body-top-div {
  width: 100%;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
}

.gcss-right-client-body .gcss-right-client-body-top-span1 {
  width: 30%;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  text-align: right;
}

.gcss-right-client-body .gcss-right-client-body-top-span2 {
  width: 8px;
  text-align: center;
}
.gcss-right-client-body .gcss-right-client-body-top-span3 {
  width: 65%;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
</style>

<style scoped>
.gcss-right-client-body-bottom {
  width: 100%;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.gcss-right-client-body-bottom > div {
  margin: 0 10px;
  cursor: pointer;
}

.gcss-right-client-bottom-img {
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