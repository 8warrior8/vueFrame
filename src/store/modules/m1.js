const m1 = {
	state: {
		version: 'store.module.m1',
		num: 0
	},
	getters: {
		getVersion1: state => {
			return state.version
		},
		getNum1: state => {
			return state.num
		}
	},
	mutations: {
		setVersion1 (state, v) {
			state.version = v
		},
		setNum1 (state, num) {
			state.num = num
		}
	},
	actions: {
		setVersionFunc1 ({commit}, v) {
			commit('setVersion1', v)
		},
		setNumFunc1 ({commit}, n) {
			commit('setNum1', n)
		}
	}
}

export default m1
