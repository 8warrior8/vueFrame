<template>
  <el-menu
    :collapse="isMenuOpen"
    :default-active="this.$route.name"
    router
    unique-opened
    class="el-menu-vertical-demo"
    text-color="#3C3F41"
    active-text-color="black"
  >
    <template v-for="navMenu in this.$store.getters['userInfo/getMenuList']">
      <template v-if="navMenu.childViews==null">
        <el-menu-item
          :key="navMenu.id"
          :data="navMenu"
          :index="navMenu.templateName"
          :route="navMenu.value"
          v-on:click.stop.native="gotoMenuFirst(navMenu.value, '1')"
        >
          <template>
            <i :class="navMenu.imgSrc"></i>
            <span slot="title" class="item_title">{{navMenu.menuName}}</span>
          </template>
        </el-menu-item>
      </template>
      <template v-if="navMenu.childViews">
        <el-submenu
          :key="navMenu.id"
          :data="navMenu"
          :index="navMenu.templateName"
          v-on:click.stop.native="gotoMenuFirst(navMenu.value, '0')"
        >
          <template slot="title">
            <i :class="navMenu.imgSrc"></i>
            <span slot="title" class="item_title">{{navMenu.menuName}}</span>
          </template>
          <navMenu :navMenus="navMenu.childViews"></navMenu>
        </el-submenu>
      </template>
    </template>
  </el-menu>
</template>

<script>
import NavMenu from "./navMenu.vue";
export default {
  name: "NavMenuRoot",
  data() {
    return {
      isMenuOpen: false
    };
  },
  components: {
    navMenu: NavMenu
  },
  methods: {
    setMenuCollapseStatus: function(isOpen) {
      this.isMenuOpen = isOpen;
    },

    gotoMenuFirst: function(templateName, type) {
      if (templateName && templateName.length > 0 && type && type === "0") {
        this.$router.push({ path: templateName });
      }
    }
  }
};
</script>

<style scoped>
.el-submenu .el-submenu__title {
  text-align: left !important;
}
* {
  outline: none;
}
</style>