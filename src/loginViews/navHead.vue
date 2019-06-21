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
      <el-dropdown trigger="click"  @command="changeColor">
        <span class="el-dropdown-link">
          换肤
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="default">浅色版</el-dropdown-item>
          <el-dropdown-item command="zhanshi">深色版</el-dropdown-item>
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
    this.sysImage = "../static/system/" + this.$environmentCfg.configs.sysImgUrl;
    //this.changeColor(this.$environmentCfg.configs.theme)
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
    changeColor:function(theme){
      document.getElementById('app').className ='theme-'+theme ;
      this.$store.commit("systemChange/setStyleChange",theme);
    }
  }
};
</script>

<style lang="stylus">
  @import "../styles/global.styl";
  .theme-default
    theme($bg-color-light,$color-light);


  .theme-zhanshi
    theme($bg-color-dark,$color-dark);

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
</style>
