<template>
  <div>
    <span>用户名称：</span>
    <input type="text" v-model="userName" placeholder="输入用户名称">
    <br>
    <span>用户密码：</span>
    <input type="text" v-model="userPassWord" placeholder="输入用户密码">
    <br>
    <button v-on:click="btnLoginClick">登录</button>
    <button v-on:click="btnCancelClick">取消</button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      userName: "zhangguoyin",
      userPassWord: "111111"
    };
  },
  name: "login-view",
  components: {},
  created: function() {
    localStorage.setItem("currUserName", "");
    localStorage.setItem("currUserTokenKey", "");
  },

  beforeDestroy: function() {},

  methods: {
    //登录按钮处理逻辑
    btnLoginClick: function() {
      var self = this;
      var strErr = this.isCheckInput();
      if (!strErr) {
        var tempUserName = this.passWordEncryption(this.userName);
        var tempPassWord = this.passWordEncryption(this.userPassWord);
        var params = { username: tempUserName, password: tempPassWord };
        this.$store.dispatch("login", params).then(res => {
          localStorage.setItem("currUserName", res.userName);
          localStorage.setItem("currUserTokenKey", res.tokenKey);
          var params = { tokenKey: res.tokenKey };
          self.$router.options.getRoutesByDynamics(self, params, function() {
            self.$router.replace({ path: "home-view" });
          });
        });
      }
    },

    //取消按钮处理逻辑
    btnCancelClick: function() {
      localStorage.setItem("currUserName", "");
      localStorage.setItem("currUserTokenKey", "");
      this.userName = "";
      this.userPassWord = "";
    },

    isCheckInput: function() {
      return null;
    },

    //密码加密处理，返回密文
    passWordEncryption: function(pasWord) {
      return pasWord;
    }
  },
  watch: {},
  computed: {},
  mounted() {}
};
</script>

<style>
</style>