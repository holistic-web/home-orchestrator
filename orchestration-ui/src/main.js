import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import router from './router';
import storeConfig from './vuex/store';
import theme from './styles/theme';


Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(Vuetify, { theme });

const store = new Vuex.Store(storeConfig);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
