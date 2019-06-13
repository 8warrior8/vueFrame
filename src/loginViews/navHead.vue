<template>
  <div>
    <div>
      <img :src="sysImage" style="height:40px">
      <i class="el-icon-s-fold" v-if="!isCollapse" @click="btnOpenClick(isCollapse)"></i>
      <i class="el-icon-s-unfold" v-else @click="btnOpenClick(isCollapse)"></i>
    </div>

    <div>
      <img :src="this.$store.getters['userInfo/getUserImageRul']" style="height:24px; width:24px">
      <span>{{this.$store.getters['userInfo/getUserName']}}</span>
      <i class="el-icon-switch-button" @click="btnLogOutClick"></i>
      <el-dropdown>
        <span class="el-dropdown-link">
          换肤
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-circle-check-outline" @click="changColor(light)">浅色版</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-check-outline" @click="changColor(dark)">深色版</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
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
    },
    changColor:function(theme){
      require('../styles/global.styl');
      debugger;
      //this.$store.commit("systemChange/setStyleChange",theme);
      //this.$environmentCfg.configs.themes
    }
  }
};
</script>

<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
</style>
