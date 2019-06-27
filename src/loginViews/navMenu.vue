<template>
  <div>
    <template v-for="(navMenu) in navMenus">
      <el-menu-item
        v-if="navMenu.childViews==null"
        :key="navMenu.id + ''"
        :data="navMenu"
        :index="navMenu.templateName"
        :route="navMenu.value"
        v-on:click.stop.native="gotoMenuLast(navMenu.value, '1')"
      >
        <template>
          <i :class="navMenu.imgSrc"></i>
          <span slot="title" class="item_title">{{navMenu.menuName}}</span>
        </template>
      </el-menu-item>

      <el-submenu
        v-if="navMenu.childViews"
        :key="navMenu.id + ''"
        :data="navMenu"
        :index="navMenu.templateName"
        v-on:click.stop.native="gotoMenuLast(navMenu.value, '0')"
      >
        <template slot="title">
          <i :class="navMenu.imgSrc"></i>
          <span slot="title" class="item_title">{{navMenu.menuName}}</span>
        </template>
        <NavMenu :navMenus="navMenu.childViews"></NavMenu>
      </el-submenu>
    </template>
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
  methods: {
    gotoMenuLast: function(templateName, type) {
      if (templateName && templateName.length > 0 && type && type === "0") {
        this.$router.push({ path: templateName });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>

</style>
