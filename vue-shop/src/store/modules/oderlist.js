import Vue from 'vue';

const state = {
	orderList: [],
	params: {},
	user: {}
}

const getters = {
	getOrderList: state => state.orderList,
	getUser: state => state.user
}

const actions = {
	fetchOrderList({commit , state}) {
		Vue.http.post('/api/getOrderList', state.params)
		.then((res) => {
			commit("upDateOrderList", res.body.list);
		},(err) => {

		});
	},
	fetchUserLogin({commit, state}) {
		Vue.http.post('/api/login')
		.then((res) => {
			commit('upDateUser', res.body);
		},(err) => {

		})
	},
	fetchUserLogout({commit, state}) {
		Vue.http.post('/api/login')
	    .then((data) => {
	       commit('userLogout');
	    }, (error) => { 
	       console.log(error);
	    })
	}
}

const mutations = {
	upDateUser(state, user) {
		state.user = user;
	},
	upDateOrderList(state, orderList) {
		state.orderList = orderList;
	},
	upDateParams(state, params) {
		state.params = params;
	},
	userLogout(state) {
		state.user = {}
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}