import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createLogger from 'vuex/dist/logger'

axios.defaults.timeout = 5000
// axios.defaults.baseURL = 'http://localhost:1810'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		bojack: 'bojack horseman'
	},
	plugins: [createLogger()]
})