<template>
  <div class="gcss-middle-group-body">
    <div class="gcss-middle-group-left">
      <img
        v-if="showPrevBtn===true"
        v-on:click="leftButton()"
        class="gcss-middle-group-left-img"
        src="../../../static/gcss_general_view/group_arrow.png"
      />
    </div>
    <div class="gcss-middle-group-content">
      <div
        class="gcss-middle-group-item"
        v-for="(item, i) in allGroupInfo"
        :key="i"
        v-on:click="groupClick(item)"
      >
        <gcssMiddleGroupItem :ref="'groupItem' + i" :groupItem="item"></gcssMiddleGroupItem>
      </div>
    </div>
    <div class="gcss-middle-group-right">
      <img
        v-if="showNextBtn===true"
        v-on:click="rightButton()"
        class="gcss-middle-group-right-img"
        src="../../../static/gcss_general_view/group_arrow.png"
      />
    </div>
  </div>
</template>


<script>
import "./gcss_general_view.css";
import GcssMiddleGroupItem from "./gcss_middle_group_item.vue";
import { getGroupItemInfo } from "../../service/gcssGeneralViewAjax";
export default {
  name: "gcssMiddleGroup",
  data() {
    return {
      currRegionList: [],
      allGroupInfos: [],
      allGroupInfo: [],
      showPrevBtn: false,
      showNextBtn: false,
      startIndex: 0,
      endIndex: 4
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
    "$store.state.systemChange.Style_Change": function(styleName) {}
  },

  components: {
    gcssMiddleGroupItem: GcssMiddleGroupItem
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
      getGroupItemInfo(param).then(data => {
        this.getMiddleGroupInfoCompleted(data);
      });
    },

    //重保组组信息数据获取
    getMiddleGroupInfoCompleted: function(objList) {
      this.allGroupInfos = objList;
      this.showPageItem(this.startIndex, this.endIndex);
    },

    showPageItem: function(startIndex, endIndex) {
      var pageList = this.allGroupInfos.slice(startIndex, endIndex);
      this.allGroupInfo = pageList;
      if (startIndex === 0) {
        this.showPrevBtn = false;
      } else {
        this._showPrevBtn = true;
      }
      if (endIndex >= this.allGroupInfos.length) {
        this.showNextBtn = false;
      } else {
        this.showNextBtn = true;
      }
    },

    //上一个按钮
    leftButton: function() {
      this.endIndex = this.endIndex - 1;
      this.startIndex = this.startIndex - 1;
      this.showPageItem(this.startIndex, this.endIndex);
    },

    //下一个按钮
    rightButton: function() {
      this.endIndex = this.endIndex + 1;
      this.startIndex = this.startIndex + 1;
      this.showPageItem(this.startIndex, this.endIndex);
    },

    //分组单击处理
    groupClick: function(item) {
      var j = 0;
      //this.sendAction('groupClick', item);
    }
  }
};
</script>

<style lang="stylus" scoped>
.gcss-middle-group-body {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.gcss-middle-group-left {
  width: 20px;
  height: 20px;
  position: relative;
}

.gcss-middle-group-left-img {
  cursor: pointer;
  width: 18px;
  height: 13px;
  transform: rotate(270deg);
}

.gcss-middle-group-item {
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
}

.gcss-middle-group-item>div {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background: #F6F6F6;
}

.gcss-middle-group-content {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  align-items: center;
}

.gcss-middle-group-right {
  width: 20px;
  height: 20px;
  position: relative;
}

.gcss-middle-group-right-img {
  cursor: pointer;
  width: 18px;
  height: 13px;
  transform: rotate(90deg);
}

.theme-default {
}

.theme-zhanshi {
}
</style>