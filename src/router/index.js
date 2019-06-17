import Vue from 'vue'
import Router from 'vue-router'
import LoginView from '@/loginViews/login.vue'
import HomeView from '@/loginViews/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'login-view'
      }
    }, {
      path: '/login',
      name: 'login-view',
      component: LoginView,
      meta: {
        requireAuth: false
      },
    }],

  getRoutesByDynamics: function (_self, params, callback) {
    _self.$store.dispatch("userInfo/loginUserInfo", params).then(res => {
      var tempUenuList = [];
      var tempRouterNameList = ["home-view", "404", "about-view"];
      var tempRouterRoot = this.getRouterInfoByRoot();
      this.getHomeMenuOrRouterList(res, tempUenuList, tempRouterRoot.children, tempRouterNameList);
      this.setOtherRouterInfo(tempUenuList);
      _self.$store.commit("userInfo/setMenuList", tempUenuList);
      _self.$store.commit("userInfo/setUserRouterMain", [tempRouterRoot]);
      _self.$store.commit("userInfo/setUserRouterNameList", tempRouterNameList);
      _self.$router.addRoutes([tempRouterRoot]);
      if (callback) {
        callback();
      }
    });
  },

  //添加系统其他路由信息
  setOtherRouterInfo: function (list) {
    list.push({
      id: 999,
      menuName: "关于",
      value: "/about-view",
      templateName: "about-view",
      url: "loginViews/about.vue",
      visible: true,
      imgSrc: "el-icon-share",
      imgClickSrc: "",
      operationId: "",
      isChildViews: false,
      childViews: null
    });
  },

  //获取主功能页面路由信息
  getRouterInfoByRoot: function () {
    var tempRoot = {
      path: "/home-view",
      name: "home-view",
      component: () => import("@/loginViews/home.vue"),
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: "/404",
          name: "404",
          component: () => import("@/loginViews/404.vue"),
          meta: {
            requireAuth: false
          }
        },
        {
          path: "/about-view",
          name: "about-view",
          component: () => import("@/loginViews/about.vue"),
          meta: {
            requireAuth: false
          }
        }, {
          path: '*',
          redirect: {
            name: 'error404-view'
          }
        }
      ]
    };
    return tempRoot;
  },

  //获取需要显示的菜单集合
  getHomeMenuOrRouterList: function (res, menuList, routerList, routerNameList) {
    var self = this;
    var menuJson = require("../configs/systemMenus.json");
    menuJson.forEach(function (item, index) {
      if (item.visible === true && (!item.operationId || (item.operationId && res.userMemuList.includes(Number(item.operationId))))) {
        //获取路由信息集合
        self.getRouterChilds(item, routerList, routerNameList);
        //获取菜单数据集合
        var tempId = 100 + index;
        var tempMenuItem = self.getHomeMenuModel(tempId, item);
        if (item.childViews && item.childViews.length > 0) {
          self.getHomeMenuChilds(item.childViews, res.userMemuList, tempId, tempMenuItem.childViews, routerList, routerNameList);
        } else {
          tempMenuItem.childViews = null;
          tempMenuItem.isChildViews = false;
        }
        menuList.push(tempMenuItem);
      }
    });
  },

  //递归调用获取子目录下的菜单
  getHomeMenuChilds: function (jsonList, currIdList, currId, list, routerList, routerNameList) {
    var self = this;
    if (jsonList.length > 0) {
      jsonList.forEach(function (item, index) {
        if (item.visible === true && (!item.operationId || (item.operationId && currIdList.includes(Number(item.operationId))))) {
          //获取路由信息集合
          self.getRouterChilds(item, routerList, routerNameList);
          //获取菜单数据集合
          var tempId = currId * 1000 + 100 + index;
          var tempMenuItem = self.getHomeMenuModel(tempId, item);
          if (item.childViews && item.childViews.length > 0) {
            self.getHomeMenuChilds(item.childViews, currIdList, tempId, tempMenuItem.childViews, routerList, routerNameList);
          } else {
            tempMenuItem.childViews = null;
            tempMenuItem.isChildViews = false;
          }
          list.push(tempMenuItem);
        }
      });
    }
  },

  getHomeMenuModel: function (tempId, item) {
    var tempMenuItem = {
      id: tempId,
      menuName: item.menuName,
      value: "/" + item.templateName,
      templateName: item.templateName,
      url: item.url,
      visible: item.visible,
      imgSrc: item.imgSrc,
      imgClickSrc: item.imgClickSrc,
      operationId: item.operationId,
      isChildViews: true,
      childViews: [],
    };
    return tempMenuItem;
  },

  getRouterChilds: function (item, routerList, routerNameList) {
    var self = this;
    if (item.url && item.url.length > 0) {
      var routerModel = self.getRouterInfo(item);
      var isCheckItem = routerList.find(function (routeItem) {
        if (routeItem.path === routerModel.path) {
          return routeItem;
        }
        return null;
      });
      if (!routerNameList.includes(item.templateName)) {
        routerNameList.push(item.templateName);
      }
      if (!isCheckItem) {
        routerList.push(routerModel);
      }
    }
  },

  //获取单个路由信息
  getRouterInfo: function (itemJson) {
    var tempRouter = {
      path: "/" + itemJson.templateName,
      component: () => import("@/" + itemJson.url),
      name: itemJson.templateName,
      props: true,
      meta: {}
    };
    if (itemJson.parameters) {
      tempRouter.meta = itemJson.parameters;
    }
    tempRouter.meta.requireAuth = false;
    return tempRouter;
  },
})
