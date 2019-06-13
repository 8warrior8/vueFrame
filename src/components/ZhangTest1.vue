<template>
  <div>{{pagePara}}:{{this.$router.path}}</div>
</template>

<script>
import { requestBookInfo } from "../service/userLoginAjax";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      pagePara: "",
      isCollapse: false
    };
  },
  created: function() {
    this.pagePara = this.$route.meta.defaultFilterId;
  },

  beforeRouteLeave(to, from, next) {
    this.pagePara = to.meta.defaultFilterId;
    next();
  },

  methods: {}
};
</script>