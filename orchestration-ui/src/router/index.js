import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import routes from './routes';
import store from '../store/index';

Vue.use(Router);

const router = new Router({
	routes: [...routes],
	mode: 'history'
});

router.beforeEach((to, from, next) => {
	const isAuthenticated = !!store.getters['account/account'];
	if (to.name === 'account.unauthorized') {
		if (isAuthenticated) return next('/');
		return next();
	}
	if (!isAuthenticated) return next({ name: 'account.unauthorized' });
	axios.defaults.headers.common.authorization = `Bearer ${store.getters['account/token']}`;
	return next();
});

export default router;
