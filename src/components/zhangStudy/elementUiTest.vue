<template>
  <div class="elementUiTest-body">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" sortable="custom" label="日期" width="150"></el-table-column>
      <el-table-column label="本地">
        <el-table-column prop="province" sortable="custom" label="省份" width="120"></el-table-column>
        <el-table-column prop="city"  sortable="custom" label="市区" width="120"></el-table-column>
      </el-table-column>
      <el-table-column label="双跨">
        <el-table-column prop="address"  sortable="custom" label="地址" width="300"></el-table-column>
        <el-table-column prop="zip" sortable="custom" label="邮编" width="120"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//require("./ui_test_change_style.css")
export default {
  name: "ElementUiTest",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  },
  created: function() {},

  watch: {
    //页面大小发生变化时触发该处理
    "$store.state.systemChange.Page_Size_Change": function(param) {
      this.pageWidth = param.width;
      this.pageHeight = param.height;
    },
    //系统主题样式变化时触发该处理
    "$store.state.systemChange.Style_Change": function(styleName) {}
  },

  methods: {
    btnDataChange: function(event) {
      this.msg = "系统测试，问题解决了！";
    },

    tableRowClassNameFunc: function({ row, rowIndex }) {
      return "ui-text-table-row";
    },

    headerRowClassNameFunc: function({ row, rowIndex }) {
      return "ui-text-table-col";
    },

    headerCellClassNameFunc: function({ row, column, rowIndex, columnIndex }) {
      return "ui-text-table-cell";
    },

    tableSortFunc: function({ column, prop, order }) {
      var j = 0;
    },

    tableCellClick: function(row, column, cell, event) {
      var j = row[column.property];
    },

    tableCellJoinClick: function(row, column, event, type) {
      var j = 0;
    }
  }
};
</script>

<style>
.elementUiTest-body {
  width: 100%;
  height: 100%;
}
.elementUiTest-body .el-table .ui-text-table-row {
  font-size: 12px;
  height: 35px;
  line-height: 35px;
  padding: 0px;
}

.elementUiTest-body .el-table .ui-text-table-col {
  font-size: 12px;
  height: 35px;
  line-height: 35px;
  padding: 0px;
}
</style>

<style scoped>
.layout-grid-content {
  border-radius: 10px;
  min-height: 36px;
}

.layout-bg-purple-light {
  background: #e5e9f2;
}
</style>


<style lang="stylus" scoped>
.theme-default {
  .layout-bg-purple {
    background: black;
  }
}

.theme-zhanshi {
  .layout-bg-purple {
    background: red;
  }
}
</style>
