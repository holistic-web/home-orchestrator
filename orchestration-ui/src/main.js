import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import router from './router';
import store from './store/index';
import theme from './styles/theme';


Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(Vuetify, { theme });

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
