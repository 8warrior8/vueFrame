<template>
  <div class="navMenu">
    <div v-for="(navMenu) in navMenus" :key="navMenu.id">
      <el-menu-item
        v-if="navMenu.childViews==null"
        :key="navMenu.id"
        :data="navMenu"
        :index="navMenu.templateName"
        :route="navMenu.value"
      >
        <template>
          <i :class="navMenu.imgSrc"></i>
          <span slot="title" class="item_title">{{navMenu.menuName}}</span>
        </template>
      </el-menu-item>

      <el-submenu
        v-if="navMenu.childViews"
        :key="navMenu.id"
        :data="navMenu"
        :index="navMenu.templateName"
      >
        <template slot="title">
          <i :class="navMenu.imgSrc"></i>
          <span slot="title" class="item_title">{{navMenu.menuName}}</span>
        </template>
        <NavMenu :navMenus="navMenu.childViews"></NavMenu>
      </el-submenu>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  props: ["navMenus"],
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style>
.el-submenu .el-submenu__title {
  text-align: left !important;
}
.el-submenu .el-submenu__title .el-icon-arrow-right{
  display: none !important;
}
</style>
