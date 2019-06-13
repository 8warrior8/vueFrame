<template>
  <div>
    <img :src="sysImage" style="height:40px">
    <button v-on:click="btnOpenClick(isCollapse)">{{openOrCloseName}}</button>
    <span>暂时没有使用的区域</span>
    <img :src="this.$store.getters['userInfo/getUserImageRul']" style="height:40px; width:40px">
    <span>{{this.$store.getters['userInfo/getUserName']}}</span>
    <span>换肤按钮 this.$environmentCfg.configs.themes</span>
    <button v-on:click="btnLogOutClick">注销</button>
  </div>
</template>

<script>
//import { mapGetters } from "vuex"; //map简化写法
import { requestLoginOut } from "../service/userLoginAjax";
export default {
  name: "NavHead",
  data() {
    return {
      sysImage: "", // 系统首页图片
      isCollapse: false,
      openOrCloseName: "展开"
    };
  },
  components: {},

  mounted() {
    this.sysImage =
      "../static/system/" + this.$environmentCfg.configs.sysImgUrl;
  },
  methods: {
    //注销系统
    btnLogOutClick: function() {
      var self = this;
      var params = { tokenKey: localStorage.getItem("currUserTokenKey") };
      this.$store.dispatch("userInfo/logOut", params).then(res => {
        location.reload(); //重新刷新页面，清除路由等数据信息
      });
    },
    //展开或者收缩
    btnOpenClick: function(isOpen) {
      if (isOpen === false) {
        this.openOrCloseName = "展开";
      } else {
        this.openOrCloseName = "收缩";
      }
      this.isCollapse = !isOpen;
      this.$emit('btnMenuChange', this.isCollapse);
    }
  }
};
</script>

<style>
</style>