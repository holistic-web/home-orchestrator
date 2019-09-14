import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import store from '../store/index';

Vue.use(Router);

const router = new Router({
	routes: [...routes],
	mode: 'history'
});

router.beforeEach(async (to, from, next) => {
	const isAuthenticated = !!store.getters['account/account'];
	if (to.name === 'account.unauthorized') {
		if (isAuthenticated) return next('/');
		return next();
	}
	return next();
});

export default router;
