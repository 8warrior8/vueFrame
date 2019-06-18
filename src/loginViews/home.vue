<template>
  <el-container style="height: 100%;">
    <el-header height="51px">
      <navHead v-on:btnMenuChange="btnMenuChange"></navHead>
    </el-header>

    <el-container style="heigth:100%;">
      <el-aside ref="pageLeft1" v-bind:class="elAsideMenuStyle">
        <navMenuRoot ref="menu1"></navMenuRoot>
      </el-aside>
      <el-main style="width: 100%;height: 100%;">
        <transition name="slide-right">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>

    <el-footer height="40px">
      <navFooter></navFooter>
    </el-footer>
  </el-container>
</template>

<script>
import NavHead from "./navHead.vue";
import NavMenuRoot from "./navMenuRoot.vue";
import NavFooter from "./navFooter.vue";
export default {
  data() {
    return {
      elAsideMenuStyle: "el-aside-menu-open"
    };
  },
  name: "Main-view",
  components: {
    navMenuRoot: NavMenuRoot,
    navHead: NavHead,
    navFooter: NavFooter
  },
  created: function() {},
  methods: {
    btnMenuChange: function(isOpen) {
      this.$store.commit("systemChange/setIsMenuOpen", isOpen);
      if (isOpen === true) {
        this.elAsideMenuStyle = "el-aside-menu-close";
      } else {
        this.elAsideMenuStyle = "el-aside-menu-open";
      }
    }
  },
  watch: {},
  computed: {},
  mounted() {
    var self = this;
    window.onresize = function() {
      let tempWidth = 0;
      let tempHeight = 0;
      if (document.documentElement.clientWidth) {
        tempWidth = Number(document.documentElement.clientWidth);
      }
      if (document.documentElement.clientHeight) {
        tempHeight = Number(document.documentElement.clientHeight);
      }
      self.$store.commit("systemChange/setPageSizeChange", {
        width: tempWidth,
        height: tempHeight
      });
    };
  }
};
</script>


<style scoped>
.el-header {
  display: flex;
  align-items: center;
}
.el-header > div {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-header > div > div {
  display: flex;
  align-items: center;
}
.el-header > div > div:nth-of-type(1) > i {
  margin-left: 125px;
}
.el-header > div > div > i:hover {
  opacity: 0.5;
  cursor: pointer;
}
.el-header > div > div:nth-of-type(2) {
  width: 180px;
  justify-content: space-around;
}
.el-container {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.el-menu {
  border: none;
}
.el-menu--collapse {
  width: 50px;
}
.el-aside {
  border-right: 1px solid #ccc;
}
.el-footer {
  background: #b3c0d1;
  font-family: "Microsoft YaHei";
  font-size: 12px;
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-aside-menu-open {
  width: 200px !important;
}
.el-aside-menu-close {
  width: 51px !important;
}
</style>
