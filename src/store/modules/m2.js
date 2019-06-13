const m2 = {
	state: {
		version: 'store.module.m2',
		num: 100
	},
	getters: {
		getVersion2: state => {
			return state.version
		},
		getNum2: state => {
			return state.num
		}
	},
	mutations: {
		setVersion2 (state, v) {
			state.version = v
		},
		setNum2 (state, num) {
			state.num = num
		}
	},
	actions: {
		setVersionFunc2 ({commit}, v) {
			commit('setVersion2', v)
		},
		setNumFunc2 ({commit}, n) {
			commit('setNum2', n)
		}
	}
}

export default m2