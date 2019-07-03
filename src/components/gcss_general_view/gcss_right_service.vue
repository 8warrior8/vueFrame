<template>
  <div class="gcss-right-service-body">
      业务表格
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
    };
  },

  //数据回收方法
  destroyed: function() {},

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
    initUiStart: function() {}
  }
};
</script>

<style scoped>
.gcss-right-service-body{
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 5px;
}
</style>
<style lang="stylus" scoped>
.theme-default {
}

.theme-zhanshi {
}
</style>