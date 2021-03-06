const systemChange = {
	namespaced: true,
	state: {
		Page_Size_Change: { width: 0, height: 0 },
		Style_Change: "",
		isMenuOpen: false,
	},
	getters: {
		getIsMenuOpen: state => {
			return state.isMenuOpen
		},
	},
	mutations: {
		setPageSizeChange(state, ve) {
			state.Page_Size_Change = ve;
		},
		setStyleChange(state, ve) {
			state.Style_Change = ve
		},
		setIsMenuOpen(state, ve) {
			state.isMenuOpen = ve
		}
	},
}

export default systemChange
