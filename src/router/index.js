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
    }, {
      path: '/home',
      name: 'home-view',
      component: HomeView,
      meta: {
        requireAuth: false
      }
    }],

  getRoutesByDynamics: function (_self, params) {
    _self.$store.dispatch("loginUserInfo", params).then(res => {
      var tempUenuList = [];
      var tempRouterRoot = this.gerRouterInfoByRoot();
      this.getHomeMenuOrRouterList(res, tempUenuList, tempRouterRoot.children);
      tempUenuList.push({
        id: 999,
        menuName: "关于",
        value: "/about",
        templateName: "about-view",
        url: "loginViews/about.vue",
        visible: true,
        imgSrc: "el-icon-share",
        imgClickSrc: "",
        operationId: "",
        isChildViews: false,
        childViews: null
      });
      _self.$store.commit("setMenuList", tempUenuList);
      _self.$store.commit("setUserRouterMain", [tempRouterRoot]);
      _self.$router.addRoutes([tempRouterRoot]);
    });
  },

  //获取主功能页面路由信息
  gerRouterInfoByRoot: function () {
    var tempRoot = {
      path: "/",
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

  //获取需要显示的菜单集合
  getHomeMenuOrRouterList: function (res, menuList, routerList) {
    var self = this;
    var menuJson = require("../configs/systemMenus.json");
    menuJson.forEach(function (item, index) {
      if (item.visible === true && res.userMemuList.includes(Number(item.operationId))) {
        //获取路由信息集合
        self.getRouterChilds(item, routerList);
        //获取菜单数据集合
        var tempId = 100 + index;
        var tempMenuItem = self.getHomeMenuModel(tempId, item);
        if (item.childViews && item.childViews.length > 0) {
          self.getHomeMenuChilds(item.childViews, res.userMemuList, tempId, tempMenuItem.childViews, routerList);
        } else {
          tempMenuItem.childViews = null;
          tempMenuItem.isChildViews = false;
        }
        menuList.push(tempMenuItem);
      }
    });
  },

  //递归调用获取子目录下的菜单
  getHomeMenuChilds: function (jsonList, currIdList, currId, list, routerList) {
    var self = this;
    if (jsonList.length > 0) {
      jsonList.forEach(function (item, index) {
        if (item.visible === true && currIdList.includes(Number(item.operationId))) {
          //获取路由信息集合
          self.getRouterChilds(item, routerList);
          //获取菜单数据集合
          var tempId = currId * 1000 + 100 + index;
          var tempMenuItem = self.getHomeMenuModel(tempId, item);
          if (item.childViews && item.childViews.length > 0) {
            self.getHomeMenuChilds(item.childViews, currIdList, tempId, tempMenuItem.childViews, routerList);
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

  getRouterChilds: function (item, routerList) {
    var self = this;
    var routerModel = self.getRouterInfo(item);
    var isCheckItem = routerList.find(function (routeItem) {
      if (routeItem.path === routerModel.path) {
        return routeItem;
      }
      return null;
    });
    if (!isCheckItem) {
      routerList.push(routerModel);
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
