// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Environment from './configs/environment.js'  //系统环境变量设置
import Axios from 'axios'
import store from './store'  //vuex中使用store
import ElementUI from 'element-ui';         //引入element-ui组件库
import 'element-ui/lib/theme-chalk/index.css'; //引入element-ui组件库


import Mock from './mock'  //引入mock数据，关闭则注释该行
Mock.bootstrap()    //引入mock数据，关闭则注释该行

Vue.config.productionTip = false
Vue.prototype.$environmentCfg = Environment  //加载系统环境变量相关数据信息
Vue.prototype.$axios = Axios    //引入axios相关处理能力
Vue.use(ElementUI);

//路由守护，确保有效路由可以执行
router.beforeEach((to, from, next) => {
  axiosPromiseArr.forEach((ele, index) => {
    ele.cancel();
    delete axiosPromiseArr[index];
  });
  var userName = localStorage.getItem("currUserName");
  var isLogin = false;
  if (userName) {
    isLogin = true;
  }
  if (isLogin === true && to.path == '/login') {      // 登录成功
    //需要清除缓存中的用户信息
    localStorage.setItem("currUserName", "");
    localStorage.setItem("currUserTokenKey", "");
    next();
    return false;
  }
  if (isLogin === false) {
    next();
  } else {
    if (to.path) {                   // 有此路径
      next()
    } else {                        // 无此路径
      next({ path: '/404' })
    }
  }
});

//Axios请求拦截器相关处理
var axiosPromiseArr = []; //储存cancel token// 添加请求拦截器，在请求头中加token
Axios.interceptors.request.use(
  config => {
    let tokenKey = "";
    if (config.url != "/logIn") {
      tokenKey = localStorage.getItem('currUserTokenKey');;  //需要通过localStorage中获取服务端Key
    }
    config.baseURL = '/api/'
    config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
    config.timeout = 2500
    config.headers = {
      'access-token': tokenKey,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    config.cancelToken = new Axios.CancelToken(cancel => {
      axiosPromiseArr.push({ cancel })
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
);

Axios.interceptors.response.use(
  response => {
    // response.status 服务端返回成功，否则为失败
    if (response.status != 200 || (response.data && response.data.code && response.data.code != 200)) {
      // Message.error({
      //     message: "用户未登录，请退出重新登录！"
      // })
      var params = { tokenKey: localStorage.getItem("currUserTokenKey") };
      store.dispatch('userInfo/logOut', params).then((data) => {
        router.replace({ path: '/login' });
      })
    }
    return response.data
  },
  error => {
    return Promise.reject(error)
    if (axios.isCancel(error)) {
      console.log('请求取消')
    } else {
      router.replace({
        path: '404',
        query: { message: error }
      });
    }
  }
);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  //components: { App },
  render: h => h(App),
  template: '<App/>',

  created: function () {
    this.setUiTitleByConfig();
    var isLogin = this.getUserIsLogIn();
    if (isLogin === false) {
      this.$router.replace({ path: '/login' });
    } else {
      var params = { tokenKey: localStorage.getItem("currUserTokenKey") };
      this.$router.options.getRoutesByDynamics(this, params, null);
    }
  },

  methods: {
    setUiTitleByConfig: function () {
      if (this.$environmentCfg.configs.language === 'zh') {
        window.document.title = this.$environmentCfg.configs.title.zh;
      } else {
        window.document.title = this.$environmentCfg.configs.title.en;
      }
    },

    //判断用户是否登录 true 登录  FALSE 没有登录
    getUserIsLogIn: function () {
      var userName = localStorage.getItem("currUserName");
      if (userName) {
        return true;
      } else {
        return false
      }
    },

    //获取主功能页面路由信息
    gerRouterInfoByRoot: function () {
      var tempRoot = {
        path: "/home",
        name: "home-view",
        component: () => import("@/loginViews/home.vue"),
        meta: {
          requireAuth: true
        },
        children: [
          {
            path: "/404",
            name: "error404-view",
            component: () => import("@/loginViews/404.vue"),
            meta: {
              requireAuth: false
            }
          },
          {
            path: "/about",
            name: "about-view",
            component: () => import("@/loginViews/about.vue"),
            meta: {
              requireAuth: false
            }
          }
        ]
      };
      return tempRoot;
    },
  },
})
