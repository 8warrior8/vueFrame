<template>
  <el-container style="height: 100%;">
    <el-header height="50px">
      <div>
        <img :src="sysImage" style="height:40px">
        <button v-on:click="btnOpenClick(isCollapse)">{{openOrCloseName}}</button>
        <span>暂时没有使用的区域</span>
        <img :src="this.$store.getters.getUserImageRul" style="height:40px; width:40px">
        <span>{{this.$store.getters.getUserName}}</span>
        <button v-on:click="btnLogOutClick">注销</button>
      </div>
    </el-header>

    <el-container style="heigth:100%;">
      <el-aside>
        <el-menu
          :default-active="this.$route.name"
          router
          unique-opened
          class="el-menu-vertical-demo"
          text-color="#3C3F41"
          active-text-color="black"
        >
          <!--加上router 才能实现跳转-->
          <navMenu :navMenus="this.$store.getters.getMenuList"></navMenu>
        </el-menu>
      </el-aside>
      <el-main style="width: 100%;height: 100%;">
        <transition name="slide-right">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>

    <el-footer height="20px" style="background-color: #B3C0D1">底部区域</el-footer>
  </el-container>
</template>

<script>
//import { mapGetters } from "vuex"; //map简化写法
import { requestLoginOut } from "../service/userLoginAjax";
import NavMenu from "./navMenu.vue";
export default {
  data() {
    return {
      menuList: [],
      sysImage: "", // 系统首页图片
      isCollapse: false,
      openOrCloseName: "展开"
    };
  },
  name: "Main-view",
  components: {
    navMenu: NavMenu
  },
  created: function() {
    this.sysImage =
      "../static/system/" + this.$environmentCfg.configs.sysImgUrl;
  },
  methods: {
    //注销系统
    btnLogOutClick: function() {
      var self = this;
      var params = { tokenKey: localStorage.getItem("currUserTokenKey") };
      this.$store.dispatch("logOut", params).then(res => {
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
    }
  },
  watch: {},
  computed: {
    //...mapGetters(["getMenuList", "getUserName", "getUserImageRul"])
  },
  mounted() {
    var j = 0;
  }
};
</script>


<style>
.menu-collapsed {
  flex: 0 0 60px;
  width: 60px;
}
.menu-expanded {
  flex: 0 0 230px;
  width: 230px;
}

.my-link {
  display: flex;
}
.my-link h3 {
  padding: 0px 10px;
  cursor: pointer;
}
.my-link h3:hover {
  color: red;
}
.link-active {
  color: yellow;
  background: #2c3e50;
}
.router-link-active {
  color: red;
}
</style>
