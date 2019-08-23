import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import firebase from 'firebase';
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
	const token = await firebase.user.getIdToken();
	axios.defaults.headers.common.authorization = `Bearer ${token}`;
	return next();
});

export default router;
