<template>
  <div class="gcss-group-item-body">
    <img class="gcss-group-item-star" src="../../../static/gcss_general_view/u4636.png" />
    <br />
    <span>{{currGroupItem.group_name}}</span>
    <br />
    <span>时间：</span>
    <span>{{currGroupItem.strTime}}</span>
    <br />
    <img src="../../../static/gcss_general_view/u4638.png" />
    <br />
    <span>客户数：</span>
    <span :style="{color: currGroupItem.alarmBackColor}">{{currGroupItem.clientAlarmSum}}</span>
    <span>/</span>
    <span>{{currGroupItem.clientAllSum}}</span>
    <br />
    <span>专线数：</span>
    <span :style="{color: currGroupItem.alarmBackColor}">{{currGroupItem.serviceAlarmSum}}</span>
    <span>/</span>
    <span>{{currGroupItem.serviceAllSum}}</span>
  </div>
</template>


<script>
import "./gcss_general_view.css";
export default {
  name: "gcssMiddleGroupItem",
  props: ["groupItem"],
  data() {
    return {
      currGroupItem: {}
    };
  },

  //数据回收方法
  destroyed: function() {},

  watch: {
    //页面大小发生变化时触发该处理
    "$store.state.systemChange.Page_Size_Change": function(param) {
      //this.pageWidth = param.width;
      //this.pageHeight = param.height;
    },
    //系统主题样式变化时触发该处理
    "$store.state.systemChange.Style_Change": function(styleName) {},

    groupItem: {
      handler(newVal) {
        if (this.groupItem) {
          this.setCurrGroupInfo();
        }
      },
      deep: true,
      immediate: true
    }
  },

  components: {},

  methods: {
    //设置重保组信息到页面
    setCurrGroupInfo: function() {
      if (this.groupItem) {
        var tempItem1 = {};
        tempItem1.group_id = this.groupItem.group_id;
        tempItem1.group_name = this.groupItem.group_name;
        tempItem1.effect_time = this.groupItem.effect_time;
        tempItem1.close_time = this.groupItem.close_time;
        tempItem1.group_type_id = this.groupItem.group_type_id;
        tempItem1.clientAllSum = 0;
        tempItem1.clientAlarmSum = 0;
        tempItem1.serviceAllSum = 0;
        tempItem1.serviceAlarmSum = 0;
        tempItem1.alarmLevel = 5;
        tempItem1.alarmColor = this.$comUtil.getAlarmFontColorByLevel(5);
        tempItem1.alarmBackColor = this.$comUtil.getAlarmColorByLevel(
          5,
          "black"
        );
        tempItem1.strTime = "长期有效";
        if (this.groupItem.effect_time && this.groupItem.close_time) {
          tempItem1.strTime =
            this.groupItem.effect_time + "--" + this.groupItem.close_time;
        }
        this.currGroupItem = tempItem1;
      }
    }
  }
};
</script>
<style>
.gcss-group-item-star {
  width: 34px;
  height: 34px;
}

.gcss-group-item-body {
  width: 140px;
  height: 120px;
  text-align: center;
  position: relative;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.gcss-group-item-body > img:nth-of-type(2) {
  width: 92%;
}

.gcss-group-item-body > span:nth-of-type(1) {
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
  font-weight: 700;
  font-style: normal;
  font-size: 12px;
  color: #258fd0;
}

.gcss-group-item-body > span:nth-of-type(2),
.gcss-group-item-body > span:nth-of-type(3) {
  color: #797979;
}

.gcss-group-item-body > span:nth-last-of-type(1),
.gcss-group-item-body > span:nth-last-of-type(5) {
  color: #247fe8;
}

.gcss-group-item-body > span:nth-last-of-type(3),
.gcss-group-item-body > span:nth-last-of-type(7) {
  padding: 0 5px;
  border-radius: 3px;
}
</style>

<style lang="stylus" scoped>
.theme-default {
}

.theme-zhanshi {
}
</style>