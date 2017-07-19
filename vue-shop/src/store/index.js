import Vuex from 'vuex';
import Vue from 'vue';
import orderlist from './modules/oderlist';
Vue.use(Vuex);

export default new Vuex.Store({
	modules:{
		orderlist
	}
})