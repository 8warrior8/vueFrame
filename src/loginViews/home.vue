<template>
  <el-container style="height: 100%;">
    <el-header height="50px">
      <navHead></navHead>
    </el-header>

    <el-container style="heigth:100%;">
      <el-aside>
        <navMenuRoot></navMenuRoot>
      </el-aside>
      <el-main style="width: 100%;height: 100%;">
        <transition name="slide-right">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>

    <el-footer height="20px" style="background-color: #B3C0D1">
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
    return {};
  },
  name: "Main-view",
  components: {
    navMenuRoot: NavMenuRoot,
    navHead: NavHead,
    navFooter: NavFooter
  },
  created: function() {},
  methods: {},
  watch: {},
  computed: {},
  mounted() {}
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
