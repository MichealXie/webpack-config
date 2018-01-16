import Vue from 'vue'
import Router from 'vue-router'
import Foo from '@/components/foo/foo.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			component: Foo
		}
	],
	// mode: "history"
})