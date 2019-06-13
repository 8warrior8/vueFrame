import { requestLogin, requestLoginOut, requestUserInfo } from '../../service/userLoginAjax'
const userInfo = {
	//namespaced: true,
	state: {
		userName: '',
		userTel: '',
		userImageRul: "",
		userMemuList: [],//用户菜单权限
		operList: [],//用户操作权限
		menuList: [],	//用户需要显示的菜单列表
		userRouterMain: [],	//系统主路由信息
	},
	getters: {
		getUserName: state => {
			return state.userName
		},
		getUserTel: state => {
			return state.userTel
		},
		getUserMemuList: state => {
			return state.userMemuList
		},
		getOperList: state => {
			return state.operList
		},
		getMenuList: state => {
			return state.menuList
		},
		getUserRouterMain: state => {
			return state.userRouterMain
		},
		getUserImageRul: state => {
			return state.userImageRul
		},
	},
	mutations: {
		setUserName(state, v) {
			state.userName = v
		},
		setUserTel(state, v) {
			state.userTel = v
		},
		setUserMemuList(state, v) {
			state.userMemuList = v
		},
		setOperList(state, v) {
			state.operList = v
		},
		setMenuList(state, v) {
			state.menuList = v
		},
		setUserRouterMain(state, v) {
			state.userRouterMain = v
		},
		setUserImageRul(state, v) {
			var tempUrl = "../static/system/user_default.png";
			if (v && v.length > 0) {
				tempUrl = "../static/system/" + v;
			}
			state.userImageRul = tempUrl
		},
	},
	actions: {
		// 用户名登录
		login({ commit }, param) {
			return new Promise((resolve, reject) => {
				requestLogin(param).then((data) => {
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},

		//获取用户登录对应的权限信息
		loginUserInfo({ commit, state }, param) {
			return new Promise((resolve, reject) => {
				requestUserInfo(param).then((data) => {
					commit('setUserName', data.userName)
					commit('setUserTel', data.userTel)
					commit('setUserMemuList', data.userMemuList)
					commit('setOperList', data.operList)
					commit('setMenuList', [])
					commit('setUserRouterMain', [])
					commit('setUserImageRul', data.userImgUrl)
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},


		// 登出
		logOut({ commit, state }, param) {
			return new Promise((resolve, reject) => {
				requestLoginOut(param).then(() => {
					commit('setUserName', '')
					commit('setUserTel', '')
					commit('setUserMemuList', [])
					commit('setOperList', [])
					commit('setMenuList', [])
					commit('setUserRouterMain', [])
					commit('setUserImageRul', '')
					localStorage.removeItem('currUserName');
					localStorage.removeItem('currUserTokenKey');
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		}

	}
}
export default userInfo