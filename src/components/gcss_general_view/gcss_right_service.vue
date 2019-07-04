<template>
  <div class="gcss-right-service-body">
    <el-table
      ref="serviceTab1"
      :border="true"
      :stripe="true"
      :highlight-current-row="true"
      style="width: 100%; height:100%;"
      :data="tableData"
      :cell-class-name="tableRowClassNameFunc"
      :header-cell-class-name="headerRowClassNameFunc"
      @sort-change="tableSortFunc"
      @cell-click="tableCellClick"
    >
      <el-table-column
        key="10"
        :show-overflow-tooltip="true"
        header-align="center"
        sortable="custom"
        :prop="tableColumn.prop"
        :label="tableColumn.label"
        :width="tableColumn.width"
      ></el-table-column>
      <template v-for="(item, i) in tableColumn.childList">
        <el-table-column
          :key="i+100"
          :show-overflow-tooltip="true"
          header-align="center"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
        >
          <template v-for="(itemLevel, index) in item.childList">
            <el-table-column
              :key="index + 1000"
              :show-overflow-tooltip="true"
              header-align="center"
              sortable="custom"
              :prop="itemLevel.prop"
              :label="itemLevel.label"
              :width="itemLevel.width"
            ></el-table-column>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>


<script>
import "./gcss_general_view.css";
import { getGeneralLeftBusinessCount } from "../../service/gcssGeneralViewAjax";
export default {
  name: "gcssRightService",
  props: ["userlevel", "userregionid"],
  data() {
    return {
      currRegionList: [],
      servlceLevelList: [
        {
          id: "1",
          name: "AAA"
        },
        {
          id: "2",
          name: "AA"
        },
        {
          id: "3",
          name: "A"
        }
      ], //业务级别字典数据,
      serviceTypeList: [
        {
          id: "bd",
          name: "本地"
        },
        {
          id: "sk",
          name: "双跨"
        }
      ],
      tableColumn: {},
      tableData: []
    };
  },

  //数据回收方法
  destroyed: function() {
    if (this.servlceLevelList) {
      this.servlceLevelList = [];
      this.servlceLevelList = null;
    }
    if (this.serviceTypeList) {
      this.serviceTypeList = [];
      this.serviceTypeList = null;
    }
    if (this.tableColumn) {
      this.tableColumn = [];
      this.tableColumn = null;
    }
    if (this.tableData) {
      this.tableData = [];
      this.tableData = null;
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
      this.setTableColInfo();
      this.setTableDataSource();
    },

    setTableColInfo: function() {
      var self = this;
      var modelItem = {
        prop: "name",
        label: "地区",
        width: "100",
        childList: []
      };
      this.serviceTypeList.forEach(function(itemType) {
        var tempModel = {
          prop: itemType.id,
          label: itemType.name,
          width: "",
          childList: []
        };
        self.servlceLevelList.forEach(function(itemLevel) {
          tempModel.childList.push({
            prop: itemType.id + "-" + itemLevel.id.toString(),
            label: itemLevel.name,
            width: ""
          });
        });
        modelItem.childList.push(tempModel);
      });
      this.tableColumn = modelItem;
    },

    setTableDataSource: function() {
      var self = this;
      var list = [];
      this.currRegionList.forEach(function(regionItem) {
        var tempModel = {
          id: regionItem.region_id.toString(),
          name: regionItem.region_name,
          pcode: regionItem.pcode,
          fullName: regionItem.region_name
        };
        self.serviceTypeList.forEach(function(itemType) {
          self.servlceLevelList.forEach(function(itemLevel) {
            var key = itemType.id + "-" + itemLevel.id.toString();
            var keyList = itemType.id + "-" + itemLevel.id.toString() + "-list";
            tempModel[key] = Math.floor(Math.random() * 1000) + 1;
            tempModel[keyList] = {
              alarmCell: "0",
              alarmSum: 0,
              alarmLeverl: 5
            };
          });
        });
        list.push(tempModel);
      });
      this.tableData = list;
    },

    //表格排序方法
    tableSortFunc: function({ column, prop, order }) {},

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
    }
  }
};
</script>


<style>
.gcss-right-service-body {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.gcss-right-service-body-top {
  overflow-y: auto;
  overflow-x: auto;
  flex: 1 1 auto;
}

.gcss-right-service-body-bottom {
  width: 100%;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.gcss-right-service-body .el-table .ui-text-table-row {
  font-size: 12px;
  height: 35px;
  line-height: 35px;
  padding: 0px;
}

.gcss-right-service-body .el-table .ui-text-table-col {
  font-size: 12px;
  height: 35px;
  line-height: 35px;
  padding: 0px;
  background: white;
}
.gcss-right-service-body .el-table .el-table__header-wrapper {
  height: 73px;
}

.gcss-right-service-body .el-table .el-table__body-wrapper {
  overflow-x: auto;
  height: calc(100% - 73px);
}
</style>

