import Vue from 'vue'
import Vuex from 'vuex'
import M1 from './modules/m1.js'
import M2 from './modules/m2.js'
import UserInfo from './modules/userInfo.js'

// 使用vuex
Vue.use(Vuex) 

// vuex的标准写法
const store = new Vuex.Store({
	//namespaced写成true，意思就是可以用这个module名作为区分了（也就是module所在的文件夹名）
	namespaced: true,
	//vuex中的数据源，我们需要保存的数据就保存在这里
	state:{ 
		count: 1,
		objList: [
			{id: 1, text: 'obj1', status: true},
			{id: 2, text: 'obj2', status: false},
			{id: 3, text: 'obj3', status: true}
		] 
	},
	//Getter相当于vue中的computed计算属性，getter 的返回值会根据它的依赖被缓存起来，
	//且只有当它的依赖值发生了改变才会被重新计算，
	//这里我们可以通过定义vuex的Getter来获取，Getters 可以用于监听、state中的值的变化，返回计算后的结果
	getters:{
		getStoreStateCount: function(state){ //上面的state
			return state.count;
		},
		getTrueObjList: function(state){
			return state.objList.filter(f=>f.status);
		}
	},
	//修改store中的值唯一的方法就是提交mutation来修改
	//一条重要的原则就是要记住 mutation 必须是同步函数
	// ... commit
	mutations: {
		add(state, n){
			if (!n) {
				n = 1;
			}
			state.count = state.count + n;
		},
		remove(state, n){
			if (!n) {
				n = 1;
			}
			state.count = state.count - n;
		},
	},
	//官方并不介意我们这样直接去修改store里面的值，而是让我们去提交一个actions，
	//在actions中提交mutation再去修改状态值，先定义actions提交mutation的函数
	//actions可以异步提交，完成后，根据状态，更新mutations
	// ... dispatch
	actions: {
		addFunc(context, n){
			context.commit("add", n);
		},
		removeFunc(context, n){
			context.commit("remove", n);
		}
	},
	modules: {
		m1: M1,
		m2: M2,
		userInfo:UserInfo,
	}
})

export default store
