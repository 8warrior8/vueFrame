const systemChange = {
    namespaced: true,
	state: {
		Page_Size_Change: {width:0,height:0},
		Style_Change: ""
	},
	mutations: {
		setPageSizeChange (state, ve) {
      state.Page_Size_Change = ve;
		},
		setStyleChange (state, ve) {
			state.Style_Change = ve
		}
	},
}

export default systemChange
