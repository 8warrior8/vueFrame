<template>
  <el-menu
    :default-active="this.$route.name"
    router
    unique-opened
    class="el-menu-vertical-demo"
    text-color="#3C3F41"
    active-text-color="black">
    <!--加上router 才能实现跳转-->
    <navMenu :navMenus="this.$store.getters['userInfo/getMenuList']"></navMenu>
  </el-menu>
</template>

<script>
import NavMenu from "./navMenu.vue";
export default {
  name: "NavMenuRoot",
  data() {
    return {};
  },
  components: {
    navMenu: NavMenu
  },
  methods: {}
};
</script>

<style>
</style>